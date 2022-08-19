import Wallet from './RippleWallet';
import { 
    CREATE_WALLET 
} from 'utils/constant';


/**
 * 
 * @returns Ripple Address account
 */
export async function createWallet() {
    const wallet = await Wallet[CREATE_WALLET];
    return wallet;
}