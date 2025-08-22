"use client"

import { ActionModal } from "@/components/action-modal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAccount } from "wagmi"
import { WalletConnect } from "@/components/wallet-connect"
import { TrendingUp, TrendingDown, ArrowDownUp, Wallet, Plus, Minus, DollarSign, CreditCard } from "lucide-react"

// Mock assets data
const mockAssets = [
  {
    symbol: "USDC",
    name: "USD Coin",
    balance: 1250.5,
    apy: 4.25,
    icon: "💵",
  },
  {
    symbol: "WETH",
    name: "Wrapped Ethereum",
    balance: 2.5432,
    apy: 3.89,
    icon: "⟠",
  },
  {
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    balance: 0.1234,
    apy: 2.15,
    icon: "₿",
  },
  {
    symbol: "DAI",
    name: "Dai Stablecoin",
    balance: 850.0,
    apy: 5.12,
    icon: "◈",
  },
]

export default function Actions() {
  const { isConnected } = useAccount()

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Actions</h1>
          <p className="text-muted-foreground mt-2">Deposit, withdraw, borrow, and repay assets</p>
        </div>

        <Card className="rounded-2xl max-w-md mx-auto">
          <CardContent className="p-8 text-center space-y-4">
            <CreditCard className="h-12 w-12 mx-auto text-muted-foreground" />
            <div>
              <h3 className="text-lg font-semibold">Connect Your Wallet</h3>
              <p className="text-muted-foreground">Connect your wallet to perform lending actions</p>
            </div>
            <WalletConnect />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Actions</h1>
        <p className="text-muted-foreground mt-2">Deposit, withdraw, borrow, and repay assets</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Deposit Card */}
        <Card className="rounded-2xl hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-green-600">
              <Plus className="h-5 w-5" />
              Deposit
            </CardTitle>
            <p className="text-sm text-muted-foreground">Deposit assets to earn yield and use as collateral</p>
          </CardHeader>
          <CardContent>
            <ActionModal
              action="deposit"
              assets={mockAssets}
              trigger={
                <Button className="w-full rounded-xl bg-green-600 hover:bg-green-700" size="lg">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Deposit Assets
                </Button>
              }
            />
          </CardContent>
        </Card>

        {/* Withdraw Card */}
        <Card className="rounded-2xl hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-blue-600">
              <Minus className="h-5 w-5" />
              Withdraw
            </CardTitle>
            <p className="text-sm text-muted-foreground">Withdraw your deposited assets</p>
          </CardHeader>
          <CardContent>
            <ActionModal
              action="withdraw"
              assets={mockAssets}
              trigger={
                <Button className="w-full rounded-xl bg-blue-600 hover:bg-blue-700" size="lg">
                  <TrendingDown className="mr-2 h-4 w-4" />
                  Withdraw Assets
                </Button>
              }
            />
          </CardContent>
        </Card>

        {/* Borrow Card */}
        <Card className="rounded-2xl hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-purple-600">
              <DollarSign className="h-5 w-5" />
              Borrow
            </CardTitle>
            <p className="text-sm text-muted-foreground">Borrow against your collateral</p>
          </CardHeader>
          <CardContent>
            <ActionModal
              action="borrow"
              assets={mockAssets}
              trigger={
                <Button className="w-full rounded-xl bg-purple-600 hover:bg-purple-700" size="lg">
                  <ArrowDownUp className="mr-2 h-4 w-4" />
                  Borrow Assets
                </Button>
              }
            />
          </CardContent>
        </Card>

        {/* Repay Card */}
        <Card className="rounded-2xl hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <Wallet className="h-5 w-5" />
              Repay
            </CardTitle>
            <p className="text-sm text-muted-foreground">Repay your borrowed assets</p>
          </CardHeader>
          <CardContent>
            <ActionModal
              action="repay"
              assets={mockAssets}
              trigger={
                <Button className="w-full rounded-xl bg-orange-600 hover:bg-orange-700" size="lg">
                  <Wallet className="mr-2 h-4 w-4" />
                  Repay Debt
                </Button>
              }
            />
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Available to Deposit</p>
                <p className="font-semibold">$2,100.50</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <ArrowDownUp className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Available to Borrow</p>
                <p className="font-semibold">$15,420.25</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Debt</p>
                <p className="font-semibold">$8,420.25</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
