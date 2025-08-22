"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingDown, Shield, AlertTriangle, DollarSign } from "lucide-react"

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

interface AccountStatsProps {
  accountData: AccountData
}

export function AccountStats({ accountData }: AccountStatsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const getHealthFactorColor = (hf: number) => {
    if (hf >= 2.0) return "text-green-600"
    if (hf >= 1.5) return "text-yellow-600"
    if (hf >= 1.2) return "text-orange-600"
    return "text-red-600"
  }

  const getHealthFactorBgColor = (hf: number) => {
    if (hf >= 2.0) return "from-green-500 to-green-600"
    if (hf >= 1.5) return "from-yellow-500 to-yellow-600"
    if (hf >= 1.2) return "from-orange-500 to-orange-600"
    return "from-red-500 to-red-600"
  }

  const getHealthFactorIcon = (hf: number) => {
    if (hf >= 1.5) return <Shield className="h-5 w-5 text-green-600" />
    return <AlertTriangle className="h-5 w-5 text-red-600" />
  }

  const getRiskScoreColor = (score: number) => {
    if (score <= 30) return "text-green-600"
    if (score <= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const healthFactorPercentage = Math.min((accountData.healthFactor / 3) * 100, 100)

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Collateral</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span className="text-2xl font-bold text-green-600">{formatCurrency(accountData.totalCollateral)}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Debt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-red-600" />
              <span className="text-2xl font-bold text-red-600">{formatCurrency(accountData.totalDebt)}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              Health Factor
              {getHealthFactorIcon(accountData.healthFactor)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <span className={`text-2xl font-bold ${getHealthFactorColor(accountData.healthFactor)}`}>
                {accountData.healthFactor.toFixed(2)}
              </span>
              <div className="w-full bg-secondary rounded-full h-3">
                <div
                  className={`bg-gradient-to-r ${getHealthFactorBgColor(accountData.healthFactor)} h-3 rounded-full transition-all duration-500`}
                  style={{ width: `${healthFactorPercentage}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {accountData.healthFactor >= 1.5
                  ? "Healthy"
                  : accountData.healthFactor >= 1.2
                    ? "At Risk"
                    : "Liquidation Risk"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Risk Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className={`text-2xl font-bold ${getRiskScoreColor(accountData.riskScore)}`}>
                {accountData.riskScore}
              </span>
              <Badge
                variant={
                  accountData.riskScore <= 30 ? "default" : accountData.riskScore <= 60 ? "secondary" : "destructive"
                }
              >
                {accountData.riskScore <= 30 ? "Low" : accountData.riskScore <= 60 ? "Medium" : "High"}
              </Badge>
            </div>
            <div className="mt-3 w-full bg-secondary rounded-full h-2">
              <div
                className={`bg-gradient-to-r ${getRiskScoreColor(accountData.riskScore) === "text-green-600" ? "from-green-500 to-green-600" : getRiskScoreColor(accountData.riskScore) === "text-yellow-600" ? "from-yellow-500 to-yellow-600" : "from-red-500 to-red-600"} h-2 rounded-full transition-all duration-500`}
                style={{ width: `${accountData.riskScore}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Collateral Assets */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Collateral Assets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {accountData.collateralAssets.map((asset) => (
                <div key={asset.symbol} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                      {asset.icon}
                    </div>
                    <div>
                      <p className="font-medium">{asset.symbol}</p>
                      <p className="text-sm text-muted-foreground">{asset.amount.toFixed(4)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(asset.value)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Debt Assets */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-red-600" />
              Debt Assets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {accountData.debtAssets.length > 0 ? (
                accountData.debtAssets.map((asset) => (
                  <div key={asset.symbol} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center text-white text-sm font-bold">
                        {asset.icon}
                      </div>
                      <div>
                        <p className="font-medium">{asset.symbol}</p>
                        <p className="text-sm text-muted-foreground">{asset.amount.toFixed(4)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-red-600">{formatCurrency(asset.value)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No debt positions</p>
                  <p className="text-sm">You can borrow against your collateral</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
