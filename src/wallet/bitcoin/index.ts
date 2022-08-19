import Wallet from './BitcoinWallet';

import { 
    CreateWalletPayload,
    ImportWalletPayload,
    // TransferPaload
} from '../../utils/payloads/bitcoin';

import { 
    CREATE_WALLET, IMPORT_WALLET 
} from './../../utils/constant';

/**
 * 
 * @param args 
 * @returns BTC wallet
 */
export async function createWallet(args: CreateWalletPayload) {
    const wallet = await Wallet[CREATE_WALLET](args.network, args?.derivedPath);
    return wallet;
}


/**
 * 
 * @param args 
 * @returns BTC wallet
 */
export async function importWallet(args: ImportWalletPayload) {
    const wallet = await Wallet[IMPORT_WALLET](args.network, args.mnemonic, args?.derivedPath)
    return wallet;
}

// /**
//  * 
//  * @param args 
//  * @returns Raw transaction
//  */
// export async function sendBtc(args: TransferPaload) {
//     const tx = await Wallet[SEND_COIN](args.network, args.senderPrivatekey, args.senderAddress, args.receiveAddress, args.amount, args?.gasFee);

//     return tx;
// }

