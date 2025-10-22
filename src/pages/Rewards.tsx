import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Sparkles, Sword, Shield, Gem } from "lucide-react";

const mockRewards = [
  {
    id: 1,
    name: "Legendary Sword",
    rarity: "legendary",
    type: "Weapon",
    icon: Sword,
    obtained: "2024-01-15",
  },
  {
    id: 2,
    name: "Epic Shield",
    rarity: "epic",
    type: "Armor",
    icon: Shield,
    obtained: "2024-01-14",
  },
  {
    id: 3,
    name: "Rare Gem",
    rarity: "rare",
    type: "Material",
    icon: Gem,
    obtained: "2024-01-13",
  },
  {
    id: 4,
    name: "Mystic Amulet",
    rarity: "epic",
    type: "Accessory",
    icon: Sparkles,
    obtained: "2024-01-12",
  },
];

const rarityColors = {
  common: "text-common border-common",
  rare: "text-rare border-rare",
  epic: "text-epic border-epic",
  legendary: "text-legendary border-legendary",
};

const Rewards = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <Trophy className="w-16 h-16 text-legendary animate-glow-pulse" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            My Rewards
          </h1>
          <p className="text-xl text-muted-foreground">
            Your collection of NFT rewards from opened loot boxes
          </p>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">Total Rewards</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">24</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm border-legendary/50">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">Legendary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-legendary">3</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm border-epic/50">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">Epic</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-epic">7</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm border-rare/50">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">Rare</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-rare">14</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockRewards.map((reward) => {
            const Icon = reward.icon;
            const colorClass = rarityColors[reward.rarity as keyof typeof rarityColors];
            
            return (
              <Card 
                key={reward.id} 
                className={`bg-card/50 backdrop-blur-sm border-2 ${colorClass} hover:scale-105 transition-all duration-300 group overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <CardHeader className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className={`${colorClass} bg-transparent`}>
                      {reward.rarity.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{reward.type}</span>
                  </div>
                  <CardTitle className="flex items-center gap-2">
                    {reward.name}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="relative">
                  <div className="w-full h-48 rounded-lg bg-gradient-to-br from-background to-card flex items-center justify-center mb-4">
                    <Icon className={`w-20 h-20 ${colorClass.split(' ')[0]} ${reward.rarity === "legendary" ? "animate-glow-pulse" : ""}`} />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Obtained: {reward.obtained}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Empty State Message */}
        {mockRewards.length === 0 && (
          <div className="text-center py-20">
            <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">No Rewards Yet</h3>
            <p className="text-muted-foreground mb-6">
              Purchase and open loot boxes to start collecting NFT rewards
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rewards;
