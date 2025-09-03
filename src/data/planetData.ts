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
    size: 0.8,
    color: '#8C7853',
    orbitSpeed: 2.4,
    type: 'Terrestrial Planet',
    description: 'Mercury is the smallest planet in our solar system and the closest to the Sun. It has extreme temperature variations and no atmosphere to retain heat.',
    facts: {
      diameter: '4,879 km',
      mass: '3.30 × 10²³ kg',
      distanceFromSun: '57.9 million km',
      orbitalPeriod: '88 Earth days',
      rotationPeriod: '59 Earth days',
      temperature: '-173°C to 427°C',
      moons: '0',
      atmosphere: 'Virtually none',
    },
    funFacts: [
      'Mercury has the most eccentric orbit of all planets',
      'A day on Mercury is longer than its year',
      'Mercury has water ice at its poles despite being closest to the Sun',
      'Mercury is shrinking as its core cools',
    ],
    composition: ['Iron Core', 'Silicate Mantle', 'Thin Crust'],
  },
  {
    id: 'venus',
    name: 'Venus',
    position: [12, 0, 0],
    size: 1.2,
    color: '#FFC649',
    orbitSpeed: 1.6,
    type: 'Terrestrial Planet',
    description: 'Venus is the hottest planet in our solar system due to its thick, toxic atmosphere that traps heat. It rotates backwards compared to most planets.',
    facts: {
      diameter: '12,104 km',
      mass: '4.87 × 10²⁴ kg',
      distanceFromSun: '108.2 million km',
      orbitalPeriod: '225 Earth days',
      rotationPeriod: '243 Earth days (retrograde)',
      temperature: '462°C (surface)',
      moons: '0',
      atmosphere: 'Carbon Dioxide (96%), Nitrogen (3.5%)',
    },
    funFacts: [
      'Venus rotates backwards (retrograde rotation)',
      'Venus is the brightest planet in our sky',
      'A day on Venus is longer than its year',
      'Venus has surface pressure 92 times greater than Earth',
    ],
    composition: ['Iron Core', 'Rocky Mantle', 'Basaltic Crust', 'Dense Atmosphere'],
  },
  {
    id: 'earth',
    name: 'Earth',
    position: [18, 0, 0],
    size: 1.3,
    color: '#6B93D6',
    orbitSpeed: 1.0,
    type: 'Terrestrial Planet',
    description: 'Earth is the third planet from the Sun and the only astronomical object known to harbor life. Earth\'s surface is 71% water and 29% land.',
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
  {
    id: 'mars',
    name: 'Mars',
    position: [25, 0, 0],
    size: 1.0,
    color: '#CD5C5C',
    orbitSpeed: 0.8,
    type: 'Terrestrial Planet',
    description: 'Mars is the fourth planet from the Sun and is known as the "Red Planet" due to iron oxide (rust) on its surface. It has the largest volcano in the solar system.',
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
  {
    id: 'jupiter',
    name: 'Jupiter',
    position: [40, 0, 0],
    size: 3.0,
    color: '#D8CA9D',
    orbitSpeed: 0.4,
    type: 'Gas Giant',
    description: 'Jupiter is the largest planet in our solar system and is composed mainly of hydrogen and helium. Its Great Red Spot is a giant storm that has been raging for hundreds of years.',
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
  {
    id: 'saturn',
    name: 'Saturn',
    position: [55, 0, 0],
    size: 2.5,
    color: '#FAD5A5',
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
    size: 1.8,
    color: '#4FD0E7',
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
    size: 1.7,
    color: '#4B70DD',
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