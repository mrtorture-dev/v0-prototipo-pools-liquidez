# DeFi Lending dApp Frontend

A modern decentralized lending platform frontend built with Next.js, Tailwind CSS, and Wagmi. This MVP provides a complete interface for lending, borrowing, and managing collateral with dynamic health metrics.

## Features

- **Dashboard**: View lending pools with liquidity, APY, and utilization metrics
- **Account Management**: Monitor collateral, debt, health factor, and risk score
- **Lending Actions**: Deposit, withdraw, borrow, and repay assets
- **Transaction History**: Complete transaction history with Etherscan links
- **Wallet Integration**: Connect with MetaMask, WalletConnect, and other Web3 wallets
- **Responsive Design**: Mobile-first design with dark mode support

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS v4
- **Web3**: Wagmi + Viem for Ethereum integration
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- MetaMask or compatible Web3 wallet

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd defi-lending-dapp
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

Add your environment variables:
\`\`\`env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
├── app/                    # Next.js App Router pages
│   ├── account/           # Account management page
│   ├── actions/           # Lending actions page
│   ├── history/           # Transaction history page
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Dashboard page
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── account-stats.tsx # Account metrics display
│   ├── action-modal.tsx  # Action forms modal
│   ├── event-table.tsx   # Transaction history table
│   ├── navbar.tsx        # Navigation component
│   ├── pool-card.tsx     # Pool display cards
│   └── wallet-connect.tsx # Wallet connection
├── hooks/                # Custom React hooks
│   ├── use-account-data.ts      # Account data fetching
│   ├── use-contract-actions.ts  # Contract interaction hooks
│   ├── use-pool-data.ts         # Pool data fetching
│   └── use-transaction-history.ts # Transaction history
├── lib/                  # Utility libraries
│   ├── utils.ts          # General utilities
│   └── wagmi.ts          # Wagmi configuration
└── providers/            # React context providers
    └── wagmi-provider.tsx # Wagmi + TanStack Query setup
\`\`\`

## Key Components

### Dashboard (`/`)
- Displays lending pools with real-time metrics
- Shows liquidity, APY, and utilization rates
- Quick deposit actions for each pool

### Account (`/account`)
- Total collateral and debt overview
- Health factor with color-coded progress bar
- Risk score (0-100) with status indicators
- Detailed asset breakdowns

### Actions (`/actions`)
- Modal forms for deposit, withdraw, borrow, repay
- Asset selection with balance display
- Real-time transaction feedback
- Quick stats overview

### History (`/history`)
- Complete transaction history table
- Etherscan integration for transaction details
- Status tracking (completed, pending, failed)
- Transaction type filtering

## Mock Data & Hooks

This MVP uses mock data for demonstration. The following hooks simulate contract interactions:

- `useDeposit()` - Deposit assets to earn yield
- `useWithdraw()` - Withdraw deposited assets  
- `useBorrow()` - Borrow against collateral
- `useRepay()` - Repay borrowed assets
- `useAccountData()` - Fetch account metrics
- `usePoolData()` - Fetch pool information

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Manual Deployment

\`\`\`bash
npm run build
npm start
\`\`\`

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnect project ID | Yes |

## Smart Contract Integration

To connect with real smart contracts:

1. Replace mock hooks in `hooks/use-contract-actions.ts`
2. Add contract ABIs and addresses
3. Implement real contract calls using Wagmi
4. Update data fetching hooks with actual contract reads

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For questions or issues, please open a GitHub issue or contact the development team.
