import BIP32Factory from 'bip32';
import * as ecc from 'tiny-secp256k1';
import * as  bip39 from 'bip39';
import * as bitcoin from 'bitcoinjs-lib';

import { response } from '../../utils/response';
import { BITCOIN_DEFAULT } from '../../utils/constant';
import { 
    CREATE_WALLET,
    IMPORT_WALLET 
} from '../../utils/constant';
import { AnyObject } from '../../utils/globalType';

const createWallet = (derivedPath?: string) => {
    const network = bitcoin.networks.bitcoin;
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

const importWallet = async (mnemonic: string, derivedPath?: string) => {
    const network = bitcoin.networks.bitcoin;
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

const sendBtc = async (senderPrivateKey: string) => {
    const network = bitcoin.networks.bitcoin;
}

const BitcoinWallet: AnyObject = {
    [CREATE_WALLET]: createWallet,
    [IMPORT_WALLET]: importWallet
}

export default BitcoinWallet;