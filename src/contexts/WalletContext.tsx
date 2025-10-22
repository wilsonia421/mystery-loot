import React, { createContext, useContext, useState, useEffect } from 'react';

interface WalletContextType {
  accountId: string | null;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  connectManually: (accountId: string) => void;
  balance: string;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accountId, setAccountId] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>("0 LOOT");

  useEffect(() => {
    // Load saved account from localStorage
    const savedAccountId = localStorage.getItem('wallet-account-id');
    const savedBalance = localStorage.getItem('wallet-balance');
    
    if (savedAccountId) {
      setAccountId(savedAccountId);
      setBalance(savedBalance || "1000 LOOT");
    }
  }, []);

  const connect = async () => {
    try {
      // HashConnect integration placeholder
      // Full HashConnect implementation requires proper pairing flow
      // For now, directing users to manual connection
      throw new Error("Please use manual connection. Full HashPack integration coming soon!");
    } catch (error) {
      console.error("Wallet connection error:", error);
      throw error;
    }
  };

  const disconnect = () => {
    setAccountId(null);
    setBalance("0 LOOT");
    localStorage.removeItem('wallet-account-id');
    localStorage.removeItem('wallet-balance');
  };

  const connectManually = (manualAccountId: string) => {
    setAccountId(manualAccountId);
    const mockBalance = "1000 LOOT";
    setBalance(mockBalance);
    localStorage.setItem('wallet-account-id', manualAccountId);
    localStorage.setItem('wallet-balance', mockBalance);
  };

  return (
    <WalletContext.Provider
      value={{
        accountId,
        isConnected: !!accountId,
        connect,
        disconnect,
        connectManually,
        balance,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};
