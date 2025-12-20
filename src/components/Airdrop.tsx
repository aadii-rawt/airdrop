import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import React, { useEffect, useState } from "react";

const Airdrop = ({ showToast, setShowToast }) => {
    const { connection } = useConnection();
    const wallet = useWallet();
    const [amount, setAmount] = useState<number>();

    const handleAirDrop = async () => {

        if (!wallet.publicKey) {
            alert("Please connect your wallet");
            return;
        }

        try {
            const lamports = Number(amount) * 1000000000; // SOL → lamports

            const signature = await connection.requestAirdrop(
                wallet.publicKey,
                lamports
            );

            await connection.confirmTransaction(signature, "confirmed");
            setAmount(0)
            setShowToast({ msg: "Airdrop Send Succesfully", type: "sucess" })

            console.log("Airdrop successful:", signature);
        } catch (error) {
            console.error("Airdrop failed:", error);
        }
    };



    return (
        <div className="flex items-center gap-3 mt-20 max-w-lg justify-center mx-auto">
            <div className="border border-gray-300/20 px-5 py-8 rounded flex-1">
                <h1 className="text-xl font-bold mt-3">Request Airdrop</h1>
                <p className="text-gray-400 text-sm">Airdrop only working for Devnet RPC</p>
                <div className="my-5 ">
                    <input
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full text-white border border-gray-500 focus-within:outline-white focus-within:outline-1 rounded px-3 py-1.5"
                        placeholder="Enter airdrop amount (SOL)"
                    />

                    <button
                        disabled={!wallet.publicKey}
                        onClick={handleAirDrop}
                        className={`${wallet.publicKey ? "bg-white" : "bg-gray-300/50"} w-full mt-5 text-black px-5 py-2 rounded cursor-pointer`}
                    >
                        Send Airdrop
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Airdrop;
