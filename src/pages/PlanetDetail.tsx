import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Heart, Save, Globe, Thermometer, Clock, Mountain } from 'lucide-react';
import Navigation from '@/components/Navigation';
import planetEarth from '@/assets/planet-earth.jpg';
import planetMars from '@/assets/planet-mars.jpg';
import planetJupiter from '@/assets/planet-jupiter.jpg';

const PlanetDetail = () => {
  const { planetId } = useParams();
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false);
  const [userNotes, setUserNotes] = useState('');
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  // Mock planet data - in real app, this would come from NASA API
  const planetData: Record<string, any> = {
    earth: {
      id: 'earth',
      name: 'Earth',
      image: planetEarth,
      type: 'Terrestrial Planet',
      description: 'Earth is the third planet from the Sun and the only astronomical object known to harbor life. Earth\'s surface is 71% water and 29% land. The atmosphere is 78% nitrogen and 21% oxygen, with trace amounts of other gases.',
      facts: {
        diameter: '12,742 km',
        mass: '5.97 × 10²⁴ kg',
        distanceFromSun: '149.6 million km (1 AU)',
        orbitalPeriod: '365.25 days',
        rotationPeriod: '23h 56m 4s',
        temperature: '-89°C to 58°C',
        moons: '1 (Luna)',
        atmosphere: 'Nitrogen (78%), Oxygen (21%)',
      },
      funFacts: [
        'Earth is the only known planet with life',
        'The deepest part of Earth\'s ocean is the Mariana Trench at 11,034 m deep',
        'Earth\'s magnetic field protects us from solar radiation',
        'A day on Earth is getting longer by about 1.7 milliseconds per century',
      ],
      composition: ['Iron Core', 'Mantle', 'Crust', 'Hydrosphere', 'Atmosphere'],
    },
    mars: {
      id: 'mars',
      name: 'Mars',
      image: planetMars,
      type: 'Terrestrial Planet',
      description: 'Mars is the fourth planet from the Sun and is known as the "Red Planet" due to iron oxide (rust) on its surface. It has the largest volcano in the solar system, Olympus Mons, and evidence suggests it once had liquid water.',
      facts: {
        diameter: '6,779 km',
        mass: '6.39 × 10²³ kg',
        distanceFromSun: '227.9 million km (1.52 AU)',
        orbitalPeriod: '687 Earth days',
        rotationPeriod: '24h 37m',
        temperature: '-87°C to -5°C',
        moons: '2 (Phobos, Deimos)',
        atmosphere: 'Carbon Dioxide (95%), Nitrogen (3%)',
      },
      funFacts: [
        'A day on Mars is about 24 hours and 37 minutes',
        'Mars has the largest dust storms in the solar system',
        'The red color comes from iron oxide (rust) in the soil',
        'Mars has polar ice caps made of water and carbon dioxide ice',
      ],
      composition: ['Iron Core', 'Rocky Mantle', 'Basaltic Crust', 'Thin Atmosphere'],
    },
    jupiter: {
      id: 'jupiter',
      name: 'Jupiter',
      image: planetJupiter,
      type: 'Gas Giant',
      description: 'Jupiter is the largest planet in our solar system and is composed mainly of hydrogen and helium. Its Great Red Spot is a giant storm that has been raging for hundreds of years. Jupiter acts as a cosmic vacuum cleaner, protecting inner planets from asteroids.',
      facts: {
        diameter: '139,820 km',
        mass: '1.90 × 10²⁷ kg',
        distanceFromSun: '778.5 million km (5.20 AU)',
        orbitalPeriod: '11.86 Earth years',
        rotationPeriod: '9h 56m',
        temperature: '-108°C (cloud tops)',
        moons: '95+ (Io, Europa, Ganymede, Callisto)',
        atmosphere: 'Hydrogen (89%), Helium (10%)',
      },
      funFacts: [
        'Jupiter is more massive than all other planets combined',
        'The Great Red Spot is a storm larger than Earth',
        'Jupiter has a faint ring system',
        'Jupiter could fit 1,321 Earths inside it',
      ],
      composition: ['Hydrogen Core', 'Metallic Hydrogen', 'Liquid Hydrogen', 'Gas Atmosphere'],
    },
  };

  const planet = planetData[planetId || ''];

  if (!planet) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-orbitron mb-4">Planet Not Found</h1>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSaveNotes = async () => {
    setIsSavingNotes(true);
    // Simulate saving notes
    setTimeout(() => {
      setIsSavingNotes(false);
      console.log('Notes saved:', userNotes);
    }, 1000);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${planet.image})` }}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
        
        <div className="relative z-10 container mx-auto px-4 h-full flex items-end pb-12">
          <div className="space-y-4">
            <Link 
              to="/" 
              className="inline-flex items-center text-white/80 hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Exploration
            </Link>
            
            <div className="space-y-2">
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                {planet.type}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-white nebula-text">
                {planet.name}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="font-orbitron">About {planet.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {planet.description}
                </p>
              </CardContent>
            </Card>

            {/* Physical Characteristics */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="font-orbitron flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-primary" />
                  Physical Characteristics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(planet.facts).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <p className="text-sm text-muted-foreground uppercase tracking-wide">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </p>
                      <p className="text-lg font-medium text-primary">
                        {value as string}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Fun Facts */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="font-orbitron flex items-center">
                  <Mountain className="h-5 w-5 mr-2 text-primary" />
                  Fascinating Facts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {planet.funFacts.map((fact: string, index: number) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <p className="text-muted-foreground">{fact}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Actions */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-sm font-medium">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => setIsFavorited(!isFavorited)}
                  variant={isFavorited ? "default" : "outline"}
                  className={`w-full transition-all duration-300 ${
                    isFavorited ? 'cosmic-glow' : 'hover:bg-primary/10'
                  }`}
                >
                  <Heart className={`h-4 w-4 mr-2 ${isFavorited ? 'fill-current' : ''}`} />
                  {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
                </Button>
              </CardContent>
            </Card>

            {/* Composition */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-sm font-medium">Composition Layers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {planet.composition.map((layer: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: `hsl(${220 + index * 20} 70% 60%)` }}
                      />
                      <span className="text-sm text-muted-foreground">{layer}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* User Notes */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-sm font-medium">Personal Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Textarea
                  placeholder="Add your thoughts about this planet..."
                  value={userNotes}
                  onChange={(e) => setUserNotes(e.target.value)}
                  className="bg-background/50 border-white/20 focus:border-primary/50 min-h-[100px]"
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
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlanetDetail;