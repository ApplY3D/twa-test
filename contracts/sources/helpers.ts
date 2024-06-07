import { Address, Cell, beginCell } from "ton";
import { sign } from "ton-crypto";
import { SendParameters, storeSendParameters, TokenTransfer, storeTokenTransfer } from "./output/sample_TactWallet";

export function fill_send_parameters(
    to: Address,
    value: bigint,
    body: Cell,
    mode: bigint = 1n,
    bounce: boolean = true,
    code: Cell | null = null,
    data: Cell | null = null
): SendParameters {
    return { $$type: "SendParameters", to, value, body, mode, bounce, code, data };
}

export function jetton_send_parameters(data: {
    queryId: bigint;
    amount: bigint;
    destination: Address;
    response_destination: Address;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Cell;
}): TokenTransfer {
    return { $$type: "TokenTransfer", ...data };
}

export async function send_ext_message(
    wallet: any,
    secretKey: Buffer,
    valid_until: bigint,
    params: SendParameters | TokenTransfer
) {
    let parameters_b = beginCell();
    if (params.$$type === "TokenTransfer") {
        storeTokenTransfer(params)(parameters_b);
    } else {
        storeSendParameters(params)(parameters_b);
    }
    let seqno = await wallet.getSeqno();
    let cell = beginCell().storeUint(seqno, 32).storeUint(valid_until, 32).storeRef(parameters_b.endCell()).endCell();
    const hash = cell.hash();
    wallet.sendExternal({
        $$type: "ExtMessage",
        signature: sign(hash, secretKey),
        seqno,
        valid_until,
        message_parameters: params,
    });
}
