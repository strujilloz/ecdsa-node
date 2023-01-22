@Santiago
* Implementation of a client that sends hashed transaction to a server using the SECP256
* the client only sends the signature and hashed message to the server, without sharing the private key to the server

There are only 3 private keys with funds:

# PRIVATE KEYS/BALANCE
# 330763508381ed0e797a95e0be1f8df3eeb80a6d58b419c03a5de24959fded4d
# address: ae98537c67eaa7216388e6813c765c791e070cc2
# 150 tokens

# e099159d54955ec0f04d65b2fab583283c4a0b83f6de7f987724331fccd77cca
# address: 0c0e5004a12e66fc7818b3537d0a74b5fee089f5
# 100 tokens

# cd79ec5b3613e0a347b86a1b455f91375abe37d2dbe01157ce926f39a300e1bb
# address: c9e4ef01088b55bb53c0a4a9d7352c0e9eb08edd
# 75 tokens

only the client knowing the private key can sign/send the transaction to other address

## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions
For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.
