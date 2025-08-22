"use client"

import { useState, useEffect } from "react"

interface PoolData {
  symbol: string
  name: string
  totalLiquidity: string
  apy: number
  utilization: number
  icon: string
}

// Mock data for pools
const mockPools: PoolData[] = [
  {
    symbol: "USDC",
    name: "USD Coin",
    totalLiquidity: "12500000",
    apy: 4.25,
    utilization: 67.8,
    icon: "💵",
  },
  {
    symbol: "WETH",
    name: "Wrapped Ethereum",
    totalLiquidity: "8750000",
    apy: 3.89,
    utilization: 72.3,
    icon: "⟠",
  },
  {
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    totalLiquidity: "6200000",
    apy: 2.15,
    utilization: 45.6,
    icon: "₿",
  },
  {
    symbol: "DAI",
    name: "Dai Stablecoin",
    totalLiquidity: "9800000",
    apy: 5.12,
    utilization: 58.9,
    icon: "◈",
  },
  {
    symbol: "LINK",
    name: "Chainlink",
    totalLiquidity: "3400000",
    apy: 6.78,
    utilization: 34.2,
    icon: "🔗",
  },
  {
    symbol: "UNI",
    name: "Uniswap",
    totalLiquidity: "2100000",
    apy: 8.45,
    utilization: 28.7,
    icon: "🦄",
  },
]

export function usePoolData() {
  const [pools, setPools] = useState<PoolData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchPools = async () => {
      setLoading(true)
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setPools(mockPools)
      setLoading(false)
    }

    fetchPools()
  }, [])

  return { pools, loading }
}
