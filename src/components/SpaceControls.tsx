import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Home, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Navigation,
  Rocket,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { planetData } from '../data/planetData';

interface SpaceControlsProps {
  onBackToOverview: () => void;
  onFocusPlanet: (planetId: string) => void;
  selectedPlanet?: string | null;
  isTransitioning?: boolean;
}

const SpaceControls: React.FC<SpaceControlsProps> = ({
  onBackToOverview,
  onFocusPlanet,
  selectedPlanet,
  isTransitioning = false
}) => {
  return (
    <>
      {/* Main Navigation Controls */}
      <div className="absolute top-4 left-4 space-y-4">
        <Card className="glass-card border-white/20">
          <CardContent className="p-3">
            <div className="space-y-2">
              <Button
                onClick={onBackToOverview}
                disabled={isTransitioning}
                size="sm"
                className="w-full justify-start cosmic-glow"
              >
                <Home className="h-4 w-4 mr-2" />
                Solar System View
              </Button>
              
              {selectedPlanet && (
                <Button
                  onClick={onBackToOverview}
                  disabled={isTransitioning}
                  variant=""
                  size="sm"
                  className="w-full justify-start border-primary/30 hover:bg-primary/10"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Back to Overview
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Planet Quick Access */}
        <Card className="glass-card border-white/20">
          <CardContent className="p-3">
            <h3 className="text-xs font-semibold mb-2 text-primary flex items-center">
              <Rocket className="h-3 w-3 mr-1" />
              Quick Planet Access
            </h3>
            <div className="grid grid-cols-2 gap-1">
              {planetData.slice(0, 8).map((planet) => (
                <Button
                  key={planet.id}
                  onClick={() => {
                    console.log('Quick Planet Access button clicked for:', planet.name);
                    onFocusPlanet(planet.id);
                  }}
                  disabled={isTransitioning}
                  variant={selectedPlanet === planet.id ? "default" : "ghost"}
                  size="sm"
                  className="text-xs p-1 h-auto"
                >
                  {planet.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Movement Controls - Mobile/Touch Friendly */}
      <div className="absolute bottom-20 right-4 md:hidden">
        <Card className="glass-card border-white/20">
          <CardContent className="p-2">
            <div className="grid grid-cols-3 gap-1">
              <div></div>
              <Button 
                size="sm" 
                variant="ghost"
                className="touch-control"
                onTouchStart={() => {
                  const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
                  window.dispatchEvent(event);
                }}
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
              <div></div>
              
              <Button 
                size="sm" 
                variant="ghost"
                className="touch-control"
                onTouchStart={() => {
                  const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
                  window.dispatchEvent(event);
                }}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost"
                className="touch-control"
                onTouchStart={() => {
                  const event = new KeyboardEvent('keydown', { key: 'Home' });
                  window.dispatchEvent(event);
                }}
              >
                <Home className="h-3 w-3" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost"
                className="touch-control"
                onTouchStart={() => {
                  const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
                  window.dispatchEvent(event);
                }}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
              
              <div></div>
              <Button 
                size="sm" 
                variant="ghost"
                className="touch-control"
                onTouchStart={() => {
                  const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
                  window.dispatchEvent(event);
                }}
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
              <div></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Indicator */}
      {isTransitioning && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Card className="glass-card border-white/20">
            <CardContent className="p-4 text-center">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />
                <span className="text-sm text-muted-foreground">Navigating through space...</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default SpaceControls;