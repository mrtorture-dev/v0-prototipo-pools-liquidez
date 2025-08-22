"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, TrendingUp, TrendingDown, ArrowDownUp, Wallet, Clock } from "lucide-react"

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

interface EventTableProps {
  transactions: Transaction[]
}

const actionConfig = {
  deposit: {
    label: "Deposit",
    icon: TrendingUp,
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
  withdraw: {
    label: "Withdraw",
    icon: TrendingDown,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  },
  borrow: {
    label: "Borrow",
    icon: ArrowDownUp,
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  },
  repay: {
    label: "Repay",
    icon: Wallet,
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  },
}

const statusConfig = {
  completed: {
    label: "Completed",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
  pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  },
  failed: {
    label: "Failed",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  },
}

export function EventTable({ transactions }: EventTableProps) {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(amount)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const getEtherscanUrl = (txHash: string) => {
    // Using mainnet for demo, in real app this would be dynamic based on network
    return `https://etherscan.io/tx/${txHash}`
  }

  const formatTxHash = (hash: string) => {
    return `${hash.slice(0, 6)}...${hash.slice(-4)}`
  }

  if (transactions.length === 0) {
    return (
      <Card className="rounded-2xl">
        <CardContent className="p-8 text-center space-y-4">
          <Clock className="h-12 w-12 mx-auto text-muted-foreground" />
          <div>
            <h3 className="text-lg font-semibold">No Transactions Yet</h3>
            <p className="text-muted-foreground">Your transaction history will appear here</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Transaction History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Asset</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Transaction</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => {
                const actionConf = actionConfig[tx.action]
                const statusConf = statusConfig[tx.status]
                const ActionIcon = actionConf.icon

                return (
                  <TableRow key={tx.id} className="hover:bg-muted/50">
                    <TableCell>
                      <Badge variant="secondary" className={`gap-1 ${actionConf.color}`}>
                        <ActionIcon className="h-3 w-3" />
                        {actionConf.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{formatAmount(tx.amount)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
                          {tx.asset === "USDC"
                            ? "💵"
                            : tx.asset === "WETH"
                              ? "⟠"
                              : tx.asset === "WBTC"
                                ? "₿"
                                : tx.asset === "DAI"
                                  ? "◈"
                                  : "🪙"}
                        </span>
                        <span className="font-medium">{tx.asset}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={statusConf.color}>
                        {statusConf.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{formatDate(tx.timestamp)}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1 h-8 px-2"
                        onClick={() => window.open(getEtherscanUrl(tx.txHash), "_blank")}
                      >
                        <span className="font-mono text-xs">{formatTxHash(tx.txHash)}</span>
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
