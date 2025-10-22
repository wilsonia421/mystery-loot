import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Box, Sparkles } from "lucide-react";

type Rarity = "common" | "rare" | "epic" | "legendary";

interface LootBoxCardProps {
  title: string;
  rarity: Rarity;
  price: string;
  description: string;
  image?: string;
  onBuy?: () => void;
}

const rarityStyles = {
  common: {
    border: "border-common",
    shadow: "shadow-none",
    gradient: "from-common/20 to-transparent",
    badge: "bg-common/20 text-common border-common",
  },
  rare: {
    border: "border-rare",
    shadow: "shadow-[0_0_15px_rgba(59,130,246,0.3)]",
    gradient: "from-rare/20 to-transparent",
    badge: "bg-rare/20 text-rare border-rare",
  },
  epic: {
    border: "border-epic",
    shadow: "shadow-[0_0_20px_rgba(168,85,247,0.4)]",
    gradient: "from-epic/20 to-transparent",
    badge: "bg-epic/20 text-epic border-epic",
  },
  legendary: {
    border: "border-legendary",
    shadow: "shadow-glow-legendary",
    gradient: "from-legendary/20 to-transparent",
    badge: "bg-legendary/20 text-legendary border-legendary",
  },
};

const LootBoxCard = ({ title, rarity, price, description, onBuy }: LootBoxCardProps) => {
  const styles = rarityStyles[rarity];
  
  return (
    <Card className={`${styles.border} ${styles.shadow} bg-card/50 backdrop-blur-sm hover:scale-105 transition-all duration-300 overflow-hidden group`}>
      <div className={`absolute inset-0 bg-gradient-to-b ${styles.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
      
      <CardHeader className="relative">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className={styles.badge}>
            {rarity.toUpperCase()}
          </Badge>
          {rarity === "legendary" && (
            <Sparkles className="w-5 h-5 text-legendary animate-glow-pulse" />
          )}
        </div>
        <CardTitle className="flex items-center gap-2">
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="relative">
        <div className={`w-full h-48 rounded-lg bg-gradient-to-br ${styles.gradient} flex items-center justify-center mb-4 ${rarity === "legendary" ? "animate-float" : ""}`}>
          <Box className={`w-24 h-24 ${rarity === "legendary" ? "text-legendary" : "text-primary"} animate-glow-pulse`} />
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      
      <CardFooter className="relative flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Price</p>
          <p className="text-xl font-bold text-secondary">{price}</p>
        </div>
        <Button 
          onClick={onBuy}
          className="bg-gradient-primary hover:brightness-110 transition-all shadow-glow-primary"
        >
          Buy Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LootBoxCard;
