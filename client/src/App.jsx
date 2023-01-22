import Wallet from "./Wallet";
import Transfer from "./Transfer";
import Balances from "./Balances";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivatekey] = useState("")
  const [publicKey, setPublicKey] = useState("")
  const [balance1, setBalance1] = useState("")
  const [balance2, setBalance2] = useState("")
  const [balance3, setBalance3] = useState("")

  return (
    <div className="app">
      <Wallet
        publicKey={publicKey}
        setPublicKey={setPublicKey}
        balance={balance}
        privateKey={privateKey}
        setPrivateKey={setPrivatekey}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      />
      <Transfer setBalance={setBalance} privateKey={privateKey} setPrivateKey={setPrivatekey} />
      <Balances balance1={balance1} balance2={balance2} balance3={balance3} setBalance1={setBalance1} setBalance2={setBalance2} setBalance3={setBalance3}/>
    </div>
  );
}

export default App;
