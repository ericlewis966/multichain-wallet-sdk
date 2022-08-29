import {
    generateMnemonic,
    getPrivateKeyFromMnemonic,
    getPublicKeyFromPrivateKey,
    getAddressFromPublicKey
} from "@binance-chain/javascript-sdk/lib/crypto";

import { BncClient } from "@binance-chain/javascript-sdk/lib/client";

import { response } from '../../utils/response';

import { AnyObject } from "../../utils/globalType";
import { 
    CREATE_WALLET,
    IMPORT_WALLET,
    IMPORT_ACCOUNT,
    GET_BALANCE,
    SEND_COIN
} from "./../../utils/constant";

import { AssetsPayload } from "../../utils/payloads/beacon";

const createWallet = () => {
    const mnemonic = generateMnemonic();
    const privateKey = getPrivateKeyFromMnemonic(mnemonic);
    const publicKey = getPublicKeyFromPrivateKey(privateKey);
    const address = getAddressFromPublicKey(publicKey, 'bnb');

    return response({
        mnemonic,
        privateKey,
        publicKey,
        address
    })
}

const importWallet = (mnemonic: string) => {
    const privateKey = getPrivateKeyFromMnemonic(mnemonic);
    const publicKey = getPublicKeyFromPrivateKey(privateKey);
    const address = getAddressFromPublicKey(publicKey, 'bnb');

    return response({
        mnemonic,
        privateKey,
        publicKey,
        address
    })
}

const importAccount = (privateKey: string) => {
    const publicKey = getPublicKeyFromPrivateKey(privateKey);
    const address = getAddressFromPublicKey(publicKey, 'bnb');

    return response({
        privateKey,
        publicKey,
        address
    })
}

const getBalance = async (rpcUrl: string, address: string, network: 'testnet' | 'mainnet') => {
    const client = new BncClient(rpcUrl);
    client.chooseNetwork(network);
    const balance: AssetsPayload = await client.getBalance(address);

    if(balance.length <= 0 || balance == null || balance == undefined || !balance.filter(asset => asset.symbol === 'BNB')) {
        return response({
            balance: 0
        })
    } else {
        return response({
            balance: balance.filter(asset => {return asset.symbol === 'BNB'})[0].free
        })
    }
}

const sendBNB = async (rpcUrl: string, privateKey: string, fromAddress: string, recipientAddress: string, amount: any, network: 'testnet' | 'mainnet') => {
    const client = new BncClient(rpcUrl);
    client.chooseNetwork(network);
    client.setPrivateKey(privateKey);

    const tx = await client.transfer(fromAddress, recipientAddress, amount, 'BNB');
    return response({
        tx
    })
}

const BeaconWallet: AnyObject = {
    [CREATE_WALLET]: createWallet,
    [IMPORT_WALLET]: importWallet,
    [IMPORT_ACCOUNT]: importAccount,
    [GET_BALANCE]: getBalance,
    [SEND_COIN]: sendBNB
}

export default BeaconWallet;