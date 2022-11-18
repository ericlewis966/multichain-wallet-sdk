export interface BalancePayload {
    address: string;
}

export interface ImportWalletPayload {
    mnemonic: string;
    nonce?: string;
}

export interface ImportAccountPayload {
    privateKey: string;
}