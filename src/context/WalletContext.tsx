import { useState } from "react";
import { createContext } from "react";

const walletContext = createContext(null)

export const WalletProvider = ({ children }) => {
    const [wallet, setWalelt] = useState("")
    return <walletContext.Provider value={{
        wallet
    }} >
        {children}
    </walletContext.Provider>
}

// const useContext = () => {
//     return const first = useContext(createContext)
// }