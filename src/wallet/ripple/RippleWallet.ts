//@ts-ignore
import rippleWallet from 'ripple-wallet';
import { Wallet, Client } from 'xrpl';
import * as xrpl from 'xrpl';

import { response } from "./../../utils/response";
import { AnyObject } from "../../utils/globalType";

import { 
    CREATE_WALLET,
    IMPORT_WALLET,
    SEND_COIN,
    GET_BALANCE,
    RIPPLE_NETWORK_RPC_URL_2
} from "../../utils/constant";

const createWallet = async () => {
    const wallet = rippleWallet.generate();
    return response({
        wallet
    })
}

const importWallet = async (secretKey: string) => {
    const wallet = await Wallet.fromSeed(secretKey);
    return response({
        wallet
    })
}

const getBalance = async (address: string, rpcUrl?: string) => {
    const client = new Client(rpcUrl || RIPPLE_NETWORK_RPC_URL_2);
    await client.connect();

    const balances = await client.getBalances(address);

    return response({
        data: balances
    })
}

const sendXrp = async (secretKey: string, senderAddress: string, recipientAddress: string, amount: number, rpcUrl?: string) => {
    const client = new Client(rpcUrl || RIPPLE_NETWORK_RPC_URL_2);
    await client.connect();

    const wallet = await Wallet.fromSeed(secretKey);

    const prepared = await client.autofill({
        TransactionType: "Payment",
        Account: senderAddress,
        Amount: xrpl.xrpToDrops(amount),
        Destination: recipientAddress
    })

    const signed = wallet.sign(prepared);

    const tx = await client.submitAndWait(signed.tx_blob);

    client.disconnect();

    return response({
        tx: tx.result.meta
    })
}

const RippleWallet: AnyObject = {
    [CREATE_WALLET]: createWallet,
    [IMPORT_WALLET]: importWallet,
    [GET_BALANCE]: getBalance,
    [SEND_COIN]: sendXrp
}

export default RippleWallet;