// import { useTonConnect } from "./useTonConnect";
import { Address, SendMode, beginCell, toNano } from 'ton-core';
import { contractAddress } from '../utils/addresses';
import { SendParameters, TactWallet, TokenTransfer, storeSendParameters, storeTokenTransfer } from '../utils/sample_TactWallet';
import { TonClient4 } from 'ton';
import { Buffer } from 'buffer';
const client4 = new TonClient4({
  endpoint: 'https://sandbox-v4.tonhubapi.com'
});

export async function send_ext_message(wallet: any, valid_until: bigint, params: SendParameters | TokenTransfer, provider: any) {
  let parameters_b = beginCell();
  if (params.$$type === 'TokenTransfer') {
    storeTokenTransfer(params)(parameters_b);
  } else {
    storeSendParameters(params)(parameters_b);
  }
  let seqno = await wallet.getSeqno();
  let cell = beginCell().storeUint(seqno, 32).storeUint(valid_until, 32).storeRef(parameters_b.endCell()).endCell();
  const hash = cell.hash();
  const signature = await provider.send('ton_rawSign', {
    data: hash.toString('hex')
  });

  return wallet.sendExternal({
    $$type: 'ExtMessage',
    signature: Buffer.from(signature, 'hex'),
    seqno,
    valid_until,
    message_parameters: params
  });
}

export const useSendToken = () => {
  const sendToken = async (provider: any, recipient: string, amount: number) => {
    if (!provider) return;
    let wallet = client4.open(TactWallet.fromAddress(Address.parse(contractAddress)));
    let params: SendParameters = {
      $$type: 'SendParameters',
      to: Address.parse(recipient),
      body: beginCell().endCell(),
      value: toNano(amount),
      bounce: false,
      mode: BigInt(SendMode.PAY_GAS_SEPARATELY),
      code: null,
      data: null
    };

    const valid_until = BigInt((await client4.getLastBlock()).now + 20);

    await send_ext_message(wallet, valid_until, params, provider);
  };

  return { sendToken };
};
