import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import React, { useEffect, useState } from 'react'

const Balance = () => {
     const wallet = useWallet()
        const { connection } = useConnection()
        const [balance, setBalance] = useState()
        useEffect(() => {
            const getBalance = async () => {
                if (wallet.publicKey) {
                const balance = await connection.getBalance(wallet.publicKey)
                setBalance(balance / LAMPORTS_PER_SOL)
                }
            }
            getBalance()
        }, [wallet])

    return (
        <h1 className={`${balance && balance > 0 ? "text-green-500" : "text-red-500"} text-lg`}>{balance}</h1>
    )
}

export default Balance