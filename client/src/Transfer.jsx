import { useState } from "react";
import server from "./server";
import {toHex, utf8ToBytes} from"ethereum-cryptography/utils"
import * as secp from "ethereum-cryptography/secp256k1";
import {sha256} from "ethereum-cryptography/sha256"

function Transfer({ address, setBalance, privateKey, setPrivateKey }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function signTransaction(privateKey, txHash){
    return await secp.sign(txHash,privateKey,{recovered: true})
  }

  async function transfer(evt) {
    evt.preventDefault();
      /*
        * send the signature to the server
        * send the amount to the server
        * send the recipient address to the server
        * then in the server verify if this signature matches the transaction hashed
      */
    try{
      const transactionHash = toHex(sha256(utf8ToBytes(recipient+sendAmount)))
      const [signatureArray, recoveryBit] = await signTransaction(privateKey, transactionHash)
      const signed = toHex(signatureArray)     
      const {data: { balance },} = await server.post(`send`,{
        signature: signed,
        txHash: transactionHash,
        amount: parseInt(sendAmount),
        recipient,
        recoveryBit,
      });
      setBalance(balance);
    }catch (err) {
      alert("Insufficient funds");
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input className='button-29' type="submit" value="Transfer" />
    </form>
  );
}

export default Transfer;
