"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"

interface PoolData {
  symbol: string
  name: string
  totalLiquidity: string
  apy: number
  utilization: number
  icon: string
}

interface PoolCardProps {
  pool: PoolData
  onDeposit: (symbol: string) => void
}

export function PoolCard({ pool, onDeposit }: PoolCardProps) {
  const formatCurrency = (value: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number.parseFloat(value))
  }

  const getUtilizationColor = (utilization: number) => {
    if (utilization < 50) return "text-green-600"
    if (utilization < 80) return "text-yellow-600"
    return "text-red-600"
  }

  const getAPYTrend = (apy: number) => {
    return apy > 5 ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    )
  }

  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
              {pool.icon}
            </div>
            <div>
              <CardTitle className="text-lg">{pool.symbol}</CardTitle>
              <p className="text-sm text-muted-foreground">{pool.name}</p>
            </div>
          </div>
          <Badge variant="secondary" className="gap-1">
            {getAPYTrend(pool.apy)}
            {pool.apy.toFixed(2)}% APY
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Liquidity</p>
            <p className="text-lg font-semibold">{formatCurrency(pool.totalLiquidity)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Utilization</p>
            <p className={`text-lg font-semibold ${getUtilizationColor(pool.utilization)}`}>
              {pool.utilization.toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="w-full bg-secondary rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(pool.utilization, 100)}%` }}
          />
        </div>

        <Button onClick={() => onDeposit(pool.symbol)} className="w-full rounded-xl" size="lg">
          Deposit {pool.symbol}
        </Button>
      </CardContent>
    </Card>
  )
}
