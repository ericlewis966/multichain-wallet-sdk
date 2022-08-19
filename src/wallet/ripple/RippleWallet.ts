import { RippleAPI } from "ripple-lib";

import { response } from "./../../utils/response";
import { AnyObject } from "../../utils/globalType";

import { CREATE_WALLET } from "../../utils/constant";

const createWallet = async () => {
    const api = new RippleAPI();

    const walletAccount = api.generateAddress();

    return response({
        walletAccount
    })
}

const RippleWallet: AnyObject = {
    [CREATE_WALLET]: createWallet
}

export default RippleWallet;