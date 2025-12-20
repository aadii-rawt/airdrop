import React, { FC, useEffect, useMemo, useState } from 'react';
import { ConnectionProvider, useConnection, useWallet, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';
import Airdrop from './components/Airdrop';
import { useWalletDisconnectButton, useWalletMultiButton } from '@solana/wallet-adapter-base-ui';
import Balance from './components/Balance';
import Toast from './components/Toast';
import SignMsg from './components/SignMsg';
import SentToken from './components/SentToken';
function App() {
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const wallet = useWallet()
    const { connection } = useConnection()
    const [balance, setBalance] = useState(0)
    const [showToast, setShowToast] = useState(null)

    return (
        <div className='bg-black min-h-screen '>
            <div className='max-w-4xl mx-auto bg-black text-white p-4'>
                {/* <ConnectionProvider endpoint="http://127.0.0.1:8899"> */}
                    <ConnectionProvider endpoint={import.meta.env.VITE_RPC_URL}>
                    <WalletProvider wallets={[]}>
                        <WalletModalProvider>
                            <div className='flex items-center justify-end gap-3'>
                                <Balance />
                                <WalletMultiButton style={{ background: "white", color: "black" }} />
                                <WalletDisconnectButton style={{ display: "" }} />
                            </div>

                            <Airdrop showToast={showToast} setShowToast={setShowToast} />
                            <SentToken />
                            <SignMsg />
                        </WalletModalProvider>
                    </WalletProvider>
                </ConnectionProvider>
            </div>

            {showToast && <Toast showToast={showToast} setShowToast={setShowToast} />}
        </div>
    )
}

export default App
