import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Box, Shield, Sparkles, TrendingUp } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-block mb-6 animate-float">
            <div className="p-4 rounded-2xl bg-gradient-primary shadow-glow-primary">
              <Box className="w-16 h-16 text-primary-foreground" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
            MysteryLoot
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A decentralized NFT mystery box platform powered by Hedera blockchain.
            Buy, open, and discover rare digital rewards.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/marketplace">
              <Button size="lg" className="bg-gradient-primary hover:brightness-110 shadow-glow-primary text-lg px-8">
                Explore Marketplace
              </Button>
            </Link>
            <Link to="/rewards">
              <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground text-lg px-8">
                View My Rewards
              </Button>
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border">
              <div className="text-3xl font-bold text-secondary mb-2">10,000+</div>
              <div className="text-muted-foreground">Loot Boxes Opened</div>
            </div>
            <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border">
              <div className="text-3xl font-bold text-secondary mb-2">5,000+</div>
              <div className="text-muted-foreground">Active Players</div>
            </div>
            <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border">
              <div className="text-3xl font-bold text-secondary mb-2">$2M+</div>
              <div className="text-muted-foreground">Total Volume</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4 border-t border-border/50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Why MysteryLoot?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary transition-colors group">
              <div className="mb-4 p-3 rounded-lg bg-primary/20 w-fit">
                <Shield className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Verified on Hedera</h3>
              <p className="text-muted-foreground">
                All transactions are transparent and verifiable on the Hedera network using Mirror Node APIs.
              </p>
            </div>
            
            <div className="p-8 rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:border-secondary transition-colors group">
              <div className="mb-4 p-3 rounded-lg bg-secondary/20 w-fit">
                <Sparkles className="w-8 h-8 text-secondary group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Fair Random Rewards</h3>
              <p className="text-muted-foreground">
                Powered by smart contracts ensuring provably fair reward distribution for every loot box.
              </p>
            </div>
            
            <div className="p-8 rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:border-epic transition-colors group">
              <div className="mb-4 p-3 rounded-lg bg-epic/20 w-fit">
                <TrendingUp className="w-8 h-8 text-epic group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-bold mb-3">True NFT Ownership</h3>
              <p className="text-muted-foreground">
                Your rewards are real NFTs stored on Hedera, tradeable and owned by you forever.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 border-t border-border/50">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto p-12 rounded-2xl bg-gradient-cyber border border-primary/50 shadow-glow-primary">
            <h2 className="text-4xl font-bold mb-4">Ready to Start?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Connect your HashPack wallet and start discovering rare NFT rewards today.
            </p>
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-glow-secondary text-lg px-8">
              Connect HashPack Wallet
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
