import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Shield, TrendingUp, Zap } from 'lucide-react';
import { AddCreditForm } from './AddCreditForm';

interface EnergyCredit {
  id: string;
  type: 'solar' | 'wind' | 'hydro';
  amount: number;
  pricePerMWh: number;
  seller: string;
  encrypted: boolean;
  timestamp: string;
}

export const TradingPanel = () => {
  const [selectedCredit, setSelectedCredit] = useState<string | null>(null);
  const [energyCredits, setEnergyCredits] = useState<EnergyCredit[]>([
    {
      id: 'ec-1',
      type: 'solar',
      amount: 150,
      pricePerMWh: 45.5,
      seller: 'SolarCorp Energy',
      encrypted: false,
      timestamp: '14:32:15'
    },
    {
      id: 'ec-2',
      type: 'wind',
      amount: 200,
      pricePerMWh: 42.8,
      seller: '████████████',
      encrypted: true,
      timestamp: '14:31:58'
    },
    {
      id: 'ec-3',
      type: 'hydro',
      amount: 320,
      pricePerMWh: 38.2,
      seller: 'HydroGrid LLC',
      encrypted: false,
      timestamp: '14:31:42'
    },
    {
      id: 'ec-4',
      type: 'solar',
      amount: 180,
      pricePerMWh: 47.1,
      seller: '████████████',
      encrypted: true,
      timestamp: '14:31:20'
    }
  ]);

  const handleAddCredit = (newCredit: EnergyCredit) => {
    setEnergyCredits(prev => [newCredit, ...prev]);
  };

  const getEnergyIcon = (type: string) => {
    switch (type) {
      case 'solar': return '☀️';
      case 'wind': return '💨';
      case 'hydro': return '💧';
      default: return '⚡';
    }
  };

  const formatValue = (value: number | string, encrypted: boolean) => {
    if (encrypted) return '████';
    return typeof value === 'number' ? value.toFixed(1) : value;
  };

  return (
    <div className="space-y-4">
      <AddCreditForm onAddCredit={handleAddCredit} />
      
      <Card className="border-energy-grid">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="w-5 h-5 text-energy-primary" />
            Live Energy Credit Markets
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {energyCredits.map((credit) => (
            <div
              key={credit.id}
              className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer hover:border-energy-primary/50 ${
                selectedCredit === credit.id 
                  ? 'border-energy-primary bg-energy-primary/10' 
                  : 'border-energy-grid bg-card/50'
              }`}
              onClick={() => setSelectedCredit(credit.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getEnergyIcon(credit.type)}</span>
                  <Badge variant="outline" className="capitalize">
                    {credit.type}
                  </Badge>
                  {credit.encrypted && (
                    <Shield className="w-4 h-4 text-energy-primary" />
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{credit.timestamp}</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Amount</span>
                  <p className={`font-mono ${credit.encrypted ? 'encrypted-blur' : ''}`}>
                    {formatValue(credit.amount, credit.encrypted)} MWh
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Price</span>
                  <p className={`font-mono ${credit.encrypted ? 'encrypted-blur' : ''}`}>
                    ${formatValue(credit.pricePerMWh, credit.encrypted)}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Seller</span>
                  <p className={`text-xs ${credit.encrypted ? 'encrypted-blur' : ''}`}>
                    {credit.seller}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {selectedCredit && (
        <Card className="border-energy-primary/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Zap className="w-5 h-5 text-energy-secondary" />
              Execute Trade
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Selected Credit</p>
              <p className="font-mono">ID: {selectedCredit}</p>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Button className="w-full bg-gradient-energy hover:opacity-90 transition-opacity">
                Execute Encrypted Trade
              </Button>
              <Button variant="outline" className="w-full border-energy-grid">
                Add to Portfolio
              </Button>
            </div>
            
            <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
              <Shield className="w-3 h-3 inline mr-1" />
              All transactions are encrypted and verified on-chain
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};