import { useState } from "react";
import Navigation from "@/components/Navigation";
import LootBoxCard from "@/components/LootBoxCard";
import LootBoxOpenModal from "@/components/LootBoxOpenModal";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "sonner";

const lootBoxes = [
  {
    id: 1,
    title: "Starter Box",
    rarity: "common" as const,
    price: "10 LOOT",
    description: "A basic loot box with common rewards. Perfect for beginners.",
  },
  {
    id: 2,
    title: "Silver Box",
    rarity: "common" as const,
    price: "15 LOOT",
    description: "Slightly better chances for uncommon items.",
  },
  {
    id: 3,
    title: "Gold Box",
    rarity: "rare" as const,
    price: "50 LOOT",
    description: "Rare loot box with increased chances for valuable rewards.",
  },
  {
    id: 4,
    title: "Platinum Box",
    rarity: "rare" as const,
    price: "75 LOOT",
    description: "High-tier rewards await in this premium box.",
  },
  {
    id: 5,
    title: "Diamond Box",
    rarity: "epic" as const,
    price: "150 LOOT",
    description: "Epic rarity box containing powerful NFT rewards.",
  },
  {
    id: 6,
    title: "Mystic Box",
    rarity: "epic" as const,
    price: "200 LOOT",
    description: "Mysterious contents with epic-tier possibilities.",
  },
  {
    id: 7,
    title: "Dragon Box",
    rarity: "legendary" as const,
    price: "500 LOOT",
    description: "Legendary loot box with the rarest NFTs in the game.",
  },
  {
    id: 8,
    title: "Celestial Box",
    rarity: "legendary" as const,
    price: "1000 LOOT",
    description: "The ultimate mystery box. Legendary rewards guaranteed.",
  },
];

const Marketplace = () => {
  const { isConnected } = useWallet();
  const [selectedRarity, setSelectedRarity] = useState<string>("all");
  const [openModalBox, setOpenModalBox] = useState<any>(null);
  
  const handleBuy = (box: any) => {
    if (!isConnected) {
      toast.error("Wallet not connected", {
        description: "Please connect your wallet first",
      });
      return;
    }
    
    toast.success(`Purchased ${box.title}!`, {
      description: "Opening your loot box...",
    });
    
    // Open the loot box modal
    setTimeout(() => {
      setOpenModalBox(box);
    }, 500);
  };
  
  const filteredBoxes = selectedRarity === "all" 
    ? lootBoxes 
    : lootBoxes.filter(box => box.rarity === selectedRarity);
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Loot Box Marketplace
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose your mystery box and discover rare NFT rewards
          </p>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <button 
            onClick={() => setSelectedRarity("all")}
            className={`px-6 py-2 rounded-lg bg-card border transition-colors ${
              selectedRarity === "all" 
                ? "border-primary bg-primary/20 text-primary" 
                : "border-border hover:border-primary"
            }`}
          >
            All ({lootBoxes.length})
          </button>
          <button 
            onClick={() => setSelectedRarity("common")}
            className={`px-6 py-2 rounded-lg bg-card border transition-colors ${
              selectedRarity === "common" 
                ? "border-common bg-common/20 text-common" 
                : "border-border hover:border-common"
            }`}
          >
            Common ({lootBoxes.filter(b => b.rarity === "common").length})
          </button>
          <button 
            onClick={() => setSelectedRarity("rare")}
            className={`px-6 py-2 rounded-lg bg-card border transition-colors ${
              selectedRarity === "rare" 
                ? "border-rare bg-rare/20 text-rare" 
                : "border-border hover:border-rare"
            }`}
          >
            Rare ({lootBoxes.filter(b => b.rarity === "rare").length})
          </button>
          <button 
            onClick={() => setSelectedRarity("epic")}
            className={`px-6 py-2 rounded-lg bg-card border transition-colors ${
              selectedRarity === "epic" 
                ? "border-epic bg-epic/20 text-epic" 
                : "border-border hover:border-epic"
            }`}
          >
            Epic ({lootBoxes.filter(b => b.rarity === "epic").length})
          </button>
          <button 
            onClick={() => setSelectedRarity("legendary")}
            className={`px-6 py-2 rounded-lg bg-card border transition-colors ${
              selectedRarity === "legendary" 
                ? "border-legendary bg-legendary/20 text-legendary" 
                : "border-border hover:border-legendary"
            }`}
          >
            Legendary ({lootBoxes.filter(b => b.rarity === "legendary").length})
          </button>
        </div>
        
        {/* Loot Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBoxes.map((box) => (
            <LootBoxCard
              key={box.id}
              title={box.title}
              rarity={box.rarity}
              price={box.price}
              description={box.description}
              onBuy={() => handleBuy(box)}
            />
          ))}
        </div>
        
        {filteredBoxes.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              No loot boxes found for this rarity
            </p>
          </div>
        )}
      </div>
      
      {/* Loot Box Opening Modal */}
      {openModalBox && (
        <LootBoxOpenModal
          open={!!openModalBox}
          onOpenChange={(open) => !open && setOpenModalBox(null)}
          lootBoxName={openModalBox.title}
          rarity={openModalBox.rarity}
        />
      )}
    </div>
  );
};

export default Marketplace;
