import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Rocket, Sparkles, ChevronLeft, ChevronRight, Linkedin, Github, Instagram, Twitter } from 'lucide-react';
import MissionList from './MissionList';
import AstronautList from './AstronautList';
import AstronautGallery from './AstronautGallery';

const NASADataSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Sample image data (you can replace with your actual images)
  const imageCards = [
    {
      id: 1,
      title: "Neil Armstrong",
      description: "First man to walk on the Moon during Apollo 11 mission.",
      image: "/images/astronauts/neilthumb.jpg"
    },
    {
      id: 2,
      title: "Space Station",
      description: "The International Space Station orbiting Earth, a hub for scientific research.",
      image: "/images/astronauts/International.jpg"
    },
    {
      id: 3,
      title: "Yuri Gagarin",
      description: "First human to journey into outer space during Vostok 1 mission.",
      image: "/images/astronauts/yuri.jpg"
    },
    {
      id: 4,
      title: "SpaceX Dragon Mission",
      description: "Commercial spacecraft transporting crew and cargo to the ISS.",
      image: "/images/astronauts/spacex.jpg"
    },
    {
      id: 5,
      title: "Mae Jemison",
      description: "First African American woman in space during STS-47 mission.",
      image: "/images/astronauts/mae.webp"
    },
    {
      id: 6,
      title: "James Webb Telescope",
      description: "Revolutionary space telescope observing the universe's earliest galaxies.",
      image: "/images/astronauts/james.jpg"
    }
  ];

  // Social media links
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/bedo-kharboutli-2172a6278/',
      icon: Linkedin,
      color: 'hover:text-blue-400'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/BedoKharboutli',
      icon: Github,
      color: 'hover:text-gray-300'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/bedo.kh/',
      icon: Instagram,
      color: 'hover:text-pink-400'
    },
    {
      name: 'X (Twitter)',
      url: 'https://twitter.com/bedokharboutli',
      icon: Twitter,
      color: 'hover:text-blue-300'
    }
  ];

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

  // Swipe functionality
  const scrollToCard = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.scrollWidth / imageCards.length;
      scrollContainerRef.current.scrollTo({
        left: cardWidth * index,
        behavior: 'smooth'
      });
      setCurrentImageIndex(index);
    }
  };

  const handlePrevious = () => {
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : imageCards.length - 1;
    scrollToCard(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentImageIndex < imageCards.length - 1 ? currentImageIndex + 1 : 0;
    scrollToCard(newIndex);
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.scrollWidth / imageCards.length;
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentImageIndex(newIndex);
    }
  };

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

        {/* Image Gallery Section */}
        <div 
          className={`mb-20 transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold nebula-text mb-4">
              Space Exploration Gallery
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore stunning images from NASA's missions and discoveries across the cosmos
            </p>
          </div>

          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 glass-card border-white/10 bg-black/40 backdrop-blur-lg p-3 rounded-full hover:bg-black/60 transition-all duration-300 group"
            >
              <ChevronLeft className="h-6 w-6 text-white group-hover:text-primary" />
            </button>
            
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 glass-card border-white/10 bg-black/40 backdrop-blur-lg p-3 rounded-full hover:bg-black/60 transition-all duration-300 group"
            >
              <ChevronRight className="h-6 w-6 text-white group-hover:text-primary" />
            </button>

            {/* Image Cards Container */}
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto scrollbar-hide space-x-6 px-4 py-8 scroll-smooth"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {imageCards.map((card, index) => (
                <Card
                  key={card.id}
                  className="flex-shrink-0 w-80 glass-card border-white/10 bg-black/20 backdrop-blur-lg hover:bg-black/30 transition-all duration-500 group cursor-pointer"
                  style={{ scrollSnapAlign: 'center' }}
                  onClick={() => scrollToCard(index)}
                >
                  <CardContent className="p-6">
                    {/* Description */}
                    <div className="mb-4">
                      <h3 className="text-xl font-orbitron font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                    
                    {/* Image */}
                    <div className="relative overflow-hidden rounded-lg bg-space-gray/20 aspect-video">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          // Fallback for missing images
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder-astronaut.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-primary/10 transition-all duration-500" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {imageCards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToCard(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? 'bg-primary scale-125'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
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

        {/* Social Media Footer */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="glass-card border-white/10 bg-black/20 backdrop-blur-lg p-8 rounded-lg">
            <h3 className="text-2xl font-orbitron font-semibold text-primary mb-6">
              Connect With Me
            </h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Follow me on social media to stay updated with my latest projects.
            </p>

            {/* Social Media Links */}
            <div className="flex justify-center space-x-8">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group p-4 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 transform hover:scale-110 ${social.color}`}
                    aria-label={`Visit my ${social.name} profile`}
                  >
                    <IconComponent className="h-8 w-8 text-white group-hover:scale-110 transition-transform duration-300" />
                  </a>
                );
              })}
            </div>

            {/* Copyright */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Space Exploration Dashboard.
                <span className="block mt-2 text-xs">
                  Built with passion.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NASADataSection;
