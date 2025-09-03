import mercuryTexture from '@/assets/mercury-texture.jpg';
import venusTexture from '@/assets/venus-texture.jpg';
import earthTexture from '@/assets/earth-texture.jpg';
import marsTexture from '@/assets/mars-texture.jpg';
import jupiterTexture from '@/assets/jupiter-texture.jpg';
import saturnTexture from '@/assets/saturn-texture.jpg';
import uranusTexture from '@/assets/uranus-texture.jpg';
import neptuneTexture from '@/assets/neptune-texture.jpg';

export interface PlanetData {
  id: string;
  name: string;
  position: [number, number, number];
  size: number;
  color: string;
  textureUrl?: string;
  orbitSpeed: number;
  description: string;
  facts: {
    diameter: string;
    mass: string;
    distanceFromSun: string;
    orbitalPeriod: string;
    rotationPeriod: string;
    temperature: string;
    moons: string;
    atmosphere: string;
    gravity?: string;
  };
  funFacts: string[];
  composition: string[];
  type: string;
}

export const planetData: PlanetData[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    position: [8, 0, 0],
    size: 0.383, // Accurate relative to Earth
    color: '#8C7853',
    textureUrl: mercuryTexture,
    orbitSpeed: 2.4,
    type: 'Terrestrial Planet',
    description: 'Mercury is the smallest planet in our solar system and the closest to the Sun. Its heavily cratered surface resembles our Moon, with extreme temperature variations and virtually no atmosphere.',
    facts: {
      diameter: '4,879 km',
      mass: '3.30 × 10²³ kg',
      distanceFromSun: '57.9 million km (0.39 AU)',
      orbitalPeriod: '88 Earth days',
      rotationPeriod: '59 Earth days',
      temperature: '-173°C to 427°C',
      moons: '0',
      atmosphere: 'Extremely thin exosphere',
      gravity: '3.7 m/s² (38% of Earth)',
    },
    funFacts: [
      'Mercury has the most eccentric orbit of all planets',
      'A day on Mercury (176 Earth days) is longer than its year (88 Earth days)',
      'Mercury has water ice at its poles despite being closest to the Sun',
      'Mercury is shrinking as its core cools - about 1-7 km in radius over 4.6 billion years',
    ],
    composition: ['Large Iron Core (75%)', 'Silicate Mantle', 'Thin Crust'],
  },
  {
    id: 'venus',
    name: 'Venus',
    position: [12, 0, 0],
    size: 0.949, // Accurate relative to Earth
    color: '#FFC649',
    textureUrl: venusTexture,
    orbitSpeed: 1.6,
    type: 'Terrestrial Planet',
    description: 'Venus is the hottest planet in our solar system due to its thick, toxic atmosphere that creates a runaway greenhouse effect. It rotates backwards and has crushing atmospheric pressure.',
    facts: {
      diameter: '12,104 km',
      mass: '4.87 × 10²⁴ kg',
      distanceFromSun: '108.2 million km (0.72 AU)',
      orbitalPeriod: '225 Earth days',
      rotationPeriod: '243 Earth days (retrograde)',
      temperature: '462°C (surface) - hotter than Mercury',
      moons: '0',
      atmosphere: 'Carbon Dioxide (96%), Nitrogen (3.5%)',
      gravity: '8.87 m/s² (90% of Earth)',
    },
    funFacts: [
      'Venus rotates backwards - possibly due to an ancient massive collision',
      'Venus is the brightest planet in our sky after the Sun and Moon',
      'Surface pressure is 92 times Earth\'s - like being 900m underwater',
      'It rains sulfuric acid in the upper atmosphere, but it evaporates before reaching the surface',
    ],
    composition: ['Iron Core', 'Rocky Mantle', 'Basaltic Crust', 'Dense CO₂ Atmosphere'],
  },
  {
    id: 'earth',
    name: 'Earth',
    position: [16, 0, 0],
    size: 1.0, // Reference size for other planets
    color: '#6B93D6',
    textureUrl: earthTexture,
    orbitSpeed: 1.0,
    type: 'Terrestrial Planet',
    description: 'Earth is the third planet from the Sun and the only known world with life. Its perfect distance from the Sun allows liquid water to exist, creating the "Goldilocks Zone" conditions for life.',
    facts: {
      diameter: '12,742 km',
      mass: '5.97 × 10²⁴ kg',
      distanceFromSun: '149.6 million km (1 AU)',
      orbitalPeriod: '365.25 days',
      rotationPeriod: '23h 56m 4s',
      temperature: '-89°C to 58°C',
      moons: '1 (Luna)',
      atmosphere: 'Nitrogen (78%), Oxygen (21%)',
      gravity: '9.8 m/s²',
    },
    funFacts: [
      'Earth is the only known planet with life and liquid surface water',
      'The deepest part of Earth\'s ocean is the Mariana Trench at 11,034 m deep',
      'Earth\'s magnetic field protects us from deadly solar radiation',
      'The Moon stabilizes Earth\'s axial tilt, creating stable seasons essential for life',
    ],
    composition: ['Iron-Nickel Core', 'Silicate Mantle', 'Oceanic & Continental Crust', 'Hydrosphere', 'Atmosphere'],
  },
  {
    id: 'mars',
    name: 'Mars',
    position: [22, 0, 0],
    size: 0.532, // Accurate relative to Earth
    color: '#CD5C5C',
    textureUrl: marsTexture,
    orbitSpeed: 0.8,
    type: 'Terrestrial Planet',
    description: 'Mars is known as the "Red Planet" due to iron oxide (rust) on its surface. Evidence suggests it once had rivers, lakes, and possibly oceans, making it a prime target for the search for past life.',
    facts: {
      diameter: '6,779 km',
      mass: '6.39 × 10²³ kg',
      distanceFromSun: '227.9 million km (1.52 AU)',
      orbitalPeriod: '687 Earth days',
      rotationPeriod: '24h 37m',
      temperature: '-87°C to -5°C',
      moons: '2 (Phobos, Deimos)',
      atmosphere: 'Carbon Dioxide (95%), Nitrogen (2.8%)',
      gravity: '3.71 m/s² (38% of Earth)',
    },
    funFacts: [
      'Olympus Mons, the largest volcano, is 21 km high - nearly 3 times Mount Everest',
      'Mars has the largest dust storms in the solar system, sometimes covering the entire planet',
      'Evidence shows Mars once had liquid water flowing on its surface',
      'Polar ice caps contain both water ice and frozen carbon dioxide',
    ],
    composition: ['Iron Core', 'Basaltic Mantle', 'Volcanic Crust', 'Thin Atmosphere'],
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    position: [35, 0, 0],
    size: 2.5, // Scaled down for visibility (actual would be 11.2x Earth)
    color: '#D8CA9D',
    textureUrl: jupiterTexture,
    orbitSpeed: 0.4,
    type: 'Gas Giant',
    description: 'Jupiter is the largest planet in our solar system, a gas giant that acts as a "cosmic vacuum cleaner" protecting inner planets from asteroids. Its iconic Great Red Spot is a storm larger than Earth.',
    facts: {
      diameter: '139,820 km (11x Earth)',
      mass: '1.90 × 10²⁷ kg (318x Earth)',
      distanceFromSun: '778.5 million km (5.20 AU)',
      orbitalPeriod: '11.86 Earth years',
      rotationPeriod: '9h 56m (fastest in solar system)',
      temperature: '-108°C (cloud tops)',
      moons: '95+ (Io, Europa, Ganymede, Callisto)',
      atmosphere: 'Hydrogen (89%), Helium (10%)',
      gravity: '24.79 m/s² (2.5x Earth)',
    },
    funFacts: [
      'Jupiter is more massive than all other planets combined',
      'The Great Red Spot has been raging for over 400 years',
      'Europa may have twice as much water as all Earth\'s oceans',
      'Jupiter\'s magnetic field is 20,000 times stronger than Earth\'s',
    ],
    composition: ['Rocky Core', 'Metallic Hydrogen', 'Liquid Hydrogen', 'Gas Atmosphere'],
  },
  {
    id: 'saturn',
    name: 'Saturn',
    position: [55, 0, 0],
    size: 2.2, // Scaled down for visibility (actual would be 9.4x Earth)
    color: '#FAD5A5',
    textureUrl: saturnTexture,
    orbitSpeed: 0.3,
    type: 'Gas Giant',
    description: 'Saturn is the sixth planet from the Sun and is famous for its prominent ring system. It\'s the least dense planet in our solar system and would float in water.',
    facts: {
      diameter: '116,460 km',
      mass: '5.68 × 10²⁶ kg',
      distanceFromSun: '1.43 billion km (9.54 AU)',
      orbitalPeriod: '29.46 Earth years',
      rotationPeriod: '10h 42m',
      temperature: '-139°C (cloud tops)',
      moons: '146+ (Titan, Enceladus, Mimas)',
      atmosphere: 'Hydrogen (96%), Helium (3%)',
    },
    funFacts: [
      'Saturn is less dense than water and would float',
      'Saturn\'s rings are made of ice and rock particles',
      'Saturn has hexagonal storm at its north pole',
      'Titan, Saturn\'s largest moon, has lakes of methane',
    ],
    composition: ['Rocky Core', 'Metallic Hydrogen', 'Liquid Hydrogen', 'Gas Atmosphere', 'Ring System'],
  },
  {
    id: 'uranus',
    name: 'Uranus',
    position: [70, 0, 0],
    size: 1.6, // Scaled (actual would be 4.0x Earth)
    color: '#4FD0E7',
    textureUrl: uranusTexture,
    orbitSpeed: 0.2,
    type: 'Ice Giant',
    description: 'Uranus is the seventh planet from the Sun and is unique for rotating on its side. It\'s an ice giant with a complex ring system and many moons.',
    facts: {
      diameter: '50,724 km',
      mass: '8.68 × 10²⁵ kg',
      distanceFromSun: '2.87 billion km (19.19 AU)',
      orbitalPeriod: '84 Earth years',
      rotationPeriod: '17h 14m (retrograde)',
      temperature: '-197°C (cloud tops)',
      moons: '27 (Titania, Oberon, Umbriel)',
      atmosphere: 'Hydrogen (83%), Helium (15%), Methane (2%)',
    },
    funFacts: [
      'Uranus rotates on its side at a 98-degree angle',
      'Uranus has the coldest planetary atmosphere in the solar system',
      'Uranus has a faint ring system discovered in 1977',
      'A year on Uranus equals 84 Earth years',
    ],
    composition: ['Rocky Core', 'Water-Ammonia-Methane Ice', 'Hydrogen-Helium Atmosphere'],
  },
  {
    id: 'neptune',
    name: 'Neptune',
    position: [85, 0, 0],
    size: 1.5, // Scaled (actual would be 3.9x Earth)
    color: '#4B70DD',
    textureUrl: neptuneTexture,
    orbitSpeed: 0.15,
    type: 'Ice Giant',
    description: 'Neptune is the eighth and outermost planet in our solar system. It\'s a windy, cold, and dark world with the fastest winds in the solar system.',
    facts: {
      diameter: '49,244 km',
      mass: '1.02 × 10²⁶ kg',
      distanceFromSun: '4.50 billion km (30.07 AU)',
      orbitalPeriod: '165 Earth years',
      rotationPeriod: '16h 7m',
      temperature: '-201°C (cloud tops)',
      moons: '16 (Triton, Nereid, Proteus)',
      atmosphere: 'Hydrogen (80%), Helium (19%), Methane (1%)',
    },
    funFacts: [
      'Neptune has the fastest winds in the solar system (up to 2,100 km/h)',
      'Neptune was the first planet discovered through mathematical prediction',
      'Triton, Neptune\'s largest moon, orbits backwards',
      'Neptune takes 165 Earth years to orbit the Sun once',
    ],
    composition: ['Rocky Core', 'Water-Ammonia-Methane Ice', 'Hydrogen-Helium Atmosphere'],
  },
];