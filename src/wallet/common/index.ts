// import * as bip39 from "bip39";
/* eslint-disable */
import "@ethersproject/shims"
import { Wallet } from "ethers";

export const generateMnemonic = (): string => {
    const mnemonic: string = Wallet.createRandom().mnemonic.phrase;
    return mnemonic;
};