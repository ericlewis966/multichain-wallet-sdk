import * as rippleWallet from "ripple-wallet";
// import RippleAddress from "ripple-wallet/lib/ripple_address";
import { Wallet, Client } from "xrpl";
import * as xrpl from "xrpl";
import * as bip39 from 'bip39';

import { response } from "./../../utils/response";
import { AnyObject } from "../../utils/globalType";

import {
    CREATE_WALLET,
    IMPORT_WALLET,
    IMPORT_ACCOUNT,
    SEND_COIN,
    GET_BALANCE,
    RIPPLE_NETWORK_RPC_URL_2,
} from "../../utils/constant";

const createWallet = async () => {
    const mnemonic = bip39.generateMnemonic();
    const wallet = await Wallet.fromMnemonic(mnemonic);
    // const wallet = rippleWallet.generate();
    // const address = RippleAddress.fromPublicKey(wallet.publicKey);

    return response({
        ...wallet,
        mnemonic,
        // address
    });
};

const importWallet = async (mnemonic: string) => {
    // const seed = bip39.mnemonicToSeed(mnemonic);
    const wallet = await Wallet.fromMnemonic(mnemonic);
    // const address = RippleAddress.fromPublicKey(wallet.publicKey);

    return response({
       ... wallet,
       mnemonic,
    //    address
    });
};

const importAccount = async (secretKey: string) => {
    const account = await Wallet.fromSeed(secretKey);
    return response({
        account,
    });
};

const getBalance = async (address: string, rpcUrl?: string) => {
    const client = new Client(rpcUrl || RIPPLE_NETWORK_RPC_URL_2);
    await client.connect();

    const balances = await client.getBalances(address);

    return response({
        data: balances,
    });
};

const sendXrp = async (
    secretKey: string,
    senderAddress: string,
    recipientAddress: string,
    amount: number,
    rpcUrl?: string
) => {
    const client = new Client(rpcUrl || RIPPLE_NETWORK_RPC_URL_2);
    await client.connect();

    const wallet = await Wallet.fromSeed(secretKey);

    const prepared = await client.autofill({
        TransactionType: "Payment",
        Account: senderAddress,
        Amount: xrpl.xrpToDrops(amount),
        Destination: recipientAddress,
    });

    const signed = wallet.sign(prepared);

    const tx = await client.submitAndWait(signed.tx_blob);

    client.disconnect();

    return response({
        tx: tx.result.meta,
    });
};

const RippleWallet: AnyObject = {
    [CREATE_WALLET]: createWallet,
    [IMPORT_WALLET]: importWallet,
    [IMPORT_ACCOUNT]: importAccount,
    [GET_BALANCE]: getBalance,
    [SEND_COIN]: sendXrp,
};

export default RippleWallet;
