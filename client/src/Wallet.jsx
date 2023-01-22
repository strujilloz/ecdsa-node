import {toHex, utf8ToBytes} from"ethereum-cryptography/utils"
import * as secp from "ethereum-cryptography/secp256k1";
import {keccak256} from "ethereum-cryptography/keccak"
import server from "./server";


function Wallet({ address, setAddress, balance, setBalance, setPrivateKey, setPublicKey, publicKey}) {
  
  /*
    * getAddress() recovers the publicKey from the privateKey that the user put in the input "Your private key"
    * set the state public key
    * set the state address (how to get the address from the public key?)-->
    *    1. remove the first byte of the publicKey array
    *    2. Hash the publicKey (without the first byte)
    *    3. take the last 20bytes of the hash, thats the address
    *    4. parse to hexadecimal to make it more readable
  */
  async function getAddress(privateKey){
    try{
      const pubKeyArr = (secp.getPublicKey(privateKey))
      setPublicKey(toHex(pubKeyArr))
      address = keccak256(pubKeyArr.slice(1)).slice(-20)
      setAddress(toHex(address))
    }
    catch(error){
      console.log("ERROR WALLET.JSX:",error)
    }
  }

  /*
    *onChange() takes the value of the privateKey that the users type in the <input>
    *sets the value of the privateKey to the state
    *if the value has 64 characters -->
    *   call getAddress() to recover the publicKey
    *   send a get request to the server to get the balance of this address
    *   set the balance state with the balance sent from the server 
    *ELSE --> set everything to 0
  */
  async function onChange(evt) {
    const privKey = evt.target.value;
    setPrivateKey(privKey);
    if (privKey.length === 64) {
      await getAddress(privKey)
      const {data: {balance}} = await server.get(`balance/${toHex(address)}`);
      setBalance(balance);
    } else {
      setPublicKey(0)
      setAddress(0)
      setBalance(0);
    }
  }

  return (
    <div className="container">
      
        <h1>Your Wallet</h1>
        <label>
          Your private Key
          <input placeholder="Type your private key" onChange={onChange}></input>
        </label>
        <div className="balance">Your public Key: {publicKey}</div>
        <div className="bold">Your address : {address}</div>
        <div className="balance">Your balance: {balance}</div>
      
    </div>
  );
}

export default Wallet;
