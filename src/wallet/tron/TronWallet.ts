import * as tron from "@faast/tron-payments";
import * as bip39 from "bip39";
import { BIP32Factory } from "bip32";
import * as ecc from "tiny-secp256k1";

import {
    TRON_DEFAULT,
    TRON_MAINNET,
    CREATE_WALLET,
    IMPORT_WALLET,
    IMPORT_ACCOUNT,
    GET_BALANCE
} from "../../utils/constant";
import { AnyObject } from "../../utils/globalType";
import { response } from "../../utils/response";

const createWallet = async (nonce?: number) => {
    const bip32 = BIP32Factory(ecc);
    const mnemonic = bip39.generateMnemonic();
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const node = await bip32.fromSeed(seed);
    const child = await node.derivePath(`m/44'/195'/${nonce || 0}'`);
    const privateKeyBuf = child.privateKey;
    const privateKeyHex = privateKeyBuf?.toString("hex");
    const privateKey = String(privateKeyHex);
    const keys = tron.HdTronPayments.generateNewKeys();
    const tronPayment = new tron.HdTronPayments({ hdKey: keys.xprv });

    const address = tronPayment.privateKeyToAddress(privateKey);

    return response({
        mnemonic,
        privateKey,
        address,
    });
};

const importWallet = async (mnemonic: string, nonce?: string) => {
    const bip32 = BIP32Factory(ecc);
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const node = await bip32.fromSeed(seed);
    const child = await node.derivePath(`m/44'/195'/${nonce || 0}'`);
    const privateKeyBuf = child.privateKey;
    const privateKeyHex = privateKeyBuf?.toString("hex");
    const privateKey = String(privateKeyHex);
    const keys = tron.HdTronPayments.generateNewKeys();
    const tronPayment = new tron.HdTronPayments({ hdKey: keys.xprv });

    const address = tronPayment.privateKeyToAddress(privateKey);

    return response({
        mnemonic,
        privateKey,
        address,
    });
};

const importAccount = async (privateKey: string) => {
    const keys = tron.HdTronPayments.generateNewKeys();
    const tronPayment = new tron.HdTronPayments({ hdKey: keys.xprv });

    const address = tronPayment.privateKeyToAddress(privateKey);

    return response({
        privateKey,
        address,
    });
};

const getBalance = async (address: string) => {
    const keys = tron.HdTronPayments.generateNewKeys();
    const tronPayment = new tron.HdTronPayments({ hdKey: keys.xprv });
    const {
        confirmedBalance,
        unconfirmedBalance,
    } = await tronPayment.getBalance({ address });

    return response({
        confirmedBalance,
        unconfirmedBalance
    })
};

const TronWallet: AnyObject = {
    [CREATE_WALLET]: createWallet,
    [IMPORT_WALLET]: importWallet,
    [IMPORT_ACCOUNT]: importAccount,
    [GET_BALANCE]: getBalance
};

export default TronWallet;
