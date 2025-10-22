import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWallet } from "@/contexts/WalletContext";
import { Wallet, Hash } from "lucide-react";
import { toast } from "sonner";

interface WalletConnectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WalletConnectionModal = ({ open, onOpenChange }: WalletConnectionModalProps) => {
  const { connect, connectManually } = useWallet();
  const [manualAccountId, setManualAccountId] = useState("");

  const handleHashPackConnect = async () => {
    try {
      await connect();
      toast.success("Connecting to HashPack...", {
        description: "Please approve the connection in your HashPack wallet",
      });
    } catch (error) {
      toast.error("Failed to connect", {
        description: "Please make sure HashPack extension is installed",
      });
    }
  };

  const handleManualConnect = () => {
    if (!manualAccountId.trim()) {
      toast.error("Please enter a wallet address");
      return;
    }
    
    // Basic validation for Hedera account ID format (0.0.xxxxx)
    const accountIdPattern = /^0\.0\.\d+$/;
    if (!accountIdPattern.test(manualAccountId.trim())) {
      toast.error("Invalid Hedera account ID", {
        description: "Format should be: 0.0.xxxxx",
      });
      return;
    }

    connectManually(manualAccountId.trim());
    toast.success("Wallet connected!", {
      description: `Connected to ${manualAccountId}`,
    });
    onOpenChange(false);
    setManualAccountId("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Connect Wallet</DialogTitle>
          <DialogDescription>
            Connect your HashPack wallet or enter your Hedera account ID manually
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="hashpack" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="hashpack">HashPack</TabsTrigger>
            <TabsTrigger value="manual">Manual</TabsTrigger>
          </TabsList>

          <TabsContent value="hashpack" className="space-y-4">
            <div className="flex flex-col items-center gap-4 py-6">
              <div className="p-4 rounded-full bg-primary/20">
                <Wallet className="w-12 h-12 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Connect using the HashPack browser extension. Make sure you have HashPack installed.
              </p>
              <Button
                onClick={handleHashPackConnect}
                className="w-full bg-gradient-primary hover:brightness-110 shadow-glow-primary"
              >
                Connect HashPack
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="manual" className="space-y-4">
            <div className="flex flex-col items-center gap-4 py-6">
              <div className="p-4 rounded-full bg-secondary/20">
                <Hash className="w-12 h-12 text-secondary" />
              </div>
              <div className="w-full space-y-2">
                <Label htmlFor="accountId">Hedera Account ID</Label>
                <Input
                  id="accountId"
                  placeholder="0.0.123456"
                  value={manualAccountId}
                  onChange={(e) => setManualAccountId(e.target.value)}
                  className="bg-background border-border"
                />
                <p className="text-xs text-muted-foreground">
                  Enter your Hedera account ID in the format: 0.0.xxxxx
                </p>
              </div>
              <Button
                onClick={handleManualConnect}
                className="w-full bg-gradient-cyber hover:brightness-110"
              >
                Connect Manually
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default WalletConnectionModal;
