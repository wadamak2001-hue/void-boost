"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Lock } from "lucide-react"

interface StatCardProps {
  label: string
  value: string | number
  unit?: string
  icon: ReactNode
  className?: string
  trend?: "up" | "down" | "neutral"
  locked?: boolean
  onClick?: () => void
}

export function StatCard({ label, value, unit, icon, className, locked, onClick }: StatCardProps) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "glass p-4 rounded-3xl flex flex-col justify-between h-32 relative overflow-hidden group transition-all duration-300 border border-white/5",
        locked ? "opacity-60 grayscale cursor-pointer hover:bg-white/5" : "hover:neon-border bg-white/5",
        className
      )}
    >
      <div className="flex justify-between items-start">
        <div className={cn(
          "p-2 rounded-xl transition-colors",
          locked ? "bg-muted text-muted-foreground" : "bg-primary/20 text-primary group-hover:bg-primary/30"
        )}>
          {locked ? <Lock className="w-5 h-5" /> : icon}
        </div>
        <span className={cn(
          "text-[9px] font-headline uppercase tracking-widest font-bold",
          locked ? "text-muted-foreground/40" : "text-primary animate-pulse"
        )}>
          {locked ? 'Locked' : 'Active'}
        </span>
      </div>
      <div className="space-y-1">
        <p className="text-[9px] text-muted-foreground font-black uppercase tracking-tighter truncate opacity-70">{label}</p>
        <div className="flex items-baseline gap-1">
          <h3 className={cn(
            "text-xl font-bold font-headline leading-none tracking-tight",
            !locked ? "neon-text text-foreground" : "text-muted-foreground"
          )}>
            {value}
          </h3>
          {unit && !locked && <span className="text-[10px] text-muted-foreground font-bold">{unit}</span>}
        </div>
      </div>
      {!locked && (
        <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all"></div>
      )}
    </div>
  )
}
