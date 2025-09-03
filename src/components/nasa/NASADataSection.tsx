import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Rocket, Sparkles } from 'lucide-react';
import MissionList from './MissionList';
import AstronautList from './AstronautList';
import AstronautGallery from './AstronautGallery';

const NASADataSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`min-h-screen bg-gradient-to-b from-black via-space-gray/20 to-black py-16 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="cosmic-glow rounded-full p-3 bg-primary/20">
              <Rocket className="h-8 w-8 text-primary animate-float" />
            </div>
            <h1 className="text-4xl md:text-5xl font-orbitron font-bold nebula-text">
              Space Exploration Data
            </h1>
            <div className="cosmic-glow rounded-full p-3 bg-primary/20">
              <Sparkles className="h-8 w-8 text-primary animate-float-delayed" />
            </div>
          </div>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover the latest NASA missions, meet the brave astronauts who venture into the cosmos, 
            and explore the ongoing efforts to understand our universe through cutting-edge space exploration.
          </p>
        </div>

        {/* NASA Missions Section */}
        <div 
          className={`mb-20 transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <Card className="glass-card border-white/10 bg-black/20 backdrop-blur-lg">
            <CardContent className="p-8">
              <MissionList />
            </CardContent>
          </Card>
        </div>

        <Separator className="my-16 bg-primary/20" />

        {/* Astronaut Gallery Section */}
        <div 
          className={`mb-20 transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <Card className="glass-card border-white/10 bg-black/20 backdrop-blur-lg">
            <CardContent className="p-8">
              <AstronautGallery />
            </CardContent>
          </Card>
        </div>

        <Separator className="my-16 bg-primary/20" />

        {/* Astronaut List Section */}
        <div 
          className={`transition-all duration-1000 delay-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <Card className="glass-card border-white/10 bg-black/20 backdrop-blur-lg">
            <CardContent className="p-8">
              <AstronautList />
            </CardContent>
          </Card>
        </div>

        {/* Footer Section */}
        <div 
          className={`text-center mt-16 transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="glass-card border-white/10 bg-black/20 backdrop-blur-lg p-8 rounded-lg">
            <h3 className="text-xl font-orbitron font-semibold text-primary mb-4">
              Data Sources
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div className="space-y-2">
                <h4 className="font-semibold text-white">NASA TechPort API</h4>
                <p>Mission data and project information from NASA's official technology portfolio database.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-white">The Space Devs Launch Library</h4>
                <p>Comprehensive astronaut database with detailed career information and profile images.</p>
              </div>
            </div>
            <p className="text-xs text-primary/60 mt-6">
              Data is fetched in real-time from official space agency APIs. Some information may be cached for performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NASADataSection;
