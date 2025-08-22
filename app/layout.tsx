import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { WagmiProviders } from "@/providers/wagmi-provider"
import { Navbar } from "@/components/navbar"

export const metadata: Metadata = {
  title: "DeFi Lending dApp",
  description: "Decentralized lending platform with dynamic collateral",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <WagmiProviders>
          <Navbar />
          <main className="min-h-screen bg-background">{children}</main>
        </WagmiProviders>
      </body>
    </html>
  )
}
