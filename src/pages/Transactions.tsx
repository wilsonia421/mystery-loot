import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, CheckCircle, Clock } from "lucide-react";

const mockTransactions = [
  {
    id: 1,
    type: "Purchase",
    item: "Legendary Dragon Box",
    amount: "500 LOOT",
    status: "completed",
    txHash: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    timestamp: "2024-01-15 14:30:22",
  },
  {
    id: 2,
    type: "Open Box",
    item: "Legendary Dragon Box",
    reward: "Legendary Sword",
    status: "completed",
    txHash: "0x893e46Dd7536C1532936b4c945Cd9e8706g1cFc",
    timestamp: "2024-01-15 14:32:15",
  },
  {
    id: 3,
    type: "Purchase",
    item: "Epic Diamond Box",
    amount: "150 LOOT",
    status: "pending",
    txHash: "0x9a4f57Ee8647D2643047c5d056De9f9817h2dGd",
    timestamp: "2024-01-15 15:10:05",
  },
  {
    id: 4,
    type: "Purchase",
    item: "Rare Gold Box",
    amount: "50 LOOT",
    status: "completed",
    txHash: "0xab5g68Ff9758E3754158d6e167Ef0a0928i3eHe",
    timestamp: "2024-01-14 10:15:33",
  },
];

const Transactions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Transaction History
          </h1>
          <p className="text-xl text-muted-foreground">
            All your transactions verified on the Hedera blockchain
          </p>
        </div>
        
        {/* Mirror Node Info */}
        <Card className="bg-card/50 backdrop-blur-sm border-secondary/50 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-secondary">
              <CheckCircle className="w-5 h-5" />
              Verified by Hedera Mirror Node
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              All transactions are transparently recorded and verifiable on the Hedera network.
              Click on any transaction hash to view details on the Hedera Explorer.
            </p>
          </CardContent>
        </Card>
        
        {/* Transactions List */}
        <div className="space-y-4">
          {mockTransactions.map((tx) => (
            <Card 
              key={tx.id} 
              className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-colors"
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline" className="bg-primary/20 text-primary border-primary">
                        {tx.type}
                      </Badge>
                      {tx.status === "completed" ? (
                        <Badge variant="outline" className="bg-secondary/20 text-secondary border-secondary">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Completed
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-muted/20 text-muted-foreground border-muted">
                          <Clock className="w-3 h-3 mr-1 animate-spin" />
                          Pending
                        </Badge>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-bold mb-1">{tx.item}</h3>
                    
                    {tx.reward && (
                      <p className="text-sm text-secondary mb-1">
                        Reward: {tx.reward}
                      </p>
                    )}
                    
                    {tx.amount && (
                      <p className="text-sm text-muted-foreground mb-2">
                        Amount: {tx.amount}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{tx.timestamp}</span>
                      <span>•</span>
                      <a 
                        href={`https://hashscan.io/mainnet/transaction/${tx.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-secondary transition-colors"
                      >
                        {tx.txHash.slice(0, 20)}...
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <a 
                      href={`https://hashscan.io/mainnet/transaction/${tx.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/20 text-secondary hover:bg-secondary hover:text-secondary-foreground transition-colors"
                    >
                      View on Explorer
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {mockTransactions.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold mb-2">No Transactions Yet</h3>
            <p className="text-muted-foreground">
              Your transaction history will appear here once you make your first purchase
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
