# Grid Cipher Trade

A decentralized trading platform built with React, TypeScript, and FHE (Fully Homomorphic Encryption) technology for secure and private trading operations.

## Features

- **Secure Trading**: Powered by FHE encryption for maximum privacy
- **Wallet Integration**: Seamless connection with popular Web3 wallets
- **Real-time Grid Trading**: Advanced grid trading strategies
- **Privacy-First**: All sensitive data encrypted using FHE
- **Modern UI**: Built with shadcn/ui and Tailwind CSS

## Technologies Used

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Radix UI, Tailwind CSS
- **Web3**: RainbowKit, Wagmi, Viem
- **Blockchain**: Ethereum Sepolia Testnet
- **Encryption**: FHE (Fully Homomorphic Encryption)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/melissa87jensen/grid-cipher-trade.git
cd grid-cipher-trade
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Configure environment variables in `.env.local`:
```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Building for Production

```bash
npm run build
```

## Deployment

This project can be deployed to Vercel, Netlify, or any static hosting service.

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on every push to main branch

## Smart Contracts

The project includes FHE-enabled smart contracts for secure trading operations. All sensitive trading data is encrypted using Fully Homomorphic Encryption.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For support and questions, please open an issue on GitHub.