import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Box, Sparkles, Trophy } from "lucide-react";
import { toast } from "sonner";

interface LootBoxOpenModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lootBoxName: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

const rewards = {
  common: [
    { name: "Bronze Coin", icon: "💰", rarity: "common" },
    { name: "Basic Potion", icon: "🧪", rarity: "common" },
    { name: "Leather Boots", icon: "👢", rarity: "common" },
  ],
  rare: [
    { name: "Silver Sword", icon: "⚔️", rarity: "rare" },
    { name: "Magic Scroll", icon: "📜", rarity: "rare" },
    { name: "Crystal Amulet", icon: "💎", rarity: "rare" },
  ],
  epic: [
    { name: "Epic Shield", icon: "🛡️", rarity: "epic" },
    { name: "Mystic Staff", icon: "🪄", rarity: "epic" },
    { name: "Dragon Scale", icon: "🐉", rarity: "epic" },
  ],
  legendary: [
    { name: "Legendary Sword", icon: "⚡", rarity: "legendary" },
    { name: "Phoenix Feather", icon: "🔥", rarity: "legendary" },
    { name: "Celestial Crown", icon: "👑", rarity: "legendary" },
  ],
};

const rarityColors = {
  common: "text-common border-common",
  rare: "text-rare border-rare",
  epic: "text-epic border-epic",
  legendary: "text-legendary border-legendary",
};

const LootBoxOpenModal = ({ open, onOpenChange, lootBoxName, rarity }: LootBoxOpenModalProps) => {
  const [isOpening, setIsOpening] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [reward, setReward] = useState<any>(null);

  useEffect(() => {
    if (open) {
      setIsOpening(false);
      setRevealed(false);
      setReward(null);
    }
  }, [open]);

  const handleOpen = () => {
    setIsOpening(true);
    
    // Simulate opening animation
    setTimeout(() => {
      const rewardPool = rewards[rarity];
      const randomReward = rewardPool[Math.floor(Math.random() * rewardPool.length)];
      setReward(randomReward);
      setRevealed(true);
      setIsOpening(false);
      
      toast.success("Reward Revealed!", {
        description: `You received: ${randomReward.name}`,
      });
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {lootBoxName}
          </DialogTitle>
          <DialogDescription className="text-center">
            {!revealed ? "Click to open your mystery box!" : "Congratulations on your reward!"}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-6 py-8">
          {!revealed ? (
            <>
              <div className={`relative ${isOpening ? "animate-reveal" : "animate-float"}`}>
                <Box 
                  className={`w-32 h-32 ${rarityColors[rarity].split(' ')[0]} ${
                    rarity === "legendary" ? "animate-glow-pulse" : ""
                  }`} 
                />
                {isOpening && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-16 h-16 text-secondary animate-spin" />
                  </div>
                )}
              </div>
              
              {!isOpening && (
                <Button
                  onClick={handleOpen}
                  size="lg"
                  className="bg-gradient-primary hover:brightness-110 shadow-glow-primary"
                >
                  Open Loot Box
                </Button>
              )}
              
              {isOpening && (
                <p className="text-muted-foreground animate-pulse">
                  Opening your mystery box...
                </p>
              )}
            </>
          ) : (
            <>
              <div className="relative animate-reveal">
                <div className={`p-8 rounded-2xl border-4 ${rarityColors[reward.rarity]} bg-gradient-to-br from-background to-card shadow-glow-primary`}>
                  <div className="text-8xl mb-4 text-center">{reward.icon}</div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1 uppercase">
                      {reward.rarity}
                    </p>
                    <h3 className="text-2xl font-bold">{reward.name}</h3>
                  </div>
                </div>
                <Trophy className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 text-legendary animate-bounce" />
              </div>
              
              <p className="text-muted-foreground text-center">
                Your reward has been added to your inventory!
              </p>
              
              <Button
                onClick={() => onOpenChange(false)}
                variant="outline"
                className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
              >
                Close
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LootBoxOpenModal;
