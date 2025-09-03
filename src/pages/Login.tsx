import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Rocket, Mail, Lock, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await login(email, password);
      
      if (result.success) {
        toast({
          title: "Login Successful!",
          description: "Welcome back to Cosmic Explorer!",
        });
        navigate('/');
      } else {
        toast({
          title: "Login Failed",
          description: result.error || "Invalid credentials",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      <div className="relative z-10 w-full max-w-md space-y-6">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center text-white/80 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Exploration
        </Link>

        {/* Login Card */}
        <Card className="glass-card border-white/20 cosmic-glow">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center cosmic-glow">
              <Rocket className="h-8 w-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-orbitron nebula-text">
                Welcome Back, Explorer
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Sign in to continue your cosmic journey
              </p>
            </div>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="explorer@cosmic.space"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-background/50 border-white/20 focus:border-primary/50"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 bg-background/50 border-white/20 focus:border-primary/50"
                      required
                    />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full cosmic-glow hover:scale-[1.02] transition-transform duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Authenticating...
                  </div>
                ) : (
                  <>
                    <Rocket className="h-4 w-4 mr-2" />
                    Launch Into Space
                  </>
                )}
              </Button>

              <div className="text-center space-y-3">
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-primary hover:text-primary-glow transition-colors duration-200"
                >
                  Forgot your password?
                </Link>
                
                <div className="text-sm text-muted-foreground">
                  New to Cosmic Explorer?{' '}
                  <Link 
                    to="/register" 
                    className="text-primary hover:text-primary-glow transition-colors duration-200 font-medium"
                  >
                    Create an account
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="text-center text-white/60 text-sm">
          <p>Join thousands of explorers discovering the cosmos</p>
        </div>
      </div>
    </div>
  );
};

export default Login;