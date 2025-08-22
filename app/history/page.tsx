"use client"

import { EventTable } from "@/components/event-table"
import { useTransactionHistory } from "@/hooks/use-transaction-history"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useAccount } from "wagmi"
import { WalletConnect } from "@/components/wallet-connect"
import { History } from "lucide-react"

export default function HistoryPage() {
  const { isConnected } = useAccount()
  const { transactions, loading } = useTransactionHistory()

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Transaction History</h1>
          <p className="text-muted-foreground mt-2">View your lending and borrowing activity</p>
        </div>

        <Card className="rounded-2xl max-w-md mx-auto">
          <CardContent className="p-8 text-center space-y-4">
            <History className="h-12 w-12 mx-auto text-muted-foreground" />
            <div>
              <h3 className="text-lg font-semibold">Connect Your Wallet</h3>
              <p className="text-muted-foreground">Connect your wallet to view transaction history</p>
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
        <h1 className="text-3xl font-bold">Transaction History</h1>
        <p className="text-muted-foreground mt-2">View your lending and borrowing activity</p>
      </div>

      {loading ? (
        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <div className="space-y-4">
              <Skeleton className="h-6 w-48" />
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <EventTable transactions={transactions} />
      )}

      {!loading && transactions.length > 0 && (
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Card className="rounded-2xl">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {transactions.filter((tx) => tx.action === "deposit").length}
                </p>
                <p className="text-sm text-muted-foreground">Total Deposits</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {transactions.filter((tx) => tx.action === "borrow").length}
                </p>
                <p className="text-sm text-muted-foreground">Total Borrows</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {transactions.filter((tx) => tx.status === "completed").length}
                </p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
