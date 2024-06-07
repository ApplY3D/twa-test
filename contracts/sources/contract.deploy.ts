import * as fs from "fs";
import * as path from "path";
import { Dictionary, contractAddress } from "ton";
import { TactWallet } from "./output/sample_TactWallet";
import { prepareTactDeployment } from "@tact-lang/deployer";
import { mnemonicNew, mnemonicToWalletKey } from "ton-crypto";
import { Array as ton_Array } from "./output/sample_TactWallet";

(async () => {
    // Parameters
    let testnet = true;
    let packageName = "sample_TactWallet.pkg";
    let mnemonics1 = await mnemonicNew();
    let mnemonics2 = await mnemonicNew();
    try {
        fs.readFileSync("secret1.txt");
        fs.readFileSync("secret2.txt");
        throw new Error("File already exists");
    } catch (error) {}
    fs.writeFileSync("secret1.txt", mnemonics1.toLocaleString());
    fs.writeFileSync("secret2.txt", mnemonics2.toLocaleString());
    let pair1 = await mnemonicToWalletKey(mnemonics1);
    let pair2 = await mnemonicToWalletKey(mnemonics2);
    const map = Dictionary.empty<any, any>();
    map.set(0, BigInt("0x" + pair1.publicKey.toString("hex")));
    map.set(1, BigInt("0x" + pair2.publicKey.toString("hex")));
    map.set(2, BigInt("0x" + "8688c35225fc60099cf1e3f939d4176518a0e2ca724df77b9281503c23ef081f"));
    let init = await TactWallet.init({ $$type: "Array", length: 3n, map } as ton_Array);

    // Load required data
    let address = contractAddress(0, init);
    let data = init.data.toBoc();
    let pkg = fs.readFileSync(path.resolve(__dirname, "output", packageName));

    // Prepareing
    console.log("Uploading package...");
    let prepare = await prepareTactDeployment({ pkg, data, testnet });

    // Deploying
    console.log("============================================================================================");
    console.log("Contract Address");
    console.log("============================================================================================");
    console.log();
    console.log(address.toString({ testOnly: testnet }));
    fs.writeFileSync("contract-address.txt", address.toString({ testOnly: testnet }));
    console.log();
    console.log("============================================================================================");
    console.log("Please, follow deployment link");
    console.log("============================================================================================");
    console.log();
    console.log(prepare);
    console.log();
    console.log("============================================================================================");
})();
