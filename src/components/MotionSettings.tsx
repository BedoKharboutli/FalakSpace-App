import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Settings, Eye, Zap, Sparkles } from 'lucide-react';

interface MotionSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onSettingsChange: (settings: MotionSettings) => void;
}

export interface MotionSettings {
  reduceMotion: boolean;
  disableParallax: boolean;
  disableTwinkle: boolean;
  animationSpeed: number;
  enableSmoothTransitions: boolean;
  starfieldDensity: number;
}

const defaultSettings: MotionSettings = {
  reduceMotion: false,
  disableParallax: false,
  disableTwinkle: false,
  animationSpeed: 1.0,
  enableSmoothTransitions: true,
  starfieldDensity: 1.0
};

const MotionSettingsPanel: React.FC<MotionSettingsProps> = ({
  isOpen,
  onClose,
  onSettingsChange
}) => {
  const [settings, setSettings] = useState<MotionSettings>(defaultSettings);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('falakspace-motion-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (error) {
        console.warn('Failed to parse motion settings from localStorage');
      }
    }
    
    // Check for system preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setSettings(prev => ({ ...prev, reduceMotion: true }));
    }
  }, []);

  // Save settings to localStorage and notify parent
  useEffect(() => {
    localStorage.setItem('falakspace-motion-settings', JSON.stringify(settings));
    onSettingsChange(settings);
  }, [settings, onSettingsChange]);

  const updateSetting = <K extends keyof MotionSettings>(
    key: K,
    value: MotionSettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetToDefaults = () => {
    setSettings(defaultSettings);
  };

  const applyAccessibilityPreset = () => {
    setSettings({
      reduceMotion: true,
      disableParallax: true,
      disableTwinkle: true,
      animationSpeed: 0.3,
      enableSmoothTransitions: false,
      starfieldDensity: 0.5
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="glass-card border-white/20 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-primary">
            <Settings className="h-5 w-5" />
            Motion & Accessibility Settings
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Customize visual effects and animations for your comfort
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Quick Presets */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Quick Presets</Label>
            <div className="flex gap-2">
              <Button
                onClick={resetToDefaults}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                Default
              </Button>
              <Button
                onClick={applyAccessibilityPreset}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                <Eye className="h-4 w-4 mr-1" />
                Accessibility
              </Button>
            </div>
          </div>

          {/* Motion Reduction */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="reduce-motion">Reduce Motion</Label>
                <p className="text-xs text-muted-foreground">
                  Minimizes all animations and movement effects
                </p>
              </div>
              <Switch
                id="reduce-motion"
                checked={settings.reduceMotion}
                onCheckedChange={(checked) => updateSetting('reduceMotion', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="disable-parallax">Disable Parallax</Label>
                <p className="text-xs text-muted-foreground">
                  Turns off background movement effects
                </p>
              </div>
              <Switch
                id="disable-parallax"
                checked={settings.disableParallax}
                onCheckedChange={(checked) => updateSetting('disableParallax', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="disable-twinkle">
                  <Sparkles className="h-4 w-4 inline mr-1" />
                  Disable Star Twinkling
                </Label>
                <p className="text-xs text-muted-foreground">
                  Stops stars from twinkling and flickering
                </p>
              </div>
              <Switch
                id="disable-twinkle"
                checked={settings.disableTwinkle}
                onCheckedChange={(checked) => updateSetting('disableTwinkle', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="smooth-transitions">Smooth Transitions</Label>
                <p className="text-xs text-muted-foreground">
                  Enables smooth camera movements between planets
                </p>
              </div>
              <Switch
                id="smooth-transitions"
                checked={settings.enableSmoothTransitions}
                onCheckedChange={(checked) => updateSetting('enableSmoothTransitions', checked)}
              />
            </div>
          </div>

          {/* Animation Speed */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <Label>Animation Speed: {settings.animationSpeed.toFixed(1)}x</Label>
            </div>
            <Slider
              value={[settings.animationSpeed]}
              onValueChange={([value]) => updateSetting('animationSpeed', value)}
              min={0.1}
              max={2.0}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Slow</span>
              <span>Normal</span>
              <span>Fast</span>
            </div>
          </div>

          {/* Starfield Density */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <Label>Starfield Density: {Math.round(settings.starfieldDensity * 100)}%</Label>
            </div>
            <Slider
              value={[settings.starfieldDensity]}
              onValueChange={([value]) => updateSetting('starfieldDensity', value)}
              min={0.1}
              max={2.0}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Minimal</span>
              <span>Normal</span>
              <span>Dense</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button onClick={onClose} className="flex-1">
              Apply Settings
            </Button>
          </div>

          {/* Accessibility Note */}
          <div className="text-xs text-muted-foreground bg-muted/20 p-3 rounded-lg">
            <p className="font-medium mb-1">Accessibility Note:</p>
            <p>
              These settings help reduce motion sickness and visual discomfort. 
              The system will automatically detect if you prefer reduced motion.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MotionSettingsPanel;