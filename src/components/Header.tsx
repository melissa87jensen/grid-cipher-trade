import { Shield, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const Header = () => {
  return (
    <header className="border-b border-energy-grid bg-gradient-grid">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-energy flex items-center justify-center shadow-glow-energy">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-energy bg-clip-text text-transparent">
                Grid Cipher Trade
              </h1>
              <p className="text-sm text-muted-foreground">
                Secure FHE-Encrypted Trading Platform
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-energy-primary text-energy-primary">
              <Shield className="w-3 h-3 mr-1" />
              FHE Encrypted
            </Badge>
            <Badge variant="outline" className="border-energy-secondary text-energy-secondary">
              Live Grid
            </Badge>
            <div className="w-2 h-2 rounded-full bg-energy-secondary animate-pulse" />
          </div>
        </div>
      </div>
    </header>
  );
};