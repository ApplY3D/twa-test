import "@stdlib/ownable";
import "@stdlib/deploy";
import "./array";

message ExtMessage {
    signature: Slice as bytes64;
    seqno: Int as uint32;
    valid_until: Int as uint32;
    message_parameters: SendParameters;
}

message(0xf8a7ea5) TokenTransfer {
    queryId: Int as uint64;
    amount: Int as coins;
    destination: Address;
    response_destination: Address;
    custom_payload: Cell?;
    forward_ton_amount: Int as coins;
    forward_payload: Slice as remaining; // Comment Text message when Transfer the jetton
}

message AddAddress {
    public_key: Int;
}

contract TactWallet with Deployable, OwnableTransferable {
    owner: Address;
    seqno: Int as uint32 = 0;
    publicKeys: Array;
    deployTime: Int as uint32;

    init(publicKeys: Array) {
        self.owner = sender();
        self.publicKeys = publicKeys;
        self.deployTime = now();
    }

    receive() {}
    receive(str: String) {}
    receive(slice: Slice) {}

    receive(msg: AddAddress) {
        self.requireOwner();
        self.publicKeys.append(msg.public_key);
    }

    external(msg: ExtMessage) {
        let hash: Int = beginCell().storeUint(msg.seqno, 32).storeUint(msg.valid_until, 32).storeRef(msg.message_parameters.toCell()).endCell().hash();

        let isValid: Bool = false;
        let index: Int = 0;
        while (index < self.publicKeys.length) {
            if(checkSignature(hash, msg.signature, self.publicKeys.getIdx(index))) {
                isValid = true;
                index = self.publicKeys.length;
            }
            index = index + 1;
        }

        require(isValid, "Invalid Signature");
        require(msg.seqno == self.seqno, "Invalid Seqno");
        require(now() <= msg.valid_until, "Invalid Time");
        acceptMessage();
        self.seqno = self.seqno + 1;
        send(msg.message_parameters);
    }

    get fun seqno(): Int {
        return self.seqno;
    }

    get fun get_public_keys(): map<Int as uint16, Int> {
        return self.publicKeys.map;
    }
}