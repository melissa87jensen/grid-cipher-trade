import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Grid Cipher Trade',
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || 'your-wallet-connect-project-id',
  chains: [sepolia],
  ssr: false,
});
