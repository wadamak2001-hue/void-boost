"use client"

import { Cpu, Thermometer, Database, Battery } from "lucide-react"
import { StatCard } from "./stat-card"
import { useHardwareStats } from "@/hooks/use-hardware-stats"

export function DeviceMonitor() {
  const stats = useHardwareStats()

  return (
    <div className="grid grid-cols-2 gap-4">
      <StatCard 
        label="LIVE FPS" 
        value={stats.fps} 
        unit={typeof stats.fps === 'number' ? 'Hz' : ''}
        icon={<Cpu className="w-5 h-5" />} 
      />
      <StatCard 
        label="THERMAL STATUS" 
        value={stats.temp} 
        unit="" 
        icon={<Thermometer className="w-5 h-5" />} 
      />
      <StatCard 
        label="HEAP MEMORY" 
        value={stats.ramUsed} 
        unit={stats.ramUsed !== '---' ? 'GB' : ''} 
        icon={<Database className="w-5 h-5" />} 
      />
      <StatCard 
        label="BATTERY LEVEL" 
        value={stats.battery} 
        unit={stats.battery !== '---' ? '%' : ''} 
        icon={<Battery className={stats.isCharging ? "text-green-500 w-5 h-5" : "w-5 h-5"} />} 
      />
    </div>
  )
}
