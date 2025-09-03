import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Heart, Save, Globe, Thermometer, Clock, Mountain } from 'lucide-react';
import { planetData } from '../data/planetData';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface PlanetInfoPanelProps {
  planetId: string;
  onClose: () => void;
}

const PlanetInfoPanel: React.FC<PlanetInfoPanelProps> = ({
  planetId,
  onClose,
}) => {
  const [userNotes, setUserNotes] = useState('');
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const { isFavorited, addFavorite, removeFavorite, saveNote, getNote, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const planet = planetData.find(p => p.id === planetId);
  const isPlanetFavorited = isFavorited(planetId);

  useEffect(() => {
    // Load existing note when component mounts
    setUserNotes(getNote(planetId));
  }, [planetId, getNote]);

  if (!planet) return null;

  const handleToggleFavorite = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to manage favorites",
        variant: "destructive",
      });
      return;
    }

    if (isPlanetFavorited) {
      removeFavorite(planetId);
      toast({
        title: "Removed from Favorites",
        description: `${planet.name} has been removed from your favorites`,
      });
    } else {
      addFavorite(planetId);
      toast({
        title: "Added to Favorites",
        description: `${planet.name} has been added to your favorites`,
      });
    }
  };

  const handleSaveNotes = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to save notes",
        variant: "destructive",
      });
      return;
    }

    setIsSavingNotes(true);
    
    const success = saveNote(planetId, userNotes);
    
    setTimeout(() => {
      setIsSavingNotes(false);
      if (success) {
        toast({
          title: "Notes Saved",
          description: "Your notes have been saved successfully",
        });
      } else {
        toast({
          title: "Save Failed",
          description: "Failed to save notes",
          variant: "destructive",
        });
      }
    }, 500);
  };

  return (
    <div className="absolute top-4 right-4 w-96 max-h-[90vh] animate-fade-in">
      <Card className="glass-card border-white/20 cosmic-glow">
        <CardHeader className="flex-row items-start justify-between space-y-0 pb-3">
          <div className="space-y-2">
            <Badge variant="secondary" className="bg-primary/20 text-primary">
              {planet.type}
            </Badge>
            <CardTitle className="text-2xl font-orbitron nebula-text">
              {planet.name}
            </CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <ScrollArea className="h-[70vh] pr-4">
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-sm font-semibold mb-2 text-primary">Overview</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {planet.description}
                </p>
              </div>

              {/* Quick Actions */}
              <div className="flex space-x-2">
                               <Button 
                 onClick={handleToggleFavorite}
                 
                 size="sm"
                 className={`flex-1 transition-all duration-300 ${
                   isPlanetFavorited ? 'cosmic-glow' : 'hover:bg-primary/10'
                 }`}
               >
                 <Heart className={`h-3 w-3 mr-2 ${isPlanetFavorited ? 'fill-current' : ''}`} />
                 {isPlanetFavorited ? 'Favorited' : 'Add to Favorites'}
               </Button>
              </div>

              {/* Physical Characteristics */}
              <div>
                <h3 className="text-sm font-semibold mb-3 text-primary flex items-center">
                  <Globe className="h-4 w-4 mr-2" />
                  Physical Data
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {Object.entries(planet.facts).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-1 border-b border-white/10">
                      <span className="text-xs text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </span>
                      <span className="text-xs font-medium text-primary">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Composition */}
              <div>
                <h3 className="text-sm font-semibold mb-3 text-primary">Composition Layers</h3>
                <div className="space-y-2">
                  {planet.composition.map((layer, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: `hsl(${220 + index * 20} 70% 60%)` }}
                      />
                      <span className="text-xs text-muted-foreground">{layer}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fun Facts */}
              <div>
                <h3 className="text-sm font-semibold mb-3 text-primary flex items-center">
                  <Mountain className="h-4 w-4 mr-2" />
                  Fascinating Facts
                </h3>
                <ul className="space-y-2">
                  {planet.funFacts.map((fact, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <p className="text-xs text-muted-foreground">{fact}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Personal Notes */}
              <div>
                <h3 className="text-sm font-semibold mb-3 text-primary">Personal Notes</h3>
                <div className="space-y-3">
                  <Textarea
                    placeholder="Add your thoughts about this planet..."
                    value={userNotes}
                    onChange={(e) => setUserNotes(e.target.value)}
                    className="bg-background/50 border-white/20 focus:border-primary/50 text-xs"
                    rows={3}
                  />
                  <Button 
                    onClick={handleSaveNotes}
                    disabled={isSavingNotes}
                    size="sm"
                    className="w-full"
                  >
                    {isSavingNotes ? (
                      <>
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-3 w-3 mr-2" />
                        Save Notes
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlanetInfoPanel;