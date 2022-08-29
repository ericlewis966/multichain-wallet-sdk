import Wallet from './BinanceWallet';

import { 
    CREATE_WALLET, 
    IMPORT_WALLET, 
    GET_BALANCE,
    SEND_COIN
} from "../../utils/constant";
import { 
    ImportWalletPayload, 
    GetBalancePayload,
    SendBNBPayload
} from "../../utils/payloads/beacon";

export function createWallet () {
    const wallet = Wallet[CREATE_WALLET]();
    return wallet;
}

export function importWallet(args: ImportWalletPayload) {
    const wallet = Wallet[IMPORT_WALLET](args.mnemonic);
    return wallet;
}

export async function getBalance(args: GetBalancePayload) {
    const balance = await Wallet[GET_BALANCE](args.rpcUrl, args.address, args.network);
    return balance;
}

export async function sendCion(args: SendBNBPayload) {
    const tx = await Wallet[SEND_COIN](args.rpcUrl, args.privateKey, args.fromAddress, args.recipientAddress, args.amount, args.network);
    return ({
        tx
    })
}