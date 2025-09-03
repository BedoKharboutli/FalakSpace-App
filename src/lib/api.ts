// API configuration and utilities
export const API_CONFIG = {
  NASA_API_KEY: import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY',
  SPACE_DEVS_BASE_URL: import.meta.env.VITE_SPACE_DEVS_API_BASE_URL || 'https://ll.thespacedevs.com/2.2.0',
  NASA_TECHPORT_URL: import.meta.env.VITE_NASA_TECHPORT_API_URL || 'https://api.nasa.gov/techport/api/projects',
  NASA_BASE_URL: import.meta.env.VITE_NASA_API_BASE_URL || 'https://api.nasa.gov',
};

// Generic API fetch wrapper with error handling
export async function fetchAPI<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
}

// NASA TechPort API
export async function fetchNASAMissions() {
  const url = `${API_CONFIG.NASA_TECHPORT_URL}?api_key=${API_CONFIG.NASA_API_KEY}`;
  return fetchAPI(url);
}

// Space Devs Astronaut API
export async function fetchAstronauts(limit = 20, offset = 0) {
  const url = `${API_CONFIG.SPACE_DEVS_BASE_URL}/astronaut/?mode=detailed&limit=${limit}&offset=${offset}`;
  return fetchAPI(url);
}

// Utility to handle rate limiting
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
