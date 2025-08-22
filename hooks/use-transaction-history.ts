"use client"

import { useState, useEffect } from "react"
import { useAccount } from "wagmi"

interface Transaction {
  id: string
  action: "deposit" | "withdraw" | "borrow" | "repay"
  amount: number
  asset: string
  timestamp: Date
  txHash: string
  status: "completed" | "pending" | "failed"
  gasUsed?: number
}

// Mock transaction data
const mockTransactions: Transaction[] = [
  {
    id: "1",
    action: "deposit",
    amount: 1000.0,
    asset: "USDC",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    txHash: "0x1234567890abcdef1234567890abcdef12345678",
    status: "completed",
    gasUsed: 45000,
  },
  {
    id: "2",
    action: "borrow",
    amount: 0.5,
    asset: "WETH",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    txHash: "0xabcdef1234567890abcdef1234567890abcdef12",
    status: "completed",
    gasUsed: 78000,
  },
  {
    id: "3",
    action: "deposit",
    amount: 2500.0,
    asset: "DAI",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    txHash: "0x567890abcdef1234567890abcdef1234567890ab",
    status: "completed",
    gasUsed: 52000,
  },
  {
    id: "4",
    action: "repay",
    amount: 250.0,
    asset: "USDC",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    txHash: "0x90abcdef1234567890abcdef1234567890abcdef",
    status: "completed",
    gasUsed: 41000,
  },
  {
    id: "5",
    action: "withdraw",
    amount: 0.1,
    asset: "WBTC",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    txHash: "0xcdef1234567890abcdef1234567890abcdef1234",
    status: "completed",
    gasUsed: 65000,
  },
  {
    id: "6",
    action: "deposit",
    amount: 500.0,
    asset: "USDC",
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    txHash: "0xef1234567890abcdef1234567890abcdef123456",
    status: "pending",
  },
  {
    id: "7",
    action: "borrow",
    amount: 100.0,
    asset: "DAI",
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    txHash: "0x234567890abcdef1234567890abcdef1234567890",
    status: "failed",
  },
]

export function useTransactionHistory() {
  const { address, isConnected } = useAccount()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true)

      if (!isConnected || !address) {
        setTransactions([])
        setLoading(false)
        return
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Sort transactions by timestamp (newest first)
      const sortedTransactions = [...mockTransactions].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

      setTransactions(sortedTransactions)
      setLoading(false)
    }

    fetchTransactions()
  }, [address, isConnected])

  return { transactions, loading }
}
