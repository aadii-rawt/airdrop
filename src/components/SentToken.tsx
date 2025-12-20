import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import React, { useState } from 'react'

const SentToken = () => {

    const [walletAddress, setWalletAddress] = useState("")
    const [amount, setAmount] = useState("")
    const wallet = useWallet()
    const { connection } = useConnection()

    const sendTokens = async () => {

        const transaction = new Transaction();
        transaction.add(SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(walletAddress),
            lamports: Number(amount) * LAMPORTS_PER_SOL,
        }));

        await wallet.sendTransaction(transaction, connection);
        alert("Sent " + amount + " SOL to " + walletAddress);
    }

    return (
        <div className="flex items-center gap-3 my-10 max-w-lg justify-center mx-auto">
            <div className="border border-gray-300/20 px-5 py-8 rounded flex-1">
                <h1 className="text-xl font-bold mt-3">Send Token</h1>
                <div className="my-5 ">
                    <input
                        type="text"
                        value={walletAddress}
                        onChange={(e) => setWalletAddress(e.target.value)}
                        className="w-full text-white border border-gray-500 focus-within:outline-white focus-within:outline-1 rounded px-3 py-1.5"
                        placeholder="Enter wallet address"
                    />
                    <input
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full text-white border mt-3 border-gray-500 focus-within:outline-white focus-within:outline-1 rounded px-3 py-1.5"
                        placeholder="Enter airdrop amount (SOL)"
                    />

                    <button
                        // disabled={!wallet.publicKey}
                        onClick={sendTokens}
                        className={`bg-white w-full mt-5 text-black px-5 py-2 rounded cursor-pointer`}
                    >
                        Send Token
                    </button>
                </div>

            </div>
        </div>
    )
}

export default SentToken