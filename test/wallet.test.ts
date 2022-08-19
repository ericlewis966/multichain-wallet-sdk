import * as Ethereum from '../src/wallet/ethereum';
import * as Solana from '../src/wallet/solana';
import * as Bitcoin from '../src/wallet/bitcoin';

interface EthWallet {
    address: string;
    privateKey: string;
    mnemonic: string;
    nonce: number;
}

interface SolWallet {
    address: string;
    privateKey: string;
    mnemonic: string;
}

interface BtcWallet {
    address: string;
    privateKey: string;
    mnemonic: string;
}

describe('Ethereum Wallet Test', () => {

    let createdWallet: EthWallet, importedWallet: EthWallet;

    it('Create Wallet', async () => {
        createdWallet = await Ethereum.createWallet({
        })

        expect(typeof createdWallet).toBe('object');
    })

    it('Import Wallet', async () => {
        importedWallet = await Ethereum.importWallet({
            mnemonic: createdWallet.mnemonic,
            nonce: createdWallet.nonce
        })

        expect(importedWallet).toEqual(createdWallet);
    })

    it('Create master seed & account', async () => {
        const seed = await Ethereum.createMasterSeed({
            mnemonic: createdWallet.mnemonic
        })

        const account = await Ethereum.createAccount({
            rootKey: seed,
            nonce: 0
        })

        expect(typeof account).toBe('object');
    })

    it('Import Account', async () => {
        const account = await Ethereum.importAccount({
            privateKey: importedWallet.privateKey
        })

        expect(typeof account).toBe('object');
    })

    it('Get Balance', async () => {
        const balance = await Ethereum.getBalance({
            defaultProviderRpcUrl: 'https://bsc-dataseed1.defibit.io/',
            address: '0x60610c2756fEDfbfB32E94D433cFD08740683771'
        })

        expect(typeof balance).toBe('object');
    })
})

describe('Solana Test', () => {
    let createdWallet: SolWallet, importedWallet: SolWallet;

    it('Create Wallet', async () => {
        const wallet = await Solana.createWallet({});
        
        createdWallet = wallet;

        expect(typeof wallet).toBe('object');
    })

    it('Import Wallet', async () => {
        const wallet = await Solana.importWallet({
            mnemonic: createdWallet.mnemonic
        })

        importedWallet = wallet;

        expect(importedWallet).toEqual(wallet);
    })

    it('Import Account', async () =>{
        const account = await Solana.importAccount({
            privateKey: importedWallet.privateKey
        });

        expect(typeof account).toBe('object');
    })

    it('Get Balance', async () => {
        const solBalance = await Solana.getBalance({
            rpcUrl: 'https://api.devnet.solana.com',
            address: '9DSRMyr3EfxPzxZo9wMBPku7mvcazHTHfyjhcfw5yucA'
        })

        const tokenBalance = await Solana.getBalance({
            rpcUrl: 'https://api.devnet.solana.com',
            address: '9DSRMyr3EfxPzxZo9wMBPku7mvcazHTHfyjhcfw5yucA',
            tokenAddress: '6xRPFqbtpkS7iVd9SysZDXdYn6iWceXF7p3T91N3EcAc'
        })

        expect(typeof solBalance).toBe('object');
        expect(typeof tokenBalance).toBe('object');
    })

    // it('Transfer SOL&Token', async () => {
    //     const tx = await Solana.transferToken({
    //         rpcUrl: 'https://api.devnet.solana.com',
    //         privateKey: 'b43bATy8pAqCKq1hFuf37G9KfMoDNxAkUZqNaeoUaisj4YQiuoeabcCHcDZaJvf2u7sNNTR9umMiYvTyZeSifFY',
    //         tokenAddress: '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU',
    //         to: 'EnreYo9RMVmUDRcYsHBxXvCkWQptcGrtAi9uHTV3Cba8',
    //         amount: 0.1
    //     })

    //     const solBalance = await Solana.getBalance({
    //         rpcUrl: 'https://api.devnet.solana.com',
    //         address: 'EnreYo9RMVmUDRcYsHBxXvCkWQptcGrtAi9uHTV3Cba8'
    //     })

    //     expect(typeof tx).toBe('object');
    //     expect(typeof solBalance).toBe('object');
    // })
})

describe('Test Bitcoin', () => {

    let createdWallet: BtcWallet, importedWallet: BtcWallet, randomWallet: BtcWallet;

    it('Create Wallet', async () => {
        createdWallet = await Bitcoin.createWallet({
            network: 'bitcoin'
        })

        randomWallet = await Bitcoin.createWallet({
            network: 'bitcoin'
        })

        expect(typeof createdWallet).toBe('object');
    })

    it('Import Wallet', async () => {
        importedWallet = await Bitcoin.importWallet({
            network: 'bitcoin',
            mnemonic: createdWallet.mnemonic
        })

        expect(typeof importedWallet).toBe('object');
    })

    // it('Create Raw Transaction', async () => {
    //     const tx = await Bitcoin.sendBtc({
    //         network: 'bitcoin',
    //         senderPrivatekey: createdWallet.privateKey,
    //         senderAddress: createdWallet.address,
    //         receiveAddress: randomWallet.address,
    //         amount: 10
    //     })

    //     expect(typeof tx).toBe('object');
    //     console.log(tx);
    // })
})