"use client"

import { AccountStats } from "@/components/account-stats"
import { useAccountData } from "@/hooks/use-account-data"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useAccount } from "wagmi"
import { WalletConnect } from "@/components/wallet-connect"
import { Wallet } from "lucide-react"

export default function Account() {
  const { isConnected } = useAccount()
  const { accountData, loading } = useAccountData()

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Account</h1>
          <p className="text-muted-foreground mt-2">Monitor your collateral, debt, and account health</p>
        </div>

        <Card className="rounded-2xl max-w-md mx-auto">
          <CardContent className="p-8 text-center space-y-4">
            <Wallet className="h-12 w-12 mx-auto text-muted-foreground" />
            <div>
              <h3 className="text-lg font-semibold">Connect Your Wallet</h3>
              <p className="text-muted-foreground">Connect your wallet to view your account details</p>
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
        <h1 className="text-3xl font-bold">My Account</h1>
        <p className="text-muted-foreground mt-2">Monitor your collateral, debt, and account health</p>
      </div>

      {loading ? (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="rounded-2xl">
                <CardContent className="p-6 space-y-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-32" />
                  <Skeleton className="h-2 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <Card key={i} className="rounded-2xl">
                <CardContent className="p-6 space-y-4">
                  <Skeleton className="h-6 w-32" />
                  <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, j) => (
                      <div key={j} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                        <div className="flex items-center gap-3">
                          <Skeleton className="w-8 h-8 rounded-full" />
                          <div className="space-y-1">
                            <Skeleton className="h-4 w-12" />
                            <Skeleton className="h-3 w-16" />
                          </div>
                        </div>
                        <Skeleton className="h-4 w-20" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : accountData ? (
        <AccountStats accountData={accountData} />
      ) : (
        <Card className="rounded-2xl">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No account data available.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
