import { Header } from '@/components/Header';
import { PowerGrid } from '@/components/PowerGrid';
import { TradingPanel } from '@/components/TradingPanel';
import { WalletInfo } from '@/components/WalletInfo';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-grid">
      <Header />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Wallet Information */}
        <div className="max-w-md mx-auto">
          <WalletInfo />
        </div>
        
        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Power Grid Visualization */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-energy-primary">Live Power Grid</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Real-time visualization of encrypted energy trading nodes
              </p>
            </div>
            <PowerGrid />
          </div>
          
          {/* Trading Panel */}
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-energy-primary">Trading Hub</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Browse and trade encrypted energy credits
              </p>
            </div>
            <TradingPanel />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
