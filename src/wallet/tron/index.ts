import Wallet from './TronWallet';
import { CREATE_WALLET, IMPORT_WALLET, IMPORT_ACCOUNT, GET_BALANCE } from '../../utils/constant';
import { BalancePayload, ImportWalletPayload, ImportAccountPayload } from '../../utils/payloads/tron';

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