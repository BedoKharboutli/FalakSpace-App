import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Camera, 
  ChevronLeft, 
  ChevronRight, 
  AlertCircle,
  ExternalLink,
  Flag,
  Calendar
} from 'lucide-react';
import { fetchAstronauts } from '@/lib/api';
import { Astronaut, LoadingState } from '@/types/nasa';

const AstronautGallery: React.FC = () => {
  const [astronauts, setAstronauts] = useState<Astronaut[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>({
    loading: true,
    error: null,
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesPerView, setImagesPerView] = useState(4);

  useEffect(() => {
    const loadAstronauts = async () => {
      try {
        setLoadingState({ loading: true, error: null });
        
        // Using the same mock data from AstronautList for consistency
        const mockAstronauts: Astronaut[] = [
          {
            id: 1,
            name: "Neil Armstrong",
            status: { id: 1, name: "Deceased" },
            type: { id: 1, name: "Government" },
            in_space: false,
            time_in_space: "P8DT14H12M30S",
            eva_time: "P0DT2H31M40S",
            age: null,
            date_of_birth: "1930-08-05",
            date_of_death: "2012-08-25",
            nationality: "American",
            bio: "First person to walk on the Moon during Apollo 11 mission in 1969.",
            twitter: null,
            instagram: null,
            wiki: "https://en.wikipedia.org/wiki/Neil_Armstrong",
            agency: {
              id: 1,
              url: "https://www.nasa.gov/",
              name: "National Aeronautics and Space Administration",
              featured: true,
              type: "Government",
              country_code: "USA",
              abbrev: "NASA",
              description: "NASA is an independent agency of the U.S. federal government responsible for the civilian space program.",
              administrator: "Bill Nelson",
              founding_year: "1958",
              launchers: "Space Shuttle, SLS",
              spacecraft: "Apollo, Space Shuttle, Orion",
              parent: null,
              image_url: "https://ll.thespacedevs.com/2.2.0/media/agency_images/national2520aeronautics2520and2520space2520administration_image_20190207032448.jpeg"
            },
            profile_image: "https://ll.thespacedevs.com/2.2.0/media/astronaut_images/neil2520armstrong_image_20181128235841.jpg",
            profile_image_thumbnail: "https://ll.thespacedevs.com/2.2.0/media/astronaut_images/neil2520armstrong_image_20181128235841.jpg",
            flights_count: 2,
            landings_count: 2,
            spacewalks_count: 1,
            last_flight: "1969-07-16",
            first_flight: "1966-03-16"
          },
          {
            id: 2,
            name: "Yuri Gagarin",
            status: { id: 1, name: "Deceased" },
            type: { id: 1, name: "Government" },
            in_space: false,
            time_in_space: "P0DT1H48M0S",
            eva_time: "P0DT0H0M0S",
            age: null,
            date_of_birth: "1934-03-09",
            date_of_death: "1968-03-27",
            nationality: "Soviet",
            bio: "First human to journey into outer space.",
            twitter: null,
            instagram: null,
            wiki: "https://en.wikipedia.org/wiki/Yuri_Gagarin",
            agency: {
              id: 2,
              url: "https://www.roscosmos.ru/",
              name: "Russian Federal Space Agency (ROSCOSMOS)",
              featured: true,
              type: "Government",
              country_code: "RUS",
              abbrev: "ROSCOSMOS",
              description: "The Roscosmos State Corporation for Space Activities.",
              administrator: "Yury Borisov",
              founding_year: "1992",
              launchers: "Soyuz, Proton",
              spacecraft: "Soyuz, Progress",
              parent: null,
              image_url: "https://ll.thespacedevs.com/2.2.0/media/agency_images/russian2520federal2520space2520agency25202528roscosmos2529_image_20190207032459.png"
            },
            profile_image: "https://ll.thespacedevs.com/2.2.0/media/astronaut_images/yuri2520gagarin_image_20181106200059.jpg",
            profile_image_thumbnail: "https://ll.thespacedevs.com/2.2.0/media/astronaut_images/yuri2520gagarin_image_20181106200059.jpg",
            flights_count: 1,
            landings_count: 1,
            spacewalks_count: 0,
            last_flight: "1961-04-12",
            first_flight: "1961-04-12"
          },
          {
            id: 3,
            name: "Mae Jemison",
            status: { id: 2, name: "Retired" },
            type: { id: 1, name: "Government" },
            in_space: false,
            time_in_space: "P7DT22H30M23S",
            eva_time: "P0DT0H0M0S",
            age: 67,
            date_of_birth: "1956-10-17",
            date_of_death: null,
            nationality: "American",
            bio: "First African-American woman to travel into space.",
            twitter: null,
            instagram: null,
            wiki: "https://en.wikipedia.org/wiki/Mae_Jemison",
            agency: {
              id: 1,
              url: "https://www.nasa.gov/",
              name: "National Aeronautics and Space Administration",
              featured: true,
              type: "Government",
              country_code: "USA",
              abbrev: "NASA",
              description: "NASA is an independent agency of the U.S. federal government responsible for the civilian space program.",
              administrator: "Bill Nelson",
              founding_year: "1958",
              launchers: "Space Shuttle, SLS",
              spacecraft: "Apollo, Space Shuttle, Orion",
              parent: null,
              image_url: "https://ll.thespacedevs.com/2.2.0/media/agency_images/national2520aeronautics2520and2520space2520administration_image_20190207032448.jpeg"
            },
            profile_image: "https://ll.thespacedevs.com/2.2.0/media/astronaut_images/mae2520jemison_image_20181129000502.jpg",
            profile_image_thumbnail: "https://ll.thespacedevs.com/2.2.0/media/astronaut_images/mae2520jemison_image_20181129000502.jpg",
            flights_count: 1,
            landings_count: 1,
            spacewalks_count: 0,
            last_flight: "1992-09-12",
            first_flight: "1992-09-12"
          },
          {
            id: 4,
            name: "Chris Hadfield",
            status: { id: 2, name: "Retired" },
            type: { id: 1, name: "Government" },
            in_space: false,
            time_in_space: "P166DT6H42M10S",
            eva_time: "P0DT14H54M18S",
            age: 64,
            date_of_birth: "1959-08-29",
            date_of_death: null,
            nationality: "Canadian",
            bio: "First Canadian to perform a spacewalk and commander of the ISS.",
            twitter: "@Cmdr_Hadfield",
            instagram: null,
            wiki: "https://en.wikipedia.org/wiki/Chris_Hadfield",
            agency: {
              id: 3,
              url: "https://www.asc-csa.gc.ca/",
              name: "Canadian Space Agency",
              featured: true,
              type: "Government",
              country_code: "CAN",
              abbrev: "CSA",
              description: "The Canadian Space Agency is the national space agency of Canada.",
              administrator: "Lisa Campbell",
              founding_year: "1989",
              launchers: "",
              spacecraft: "",
              parent: null,
              image_url: "https://ll.thespacedevs.com/2.2.0/media/agency_images/canadian2520space2520agency_image_20190207032440.jpeg"
            },
            profile_image: "https://ll.thespacedevs.com/2.2.0/media/astronaut_images/chris2520hadfield_image_20181129001503.jpg",
            profile_image_thumbnail: "https://ll.thespacedevs.com/2.2.0/media/astronaut_images/chris2520hadfield_image_20181129001503.jpg",
            flights_count: 3,
            landings_count: 3,
            spacewalks_count: 2,
            last_flight: "2012-12-19",
            first_flight: "1995-11-12"
          },
          {
            id: 5,
            name: "Samantha Cristoforetti",
            status: { id: 3, name: "Active" },
            type: { id: 1, name: "Government" },
            in_space: false,
            time_in_space: "P371DT6H56M4S",
            eva_time: "P0DT7H5M0S",
            age: 47,
            date_of_birth: "1977-04-26",
            date_of_death: null,
            nationality: "Italian",
            bio: "Holds the record for the longest uninterrupted spaceflight by a European astronaut.",
            twitter: "@AstroSamantha",
            instagram: "@astrosamantha",
            wiki: "https://en.wikipedia.org/wiki/Samantha_Cristoforetti",
            agency: {
              id: 4,
              url: "https://www.esa.int/",
              name: "European Space Agency",
              featured: true,
              type: "Multinational",
              country_code: "EUR",
              abbrev: "ESA",
              description: "The European Space Agency is an intergovernmental organisation of 22 member states dedicated to the exploration of space.",
              administrator: "Josef Aschbacher",
              founding_year: "1975",
              launchers: "Ariane 5, Ariane 6",
              spacecraft: "ATV, Orion ESM",
              parent: null,
              image_url: "https://ll.thespacedevs.com/2.2.0/media/agency_images/european2520space2520agency_image_20190207032443.jpeg"
            },
            profile_image: "https://ll.thespacedevs.com/2.2.0/media/astronaut_images/samantha2520cristoforetti_image_20181129003532.jpg",
            profile_image_thumbnail: "https://ll.thespacedevs.com/2.2.0/media/astronaut_images/samantha2520cristoforetti_image_20181129003532.jpg",
            flights_count: 2,
            landings_count: 2,
            spacewalks_count: 1,
            last_flight: "2022-04-27",
            first_flight: "2014-11-23"
          },
          {
            id: 6,
            name: "Tim Peake",
            status: { id: 2, name: "Retired" },
            type: { id: 1, name: "Government" },
            in_space: false,
            time_in_space: "P185DT22H11M15S",
            eva_time: "P0DT4H43M0S",
            age: 52,
            date_of_birth: "1972-04-07",
            date_of_death: null,
            nationality: "British",
            bio: "First British ESA astronaut to visit the International Space Station.",
            twitter: "@astro_timpeake",
            instagram: null,
            wiki: "https://en.wikipedia.org/wiki/Tim_Peake",
            agency: {
              id: 4,
              url: "https://www.esa.int/",
              name: "European Space Agency",
              featured: true,
              type: "Multinational",
              country_code: "EUR",
              abbrev: "ESA",
              description: "The European Space Agency is an intergovernmental organisation of 22 member states dedicated to the exploration of space.",
              administrator: "Josef Aschbacher",
              founding_year: "1975",
              launchers: "Ariane 5, Ariane 6",
              spacecraft: "ATV, Orion ESM",
              parent: null,
              image_url: "https://ll.thespacedevs.com/2.2.0/media/agency_images/european2520space2520agency_image_20190207032443.jpeg"
            },
            profile_image: "https://ll.thespacedevs.com/2.2.0/media/astronaut_images/timothy2520peake_image_20181129005406.jpg",
            profile_image_thumbnail: "https://ll.thespacedevs.com/2.2.0/media/astronaut_images/timothy2520peake_image_20181129005406.jpg",
            flights_count: 1,
            landings_count: 1,
            spacewalks_count: 1,
            last_flight: "2015-12-15",
            first_flight: "2015-12-15"
          },
          // Additional astronauts for gallery
          {
            id: 7,
            name: "Peggy Whitson",
            status: { id: 2, name: "Retired" },
            type: { id: 1, name: "Government" },
            in_space: false,
            time_in_space: "P665DT22H22M28S",
            eva_time: "P0DT60H21M0S",
            age: 64,
            date_of_birth: "1960-02-09",
            date_of_death: null,
            nationality: "American",
            bio: "Former NASA astronaut and biochemistry researcher, holds multiple spacewalk records.",
            twitter: null,
            instagram: null,
            wiki: "https://en.wikipedia.org/wiki/Peggy_Whitson",
            agency: {
              id: 1,
              url: "https://www.nasa.gov/",
              name: "National Aeronautics and Space Administration",
              featured: true,
              type: "Government",
              country_code: "USA",
              abbrev: "NASA",
              description: "NASA is an independent agency of the U.S. federal government responsible for the civilian space program.",
              administrator: "Bill Nelson",
              founding_year: "1958",
              launchers: "Space Shuttle, SLS",
              spacecraft: "Apollo, Space Shuttle, Orion",
              parent: null,
              image_url: "https://ll.thespacedevs.com/2.2.0/media/agency_images/national2520aeronautics2520and2520space2520administration_image_20190207032448.jpeg"
            },
            profile_image: "https://ll.thespacedevs.com/2.2.0/media/astronaut_images/peggy2520whitson_image_20181129005812.jpg",
            profile_image_thumbnail: "https://ll.thespacedevs.com/2.2.0/media/astronaut_images/peggy2520whitson_image_20181129005812.jpg",
            flights_count: 3,
            landings_count: 3,
            spacewalks_count: 10,
            last_flight: "2017-09-03",
            first_flight: "2002-06-05"
          },
          {
            id: 8,
            name: "Scott Kelly",
            status: { id: 2, name: "Retired" },
            type: { id: 1, name: "Government" },
            in_space: false,
            time_in_space: "P520DT10H33M8S",
            eva_time: "P0DT18H30M0S",
            age: 60,
            date_of_birth: "1964-02-21",
            date_of_death: null,
            nationality: "American",
            bio: "Former NASA astronaut who participated in the year-long mission aboard the International Space Station.",
            twitter: "@StationCDRKelly",
            instagram: null,
            wiki: "https://en.wikipedia.org/wiki/Scott_Kelly_(astronaut)",
            agency: {
              id: 1,
              url: "https://www.nasa.gov/",
              name: "National Aeronautics and Space Administration",
              featured: true,
              type: "Government",
              country_code: "USA",
              abbrev: "NASA",
              description: "NASA is an independent agency of the U.S. federal government responsible for the civilian space program.",
              administrator: "Bill Nelson",
              founding_year: "1958",
              launchers: "Space Shuttle, SLS",
              spacecraft: "Apollo, Space Shuttle, Orion",
              parent: null,
              image_url: "https://ll.thespacedevs.com/2.2.0/media/agency_images/national2520aeronautics2520and2520space2520administration_image_20190207032448.jpeg"
            },
            profile_image: "https://ll.thespacedevs.com/2.2.0/media/astronaut_images/scott2520kelly_image_20181129004648.jpg",
            profile_image_thumbnail: "https://ll.thespacedevs.com/2.2.0/media/astronaut_images/scott2520kelly_image_20181129004648.jpg",
            flights_count: 4,
            landings_count: 4,
            spacewalks_count: 3,
            last_flight: "2015-03-27",
            first_flight: "1999-05-27"
          }
        ];

        // Filter astronauts with profile images
        const astronautsWithImages = mockAstronauts.filter(a => a.profile_image);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setAstronauts(astronautsWithImages);
        setLoadingState({ loading: false, error: null });
      } catch (error) {
        console.error('Failed to fetch astronaut gallery:', error);
        setLoadingState({
          loading: false,
          error: 'Failed to load astronaut gallery. Please try again later.',
        });
      }
    };

    loadAstronauts();
  }, []);

  useEffect(() => {
    const updateImagesPerView = () => {
      if (window.innerWidth >= 1024) {
        setImagesPerView(4);
      } else if (window.innerWidth >= 768) {
        setImagesPerView(3);
      } else if (window.innerWidth >= 640) {
        setImagesPerView(2);
      } else {
        setImagesPerView(1);
      }
    };

    updateImagesPerView();
    window.addEventListener('resize', updateImagesPerView);
    
    return () => window.removeEventListener('resize', updateImagesPerView);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + imagesPerView >= astronauts.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, astronauts.length - imagesPerView) : prev - 1
    );
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).getFullYear().toString();
  };

  if (loadingState.loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-6">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-48" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="glass-card border-white/10">
              <CardContent className="p-4">
                <Skeleton className="aspect-square w-full rounded-lg mb-3" />
                <Skeleton className="h-5 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-1" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (loadingState.error) {
    return (
      <Alert className="border-red-500/30 bg-red-500/10">
        <AlertCircle className="h-4 w-4 text-red-400" />
        <AlertDescription className="text-red-400">
          {loadingState.error}
        </AlertDescription>
      </Alert>
    );
  }

  const visibleAstronauts = astronauts.slice(currentIndex, currentIndex + imagesPerView);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="cosmic-glow rounded-full p-2 bg-primary/20">
            <Camera className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl font-orbitron font-bold nebula-text">
            Astronaut Gallery
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="border-primary/30 hover:bg-primary/10"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            {currentIndex + 1}-{Math.min(currentIndex + imagesPerView, astronauts.length)} of {astronauts.length}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            disabled={currentIndex + imagesPerView >= astronauts.length}
            className="border-primary/30 hover:bg-primary/10"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleAstronauts.map((astronaut, index) => (
          <Card
            key={astronaut.id}
            className="glass-card border-white/10 hover:border-primary/30 transition-all duration-300 group overflow-hidden"
            style={{
              animationDelay: `${index * 0.1}s`,
              animation: 'scale-in 0.4s ease-out forwards',
              opacity: 0,
              transform: 'scale(0.95)',
            }}
          >
            <CardContent className="p-0">
              <div className="relative overflow-hidden">
                <img
                  src={astronaut.profile_image!}
                  alt={astronaut.name}
                  className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                                      onError={(e) => {
                      // Use a data URI SVG as fallback - guaranteed to work
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg width='300' height='300' viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='300' height='300' fill='%23111827'/%3E%3Ccircle cx='150' cy='120' r='60' fill='%23374151' stroke='%23d1d5db' stroke-width='3'/%3E%3Ccircle cx='150' cy='120' r='40' fill='%23000' opacity='0.3'/%3E%3Crect x='120' y='180' width='60' height='80' rx='30' fill='%23f3f4f6' stroke='%239ca3af' stroke-width='2'/%3E%3Ccircle cx='140' cy='210' r='10' fill='%232563eb'/%3E%3Ctext x='140' y='215' text-anchor='middle' fill='white' font-size='8'%3ENASA%3C/text%3E%3Ctext x='150' y='280' text-anchor='middle' fill='white' font-size='12'%3EAstronaut%3C/text%3E%3C/svg%3E";
                      e.currentTarget.alt = 'Astronaut placeholder';
                    }}
                  />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {astronaut.wiki && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 h-8 w-8 p-0 bg-black/50 hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={() => window.open(astronaut.wiki!, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 text-white" />
                  </Button>
                )}
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-primary group-hover:text-primary/80 transition-colors line-clamp-1">
                  {astronaut.name}
                </h3>
                
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Flag className="h-3 w-3" />
                  <span>{astronaut.nationality}</span>
                </div>

                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>Born {formatDate(astronaut.date_of_birth)}</span>
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {astronaut.bio}
                </p>

                <div className="text-xs text-primary/70">
                  {astronaut.agency.abbrev}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Auto-advance indicator */}
      <div className="flex justify-center space-x-2 mt-6">
        {Array.from({ length: Math.ceil(astronauts.length / imagesPerView) }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i * imagesPerView)}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              Math.floor(currentIndex / imagesPerView) === i
                ? 'bg-primary w-6'
                : 'bg-primary/30 hover:bg-primary/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AstronautGallery;

