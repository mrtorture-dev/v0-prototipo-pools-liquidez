"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { WalletConnect } from "./wallet-connect"
import { cn } from "@/lib/utils"
import { Home, User, Activity, History } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Account", href: "/account", icon: User },
  { name: "Actions", href: "/actions", icon: Activity },
  { name: "History", href: "/history", icon: History },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <h1 className="text-xl font-bold">DeFi Lending</h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "inline-flex items-center gap-2 px-1 pt-1 text-sm font-medium border-b-2 transition-colors",
                      pathname === item.href
                        ? "border-primary text-foreground"
                        : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="flex items-center">
            <WalletConnect />
          </div>
        </div>
      </div>
    </nav>
  )
}
