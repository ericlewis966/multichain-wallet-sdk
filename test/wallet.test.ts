import { AnyObject } from "../src/utils/globalType";

import * as Ethereum from "../src/wallet/ethereum";
import * as Solana from "../src/wallet/solana";
import * as Bitcoin from "../src/wallet/bitcoin";
import * as Ripple from "../src/wallet/ripple";
import * as Beacon from "../src/wallet/binance";
import * as Tron from "../src/wallet/tron";

import 
{ 
    POLYGON_MAINNET_RPC_URL, 
    BINANCE_SMART_CHAIN_RPC_URL,
    AVALANCH_NETWORK_RPC_URL,
    FANTOM_OPERA_MAINNET_RPC_URL,
    ARBITRUM_ONE_MAINNET_RPC_URL,
    CRONOS_MAINNET_RPC_URL,
    ETHEREUM_MAINNET_RPC_URL_2,
    SOLANA_MAINNET_RPC_URL
} from "../src/utils/constant";

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

interface RootRippleWallet {
    address: string;
    secret: string;
    mnemonic: string;
}

interface NormalRippleWallet {
    publicKey: string;
    privateKey: string;
    classicAddress: string;
    seed: string;
}

interface BeaconWallet {
    mnemonic: string;
    privateKey: string;
    publicKey: string;
    address: string;
}

jest.setTimeout(50000);

describe("EVM class blockchain Test", () => {
    describe("Ethereum Wallet Test", () => {
        let createdWallet: EthWallet, importedWallet: EthWallet;
    
        it("Create Wallet", async () => {
            createdWallet = await Ethereum.createWallet({});
    
            expect(typeof createdWallet).toBe("object");
        });
    
        it("Import Wallet", async () => {
            importedWallet = await Ethereum.importWallet({
                mnemonic: createdWallet.mnemonic,
                nonce: createdWallet.nonce,
            });
    
            expect(importedWallet).toEqual(createdWallet);
        });
    
        it("Create master seed & account", async () => {
            const seed = await Ethereum.createMasterSeed({
                mnemonic: createdWallet.mnemonic,
            });
    
            const account = await Ethereum.createAccount({
                rootKey: seed,
                nonce: 0,
            });
    
            expect(typeof account).toBe("object");
        });
    
        it("Import Account", async () => {
            const account = await Ethereum.importAccount({
                privateKey: importedWallet.privateKey,
            });
    
            expect(typeof account).toBe("object");
        });
    
        it("Get Balance", async () => {
            const balance = await Ethereum.getBalance({
                defaultProviderRpcUrl: ETHEREUM_MAINNET_RPC_URL_2,
                address: "0x60610c2756fEDfbfB32E94D433cFD08740683771",
            });
    
            expect(typeof balance).toBe("object");
        });
    });
    
    describe("Polygon Wallet Test", () => {
        let createdWallet: EthWallet, importedWallet: EthWallet;
    
        it("Create Wallet", async () => {
            createdWallet = await Ethereum.createWallet({});
    
            expect(typeof createdWallet).toBe("object");
        });
    
        it("Import Wallet", async () => {
            importedWallet = await Ethereum.importWallet({
                mnemonic: createdWallet.mnemonic,
                nonce: createdWallet.nonce,
            });
    
            expect(importedWallet).toEqual(createdWallet);
        });
    
        it("Create master seed & account", async () => {
            const seed = await Ethereum.createMasterSeed({
                mnemonic: createdWallet.mnemonic,
            });
    
            const account = await Ethereum.createAccount({
                rootKey: seed,
                nonce: 0,
            });
    
            expect(typeof account).toBe("object");
        });
    
        it("Import Account", async () => {
            const account = await Ethereum.importAccount({
                privateKey: importedWallet.privateKey,
            });
    
            expect(typeof account).toBe("object");
        });
    
        it("Get Balance", async () => {
            const balance = await Ethereum.getBalance({
                defaultProviderRpcUrl: POLYGON_MAINNET_RPC_URL,
                address: "0x60610c2756fEDfbfB32E94D433cFD08740683771",
            });
    
            expect(typeof balance).toBe("object");
        });
    });
    
    describe("Binance Smart Chain Wallet Test", () => {
        let createdWallet: EthWallet, importedWallet: EthWallet;
    
        it("Create Wallet", async () => {
            createdWallet = await Ethereum.createWallet({});
    
            expect(typeof createdWallet).toBe("object");
        });
    
        it("Import Wallet", async () => {
            importedWallet = await Ethereum.importWallet({
                mnemonic: createdWallet.mnemonic,
                nonce: createdWallet.nonce,
            });
    
            expect(importedWallet).toEqual(createdWallet);
        });
    
        it("Create master seed & account", async () => {
            const seed = await Ethereum.createMasterSeed({
                mnemonic: createdWallet.mnemonic,
            });
    
            const account = await Ethereum.createAccount({
                rootKey: seed,
                nonce: 0,
            });
    
            expect(typeof account).toBe("object");
        });
    
        it("Import Account", async () => {
            const account = await Ethereum.importAccount({
                privateKey: importedWallet.privateKey,
            });
    
            expect(typeof account).toBe("object");
        });
    
        it("Get Balance", async () => {
            const balance = await Ethereum.getBalance({
                defaultProviderRpcUrl: BINANCE_SMART_CHAIN_RPC_URL,
                address: "0x60610c2756fEDfbfB32E94D433cFD08740683771",
            });
    
            expect(typeof balance).toBe("object");
        });
    });
    
    describe("Avalanch Wallet Test", () => {
        let createdWallet: EthWallet, importedWallet: EthWallet;
    
        it("Create Wallet", async () => {
            createdWallet = await Ethereum.createWallet({});
    
            expect(typeof createdWallet).toBe("object");
        });
    
        it("Import Wallet", async () => {
            importedWallet = await Ethereum.importWallet({
                mnemonic: createdWallet.mnemonic,
                nonce: createdWallet.nonce,
            });
    
            expect(importedWallet).toEqual(createdWallet);
        });
    
        it("Create master seed & account", async () => {
            const seed = await Ethereum.createMasterSeed({
                mnemonic: createdWallet.mnemonic,
            });
    
            const account = await Ethereum.createAccount({
                rootKey: seed,
                nonce: 0,
            });
    
            expect(typeof account).toBe("object");
        });
    
        it("Import Account", async () => {
            const account = await Ethereum.importAccount({
                privateKey: importedWallet.privateKey,
            });
    
            expect(typeof account).toBe("object");
        });
    
        it("Get Balance", async () => {
            const balance = await Ethereum.getBalance({
                defaultProviderRpcUrl: AVALANCH_NETWORK_RPC_URL,
                address: "0x60610c2756fEDfbfB32E94D433cFD08740683771",
            });
    
            expect(typeof balance).toBe("object");
        });
    });
    
    describe("Fantom Wallet Test", () => {
        let createdWallet: EthWallet, importedWallet: EthWallet;
    
        it("Create Wallet", async () => {
            createdWallet = await Ethereum.createWallet({});
    
            expect(typeof createdWallet).toBe("object");
        });
    
        it("Import Wallet", async () => {
            importedWallet = await Ethereum.importWallet({
                mnemonic: createdWallet.mnemonic,
                nonce: createdWallet.nonce,
            });
    
            expect(importedWallet).toEqual(createdWallet);
        });
    
        it("Create master seed & account", async () => {
            const seed = await Ethereum.createMasterSeed({
                mnemonic: createdWallet.mnemonic,
            });
    
            const account = await Ethereum.createAccount({
                rootKey: seed,
                nonce: 0,
            });
    
            expect(typeof account).toBe("object");
        });
    
        it("Import Account", async () => {
            const account = await Ethereum.importAccount({
                privateKey: importedWallet.privateKey,
            });
    
            expect(typeof account).toBe("object");
        });
    
        it("Get Balance", async () => {
            const balance = await Ethereum.getBalance({
                defaultProviderRpcUrl: FANTOM_OPERA_MAINNET_RPC_URL,
                address: "0x60610c2756fEDfbfB32E94D433cFD08740683771",
            });
    
            expect(typeof balance).toBe("object");
        });
    });
    
    describe("Arbitrum Wallet Test", () => {
        let createdWallet: EthWallet, importedWallet: EthWallet;
    
        it("Create Wallet", async () => {
            createdWallet = await Ethereum.createWallet({});
    
            expect(typeof createdWallet).toBe("object");
        });
    
        it("Import Wallet", async () => {
            importedWallet = await Ethereum.importWallet({
                mnemonic: createdWallet.mnemonic,
                nonce: createdWallet.nonce,
            });
    
            expect(importedWallet).toEqual(createdWallet);
        });
    
        it("Create master seed & account", async () => {
            const seed = await Ethereum.createMasterSeed({
                mnemonic: createdWallet.mnemonic,
            });
    
            const account = await Ethereum.createAccount({
                rootKey: seed,
                nonce: 0,
            });
    
            expect(typeof account).toBe("object");
        });
    
        it("Import Account", async () => {
            const account = await Ethereum.importAccount({
                privateKey: importedWallet.privateKey,
            });
    
            expect(typeof account).toBe("object");
        });
    
        it("Get Balance", async () => {
            const balance = await Ethereum.getBalance({
                defaultProviderRpcUrl: ARBITRUM_ONE_MAINNET_RPC_URL,
                address: "0x60610c2756fEDfbfB32E94D433cFD08740683771",
            });
    
            expect(typeof balance).toBe("object");
        });
    });
    
    describe("Cronos Wallet Test", () => {
        let createdWallet: EthWallet, importedWallet: EthWallet;
    
        it("Create Wallet", async () => {
            createdWallet = await Ethereum.createWallet({});
    
            expect(typeof createdWallet).toBe("object");
        });
    
        it("Import Wallet", async () => {
            importedWallet = await Ethereum.importWallet({
                mnemonic: createdWallet.mnemonic,
                nonce: createdWallet.nonce,
            });
    
            expect(importedWallet).toEqual(createdWallet);
        });
    
        it("Create master seed & account", async () => {
            const seed = await Ethereum.createMasterSeed({
                mnemonic: createdWallet.mnemonic,
            });
    
            const account = await Ethereum.createAccount({
                rootKey: seed,
                nonce: 0,
            });
    
            expect(typeof account).toBe("object");
        });
    
        it("Import Account", async () => {
            const account = await Ethereum.importAccount({
                privateKey: importedWallet.privateKey,
            });
    
            expect(typeof account).toBe("object");
        });
    
        it("Get Balance", async () => {
            const balance = await Ethereum.getBalance({
                defaultProviderRpcUrl: CRONOS_MAINNET_RPC_URL,
                address: "0x60610c2756fEDfbfB32E94D433cFD08740683771",
            });
    
            expect(typeof balance).toBe("object");
        });
    });
})

describe("Solana Test", () => {
    let createdWallet: SolWallet, importedWallet: SolWallet;

    it("Create Wallet", async () => {
        const wallet = await Solana.createWallet({});

        createdWallet = wallet;

        expect(typeof wallet).toBe("object");
    });

    it("Import Wallet", async () => {
        const wallet = await Solana.importWallet({
            mnemonic: createdWallet.mnemonic,
        });

        importedWallet = wallet;

        expect(importedWallet).toEqual(wallet);
    });

    it("Import Account", async () => {
        const account = await Solana.importAccount({
            privateKey: importedWallet.privateKey,
        });

        expect(typeof account).toBe("object");
    });

    it("Get Balance", async () => {
        const solBalance = await Solana.getBalance({
            rpcUrl: SOLANA_MAINNET_RPC_URL,
            address: "9DSRMyr3EfxPzxZo9wMBPku7mvcazHTHfyjhcfw5yucA",
        });

        const tokenBalance = await Solana.getBalance({
            rpcUrl: SOLANA_MAINNET_RPC_URL,
            address: "9DSRMyr3EfxPzxZo9wMBPku7mvcazHTHfyjhcfw5yucA",
            tokenAddress: "ETAtLmCmsoiEEKfNrHKJ2kYy3MoABhU6NQvpSfij5tDs",
        });

        expect(typeof solBalance).toBe("object");
        expect(typeof tokenBalance).toBe("object");
    });
});

describe("Test Bitcoin", () => {
    let createdWallet: BtcWallet,
        importedWallet: BtcWallet,
        randomWallet: BtcWallet;

    it("Create Wallet", async () => {
        createdWallet = await Bitcoin.createWallet({
            network: "bitcoin",
        });

        randomWallet = await Bitcoin.createWallet({
            network: "bitcoin",
        });
        expect(typeof createdWallet).toBe("object");
    });

    it("Import Wallet", async () => {
        importedWallet = await Bitcoin.importWallet({
            network: "bitcoin",
            mnemonic: createdWallet.mnemonic,
        });

        expect(typeof importedWallet).toBe("object");
    });

    it("Import Account", async () => {
        importedWallet = await Bitcoin.importAccount({
            network: "bitcoin",
            privateKey: createdWallet.privateKey,
        });

        expect(typeof importedWallet).toBe("object");
    });

    it("Get balance", async () => {
        const balance = await Bitcoin.getBalance({
            address: "34xp4vRoCGJym3xR7yCVPFHoCNxv4Twseo",
        });
        expect(typeof balance).toBe("object");
    });
});

describe("Ripple Test", () => {
    let createdWallet: RootRippleWallet, importedWallet: RootRippleWallet;

    it("Create Wallet", async () => {
        createdWallet = await Ripple.createWallet();
        expect(typeof createdWallet).toBe("object");
    });

    it("Import Wallet", async () => {
        importedWallet = await Ripple.importWallet({
            secretKey: "luggage flip infant wife pear forest ugly canyon elite one bread finger",
        });
        expect(typeof importedWallet).toBe("object");
    });

    it("Get Balance", async () => {
        const balance = await Ripple.getBalance({
            address: "rJmE49v6V6p6YLNZyncgCR6d1gs8DiVXJc",
        });
        expect(typeof balance).toBe("object");
    });
});

describe("Beacon Test", () => {
    let createdWallet: BeaconWallet, importedWallet: BeaconWallet;
    it("Create Wallet", async () => {
        createdWallet = Beacon.createWallet();
        expect(createdWallet.address.length).toBeGreaterThan(0);
    });

    it("Import Wallet", async () => {
        importedWallet = Beacon.importWallet({
            mnemonic: createdWallet.mnemonic,
        });

        expect(importedWallet).toStrictEqual(createdWallet);
    });

    it("Import Account", async () => {
        const importedAccount = Beacon.importAccount({
            privateKey: createdWallet.privateKey,
        });

        expect(typeof importedAccount).toBe('object');
    });

    it("Get Balance", async () => {
        const balance = await Beacon.getBalance({
            rpcUrl: "https://dex.binance.org/",
            address: "bnb1mnun4frf99dcqa4u4e3z0f4mhv4vrgfpchn2l0",
            network: "mainnet",
        });

        expect(typeof balance).toBe("object");
    });
});

describe("Tron Test", () => {

    var createdWallet: AnyObject, importedWallet: AnyObject, importedAccount: AnyObject;

    it("Create Wallet", async () => {
        createdWallet = await Tron.createWallet();
        expect(typeof createdWallet).toBe('object')
    });

    it("Import Wallet", async () => {
        importedWallet = await Tron.importWallet({ mnemonic: createdWallet.mnemonic })
        expect(importedWallet).toStrictEqual(createdWallet)
    })

    it("Import Account", async () => {
        importedAccount = await Tron.importAccount({
            privateKey: importedWallet.privateKey
        })

        expect(importedAccount.address).toStrictEqual(importedWallet.address)
    })

    it("Get Balance", async () => {
        const balance = await Tron.getBalance({
            address: "TABWo715YJTqBndZfm4hUu5C4h9doonfZe",
        });
    });
});