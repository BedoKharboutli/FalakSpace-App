// NASA API Types
export interface NASAMission {
  id: number;
  title: string;
  description: string;
  startYear?: number;
  endYear?: number;
  status: string;
  benefits?: string;
  primaryTaxonomyNodes?: Array<{
    taxonomyNodeId: number;
    taxonomyRootId: number;
    parentNodeId: number;
    level: number;
    code: string;
    title: string;
    definition: string;
    hasChildren: boolean;
    hasInteriorContent: boolean;
  }>;
}

export interface NASAMissionsResponse {
  projects: NASAMission[];
  totalCount: number;
}

// Space Devs API Types
export interface Astronaut {
  id: number;
  name: string;
  status: {
    id: number;
    name: string;
  };
  type: {
    id: number;
    name: string;
  };
  in_space: boolean;
  time_in_space: string;
  eva_time: string;
  age: number | null;
  date_of_birth: string | null;
  date_of_death: string | null;
  nationality: string;
  bio: string;
  twitter: string | null;
  instagram: string | null;
  wiki: string | null;
  agency: {
    id: number;
    url: string;
    name: string;
    featured: boolean;
    type: string;
    country_code: string;
    abbrev: string;
    description: string;
    administrator: string | null;
    founding_year: string | null;
    launchers: string;
    spacecraft: string;
    parent: string | null;
    image_url: string | null;
  };
  profile_image: string | null;
  profile_image_thumbnail: string | null;
  flights_count: number;
  landings_count: number;
  spacewalks_count: number;
  last_flight: string | null;
  first_flight: string | null;
}

export interface AstronautsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Astronaut[];
}

// Loading and Error States
export interface LoadingState {
  loading: boolean;
  error: string | null;
}

export interface APIError {
  message: string;
  status?: number;
}
