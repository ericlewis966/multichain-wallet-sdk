import Wallet from './TronWallet';
import { CREATE_WALLET } from '../../utils/constant';

export async function createWallet() {
    const wallet = await Wallet[CREATE_WALLET]();
    console.log(wallet);
}