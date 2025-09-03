import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Eye, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlanetCardProps {
  id: string;
  name: string;
  image: string;
  description: string;
  distanceFromSun?: string;
  diameter?: string;
  isFavorited?: boolean;
  onFavoriteToggle?: (id: string) => void;
  onViewDetails?: (id: string) => void;
  className?: string;
}

const PlanetCard: React.FC<PlanetCardProps> = ({
  id,
  name,
  image,
  description,
  distanceFromSun,
  diameter,
  isFavorited = false,
  onFavoriteToggle,
  onViewDetails,
  className
}) => {
  return (
    <Card className={cn(
      "group cursor-pointer glass-card hover:cosmic-glow transition-all duration-500 overflow-hidden",
      "hover:scale-[1.02] hover:-translate-y-2",
      className
    )}>
      <CardContent className="p-0">
        {/* Planet Image */}
        <div className="relative overflow-hidden aspect-square">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteToggle?.(id);
            }}
            className={cn(
              "absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300",
              isFavorited 
                ? "bg-red-500/30 text-red-400 cosmic-glow" 
                : "bg-white/10 text-white hover:bg-white/20"
            )}
          >
            <Heart className={cn("h-4 w-4", isFavorited && "fill-current")} />
          </button>

          {/* Planet Name Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-xl font-orbitron font-bold text-white mb-1 nebula-text">
              {name}
            </h3>
          </div>
        </div>

        {/* Planet Details */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {description}
          </p>

          {/* Stats */}
          {(distanceFromSun || diameter) && (
            <div className="grid grid-cols-2 gap-4">
              {distanceFromSun && (
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    Distance
                  </p>
                  <p className="text-sm font-medium text-primary">
                    {distanceFromSun}
                  </p>
                </div>
              )}
              {diameter && (
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    Diameter
                  </p>
                  <p className="text-sm font-medium text-primary">
                    {diameter}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* View Details Button */}
          <Button 
            onClick={() => onViewDetails?.(id)}
            className="w-full group/btn transition-all duration-300 hover:cosmic-glow"
            size="sm"
          >
            <Eye className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform duration-300" />
            Explore Planet
            <Globe className="h-4 w-4 ml-2 group-hover/btn:rotate-12 transition-transform duration-300" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanetCard;