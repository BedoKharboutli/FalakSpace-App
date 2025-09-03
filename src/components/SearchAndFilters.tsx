import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedFilters: string[];
  onFilterChange: (filters: string[]) => void;
}

const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchTerm,
  onSearchChange,
  selectedFilters,
  onFilterChange,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterOptions = [
    { id: 'terrestrial', label: 'Terrestrial Planets' },
    { id: 'gas-giant', label: 'Gas Giants' },
    { id: 'inner-solar', label: 'Inner Solar System' },
    { id: 'outer-solar', label: 'Outer Solar System' },
    { id: 'has-moons', label: 'Has Moons' },
    { id: 'habitable-zone', label: 'Habitable Zone' },
  ];

  const toggleFilter = (filterId: string) => {
    const newFilters = selectedFilters.includes(filterId)
      ? selectedFilters.filter(f => f !== filterId)
      : [...selectedFilters, filterId];
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    onFilterChange([]);
  };

  return (
    <Card className="glass-card border-white/10">
      <CardContent className="p-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search planets, moons, and celestial bodies..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-background/50 border-white/20 focus:border-primary/50 transition-all duration-300"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <DropdownMenu open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-primary/30 hover:bg-primary/10 hover:cosmic-glow"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters ({selectedFilters.length})
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="glass-card border-white/20 min-w-[200px]"
              align="start"
            >
              {filterOptions.map((option) => (
                <DropdownMenuItem
                  key={option.id}
                  onClick={() => toggleFilter(option.id)}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-primary/10 focus:bg-primary/10"
                >
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                    selectedFilters.includes(option.id)
                      ? 'bg-primary border-primary'
                      : 'border-muted-foreground'
                  }`}>
                    {selectedFilters.includes(option.id) && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-sm">{option.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Active Filters */}
          {selectedFilters.length > 0 && (
            <>
              <div className="flex flex-wrap gap-2">
                {selectedFilters.map((filterId) => {
                  const filter = filterOptions.find(f => f.id === filterId);
                  return (
                    <Badge
                      key={filterId}
                      variant="secondary"
                      className="bg-primary/20 text-primary hover:bg-primary/30 transition-colors duration-200 cursor-pointer"
                      onClick={() => toggleFilter(filterId)}
                    >
                      {filter?.label}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  );
                })}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Clear all
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchAndFilters;