const {verifyTx, hashMessage, getPublicKeyFromSignature, getAddressFromPublicKey} = require("./scripts/Cryptography")
const {toHex} = require("ethereum-cryptography/utils")
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "ae98537c67eaa7216388e6813c765c791e070cc2": 150,
  "0c0e5004a12e66fc7818b3537d0a74b5fee089f5": 100,
  "c9e4ef01088b55bb53c0a4a9d7352c0e9eb08edd": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  let pubKey="", sender="";
  const { signature, txHash, recipient, amount, recoveryBit } = req.body;
  try{
    console.log(req.body)
    pubKey = (getPublicKeyFromSignature(txHash,signature,recoveryBit))
    console.log("PUBLIC KEY:",toHex(pubKey))
  }catch(err){
    console.log("ERROR Getting Public key:",err)
  }
  
  try{
    sender = (getAddressFromPublicKey(pubKey))
    console.log("ADDRESS FROM SENDER:", sender)
    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  }catch(error){
    console.log("ERROR IN SERVER SENDING TX:",error)
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
