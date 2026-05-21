
"use client"

import { Cpu, Thermometer, Database, Battery, Lock } from "lucide-react"
import { StatCard } from "./stat-card"
import { useHardwareStats } from "@/hooks/use-hardware-stats"

interface DeviceMonitorProps {
  hasPermission: boolean
  labels: any
}

export function DeviceMonitor({ hasPermission, labels }: DeviceMonitorProps) {
  const stats = useHardwareStats(hasPermission)

  return (
    <div className="space-y-4">
      {!hasPermission && (
        <div className="glass p-3 rounded-2xl flex items-center gap-3 border-secondary/30 bg-secondary/5 animate-pulse">
          <Lock className="w-4 h-4 text-secondary" />
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{labels.permDesc}</p>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-4">
        <StatCard 
          label={labels.fps} 
          value={hasPermission ? stats.fps : '---'} 
          unit={hasPermission && typeof stats.fps === 'number' ? 'Hz' : ''}
          icon={<Cpu className="w-5 h-5" />} 
        />
        <StatCard 
          label={labels.thermal} 
          value={hasPermission ? stats.temp : 'Locked'} 
          unit="" 
          icon={<Thermometer className="w-5 h-5" />} 
        />
        <StatCard 
          label={labels.heap} 
          value={hasPermission ? stats.ramUsed : '---'} 
          unit={hasPermission && stats.ramUsed !== '---' ? 'GB' : ''} 
          icon={<Database className="w-5 h-5" />} 
        />
        <StatCard 
          label={labels.battery} 
          value={hasPermission ? stats.battery : '---'} 
          unit={hasPermission && stats.battery !== '---' ? '%' : ''} 
          icon={<Battery className={hasPermission && stats.isCharging ? "text-green-500 w-5 h-5" : "w-5 h-5"} />} 
        />
      </div>
    </div>
  )
}
