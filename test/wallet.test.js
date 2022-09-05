"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Ethereum = require("../src/wallet/ethereum");
const Solana = require("../src/wallet/solana");
const Bitcoin = require("../src/wallet/bitcoin");
const Ripple = require("../src/wallet/ripple");
const Beacon = require("../src/wallet/binance");
describe('Ethereum Wallet Test', () => {
    let createdWallet, importedWallet;
    it('Create Wallet', async () => {
        createdWallet = await Ethereum.createWallet({});
        expect(typeof createdWallet).toBe('object');
    });
    it('Import Wallet', async () => {
        importedWallet = await Ethereum.importWallet({
            mnemonic: createdWallet.mnemonic,
            nonce: createdWallet.nonce
        });
        expect(importedWallet).toEqual(createdWallet);
    });
    it('Create master seed & account', async () => {
        const seed = await Ethereum.createMasterSeed({
            mnemonic: createdWallet.mnemonic
        });
        const account = await Ethereum.createAccount({
            rootKey: seed,
            nonce: 0
        });
        expect(typeof account).toBe('object');
    });
    it('Import Account', async () => {
        const account = await Ethereum.importAccount({
            privateKey: importedWallet.privateKey
        });
        expect(typeof account).toBe('object');
    });
    it('Get Balance', async () => {
        const balance = await Ethereum.getBalance({
            defaultProviderRpcUrl: 'https://bsc-dataseed1.defibit.io/',
            address: '0x60610c2756fEDfbfB32E94D433cFD08740683771'
        });
        expect(typeof balance).toBe('object');
    });
});
describe('Solana Test', () => {
    let createdWallet, importedWallet;
    it('Create Wallet', async () => {
        const wallet = await Solana.createWallet({});
        createdWallet = wallet;
        expect(typeof wallet).toBe('object');
    });
    it('Import Wallet', async () => {
        const wallet = await Solana.importWallet({
            mnemonic: createdWallet.mnemonic
        });
        importedWallet = wallet;
        expect(importedWallet).toEqual(wallet);
    });
    it('Import Account', async () => {
        const account = await Solana.importAccount({
            privateKey: importedWallet.privateKey
        });
        expect(typeof account).toBe('object');
    });
    it('Get Balance', async () => {
        const solBalance = await Solana.getBalance({
            rpcUrl: 'https://api.devnet.solana.com',
            address: '9DSRMyr3EfxPzxZo9wMBPku7mvcazHTHfyjhcfw5yucA'
        });
        const tokenBalance = await Solana.getBalance({
            rpcUrl: 'https://api.devnet.solana.com',
            address: '9DSRMyr3EfxPzxZo9wMBPku7mvcazHTHfyjhcfw5yucA',
            tokenAddress: '6xRPFqbtpkS7iVd9SysZDXdYn6iWceXF7p3T91N3EcAc'
        });
        expect(typeof solBalance).toBe('object');
        expect(typeof tokenBalance).toBe('object');
    });
});
describe('Test Bitcoin', () => {
    let createdWallet, importedWallet, randomWallet;
    it('Create Wallet', async () => {
        createdWallet = await Bitcoin.createWallet({
            network: 'bitcoin'
        });
        randomWallet = await Bitcoin.createWallet({
            network: 'bitcoin'
        });
        expect(typeof createdWallet).toBe('object');
    });
    it('Import Wallet', async () => {
        importedWallet = await Bitcoin.importWallet({
            network: 'bitcoin',
            mnemonic: createdWallet.mnemonic
        });
        expect(typeof importedWallet).toBe('object');
    });
    it('Get balance', async () => {
        const balance = await Bitcoin.getBalance({
            address: '34xp4vRoCGJym3xR7yCVPFHoCNxv4Twseo'
        });
        expect(typeof balance).toBe('object');
    });
});
describe('Ripple Test', () => {
    let createdWallet, importedWallet;
    it('Create Wallet', async () => {
        createdWallet = await Ripple.createWallet();
        expect(typeof createdWallet).toBe('object');
    });
    it('Import Wallet', async () => {
        importedWallet = await Ripple.importWallet({
            secretKey: createdWallet.wallet.secret
        });
        expect(typeof importedWallet).toBe('object');
    });
    it('Get Balance', async () => {
        const balance = await Ripple.getBalance({
            address: 'rJmE49v6V6p6YLNZyncgCR6d1gs8DiVXJc'
        });
        expect(typeof balance).toBe('object');
    });
});
describe('Beacon Test', () => {
    let createdWallet, importedWallet;
    it('Create Wallet', async () => {
        createdWallet = Beacon.createWallet();
        expect(createdWallet.address.length).toBeGreaterThan(0);
    });
    it('Import Wallet', async () => {
        importedWallet = Beacon.importWallet({
            mnemonic: createdWallet.mnemonic
        });
        expect(importedWallet).toStrictEqual(createdWallet);
    });
    it('Get Balance', async () => {
        const balance = await Beacon.getBalance({
            rpcUrl: 'https://dex.binance.org/',
            address: 'bnb1mnun4frf99dcqa4u4e3z0f4mhv4vrgfpchn2l0',
            network: 'mainnet'
        });
        expect(typeof balance).toBe('object');
    });
});
