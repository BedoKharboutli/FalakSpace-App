import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Rocket, Calendar, Target, AlertCircle } from 'lucide-react';
import { fetchNASAMissions } from '@/lib/api';
import { NASAMission, LoadingState } from '@/types/nasa';

const MissionList: React.FC = () => {
  const [missions, setMissions] = useState<NASAMission[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>({
    loading: true,
    error: null,
  });

  useEffect(() => {
    const loadMissions = async () => {
      try {
        setLoadingState({ loading: true, error: null });
        
        // For demo purposes, we'll use mock data since NASA TechPort API requires special access
        // In production, uncomment the line below and use real API
        // const response = await fetchNASAMissions();
        
        // Mock NASA missions data
        const mockMissions: NASAMission[] = [
          {
            id: 1,
            title: "Artemis III",
            description: "NASA's mission to return humans to the Moon by 2026, including the first woman and next man to walk on the lunar surface.",
            startYear: 2024,
            endYear: 2026,
            status: "Active",
            benefits: "Advance human exploration capabilities and establish sustainable lunar presence"
          },
          {
            id: 2,
            title: "Mars Sample Return",
            description: "Joint NASA-ESA mission to retrieve rock and soil samples collected by the Perseverance rover from Mars.",
            startYear: 2028,
            endYear: 2033,
            status: "In Development",
            benefits: "Search for signs of ancient microbial life and understand Mars geology"
          },
          {
            id: 3,
            title: "Europa Clipper",
            description: "Mission to study Jupiter's moon Europa and its subsurface ocean to assess habitability.",
            startYear: 2024,
            endYear: 2034,
            status: "Active",
            benefits: "Investigate Europa's potential for supporting life in its subsurface ocean"
          },
          {
            id: 4,
            title: "JWST Operations",
            description: "Ongoing operations of the James Webb Space Telescope for deep space observations.",
            startYear: 2021,
            endYear: 2031,
            status: "Operational",
            benefits: "Revolutionary observations of early universe and exoplanet atmospheres"
          },
          {
            id: 5,
            title: "Gateway Lunar Station",
            description: "Small space station in lunar orbit to support Artemis missions and deep space exploration.",
            startYear: 2025,
            endYear: 2035,
            status: "In Development",
            benefits: "Staging point for lunar surface missions and deep space exploration"
          },
          {
            id: 6,
            title: "Dragonfly",
            description: "Rotorcraft mission to explore Saturn's moon Titan and its prebiotic chemistry.",
            startYear: 2027,
            endYear: 2036,
            status: "In Development",
            benefits: "Study prebiotic chemistry and potential for life on Titan"
          }
        ];

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setMissions(mockMissions);
        setLoadingState({ loading: false, error: null });
      } catch (error) {
        console.error('Failed to fetch NASA missions:', error);
        setLoadingState({
          loading: false,
          error: 'Failed to load NASA missions. Please try again later.',
        });
      }
    };

    loadMissions();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'operational':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'in development':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'completed':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    }
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
            <CardHeader>
              <div className="flex justify-between items-start">
                <Skeleton className="h-6 w-64" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-4" />
              <div className="flex space-x-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
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
          <Rocket className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-2xl font-orbitron font-bold nebula-text">
          NASA Missions
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
        {missions.map((mission, index) => (
          <Card
            key={mission.id}
            className="glass-card border-white/10 hover:border-primary/30 transition-all duration-300 group"
            style={{
              animationDelay: `${index * 0.1}s`,
              animation: 'fade-in 0.6s ease-out forwards',
              opacity: 0,
            }}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-orbitron text-primary group-hover:text-primary/80 transition-colors">
                  {mission.title}
                </CardTitle>
                <Badge className={getStatusColor(mission.status)}>
                  {mission.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {mission.description}
              </p>
              
              {mission.benefits && (
                <div className="flex items-start space-x-2">
                  <Target className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-primary/80">
                    {mission.benefits}
                  </p>
                </div>
              )}

              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                {mission.startYear && (
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {mission.startYear}
                      {mission.endYear && mission.endYear !== mission.startYear 
                        ? ` - ${mission.endYear}` 
                        : ''
                      }
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MissionList;
