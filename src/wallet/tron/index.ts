import Wallet from './TronWallet';
import { CREATE_WALLET, GET_BALANCE } from '../../utils/constant';
import { BalancePayload } from '../../utils/payloads/tron';

export async function createWallet() {
    const wallet = await Wallet[CREATE_WALLET]();
    return wallet;
}

export async function getBalance(args: BalancePayload) {
    const balance = await Wallet[GET_BALANCE](args.address);
    return balance;
}