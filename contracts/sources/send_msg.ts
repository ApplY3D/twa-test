import { Address, beginCell, toNano, TonClient4 } from "ton";
import { mnemonicToWalletKey } from "ton-crypto";
import { TactWallet } from "./output/sample_TactWallet";
import { fill_send_parameters, send_ext_message } from "./helpers";
import { readFileSync } from "fs";

const contractAddress = "EQCwyQOhVH9NJY_J7m4NUou4enGWGs39tk_iRAEgVO-TiA3D";

let client4 = new TonClient4({ endpoint: "https://sandbox-v4.tonhubapi.com" });

(async () => {
    let mnemonics = readFileSync("secret1.txt").toString().split(",");
    let pair = mnemonicToWalletKey(mnemonics);

    let wallet = client4.open(TactWallet.fromAddress(Address.parse(contractAddress)));

    let params = fill_send_parameters(
        Address.parse("EQDrvNoaV98uGX_zrDUlYdQ4Rs4kBUbmfl_X0T-VzAruAmZw"),
        toNano("0.15"),
        beginCell().endCell(), 
        1n
    );

    await send_ext_message(wallet, (await pair).secretKey, BigInt((await client4.getLastBlock()).now + 20), params);
})();
