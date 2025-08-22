"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description: string
  action?: React.ReactNode
  className?: string
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <Card className={cn("rounded-2xl", className)}>
      <CardContent className="p-8 text-center space-y-4">
        <div className="flex justify-center text-muted-foreground">{icon}</div>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
        {action && <div>{action}</div>}
      </CardContent>
    </Card>
  )
}
