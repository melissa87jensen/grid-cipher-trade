import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface GridNode {
  id: string;
  x: number;
  y: number;
  type: 'generator' | 'consumer' | 'trader';
  capacity: number;
  status: 'active' | 'idle' | 'trading';
  encrypted: boolean;
}

export const PowerGrid = () => {
  const [nodes, setNodes] = useState<GridNode[]>([]);
  const [connections, setConnections] = useState<Array<[string, string]>>([]);

  useEffect(() => {
    // Generate random grid nodes
    const gridNodes: GridNode[] = [
      { id: 'gen-1', x: 10, y: 20, type: 'generator', capacity: 150, status: 'active', encrypted: false },
      { id: 'gen-2', x: 80, y: 15, type: 'generator', capacity: 200, status: 'trading', encrypted: true },
      { id: 'con-1', x: 30, y: 60, type: 'consumer', capacity: 80, status: 'active', encrypted: false },
      { id: 'con-2', x: 70, y: 70, type: 'consumer', capacity: 120, status: 'idle', encrypted: true },
      { id: 'trader-1', x: 50, y: 40, type: 'trader', capacity: 300, status: 'trading', encrypted: true },
      { id: 'trader-2', x: 20, y: 80, type: 'trader', capacity: 250, status: 'active', encrypted: false },
    ];
    
    setNodes(gridNodes);
    setConnections([
      ['gen-1', 'trader-1'],
      ['gen-2', 'trader-1'],
      ['trader-1', 'con-1'],
      ['trader-1', 'con-2'],
      ['trader-2', 'con-1'],
    ]);
  }, []);

  const getNodeColor = (node: GridNode) => {
    if (node.encrypted) return 'energy-primary';
    switch (node.type) {
      case 'generator': return 'energy-secondary';
      case 'consumer': return 'energy-warning';
      case 'trader': return 'energy-node';
      default: return 'energy-primary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return '⚡';
      case 'trading': return '🔒';
      case 'idle': return '⏸️';
      default: return '•';
    }
  };

  return (
    <Card className="relative w-full h-96 bg-gradient-grid border-energy-grid overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 energy-grid opacity-30" />
      
      {/* Connections */}
      <svg className="absolute inset-0 w-full h-full">
        {connections.map(([from, to], index) => {
          const fromNode = nodes.find(n => n.id === from);
          const toNode = nodes.find(n => n.id === to);
          if (!fromNode || !toNode) return null;
          
          return (
            <line
              key={index}
              x1={`${fromNode.x}%`}
              y1={`${fromNode.y}%`}
              x2={`${toNode.x}%`}
              y2={`${toNode.y}%`}
              stroke="hsl(var(--energy-grid))"
              strokeWidth="2"
              strokeDasharray="5,5"
              className="opacity-60"
            />
          );
        })}
      </svg>
      
      {/* Energy flow animation */}
      {connections.map(([from, to], index) => {
        const fromNode = nodes.find(n => n.id === from);
        const toNode = nodes.find(n => n.id === to);
        if (!fromNode || !toNode) return null;
        
        return (
          <div
            key={`flow-${index}`}
            className="absolute w-2 h-2 bg-energy-flow rounded-full energy-flow opacity-80"
            style={{
              left: `${fromNode.x}%`,
              top: `${fromNode.y}%`,
              animationDelay: `${index * 0.5}s`,
            }}
          />
        );
      })}
      
      {/* Nodes */}
      {nodes.map((node) => (
        <div
          key={node.id}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
            node.status === 'trading' ? 'energy-pulse' : ''
          }`}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          <div
            className={`w-8 h-8 rounded-full border-2 border-${getNodeColor(node)} bg-${getNodeColor(node)}/20 
                       flex items-center justify-center text-xs font-bold shadow-glow-energy`}
          >
            {getStatusIcon(node.status)}
          </div>
          
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 min-w-max">
            <Badge 
              variant="outline" 
              className={`text-xs border-${getNodeColor(node)} ${
                node.encrypted ? 'encrypted-blur' : ''
              }`}
            >
              {node.type.toUpperCase()} • {node.encrypted ? '████' : `${node.capacity}MW`}
            </Badge>
          </div>
        </div>
      ))}
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 space-y-1">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-3 h-3 rounded-full bg-energy-secondary/50 border border-energy-secondary"></div>
          <span>Generators</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-3 h-3 rounded-full bg-energy-warning/50 border border-energy-warning"></div>
          <span>Consumers</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-3 h-3 rounded-full bg-energy-primary/50 border border-energy-primary"></div>
          <span>Encrypted Nodes</span>
        </div>
      </div>
    </Card>
  );
};