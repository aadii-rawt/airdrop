import { ed25519 } from '@noble/curves/ed25519.js'
import { useWallet } from '@solana/wallet-adapter-react'
import React, { useState } from 'react'
import bs58 from "bs58";

const SignMsg = () => {
    const [message, setMessage] = useState("")
    const { publicKey, signMessage } = useWallet()

    const handleSignMessage = async () => {
        if (!publicKey) throw new Error('Wallet not connected!');
        if (!signMessage) throw new Error('Wallet does not support message signing!');

        const encodedMsg = new TextEncoder().encode(message);
        const signature = await signMessage(encodedMsg)

        if (!ed25519.verify(signature, encodedMsg, publicKey.toBytes())) {
            throw new Error('Message signature invalid!');
        }
        
        console.log('success', `Message signature: ${bs58.encode(signature)}`);
    }

    return (
        <div className="flex items-center gap-3 my-10 max-w-lg justify-center mx-auto">
            <div className="border border-gray-300/20 px-5 py-8 rounded flex-1">
                <h1 className="text-xl font-bold mt-3">Sign Message</h1>
                <p className="text-gray-400 text-sm">Airdrop only working for Devnet RPC</p>
                <div className="my-5 ">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full text-white border border-gray-500 focus-within:outline-white focus-within:outline-1 rounded px-3 py-1.5"
                        placeholder="Enter airdrop amount (SOL)"
                    />

                    <button
                        // disabled={!wallet.publicKey}
                        onClick={handleSignMessage}
                        className={`bg-white w-full mt-5 text-black px-5 py-2 rounded cursor-pointer`}
                    >
                        Sign Message
                    </button>
                </div>

            </div>
        </div>
    )
}

export default SignMsg