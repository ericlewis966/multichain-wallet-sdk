import Wallet from './TronWallet';
import { CREATE_WALLET, IMPORT_WALLET, IMPORT_ACCOUNT, GET_BALANCE, SEND_COIN } from '../../utils/constant';
import { BalancePayload, ImportWalletPayload, ImportAccountPayload, SendTrxPayload } from '../../utils/payloads/tron';

export async function createWallet() {
    const wallet = await Wallet[CREATE_WALLET]();
    return wallet;
}

export async function importWallet(args: ImportWalletPayload) {
    const wallet = await Wallet[IMPORT_WALLET](args.mnemonic, args?.nonce)
    return wallet
}

export async function importAccount(args: ImportAccountPayload) {
    const wallet = await Wallet[IMPORT_ACCOUNT](args.privateKey)
    return wallet
}

export async function getBalance(args: BalancePayload) {
    const balance = await Wallet[GET_BALANCE](args.address);
    return balance;
}

export async function sendCoin(args: SendTrxPayload) {
    const result = await Wallet[SEND_COIN](args.privateKey, args.fromAddress, args.toAddress, args.amount)
    return result;
}