import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet, Shield, Zap, CheckCircle } from 'lucide-react';

export const WalletConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate wallet connection
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
    }, 2000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  if (isConnected) {
    return (
      <Card className="border-energy-primary/50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-energy flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold">Connected</p>
                <p className="text-sm text-muted-foreground font-mono">0x742d...4e8a</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-energy-secondary text-energy-secondary">
                Energy Verified
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDisconnect}
                className="border-energy-grid"
              >
                Disconnect
              </Button>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            <div className="p-2 rounded bg-muted/50">
              <Zap className="w-4 h-4 mx-auto mb-1 text-energy-secondary" />
              <p className="text-xs text-muted-foreground">Credits</p>
              <p className="font-mono text-sm">1,247</p>
            </div>
            <div className="p-2 rounded bg-muted/50">
              <Shield className="w-4 h-4 mx-auto mb-1 text-energy-primary" />
              <p className="text-xs text-muted-foreground">Encrypted</p>
              <p className="font-mono text-sm">████</p>
            </div>
            <div className="p-2 rounded bg-muted/50">
              <Wallet className="w-4 h-4 mx-auto mb-1 text-energy-warning" />
              <p className="text-xs text-muted-foreground">Balance</p>
              <p className="font-mono text-sm">$24.7k</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-energy-grid">
      <CardContent className="p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-gradient-energy/20 flex items-center justify-center mx-auto mb-4 border border-energy-primary/30">
          <Wallet className="w-8 h-8 text-energy-primary" />
        </div>
        
        <h3 className="font-semibold mb-2">Connect Energy Wallet</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Connect your energy company wallet to start trading encrypted RWA energy credits
        </p>
        
        <Button
          onClick={handleConnect}
          disabled={isConnecting}
          className="w-full bg-gradient-energy hover:opacity-90 transition-opacity"
        >
          {isConnecting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              Connecting...
            </>
          ) : (
            <>
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </>
          )}
        </Button>
        
        <div className="mt-4 text-xs text-muted-foreground flex items-center justify-center gap-1">
          <Shield className="w-3 h-3" />
          Secured by zero-knowledge encryption
        </div>
      </CardContent>
    </Card>
  );
};