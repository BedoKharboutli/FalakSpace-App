import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Star, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Favorites = () => {
  const { toast } = useToast();
  const [favoritedPlanets] = useState(['earth', 'mars', 'jupiter']);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="min-h-screen bg-cosmic-gradient flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <div className="w-24 h-24 mx-auto mb-8 bg-muted/20 rounded-full flex items-center justify-center cosmic-glow">
            <Heart className="h-12 w-12 text-red-400 fill-current" />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-3xl font-orbitron font-bold nebula-text">Your Favorites</h1>
            <p className="text-muted-foreground">
              Your favorite planets will appear here in an interactive 3D space view!
            </p>
            <p className="text-sm text-primary">
              ❤️ {favoritedPlanets.length} planets favorited
            </p>
          </div>
          
          <Button onClick={() => window.location.href = '/'} className="cosmic-glow">
            <Star className="h-4 w-4 mr-2" />
            Explore Solar System
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Favorites;