import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Users, 
  Flag, 
  Clock, 
  Rocket, 
  Globe, 
  AlertCircle,
  ChevronDown,
  ExternalLink
} from 'lucide-react';
import { fetchAstronauts } from '@/lib/api';
import { Astronaut, LoadingState } from '@/types/nasa';

const AstronautList: React.FC = () => {
  const [astronauts, setAstronauts] = useState<Astronaut[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>({
    loading: true,
    error: null,
  });
  const [displayCount, setDisplayCount] = useState(6);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const loadAstronauts = async () => {
      try {
        setLoadingState({ loading: true, error: null });
        
        // For demo purposes, we'll use mock data since the real API might be rate-limited
        // In production, uncomment the line below and use real API
        // const response = await fetchAstronauts(20, 0);
        
        // Mock astronaut data based on real astronauts
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
            bio: "First person to walk on the Moon during Apollo 11 mission in 1969. Naval aviator, test pilot, aerospace engineer, university professor, and naval officer.",
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
            bio: "First human to journey into outer space when his Vostok spacecraft completed one orbit of Earth on 12 April 1961.",
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
              description: "The Roscosmos State Corporation for Space Activities, commonly known as Roscosmos, is the governmental body responsible for the space science program of the Russian Federation.",
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
            bio: "First African-American woman to travel into space. She served as a mission specialist aboard the Space Shuttle Endeavour in 1992.",
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
            bio: "Canadian retired astronaut, engineer, and former Royal Canadian Air Force fighter pilot. First Canadian to perform a spacewalk and served as commander of the International Space Station.",
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
            bio: "Italian European Space Agency astronaut, former Italian Air Force pilot and engineer. Holds the record for the longest uninterrupted spaceflight by a European astronaut.",
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
            bio: "British European Space Agency astronaut, former British Army Air Corps officer, and International Space Station crew member. First British ESA astronaut to visit the International Space Station.",
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
          }
        ];

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setAstronauts(mockAstronauts);
        setTotalCount(mockAstronauts.length);
        setLoadingState({ loading: false, error: null });
      } catch (error) {
        console.error('Failed to fetch astronauts:', error);
        setLoadingState({
          loading: false,
          error: 'Failed to load astronaut data. Please try again later.',
        });
      }
    };

    loadAstronauts();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'retired':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'deceased':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    }
  };

  const formatTimeInSpace = (timeString: string) => {
    // Convert ISO 8601 duration to readable format
    const match = timeString.match(/P(\d+)DT(\d+)H(\d+)M/);
    if (match) {
      const [, days, hours, minutes] = match;
      return `${days}d ${hours}h ${minutes}m`;
    }
    return timeString;
  };

  const loadMore = () => {
    setDisplayCount(prev => Math.min(prev + 6, astronauts.length));
  };

  if (loadingState.loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-6">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-40" />
        </div>
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="glass-card border-white/10">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-32 rounded-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex space-x-4">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
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

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-8">
        <div className="cosmic-glow rounded-full p-2 bg-primary/20">
          <Users className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-2xl font-orbitron font-bold nebula-text">
          Space Explorers
        </h2>
        <Badge variant="secondary" className="ml-auto">
          {totalCount} astronauts
        </Badge>
      </div>

      <div className="space-y-4">
        {astronauts.slice(0, displayCount).map((astronaut, index) => (
          <Card
            key={astronaut.id}
            className="glass-card border-white/10 hover:border-primary/30 transition-all duration-300 group"
            style={{
              animationDelay: `${index * 0.1}s`,
              animation: 'fade-in 0.6s ease-out forwards',
              opacity: 0,
            }}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                {astronaut.profile_image && (
                  <img
                    src={astronaut.profile_image}
                    alt={astronaut.name}
                    className="h-16 w-16 rounded-full object-cover border-2 border-primary/30"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-primary group-hover:text-primary/80 transition-colors">
                        {astronaut.name}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getStatusColor(astronaut.status.name)}>
                          {astronaut.status.name}
                        </Badge>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Flag className="h-3 w-3" />
                          <span>{astronaut.nationality}</span>
                        </div>
                      </div>
                    </div>
                    
                    {astronaut.wiki && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => window.open(astronaut.wiki!, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {astronaut.bio}
                  </p>

                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>Time in space: {formatTimeInSpace(astronaut.time_in_space)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Rocket className="h-3 w-3" />
                      <span>{astronaut.flights_count} flights</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Globe className="h-3 w-3" />
                      <span>{astronaut.spacewalks_count} spacewalks</span>
                    </div>
                  </div>

                  <div className="text-xs text-primary/70">
                    {astronaut.agency.name} ({astronaut.agency.abbrev})
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {displayCount < astronauts.length && (
        <div className="text-center mt-8">
          <Button
            onClick={loadMore}
            variant="outline"
            className="border-primary/30 hover:bg-primary/10"
          >
            <ChevronDown className="h-4 w-4 mr-2" />
            Load More Astronauts
          </Button>
        </div>
      )}
    </div>
  );
};

export default AstronautList;
