"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  label: string
  value: string | number
  unit?: string
  icon: ReactNode
  className?: string
  trend?: "up" | "down" | "neutral"
}

export function StatCard({ label, value, unit, icon, className, trend }: StatCardProps) {
  return (
    <div className={cn("glass p-4 rounded-2xl flex flex-col justify-between h-32 relative overflow-hidden group hover:neon-border transition-all duration-300", className)}>
      <div className="flex justify-between items-start">
        <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
          {icon}
        </div>
        <span className="text-[10px] font-headline uppercase tracking-widest text-muted-foreground opacity-60">Live</span>
      </div>
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground font-medium">{label}</p>
        <div className="flex items-baseline gap-1">
          <h3 className="text-xl font-bold font-headline neon-text leading-none">{value}</h3>
          {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
        </div>
      </div>
      <div className="absolute -bottom-1 -right-1 w-12 h-12 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all"></div>
    </div>
  )
}