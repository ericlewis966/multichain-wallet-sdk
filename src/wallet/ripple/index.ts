import Wallet from './RippleWallet';
import { 
    CREATE_WALLET,
    IMPORT_WALLET,
    GET_BALANCE,
    SEND_COIN
} from '../../utils/constant';

import { 
    ImportWalletPayload,
    BalancePayload,
    TransferPayload 
} from '../../utils/payloads/ripple';

/**
 * 
 * @returns Ripple Address account
 */
export async function createWallet() {
    const wallet = await Wallet[CREATE_WALLET]();
    return wallet;
}

/**
 * 
 * @param args 
 * @returns Ripple Address account
 */
export async function importWallet(args: ImportWalletPayload) {
    const wallet = await Wallet[IMPORT_WALLET](args.secretKey);
    return wallet;
}

/**
 * 
 * @param args 
 * @returns Xrp Transfer Transaction
 */
export async function sendXrp(args: TransferPayload) {
    const tx = await Wallet[SEND_COIN](args.secretKey, args.senderAddress, args.recipientAddress, args.amount, args?.rpcUrl);
    return tx;
}

/**
 * 
 * @param args 
 * @returns Account Balance
 */
export async function getBalance(args: BalancePayload) {
    const balance = await Wallet[GET_BALANCE](args.address, args?.rpcUrl);
    return balance;
}