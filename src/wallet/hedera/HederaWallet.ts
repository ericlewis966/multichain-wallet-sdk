import { Wallet as HethersWallet, verifyMessage } from '@hethers/wallet'
import { Client, PrivateKey, AccountCreateTransaction, Mnemonic, Wallet, AccountId, TransactionId } from '@hashgraph/sdk'
import * as bip39 from 'bip39'
import axios from 'axios'
import { CREATE_WALLET, GET_HEDERA_ACCOUNTID_ENDPOINT } from '../../utils/constant'
import { AnyObject } from '../../utils/globalType'
import { response } from '../../utils/response'

const createWallet = async ( _isTestnet?: boolean ) => {

    const isTestnet = _isTestnet || false
    const client = isTestnet ? Client.forTestnet() : Client.forMainnet()
    const mnemonic = await Mnemonic.generate12()
    const newAccountPrivateKey = await PrivateKey.fromMnemonic(mnemonic)
    // const newAccountPublicKey = newAccountPrivateKey.publicKey
    // const newAccount = await new AccountCreateTransaction().setKey(newAccountPublicKey).freezeWith(client).execute(client)
    // const getReceipt = await newAccount.getReceipt(client)
    // const newAccountId = getReceipt.accountId
    // const accountId = new AccountId(0)
    // const wallet = new Wallet(accountId, newAccountPrivateKey)
    // const id = wallet.accountId
    // const accountId = await axios.get(`${GET_HEDERA_ACCOUNTID_ENDPOINT}${newAccountPublicKey}`)
    return response({
        // newAccountId
    })
}

const HederaWallet: AnyObject = {
    [CREATE_WALLET]: createWallet
}

export default HederaWallet;