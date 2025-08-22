"use client"

import { PoolCard } from "@/components/pool-card"
import { usePoolData } from "@/hooks/use-pool-data"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"

export default function Dashboard() {
  const { pools, loading } = usePoolData()
  const { toast } = useToast()

  const handleDeposit = (symbol: string) => {
    toast({
      title: "Deposit Action",
      description: `Redirecting to deposit ${symbol}...`,
    })
    // In a real app, this would navigate to the actions page with the selected pool
    // router.push(`/actions?action=deposit&asset=${symbol}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Lending Pools</h1>
        <p className="text-muted-foreground mt-2">Deposit assets to earn yield or borrow against your collateral</p>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="rounded-2xl">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-5 w-12" />
                    </div>
                  </div>
                  <Skeleton className="h-2 w-full rounded-full" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pools.map((pool) => (
            <PoolCard key={pool.symbol} pool={pool} onDeposit={handleDeposit} />
          ))}
        </div>
      )}

      {!loading && pools.length === 0 && (
        <Card className="rounded-2xl">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No pools available at the moment.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
