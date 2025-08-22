"use client"

import { useState, useEffect } from "react"
import { useAccount } from "wagmi"

interface AccountData {
  totalCollateral: number
  totalDebt: number
  healthFactor: number
  riskScore: number
  collateralAssets: Array<{
    symbol: string
    amount: number
    value: number
    icon: string
  }>
  debtAssets: Array<{
    symbol: string
    amount: number
    value: number
    icon: string
  }>
}

// Mock account data
const mockAccountData: AccountData = {
  totalCollateral: 25750.5,
  totalDebt: 8420.25,
  healthFactor: 1.85,
  riskScore: 42,
  collateralAssets: [
    {
      symbol: "WETH",
      amount: 8.5432,
      value: 15420.5,
      icon: "⟠",
    },
    {
      symbol: "WBTC",
      amount: 0.2156,
      value: 10330.0,
      icon: "₿",
    },
  ],
  debtAssets: [
    {
      symbol: "USDC",
      amount: 5420.25,
      value: 5420.25,
      icon: "💵",
    },
    {
      symbol: "DAI",
      amount: 3000.0,
      value: 3000.0,
      icon: "◈",
    },
  ],
}

const mockAccountDataNoDebt: AccountData = {
  totalCollateral: 12500.0,
  totalDebt: 0,
  healthFactor: 999.99,
  riskScore: 15,
  collateralAssets: [
    {
      symbol: "USDC",
      amount: 12500.0,
      value: 12500.0,
      icon: "💵",
    },
  ],
  debtAssets: [],
}

export function useAccountData() {
  const { address, isConnected } = useAccount()
  const [accountData, setAccountData] = useState<AccountData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAccountData = async () => {
      setLoading(true)

      if (!isConnected || !address) {
        setAccountData(null)
        setLoading(false)
        return
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Randomly return different account states for demo
      const hasDebt = Math.random() > 0.3
      setAccountData(hasDebt ? mockAccountData : mockAccountDataNoDebt)
      setLoading(false)
    }

    fetchAccountData()
  }, [address, isConnected])

  return { accountData, loading }
}
