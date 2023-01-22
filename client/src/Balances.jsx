import React from 'react'
import server from "./server";

export default function Balances({balance1, balance2, balance3, setBalance1, setBalance2, setBalance3}){

    let addresses = [
        "ae98537c67eaa7216388e6813c765c791e070cc2",
        "0c0e5004a12e66fc7818b3537d0a74b5fee089f5",
        "c9e4ef01088b55bb53c0a4a9d7352c0e9eb08edd"
    ]
    
    async function getBalance1(){
        const {data: {balance}} = await server.get(`balance/${addresses[0]}`)
        setBalance1(balance)
    }
    async function getBalance2(){
        const {data: {balance}} = await server.get(`balance/${addresses[1]}`)
        setBalance2(balance)
    }
    async function getBalance3(){
        const {data: {balance}} = await server.get(`balance/${addresses[2]}`)
        setBalance3(balance)     
    }

    
    return (
        <div className="container wallet">
            <h1>Address / Balance</h1>
            <div className='addresses bold'>
                <div>Address: {addresses[0]}</div>
                <div>Balance: {balance1}</div>
            </div>
            <button className='button-29' onClick={getBalance1}>Update Balance</button> 

            <div className='addresses bold'>
                <div>Address: {addresses[1]}</div>
                <div>Balance: {balance2}</div>
            </div>
            <button className='button-29' onClick={getBalance2}>Update Balance</button> 
            
            <div className='addresses bold'>
                <div>Address: {addresses[2]}</div>
                <div>Balance: {balance3}</div>
            </div>
            <button className='button-29' onClick={getBalance3}>Update Balance</button> 
        </div>
  )
}
