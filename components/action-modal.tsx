"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Loader2, ArrowDownUp, TrendingUp, TrendingDown, Wallet } from "lucide-react"

type ActionType = "deposit" | "withdraw" | "borrow" | "repay"

interface Asset {
  symbol: string
  name: string
  balance: number
  apy: number
  icon: string
}

interface ActionModalProps {
  action: ActionType
  trigger: React.ReactNode
  assets: Asset[]
}

const actionConfig = {
  deposit: {
    title: "Deposit Assets",
    description: "Deposit assets to earn yield and use as collateral",
    icon: TrendingUp,
    color: "text-green-600",
    buttonText: "Deposit",
  },
  withdraw: {
    title: "Withdraw Assets",
    description: "Withdraw your deposited assets",
    icon: TrendingDown,
    color: "text-blue-600",
    buttonText: "Withdraw",
  },
  borrow: {
    title: "Borrow Assets",
    description: "Borrow against your collateral",
    icon: ArrowDownUp,
    color: "text-purple-600",
    buttonText: "Borrow",
  },
  repay: {
    title: "Repay Debt",
    description: "Repay your borrowed assets",
    icon: Wallet,
    color: "text-orange-600",
    buttonText: "Repay",
  },
}

export function ActionModal({ action, trigger, assets }: ActionModalProps) {
  const [open, setOpen] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState<string>("")
  const [amount, setAmount] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const config = actionConfig[action]
  const Icon = config.icon

  const selectedAssetData = assets.find((asset) => asset.symbol === selectedAsset)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedAsset || !amount || Number.parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please select an asset and enter a valid amount",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    // Simulate transaction
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Transaction Submitted",
      description: `${config.buttonText} of ${amount} ${selectedAsset} submitted successfully`,
    })

    setLoading(false)
    setOpen(false)
    setSelectedAsset("")
    setAmount("")
  }

  const handleMaxClick = () => {
    if (selectedAssetData) {
      setAmount(selectedAssetData.balance.toString())
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className={`flex items-center gap-2 ${config.color}`}>
            <Icon className="h-5 w-5" />
            {config.title}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">{config.description}</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="asset">Select Asset</Label>
            <Select value={selectedAsset} onValueChange={setSelectedAsset}>
              <SelectTrigger>
                <SelectValue placeholder="Choose an asset" />
              </SelectTrigger>
              <SelectContent>
                {assets.map((asset) => (
                  <SelectItem key={asset.symbol} value={asset.symbol}>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{asset.icon}</span>
                      <div>
                        <span className="font-medium">{asset.symbol}</span>
                        <span className="text-sm text-muted-foreground ml-2">{asset.name}</span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedAssetData && (
            <Card className="rounded-xl">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Available Balance</p>
                    <p className="font-semibold">
                      {selectedAssetData.balance.toFixed(4)} {selectedAssetData.symbol}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">APY</p>
                    <Badge variant="secondary" className="gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {selectedAssetData.apy.toFixed(2)}%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <Input
                id="amount"
                type="number"
                step="0.0001"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pr-16"
              />
              {selectedAssetData && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-8 px-3 text-xs"
                  onClick={handleMaxClick}
                >
                  MAX
                </Button>
              )}
            </div>
            {selectedAssetData && amount && (
              <p className="text-sm text-muted-foreground">
                ≈ {formatCurrency(Number.parseFloat(amount) * 2000)} {/* Mock price */}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={loading || !selectedAsset || !amount}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {config.buttonText}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
