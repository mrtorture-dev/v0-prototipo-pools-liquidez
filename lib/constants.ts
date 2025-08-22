export const SUPPORTED_ASSETS = [
  {
    symbol: "USDC",
    name: "USD Coin",
    decimals: 6,
    icon: "💵",
    color: "from-blue-500 to-blue-600",
  },
  {
    symbol: "WETH",
    name: "Wrapped Ethereum",
    decimals: 18,
    icon: "⟠",
    color: "from-purple-500 to-purple-600",
  },
  {
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    decimals: 8,
    icon: "₿",
    color: "from-orange-500 to-orange-600",
  },
  {
    symbol: "DAI",
    name: "Dai Stablecoin",
    decimals: 18,
    icon: "◈",
    color: "from-yellow-500 to-yellow-600",
  },
  {
    symbol: "LINK",
    name: "Chainlink",
    decimals: 18,
    icon: "🔗",
    color: "from-blue-500 to-cyan-600",
  },
  {
    symbol: "UNI",
    name: "Uniswap",
    decimals: 18,
    icon: "🦄",
    color: "from-pink-500 to-purple-600",
  },
] as const

export const HEALTH_FACTOR_THRESHOLDS = {
  HEALTHY: 2.0,
  WARNING: 1.5,
  DANGER: 1.2,
  LIQUIDATION: 1.0,
} as const

export const RISK_SCORE_THRESHOLDS = {
  LOW: 30,
  MEDIUM: 60,
  HIGH: 100,
} as const

export const NETWORK_CONFIG = {
  MAINNET: {
    chainId: 1,
    name: "Ethereum Mainnet",
    etherscanUrl: "https://etherscan.io",
  },
  SEPOLIA: {
    chainId: 11155111,
    name: "Sepolia Testnet",
    etherscanUrl: "https://sepolia.etherscan.io",
  },
} as const
