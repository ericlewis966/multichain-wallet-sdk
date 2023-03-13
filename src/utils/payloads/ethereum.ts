/*Global Interface*/
export interface AnyObject {
    [key: string]: any;
}

/*Ethereum Interface*/
export interface CreateWalletPayload {
    derivationPath?: string;
    nonce?: number;
}

export interface ImportWalletPayload {
    mnemonic: string;
    nonce: number;
    derivationPath?: string;
}

export interface CreateMasterSeedPayload {
    mnemonic: string;
}

export interface CreateAccountPayload {
    rootKey: any;
    nonce: number;
}

export interface ImportAccountPayload {
    privateKey: string;
}

export interface ProviderPayload {
    rpcUrl: string;
    address: string;
}

export interface BalancePayload {
    defaultProviderRpcUrl: string;
    address: string;
}

export interface GetTokenPayload {
    rpcUrl: string;
    tokenAddress: string;
    address: string;
}

export interface SendPayload {
    rpcUrl: string;
    privateKey: string;
    receiveAddress: string;
    amount: string;
    gasPrice?: number;
    gasLimit?: number;
}

export interface TokenApproveAndTransferPayload {
    rpcUrl: string;
    privateKey: string;
    receiveAddress: string;
    tokenAddress: string;
    amount: string;
    gasPrice: number;
    gasLimit: number;
}