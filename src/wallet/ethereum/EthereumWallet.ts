/* eslint-disable */

import "@ethersproject/shims"

import { ethers } from 'ethers';
// import { hdkey } from 'ethereumjs-wallet';
import { mnemonicToSeed } from 'bip39';

// import response format
import { response, walletResponse, balanceResponse } from '../../utils/response';
// import constants
import { ETHEREUM_DEFAULT } from '../../utils/constant';
// import actions
import {
    CREATE_WALLET,
    IMPORT_WALLET,
    CREATE_ACCOUNT,
    CREATE_MASTERSEED,
    IMPORT_ACCOUNT,
    GET_BALANCE,
    GET_TOKEN,
    SEND_COIN,
    APPROVE_TOKEN,
    TRANSFER_TOKEN,
    GET_GAS
} from '../../utils/constant';
// import ineterface
import { AnyObject } from '../../utils/globalType';
// import util functions
import {
    isContractAddress,
    isNftContract
} from '../../helper/ethereumHelper';
// import ABI
import ERC20 from '../../abi/erc20';
import ERC721 from '../../abi/erc721';

/**
 * 
 * @param args
 * @description Create Ethereum wallet
 * @returns Created Wallet
 */
const createWallet = async (derivationPath?: string, nonce?: number) => {
    const path = derivationPath || ETHEREUM_DEFAULT;
    const index = nonce || Math.floor(Math.random() * 10);

    const wallet = ethers.Wallet.createRandom({ path: path + index });

    return walletResponse({
        address: wallet.address,
        privateKey: wallet.privateKey,
        mnemonic: wallet.mnemonic.phrase,
        nonce: index
    })
}

/**
 * 
 * @param mnemonic
 * @param derivationPath
 * @returns Imported Wallet
 */
const importWallet = async (mnemonic: string, nonce?: number, derivationPath?: string) => {
    const path = derivationPath || ETHEREUM_DEFAULT;

    const index = nonce || 0;

    const wallet = ethers.Wallet.fromMnemonic(mnemonic, path + index);

    return walletResponse({
        address: wallet.address,
        privateKey: wallet.privateKey,
        mnemonic: wallet.mnemonic.phrase,
        nonce: index
    })
}

const createMasterSeedFromMnemonic = async (mnemonic: string) => {
    const seed = await mnemonicToSeed(mnemonic);
    return seed;
}

// /**
//  * 
//  * @param rootKey 
//  * @returns New Account
//  */
// const createAccount = async (rootKey: any, nonce: number) => {
//     const hdWallet = await hdkey.fromMasterSeed(rootKey);
//     const wallet = hdWallet.derivePath(ETHEREUM_DEFAULT + nonce).getWallet();
//     const address = `0x${wallet.getAddress().toString('hex')}`;
//     const privateKey = wallet.getPrivateKey().toString('hex');

//     return walletResponse({
//         address: address,
//         privateKey: privateKey
//     });
// }

/**
 * 
 * @param privateKey 
 * @returns Imported Account
 */
const importAccount = async (privateKey: string) => {

    const account = new ethers.Wallet(privateKey);

    return walletResponse({
        address: account.address,
        privateKey: account.privateKey
    })
}

/**
 * 
 * @param rpcUrl 
 * @param address 
 * @returns Address and ETH balance
 */
const getBalance = async (rpcUrl: string, address: string) => {
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

    const balance = await provider.getBalance(address);
    return balanceResponse( parseInt(balance['_hex'], 16) )
}

const getToken = async (tokenAddress: string, rpcUrl: string, address: string) => {
    const isContract = await isContractAddress(rpcUrl, tokenAddress);
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    var contract: AnyObject;

    if (!isContract) {
        return false;
    } else {
        const isNft = await isNftContract(rpcUrl, tokenAddress);

        if (isNft) {
            contract = new ethers.Contract(tokenAddress, ERC721, provider);

            try {
                const [name, symbol, totalSupply, balance] = await Promise.all([
                    contract.name(),
                    contract.symbol(),
                    contract.totalSupply(),
                    contract.balanceOf(address)
                ]);

                return response({
                    name: name,
                    symbol: symbol,
                    totalSupply: totalSupply,
                    balance: balance,
                    isNft: isNft
                })
            } catch (err) {
                const [name, symbol, totalSupply, balance] = await Promise.all([
                    contract._name(),
                    contract._symbol(),
                    contract._totalSupply(),
                    contract.balanceOf(address)
                ]);

                return response({
                    name: name,
                    symbol: symbol,
                    totalSupply: totalSupply,
                    balance: balance,
                    isNft: isNft
                })
            }
        } else {
            contract = new ethers.Contract(tokenAddress, ERC20, provider);

            try {
                const [name, symbol, decimals, totalSupply, balance] = await Promise.all([
                    contract.name(),
                    contract.symbol(),
                    contract.decimals(),
                    contract.totalSupply(),
                    contract.balanceOf(address)
                ]);

                return response({
                    name: name,
                    symbol: symbol,
                    decimals: decimals,
                    totalSupply: totalSupply,
                    balance: balance,
                    isNft: isNft
                })
            } catch (err) {
                const [name, symbol, decimals, totalSupply, balance] = await Promise.all([
                    contract._name(),
                    contract._symbol(),
                    contract._decimals(),
                    contract._totalSupply(),
                    contract.balanceOf(address)
                ]);

                return response({
                    name: name,
                    symbol: symbol,
                    decimals: decimals,
                    totalSupply: totalSupply,
                    balance: balance,
                    isNft: isNft
                })
            }
        }
    }
}


/**
 * 
 * @param rpcUrl 
 * @param privateKey 
 * @param receiveAddress 
 * @param amount 
 * @returns transaction result
 */
const sendEther = async (rpcUrl: string, privateKey: string, receiveAddress: string, amount: string, gasPrice?: number, gasLimit?: number) => {
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const senderAccount = new ethers.Wallet(privateKey, provider);

    const defaultGasPrice = await provider.getGasPrice()
    const defaultGasLimit =(await provider.getBlock('latest')).gasLimit
    const defaultGasPriceSn = parseInt(defaultGasPrice._hex, 16)

    const _gasPrice = gasPrice || ethers.BigNumber.from(Math.round(defaultGasPriceSn + (defaultGasPriceSn / 10)))
    const _gasLimit = gasLimit || defaultGasLimit

    const tx = {
        to: receiveAddress,
        value: ethers.utils.parseEther(amount),
        gasPrice: _gasPrice,
        gasLimit: _gasLimit
    }

    const txResult = senderAccount.sendTransaction(tx);
    return response(txResult);
}

const tokenApprove = async (rpcUrl: string, privateKey: string, receiveAddress: string, tokenAddress: string, amount: string, gasPrice: number, gasLimit: number) => {
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const senderAccount = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(tokenAddress, ERC20, provider);
    const signedContract = contract.connect(senderAccount);

    try {
        const tx = await signedContract.approve(receiveAddress, amount, { gasPrice: gasPrice, gasLimit: gasLimit });
        return response(tx);
    } catch (err) {
        return response({ err });
    }
}

const tokenTransfer = async (rpcUrl: string, privateKey: string, receiveAddress: string, tokenAddress: string, amount: string, gasPrice: number, gasLimit: number) => {
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const senderAccount = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(tokenAddress, ERC20, provider);
    const signedContract = contract.connect(senderAccount);

    try {
        const tx = await signedContract.transfer(receiveAddress, amount, { gasPrice: gasPrice, gasLimit: gasLimit });
        return response(tx);
    } catch (err) {
        return response({ err });
    }
}

const getGas = async (rpcUrl: string) => {
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl)
    const block = await provider.getBlock('latest')
    
    const gasPrice = await provider.getGasPrice()
    const gasLimit = block.gasLimit
    return response({
        gasPrice,
        gasLimit
    })
}

const EthereumWallet: AnyObject = {
    [CREATE_WALLET]: createWallet,
    [IMPORT_WALLET]: importWallet,
    [CREATE_MASTERSEED]: createMasterSeedFromMnemonic,
    // [CREATE_ACCOUNT]: createAccount,
    [IMPORT_ACCOUNT]: importAccount,
    [GET_BALANCE]: getBalance,
    [GET_TOKEN]: getToken,
    [SEND_COIN]: sendEther,
    [APPROVE_TOKEN]: tokenApprove,
    [TRANSFER_TOKEN]: tokenTransfer,
    [GET_GAS]: getGas
}

export default EthereumWallet;