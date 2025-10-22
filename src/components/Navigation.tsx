import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Box, Trophy, History, Home, Wallet } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import WalletConnectionModal from "./WalletConnectionModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const location = useLocation();
  const { accountId, isConnected, balance, disconnect } = useWallet();
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  const formatAccountId = (id: string) => {
    return `${id.slice(0, 8)}...${id.slice(-6)}`;
  };
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/80">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-gradient-primary shadow-glow-primary">
              <Box className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              MysteryLoot
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`flex items-center gap-2 transition-colors ${
                isActive('/') ? 'text-secondary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            <Link 
              to="/marketplace" 
              className={`flex items-center gap-2 transition-colors ${
                isActive('/marketplace') ? 'text-secondary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Box className="w-4 h-4" />
              Buy Loot Boxes
            </Link>
            <Link 
              to="/rewards" 
              className={`flex items-center gap-2 transition-colors ${
                isActive('/rewards') ? 'text-secondary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Trophy className="w-4 h-4" />
              My Rewards
            </Link>
            <Link 
              to="/transactions" 
              className={`flex items-center gap-2 transition-colors ${
                isActive('/transactions') ? 'text-secondary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <History className="w-4 h-4" />
              Transactions
            </Link>
          </div>
          
          {!isConnected ? (
            <Button 
              variant="outline" 
              onClick={() => setWalletModalOpen(true)}
              className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground shadow-glow-secondary"
            >
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline"
                  className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground shadow-glow-secondary"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  {formatAccountId(accountId!)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card border-border">
                <DropdownMenuLabel>My Wallet</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="px-2 py-2 text-sm">
                  <div className="text-muted-foreground mb-1">Account ID</div>
                  <div className="font-mono text-xs">{accountId}</div>
                </div>
                <div className="px-2 py-2 text-sm">
                  <div className="text-muted-foreground mb-1">Balance</div>
                  <div className="font-bold text-secondary">{balance}</div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={disconnect}
                  className="text-destructive cursor-pointer"
                >
                  Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      
      <WalletConnectionModal 
        open={walletModalOpen} 
        onOpenChange={setWalletModalOpen} 
      />
    </nav>
  );
};

export default Navigation;
