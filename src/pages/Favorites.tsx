import React from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Star, Trash2, LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { planetData } from '@/data/planetData';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const { toast } = useToast();
  const { getFavorites, removeFavorite, isAuthenticated } = useAuth();
  const favoritedPlanets = getFavorites();

  const handleRemoveFavorite = (planetId: string) => {
    removeFavorite(planetId);
    toast({
      title: "Removed from Favorites",
      description: "Planet has been removed from your favorites",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen">
        <Navigation />
        
        <div className="min-h-screen bg-cosmic-gradient flex items-center justify-center">
          <div className="text-center space-y-6 max-w-md mx-auto px-4">
            <div className="w-24 h-24 mx-auto mb-8 bg-muted/20 rounded-full flex items-center justify-center cosmic-glow">
              <LogIn className="h-12 w-12 text-primary" />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-3xl font-orbitron font-bold nebula-text">Login Required</h1>
              <p className="text-muted-foreground">
                Please log in to view and manage your favorite planets.
              </p>
            </div>
            
            <div className="flex space-x-4 justify-center">
              <Link to="/login">
                <Button className="cosmic-glow">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" className="border-primary/30">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-orbitron font-bold nebula-text mb-4">Your Favorites</h1>
          <p className="text-muted-foreground">
            ❤️ {favoritedPlanets.length} planets favorited
          </p>
        </div>

        {favoritedPlanets.length === 0 ? (
          <div className="text-center space-y-6 max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-8 bg-muted/20 rounded-full flex items-center justify-center cosmic-glow">
              <Heart className="h-12 w-12 text-red-400" />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-orbitron font-bold">No Favorites Yet</h2>
              <p className="text-muted-foreground">
                Start exploring planets and add them to your favorites!
              </p>
            </div>
            
            <Button onClick={() => window.location.href = '/'} className="cosmic-glow">
              <Star className="h-4 w-4 mr-2" />
              Explore Solar System
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoritedPlanets.map((planetId) => {
              const planet = planetData.find(p => p.id === planetId);
              if (!planet) return null;
              
              return (
                <Card key={planetId} className="glass-card hover:cosmic-glow transition-all duration-300">
                  <CardHeader className="flex-row items-start justify-between space-y-0 pb-3">
                    <div>
                      <CardTitle className="font-orbitron text-lg">{planet.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{planet.type}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveFavorite(planetId)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {planet.description}
                    </p>
                    <div className="flex space-x-2">
                      <Link to={`/planet/${planetId}`} className="flex-1">
                        <Button size="sm" className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;