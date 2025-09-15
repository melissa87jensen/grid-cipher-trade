import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Plus, Shield, X } from 'lucide-react';

interface EnergyCredit {
  id: string;
  type: 'solar' | 'wind' | 'hydro';
  amount: number;
  pricePerMWh: number;
  seller: string;
  encrypted: boolean;
  timestamp: string;
}

interface AddCreditFormProps {
  onAddCredit: (credit: EnergyCredit) => void;
}

export const AddCreditForm = ({ onAddCredit }: AddCreditFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: 'solar' as 'solar' | 'wind' | 'hydro',
    amount: '',
    pricePerMWh: '',
    seller: '',
    encrypted: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.pricePerMWh || !formData.seller) {
      return;
    }

    const newCredit: EnergyCredit = {
      id: `ec-${Date.now()}`,
      type: formData.type,
      amount: parseFloat(formData.amount),
      pricePerMWh: parseFloat(formData.pricePerMWh),
      seller: formData.encrypted ? '████████████' : formData.seller,
      encrypted: formData.encrypted,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false })
    };

    onAddCredit(newCredit);
    
    // Reset form
    setFormData({
      type: 'solar',
      amount: '',
      pricePerMWh: '',
      seller: '',
      encrypted: false
    });
    setIsOpen(false);
  };

  const getEnergyIcon = (type: string) => {
    switch (type) {
      case 'solar': return '☀️';
      case 'wind': return '💨';
      case 'hydro': return '💧';
      default: return '⚡';
    }
  };

  if (!isOpen) {
    return (
      <Button 
        onClick={() => setIsOpen(true)}
        className="w-full bg-gradient-energy hover:opacity-90 transition-opacity"
      >
        <Plus className="w-4 h-4 mr-2" />
        List New Energy Credit
      </Button>
    );
  }

  return (
    <Card className="border-energy-primary/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Plus className="w-5 h-5 text-energy-secondary" />
            Add Energy Credit
          </CardTitle>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Energy Type</Label>
            <Select 
              value={formData.type} 
              onValueChange={(value: 'solar' | 'wind' | 'hydro') => 
                setFormData(prev => ({ ...prev, type: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solar">
                  <div className="flex items-center gap-2">
                    <span>☀️</span>
                    <span>Solar</span>
                  </div>
                </SelectItem>
                <SelectItem value="wind">
                  <div className="flex items-center gap-2">
                    <span>💨</span>
                    <span>Wind</span>
                  </div>
                </SelectItem>
                <SelectItem value="hydro">
                  <div className="flex items-center gap-2">
                    <span>💧</span>
                    <span>Hydro</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (MWh)</Label>
              <Input
                id="amount"
                type="number"
                step="0.1"
                min="0"
                placeholder="150.0"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                className="font-mono"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price per MWh ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="45.50"
                value={formData.pricePerMWh}
                onChange={(e) => setFormData(prev => ({ ...prev, pricePerMWh: e.target.value }))}
                className="font-mono"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="seller">Seller Name</Label>
            <Input
              id="seller"
              placeholder="Enter company name"
              value={formData.seller}
              onChange={(e) => setFormData(prev => ({ ...prev, seller: e.target.value }))}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border border-energy-grid">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-energy-primary" />
              <span className="text-sm font-medium">Privacy Protection</span>
            </div>
            <Switch
              checked={formData.encrypted}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, encrypted: checked }))}
            />
          </div>

          {formData.encrypted && (
            <div className="p-3 rounded-lg bg-muted/50 border border-energy-primary/30">
              <p className="text-xs text-muted-foreground mb-2">Preview (Encrypted Mode):</p>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{getEnergyIcon(formData.type)}</span>
                <Badge variant="outline" className="capitalize">
                  {formData.type}
                </Badge>
                <Shield className="w-4 h-4 text-energy-primary" />
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground">Amount:</span>
                  <p className="font-mono">████ MWh</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Price:</span>
                  <p className="font-mono">$████</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Seller:</span>
                  <p>████████████</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button 
              type="submit" 
              className="flex-1 bg-gradient-energy hover:opacity-90 transition-opacity"
              disabled={!formData.amount || !formData.pricePerMWh || !formData.seller}
            >
              List Energy Credit
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="border-energy-grid"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};