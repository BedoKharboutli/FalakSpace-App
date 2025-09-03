# FALAK SPACE - 3D Solar System Explorer

A stunning 3D interactive solar system visualization built with React, Three.js, and real NASA planetary data.

## 🌟 Features

### Realistic Planet Rendering
- **High-quality textures**: Real planetary surface images from NASA/ESA missions
- **Accurate scaling**: Planets sized relative to Earth for educational accuracy
- **Atmospheric effects**: Earth's blue atmosphere, Venus's thick clouds, Mars's thin atmosphere
- **Special features**: Saturn's iconic ring system
- **Enhanced lighting**: Realistic sun-based illumination with shadows

### Interactive 3D Experience
- **Full 3D navigation**: Mouse controls for rotation, zoom, and panning
- **Keyboard controls**: WASD or arrow keys for movement
- **Planet selection**: Click any planet for detailed information
- **Smooth transitions**: Animated camera movements between planets
- **Visual feedback**: Hover effects and selection indicators

### User Authentication & Personalization
- **Local storage authentication**: Simple account creation and login
- **Personal favorites**: Save your favorite planets
- **Notes system**: Add personal notes to any planet
- **User-specific data**: All favorites and notes are saved per user

### Educational Content
- **NASA-accurate data**: Real planetary facts, dimensions, and characteristics
- **Detailed information**: Composition, atmosphere, fun facts for each planet
- **Interactive panels**: Rich information display for each celestial body

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd FalakSpace-App
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎮 How to Use

### Navigation
- **Mouse**: Click and drag to rotate the view, scroll to zoom in/out
- **Keyboard**: Use WASD or arrow keys to move around
- **Planets**: Click on any planet to focus and view details
- **ESC key**: Return to solar system overview

### Account Features
1. **Register**: Create a new account to save your progress
2. **Login**: Access your saved favorites and notes
3. **Favorites**: Click the heart button on any planet to add to favorites
4. **Notes**: Add personal observations about planets in the detail panel

### Planet Information
- Click any planet to open the information panel
- View detailed facts about diameter, mass, distance, and more
- Read fascinating fun facts about each celestial body
- Save personal notes about what interests you

## 🛠 Technical Stack

- **React 18** - Modern UI library
- **Three.js & React Three Fiber** - 3D graphics and WebGL rendering
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Shadcn/ui** - Modern component library
- **React Router** - Client-side routing
- **Vite** - Fast build tool and development server

## 🌍 Planet Data

All planetary data is sourced from NASA and includes:
- Physical characteristics (size, mass, composition)
- Orbital properties (distance from sun, orbital period)
- Atmospheric composition
- Number of moons
- Fascinating scientific facts

### Supported Planets
- ☿ **Mercury** - The closest planet to the Sun
- ♀ **Venus** - The hottest planet with a crushing atmosphere
- 🌍 **Earth** - Our blue marble home
- ♂ **Mars** - The red planet with ancient water evidence
- ♃ **Jupiter** - The gas giant with the Great Red Spot
- ♄ **Saturn** - The ringed planet
- ♅ **Uranus** - The tilted ice giant
- ♆ **Neptune** - The windiest planet

## 🎨 Visual Features

### Realistic Rendering
- High-resolution planetary textures from space missions
- Physically-based lighting and shadows
- Atmospheric glow effects for applicable planets
- Saturn's ring system with multiple ring gaps
- Accurate relative planet sizes

### UI/UX Design
- Cosmic-themed glass morphism design
- Smooth animations and transitions
- Responsive design for all screen sizes
- Intuitive navigation controls
- Mobile-friendly touch controls

## 📚 Educational Value

Perfect for:
- **Students** learning about our solar system
- **Educators** teaching astronomy concepts
- **Space enthusiasts** exploring planetary science
- **Anyone** curious about our cosmic neighborhood

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/ui components
│   ├── Navigation.tsx  # Main navigation
│   ├── Planet3D.tsx    # 3D planet rendering
│   └── SpaceScene.tsx  # Main 3D scene
├── pages/              # Application pages
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── data/               # Planet data and constants
├── assets/             # Images and textures
└── contexts/           # React contexts
```

## 🌌 Future Enhancements

- [ ] Add asteroid belt visualization
- [ ] Include dwarf planets (Pluto, Ceres, etc.)
- [ ] Implement real-time planet positions
- [ ] Add spacecraft and mission data
- [ ] Include planet moons as clickable objects
- [ ] Add scale options (realistic vs. visible)
- [ ] Implement planet comparison tools
- [ ] Add sound effects and background music

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- NASA for planetary images and scientific data
- ESA for additional planetary photography
- The Three.js community for 3D rendering capabilities
- Shadcn for the beautiful UI component library

---

**Explore the cosmos from the comfort of your browser! 🌌✨**