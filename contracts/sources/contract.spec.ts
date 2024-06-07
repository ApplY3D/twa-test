import { beginCell, toNano } from "ton";
import { mnemonicNew, mnemonicToWalletKey } from "ton-crypto";
import { ContractSystem } from "@tact-lang/emulator";
import { TactWallet, SendParameters, Array as ton_Array } from "./output/sample_TactWallet";
import { fill_send_parameters, send_ext_message } from "./helpers";
import { inspect } from "util";
import { Dictionary } from "ton-core";

describe("contract", () => {
    it("should deploy correctly", async () => {
        let system = await ContractSystem.create();
        let creator = system.treasure("creator");
        let mnemonics = await mnemonicNew();
        let pair = await mnemonicToWalletKey(mnemonics);
        const map = Dictionary.empty<any, any>();
        map.set(0, BigInt("0x" + pair.publicKey.toString("hex")));
        let wallet = system.open(await TactWallet.fromInit({ $$type: "Array", length: 1n, map } as ton_Array));
        await wallet.send(creator, { value: toNano(10) }, "Hello");
        await system.run();
        expect(await wallet.getGetPublicKeys().then((a) => a["_map"])).toEqual(
            ({ $$type: "Array", length: 1n, map } as ton_Array).map["_map"]
        );
        expect(await wallet.getSeqno()).toEqual(0n);

        let params: SendParameters = fill_send_parameters(
            creator.address,
            toNano("0.1"),
            beginCell().storeUint(0, 32).storeStringTail("Hello Creator!").endCell()
        );
        let tracker = system.track(wallet.address);
        await send_ext_message(wallet, pair.secretKey, BigInt(system.now + 15), params);
        await system.run();
        expect(tracker.collect()).toMatchSnapshot();
        expect(await wallet.getSeqno()).toEqual(1n);
    });

    it("should work for both addresses", async () => {
        let system = await ContractSystem.create();
        let creator = system.treasure("creator");
        let mnemonics = await mnemonicNew();
        let pair1 = await mnemonicToWalletKey(mnemonics);
        let pair2 = await mnemonicToWalletKey(mnemonics);
        const map = Dictionary.empty<any, any>();
        map.set(0, BigInt("0x" + pair1.publicKey.toString("hex")));
        map.set(0, BigInt("0x" + pair2.publicKey.toString("hex")));
        let wallet = system.open(await TactWallet.fromInit({ $$type: "Array", length: 1n, map } as ton_Array));
        await wallet.send(creator, { value: toNano(10) }, "Hello");
        await system.run();
        expect(await wallet.getGetPublicKeys().then((a) => a["_map"])).toEqual(
            ({ $$type: "Array", length: 1n, map } as ton_Array).map["_map"]
        );
        expect(await wallet.getSeqno()).toEqual(0n);

        let params: SendParameters = fill_send_parameters(
            creator.address,
            toNano("0.1"),
            beginCell().storeUint(0, 32).storeStringTail("Hello Creator!").endCell()
        );
        let tracker = system.track(wallet.address);
        await send_ext_message(wallet, pair2.secretKey, BigInt(system.now + 15), params);
        await system.run();
        expect(tracker.collect()).toMatchSnapshot();
        expect(await wallet.getSeqno()).toEqual(1n);
    });
});
