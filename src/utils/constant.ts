
//Network Names
export const ETHEREUM: string = 'ETHEREUM';
export const SOLANA: string = 'SOLANA';
export const BITCOIN: string = 'BITCOIN';
export const RIPPLE: string = 'RIPPLE';

//Derived Path
export const ETHEREUM_DEFAULT: string = "m/44'/60'/0'/0/";
export const SOLANA_DEFAULT: string = "m/44'/501'/0'/0'";
export const BITCOIN_DEFAULT: string = "m/44'/0'/0'/0";

//Ethereum Contract Data
export const ERC721_INTERFACE_ID = '0x80ac58cd';

//Solana network cluster
export const MAINNET_BETA: string = 'mainnet-beta';
export const TESTNET: string = 'testnet';
export const DEVNET: string = 'devnet';
//Bitcoin network
export const BTC_MAINNET = 'bitcoin';
export const BTC_REGTEST = 'regtest';
export const BTC_TESTNET = 'testnet';


//Solana data API endpoint
export const SOLANA_TOKENLIST_URI: string = 'https://raw.githubusercontent.com/solana-labs/token-list/main/src/tokens/solana.tokenlist.json';

//Actions
export const CREATE_WALLET: string = 'CREATE_WALLET';
export const IMPORT_WALLET: string = 'IMPORT_WALLET';
export const CREATE_MASTERSEED: string = 'CREATE_MASTERSEED';
export const CREATE_ACCOUNT: string = 'CREATE_ACCOUNT';
export const IMPORT_ACCOUNT: string = 'IMPORT_ACCOUNT';
export const GET_BALANCE: string = 'GET_BALANCE';
export const GET_TOKEN: string = 'GET_TOKEN';
export const GET_TOKEN_LIST: string = 'GET_TOKEN_LIST';
export const SEND_COIN: string = 'SEND_COIN';
export const APPROVE_TOKEN: string = 'APPROVE_TOKEN';
export const TRANSFER_TOKEN: string = 'TRANSFER_TOKEN';
export const GET_TRANSACTION: string = 'GET_TRANSACTION';

//RPC_ENDPOINTS
export const ETHERRUM_MAINNET_RPC_URL_1 = 'https://mainnet.infura.io/v3/';
export const ETHEREUM_MAINNET_RPC_URL_2 = 'https://rpc.ankr.com/eth/';

export const SOLANA_DEVNET_RPC_URL = 'https://api.devnet.solana.com/';
export const SOLANA_TESTNET_RPC_URL = 'https://api.testnet.solana.com/';
export const SOLANA_MAINNET_RPC_URL = 'https://solana-mainnet.phantom.app/YBPpkkN4g91xDiAnTE9r0RcMkjg0sKUIWvAfoFVJ';

export const RIPPLE_NETWORK_RPC_URL_1 = 'https://s1.ripple.com:51234/';
export const RIPPLE_NETWORK_RPC_URL_2 = 'wss://s1.ripple.com/';

export const RIPPLE_TESTNET_RPC_URL_1 = 'https://s.altnet.rippletest.net:51234';
export const RIPPLE_TESTNET_RPC_URL_2 = 'wss://s.altnet.rippletest.net/';

export const RIPPLE_DEVNET_RPC_URL_1 = 'https://s.devnet.rippletest.net:51234';
export const RIPPLE_DEVNET_RPC_URL_2 = 'wss://s.devnet.rippletest.net/';