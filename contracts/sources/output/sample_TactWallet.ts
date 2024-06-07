import {
    Cell,
    Slice,
    Address,
    Builder,
    beginCell,
    ComputeError,
    TupleItem,
    TupleReader,
    Dictionary,
    contractAddress,
    ContractProvider,
    Sender,
    Contract,
    ContractABI,
    TupleBuilder,
    DictionaryValue,
} from "ton-core";

export type StateInit = {
    $$type: "StateInit";
    code: Cell;
    data: Cell;
};

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: "StateInit" as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: "StateInit" as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        },
    };
}

export type Context = {
    $$type: "Context";
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
};

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: "Context" as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: "Context" as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        },
    };
}

export type SendParameters = {
    $$type: "SendParameters";
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
};

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) {
            b_0.storeBit(true).storeRef(src.body);
        } else {
            b_0.storeBit(false);
        }
        if (src.code !== null && src.code !== undefined) {
            b_0.storeBit(true).storeRef(src.code);
        } else {
            b_0.storeBit(false);
        }
        if (src.data !== null && src.data !== undefined) {
            b_0.storeBit(true).storeRef(src.data);
        } else {
            b_0.storeBit(false);
        }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return {
        $$type: "SendParameters" as const,
        bounce: _bounce,
        to: _to,
        value: _value,
        mode: _mode,
        body: _body,
        code: _code,
        data: _data,
    };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return {
        $$type: "SendParameters" as const,
        bounce: _bounce,
        to: _to,
        value: _value,
        mode: _mode,
        body: _body,
        code: _code,
        data: _data,
    };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        },
    };
}

export type ChangeOwner = {
    $$type: "ChangeOwner";
    queryId: bigint;
    newOwner: Address;
};

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) {
        throw Error("Invalid prefix");
    }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: "ChangeOwner" as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: "ChangeOwner" as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        },
    };
}

export type ChangeOwnerOk = {
    $$type: "ChangeOwnerOk";
    queryId: bigint;
    newOwner: Address;
};

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) {
        throw Error("Invalid prefix");
    }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: "ChangeOwnerOk" as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: "ChangeOwnerOk" as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        },
    };
}

export type Deploy = {
    $$type: "Deploy";
    queryId: bigint;
};

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) {
        throw Error("Invalid prefix");
    }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: "Deploy" as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: "Deploy" as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        },
    };
}

export type DeployOk = {
    $$type: "DeployOk";
    queryId: bigint;
};

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) {
        throw Error("Invalid prefix");
    }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: "DeployOk" as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: "DeployOk" as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        },
    };
}

export type FactoryDeploy = {
    $$type: "FactoryDeploy";
    queryId: bigint;
    cashback: Address;
};

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) {
        throw Error("Invalid prefix");
    }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: "FactoryDeploy" as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: "FactoryDeploy" as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        },
    };
}

export type Array = {
    $$type: "Array";
    map: Dictionary<number, bigint>;
    length: bigint;
};

export function storeArray(src: Array) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.map, Dictionary.Keys.Uint(16), Dictionary.Values.BigInt(257));
        b_0.storeInt(src.length, 257);
    };
}

export function loadArray(slice: Slice) {
    let sc_0 = slice;
    let _map = Dictionary.load(Dictionary.Keys.Uint(16), Dictionary.Values.BigInt(257), sc_0);
    let _length = sc_0.loadIntBig(257);
    return { $$type: "Array" as const, map: _map, length: _length };
}

function loadTupleArray(source: TupleReader) {
    let _map = Dictionary.loadDirect(Dictionary.Keys.Uint(16), Dictionary.Values.BigInt(257), source.readCellOpt());
    let _length = source.readBigNumber();
    return { $$type: "Array" as const, map: _map, length: _length };
}

function storeTupleArray(source: Array) {
    let builder = new TupleBuilder();
    builder.writeCell(
        source.map.size > 0
            ? beginCell().storeDictDirect(source.map, Dictionary.Keys.Uint(16), Dictionary.Values.BigInt(257)).endCell()
            : null
    );
    builder.writeNumber(source.length);
    return builder.build();
}

function dictValueParserArray(): DictionaryValue<Array> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeArray(src)).endCell());
        },
        parse: (src) => {
            return loadArray(src.loadRef().beginParse());
        },
    };
}

export type ExtMessage = {
    $$type: "ExtMessage";
    signature: Buffer;
    seqno: bigint;
    valid_until: bigint;
    message_parameters: SendParameters;
};

export function storeExtMessage(src: ExtMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3240438462, 32);
        b_0.storeBuffer(src.signature);
        b_0.storeUint(src.seqno, 32);
        b_0.storeUint(src.valid_until, 32);
        let b_1 = new Builder();
        b_1.store(storeSendParameters(src.message_parameters));
        b_0.storeRef(b_1.endCell());
    };
}

export function loadExtMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3240438462) {
        throw Error("Invalid prefix");
    }
    let _signature = sc_0.loadBuffer(64);
    let _seqno = sc_0.loadUintBig(32);
    let _valid_until = sc_0.loadUintBig(32);
    let sc_1 = sc_0.loadRef().beginParse();
    let _message_parameters = loadSendParameters(sc_1);
    return {
        $$type: "ExtMessage" as const,
        signature: _signature,
        seqno: _seqno,
        valid_until: _valid_until,
        message_parameters: _message_parameters,
    };
}

function loadTupleExtMessage(source: TupleReader) {
    let _signature = source.readBuffer();
    let _seqno = source.readBigNumber();
    let _valid_until = source.readBigNumber();
    const _message_parameters = loadTupleSendParameters(source.readTuple());
    return {
        $$type: "ExtMessage" as const,
        signature: _signature,
        seqno: _seqno,
        valid_until: _valid_until,
        message_parameters: _message_parameters,
    };
}

function storeTupleExtMessage(source: ExtMessage) {
    let builder = new TupleBuilder();
    builder.writeBuffer(source.signature);
    builder.writeNumber(source.seqno);
    builder.writeNumber(source.valid_until);
    builder.writeTuple(storeTupleSendParameters(source.message_parameters));
    return builder.build();
}

function dictValueParserExtMessage(): DictionaryValue<ExtMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeExtMessage(src)).endCell());
        },
        parse: (src) => {
            return loadExtMessage(src.loadRef().beginParse());
        },
    };
}

export type TokenTransfer = {
    $$type: "TokenTransfer";
    queryId: bigint;
    amount: bigint;
    destination: Address;
    response_destination: Address;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Cell;
};

export function storeTokenTransfer(src: TokenTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) {
            b_0.storeBit(true).storeRef(src.custom_payload);
        } else {
            b_0.storeBit(false);
        }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) {
        throw Error("Invalid prefix");
    }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return {
        $$type: "TokenTransfer" as const,
        queryId: _queryId,
        amount: _amount,
        destination: _destination,
        response_destination: _response_destination,
        custom_payload: _custom_payload,
        forward_ton_amount: _forward_ton_amount,
        forward_payload: _forward_payload,
    };
}

function loadTupleTokenTransfer(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return {
        $$type: "TokenTransfer" as const,
        queryId: _queryId,
        amount: _amount,
        destination: _destination,
        response_destination: _response_destination,
        custom_payload: _custom_payload,
        forward_ton_amount: _forward_ton_amount,
        forward_payload: _forward_payload,
    };
}

function storeTupleTokenTransfer(source: TokenTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserTokenTransfer(): DictionaryValue<TokenTransfer> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTokenTransfer(src.loadRef().beginParse());
        },
    };
}

export type AddAddress = {
    $$type: "AddAddress";
    public_key: bigint;
};

export function storeAddAddress(src: AddAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(141837752, 32);
        b_0.storeInt(src.public_key, 257);
    };
}

export function loadAddAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 141837752) {
        throw Error("Invalid prefix");
    }
    let _public_key = sc_0.loadIntBig(257);
    return { $$type: "AddAddress" as const, public_key: _public_key };
}

function loadTupleAddAddress(source: TupleReader) {
    let _public_key = source.readBigNumber();
    return { $$type: "AddAddress" as const, public_key: _public_key };
}

function storeTupleAddAddress(source: AddAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.public_key);
    return builder.build();
}

function dictValueParserAddAddress(): DictionaryValue<AddAddress> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeAddAddress(src)).endCell());
        },
        parse: (src) => {
            return loadAddAddress(src.loadRef().beginParse());
        },
    };
}

type TactWallet_init_args = {
    $$type: "TactWallet_init_args";
    publicKeys: Array;
};

function initTactWallet_init_args(src: TactWallet_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.store(storeArray(src.publicKeys));
    };
}

async function TactWallet_init(publicKeys: Array) {
    const __code = Cell.fromBase64(
        "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"
    );
    const __system = Cell.fromBase64(
        "te6cckECJQEABf4AAQHAAQEFoMNXAgEU/wD0pBP0vPLICwMCASAKBAKK8ts8VQTbPDDI+EMBzH8BygBVQFBUINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WEssfQBMC9ACBAQHPAMsfye1UIwUCfHAh10nCH5UwINcLH96CEMElKr66jyXTHwGCEMElKr668uCBgwjXGNMf0x/UAdDbPDcQehB5EHhVBWwa4DBwCQYDvCjIyx9SgMsfVHdlVHdlJ8hVYNs8yQHMyfkAcHCTUw65jpBUf+DbPFRj4PkQk1t/Ld6k6DAxOoElaVAK8vSBdyxRjboY8vSBLwH4I1AHuxby9PgACqQQNkUaREPbPH8IBx8AZoEbIyLCAPL0gUuFIcL/8vQggV3GA7kS8vSAEAGBAQFBM/QOb6GUAdcAMJJbbeIgbvLQgAC4UGfKAFAEINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WEoEBAc8AgQEBzwAhbrOVfwHKAMyUcDLKAOIhbrOVfwHKAMyUcDLKAOIhbrOVfwHKAMyUcDLKAOIAktIA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAIEBAdcA0gABkdSSbQHi0gABkdSSbQHi0gABkdSSbQHiVWACAUgZCwIBIBQMAgEgEw0CAUgSDgIBIBAPAHWs3caGrS4MzmdF5eotrIqI70nJTmcuiw3OiOoKCkss7gxqb0kMbgoozOnMaW2shw6sLMoKau3qSC5wQAIRrmJtnm2eNijAIxEAAiIAEbCvu1E0NIAAYADdu70YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwIFXAG4BnY5TOWDquRyWyw4JwnZdOWrNOy3M6DpZtlGbopIJw8ud/q+aF6CzkWq0KuwWxSoJwQM51aecV+dJQsB1hbiZHsoAgJ0FxUCEa5L7Z5tnjYowCMWAAIjAhGuju2ebZ42KMAjGAACJAL00AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRTbPPLggsj4QwHMfwHKAFVAUFQg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYSyx9AEwL0AIEBAc8Ayx/J7VQjGgS+7aLt+wGSMH/gcCHXScIflTAg1wsf3iDAACLXScEhsJJbf+AgghAIdEW4uo8fMNMfAYIQCHRFuLry4IGBAQHXAAExVUDbPAXbPFUDf+AgghCUapi2uuMCIIIQgZ2+mboiIR0bA/yPdTDTHwGCEIGdvpm68uCB0z/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEmwSEEYQNUZW2zw0UUXIWYIQMnsrSlADyx/LPwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJRDD4QgF/bds8f+DAAOMAMH8iHhwAHiDXScIfmIAg1yEwf9sx4AFQMNMfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8fx4BOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8HwHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wAgAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAEyCAKXlIqTBC/L0EoAQUjKBAQEhbpVbWfRbMJjIAc8AQTP0Q+IBpAAS+EJSUMcF8uCEAbDtRNDUAfhj0gABjjP6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdMf9ASBAQHXAFkC0x8FBFAzbBXg+CjXCwqDCbry4In0BIEBAdcAWQLRAds8JAAOcPhCQTP4I/Y46pk="
    );
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initTactWallet_init_args({ $$type: "TactWallet_init_args", publicKeys })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const TactWallet_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    6947: { message: `No items in the array!` },
    9577: { message: `Invalid Signature` },
    12033: { message: `Invalid Time` },
    17848: { message: `No items in the array to delete!` },
    19333: { message: `Index of the item cannot be negative!` },
    24006: { message: `Index is out of array bounds!` },
    30508: { message: `Invalid Seqno` },
    42469: { message: `No space in the array left for new items!` },
};

export class TactWallet implements Contract {
    static async init(publicKeys: Array) {
        return await TactWallet_init(publicKeys);
    }

    static async fromInit(publicKeys: Array) {
        const init = await TactWallet_init(publicKeys);
        const address = contractAddress(0, init);
        return new TactWallet(address, init);
    }

    static fromAddress(address: Address) {
        return new TactWallet(address);
    }

    readonly address: Address;
    readonly init?: { code: Cell; data: Cell };
    readonly abi: ContractABI = {
        errors: TactWallet_errors,
    };

    private constructor(address: Address, init?: { code: Cell; data: Cell }) {
        this.address = address;
        this.init = init;
    }

    async send(
        provider: ContractProvider,
        via: Sender,
        args: { value: bigint; bounce?: boolean | null | undefined },
        message: null | string | Slice | AddAddress | Deploy | ChangeOwner
    ) {
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (typeof message === "string") {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === "object" && message instanceof Slice) {
            body = message.asCell();
        }
        if (message && typeof message === "object" && !(message instanceof Slice) && message.$$type === "AddAddress") {
            body = beginCell().store(storeAddAddress(message)).endCell();
        }
        if (message && typeof message === "object" && !(message instanceof Slice) && message.$$type === "Deploy") {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (message && typeof message === "object" && !(message instanceof Slice) && message.$$type === "ChangeOwner") {
            body = beginCell().store(storeChangeOwner(message)).endCell();
        }
        if (body === null) {
            throw new Error("Invalid message type");
        }

        await provider.internal(via, { ...args, body: body });
    }

    async sendExternal(provider: ContractProvider, message: ExtMessage) {
        let body: Cell | null = null;
        if (message && typeof message === "object" && !(message instanceof Slice) && message.$$type === "ExtMessage") {
            body = beginCell().store(storeExtMessage(message)).endCell();
        }
        if (body === null) {
            throw new Error("Invalid message type");
        }

        await provider.external(body);
    }

    async getSeqno(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get("seqno", builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }

    async getGetPublicKeys(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get("get_public_keys", builder.build())).stack;
        let result = Dictionary.loadDirect(
            Dictionary.Keys.Uint(16),
            Dictionary.Values.BigInt(257),
            source.readCellOpt()
        );
        return result;
    }

    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get("owner", builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
}
