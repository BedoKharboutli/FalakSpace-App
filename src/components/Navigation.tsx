import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Heart, User, Rocket, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const Navigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { user, logout, isAuthenticated } = useAuth();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/favorites', label: 'Favorites', icon: Heart },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  const isActive = (path: string) => currentPath === path;

  return (
    <header className="relative z-50 backdrop-blur-lg border-b border-white/10">
      <div className="glass-card rounded-none border-0 border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="cosmic-glow rounded-full p-2 bg-primary/20 group-hover:bg-primary/30 transition-all duration-300">
                <Rocket className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div>
                <h1 className="text-xl font-orbitron font-bold nebula-text">
                  FALAK SPACE
                </h1>
                <p className="text-xl text-muted-foreground">FALAK SPACE</p>
                </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link key={path} to={path}>
                  <Button
                    variant={isActive(path) ? 'default' : 'ghost'}
                    size="sm"
                    className={cn(
                      'transition-all duration-300 hover:cosmic-glow',
                      isActive(path) 
                        ? 'bg-primary/20 text-primary border-primary/30' 
                        : 'hover:bg-primary/10 hover:text-primary'
                    )}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {label}
                  </Button>
                </Link>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-2">
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-white/80 hidden sm:block">
                    Welcome, {user?.name}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={logout}
                    className="border-primary/30 hover:bg-primary/10"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" size="sm" className="border-primary/30 hover:bg-primary/10">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm" className="cosmic-glow">
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <nav className="md:hidden mt-4 flex justify-center space-x-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link key={path} to={path}>
                <Button
                  variant={isActive(path) ? 'default' : 'ghost'}
                  size="sm"
                  className={cn(
                    'flex-col h-auto py-2 px-3',
                    isActive(path) 
                      ? 'bg-primary/20 text-primary' 
                      : 'hover:bg-primary/10 hover:text-primary'
                  )}
                >
                  <Icon className="h-4 w-4 mb-1" />
                  <span className="text-xs">{label}</span>
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navigation;