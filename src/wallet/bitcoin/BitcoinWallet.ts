import BIP32Factory from 'bip32';
import * as ecc from 'tiny-secp256k1';
import * as  bip39 from 'bip39';
import * as bitcoin from 'bitcoinjs-lib';

import CryptoAccount from 'send-crypto';

import { response } from '../../utils/response';
import { 
    BITCOIN_DEFAULT,
    BTC_MAINNET,
    BTC_REGTEST,
    BTC_TESTNET
} from '../../utils/constant';
import { 
    CREATE_WALLET,
    IMPORT_WALLET,
    SEND_COIN
} from '../../utils/constant';
import { AnyObject } from '../../utils/globalType';

const createWallet = (_network: string, derivedPath?: string) => {

    let network;

    switch(_network) {
        case BTC_MAINNET:
            network = bitcoin.networks.bitcoin;
            break;
        case BTC_REGTEST:
            network = bitcoin.networks.regtest;
            break;
        case BTC_TESTNET:
            network = bitcoin.networks.testnet;
            break;
        default:
            network = bitcoin.networks.bitcoin;
            break;
    }
    const path = derivedPath || BITCOIN_DEFAULT;

    const mnemonic = bip39.generateMnemonic();
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const bip32 = BIP32Factory(ecc);
    const root = bip32.fromSeed(seed, network);

    const account = root.derivePath(path);
    const node = account.derive(0).derive(0);

    const address = bitcoin.payments.p2pkh({
        pubkey: node.publicKey,
        network: network
    }).address;
    
    return response({
        address: address,
        privateKey: node.toWIF(),
        mnemonic: mnemonic
    })
}

const importWallet = async (_network: string, mnemonic: string, derivedPath?: string) => {
    let network;

    switch(_network) {
        case BTC_MAINNET:
            network = bitcoin.networks.bitcoin;
            break;
        case BTC_REGTEST:
            network = bitcoin.networks.regtest;
            break;
        case BTC_TESTNET:
            network = bitcoin.networks.testnet;
            break;
        default:
            network = bitcoin.networks.bitcoin;
            break;
    }

    const path = derivedPath || BITCOIN_DEFAULT;

    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const bip32 = BIP32Factory(ecc);
    const root = bip32.fromSeed(seed, network);

    const account = root.derivePath(path);
    const node = account.derive(0).derive(0);

    const address = bitcoin.payments.p2pkh({
        pubkey: node.publicKey,
        network: network
    }).address;
    
    return response({
        address: address,
        privateKey: node.toWIF(),
        mnemonic: mnemonic
    })
}

const sendBtc = async (_network: string, senderPrivateKey: string, senderAddress: string, receiveAddress: string, amount: number, gasFee?: number) => {
    let network

    switch(_network) {
        case BTC_MAINNET:
            network = bitcoin.networks.bitcoin;
            break;
        case BTC_REGTEST:
            network = bitcoin.networks.regtest;
            break;
        case BTC_TESTNET:
            network = bitcoin.networks.testnet;
            break;
        default:
            network = bitcoin.networks.bitcoin;
            break;
    }

    const account = new CryptoAccount(senderPrivateKey);

    const tx = await account.send(receiveAddress, amount, _network);

    return response({
        network: _network,
        from: senderAddress,
        to: receiveAddress,
        amount: amount,
        fee: gasFee,
        tx: tx
    })
}

const BitcoinWallet: AnyObject = {
    [CREATE_WALLET]: createWallet,
    [IMPORT_WALLET]: importWallet,
    [SEND_COIN]: sendBtc
}

export default BitcoinWallet;