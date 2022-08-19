import Wallet from './RippleWallet';
import { 
    CREATE_WALLET 
} from '../../utils/constant';


/**
 * 
 * @returns Ripple Address account
 */
export function createWallet() {
    const wallet = Wallet[CREATE_WALLET]();
    return wallet;
}