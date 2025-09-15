import { useAccount, useBalance } from 'wagmi';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Wallet, Shield, Zap, CheckCircle, ExternalLink } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export const WalletInfo = () => {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address: address,
  });

  // Format address for display
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // Format balance for display
  const formatBalance = (balance: string) => {
    const num = parseFloat(balance);
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(1)}k`;
    } else {
      return `$${num.toFixed(2)}`;
    }
  };

  if (!isConnected || !address) {
    return (
      <Card className="border-energy-grid">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-energy/20 flex items-center justify-center mx-auto mb-4 border border-energy-primary/30">
            <Wallet className="w-8 h-8 text-energy-primary" />
          </div>
          
          <h3 className="font-semibold mb-2">Connect Your Wallet</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Connect your wallet to start trading with FHE-encrypted grid strategies
          </p>
          
          <ConnectButton />
          
          <div className="mt-4 text-xs text-muted-foreground flex items-center justify-center gap-1">
            <Shield className="w-3 h-3" />
            Secured by FHE encryption
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-energy-primary/50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-energy flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold">Wallet Connected</p>
              <p className="text-sm text-muted-foreground font-mono">
                {formatAddress(address)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-energy-secondary text-energy-secondary">
              FHE Verified
            </Badge>
            <Button
              variant="outline"
              size="sm"
              className="border-energy-grid"
              onClick={() => window.open(`https://sepolia.etherscan.io/address/${address}`, '_blank')}
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              View
            </Button>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          <div className="p-2 rounded bg-muted/50">
            <Zap className="w-4 h-4 mx-auto mb-1 text-energy-secondary" />
            <p className="text-xs text-muted-foreground">ETH Balance</p>
            <p className="font-mono text-sm">
              {balance ? `${parseFloat(balance.formatted).toFixed(4)} ETH` : 'Loading...'}
            </p>
          </div>
          <div className="p-2 rounded bg-muted/50">
            <Shield className="w-4 h-4 mx-auto mb-1 text-energy-primary" />
            <p className="text-xs text-muted-foreground">FHE Status</p>
            <p className="font-mono text-sm">Active</p>
          </div>
          <div className="p-2 rounded bg-muted/50">
            <Wallet className="w-4 h-4 mx-auto mb-1 text-energy-warning" />
            <p className="text-xs text-muted-foreground">Network</p>
            <p className="font-mono text-sm">Sepolia</p>
          </div>
        </div>

        {/* Trading Stats */}
        <div className="mt-4 pt-4 border-t border-energy-grid/30">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-xs text-muted-foreground">Active Positions</p>
              <p className="font-semibold text-energy-primary">0</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Volume</p>
              <p className="font-semibold text-energy-secondary">0 ETH</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
