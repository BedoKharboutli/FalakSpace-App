import React, { useState, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import NASADataSection from '@/components/nasa/NASADataSection';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Rocket, Sparkles, Loader2 } from 'lucide-react';

// Lazy load the 3D components to handle potential errors gracefully
const SpaceScene = React.lazy(() => 
  import('@/components/SpaceScene').catch(() => {
    // Fallback if 3D components fail to load
    return { default: () => <FallbackScene /> };
  })
);

const FallbackScene = () => (
  <div className="min-h-screen bg-cosmic-gradient flex items-center justify-center">
    <div className="text-center space-y-6 max-w-lg mx-auto px-4">
      <h1 className="text-4xl md:text-6xl font-orbitron font-bold nebula-text">
        Cosmic Explorer
      </h1>
      <p className="text-lg text-white/80">
        Your space exploration platform is loading...
      </p>
      <Card className="glass-card border-white/20 p-6">
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <span>Initializing 3D Space Environment</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Navigate through space • Explore planets • Discover the cosmos
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
);

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [favoritePlanets, setFavoritePlanets] = useState<string[]>([]);

  const handlePlanetSelect = (planetId: string | null) => {
    setSelectedPlanet(planetId);
    if (planetId) {
      toast({
        title: "Planet Selected",
        description: `Exploring ${planetId}. Use ESC to return to overview.`,
      });
    }
  };

  const handleToggleFavorite = (planetId: string) => {
    setFavoritePlanets(prev => {
      const isAlreadyFavorited = prev.includes(planetId);
      const newFavorites = isAlreadyFavorited
        ? prev.filter(id => id !== planetId)
        : [...prev, planetId];
      
      toast({
        title: isAlreadyFavorited ? "Removed from Favorites" : "Added to Favorites",
        description: `${planetId} has been ${isAlreadyFavorited ? 'removed from' : 'added to'} your favorites.`,
      });
      
      return newFavorites;
    });
  };

  return (
    <div className="min-h-screen bg-black">
      
      <Navigation />
      
      {/* 3D Space Scene with Error Boundary */}
      <Suspense fallback={<FallbackScene />}>
        <SpaceScene
          onPlanetSelect={handlePlanetSelect}
          selectedPlanet={selectedPlanet}
          favoritePlanets={favoritePlanets}
          onToggleFavorite={handleToggleFavorite}
        />
      </Suspense>

      {/* NASA Data Section - appears when user scrolls down */}
      <NASADataSection />
      
    </div>
  );
};

export default Index;
