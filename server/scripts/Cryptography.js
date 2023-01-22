const secp = require("ethereum-cryptography/secp256k1")
const {toHex, utf8ToBytes} = require("ethereum-cryptography/utils")
const {sha256} = require("ethereum-cryptography/sha256")
const {keccak256} = require("ethereum-cryptography/keccak")

//Generates random private key, return Uint8Array

const hashMessage = (msg)=>{
    return sha256(utf8ToBytes(msg))
}

 const getPublicKeyFromSignature = (msgHashed, signature, recoveryBit)=>{

    return (secp.recoverPublicKey(msgHashed,signature,recoveryBit))
}

const verifyTx = (msg, signature)=>{
    let publicKey = toHex(recoverPublicKey(msg, signature))
    return secp.verify(signature,hashMessage(msg),publicKey)
}

const getAddressFromPublicKey = (publicKey)=>{
    return toHex(keccak256(publicKey.slice(1)).slice(-20))
}




module.exports = {hashMessage, verifyTx, getPublicKeyFromSignature, getAddressFromPublicKey}