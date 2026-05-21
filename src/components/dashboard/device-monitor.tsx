
"use client"

import { Cpu, Thermometer, Database, Battery, Lock, ShieldAlert } from "lucide-react"
import { StatCard } from "./stat-card"
import { useHardwareStats } from "@/hooks/use-hardware-stats"
import { Button } from "@/components/ui/button"

interface DeviceMonitorProps {
  hasPermission: boolean
  setHasPermission: (val: boolean) => void
  labels: any
}

export function DeviceMonitor({ hasPermission, setHasPermission, labels }: DeviceMonitorProps) {
  const stats = useHardwareStats(hasPermission)

  const handleRequestAccess = () => {
    // Simulate Android system permission request
    setHasPermission(true)
  }

  return (
    <div className="space-y-4">
      {!hasPermission && (
        <button 
          onClick={handleRequestAccess}
          className="w-full glass p-4 rounded-2xl flex items-center justify-between border-primary/30 bg-primary/5 hover:bg-primary/10 transition-all group animate-in fade-in slide-in-from-top-4 duration-500"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/20 text-primary">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="text-left rtl:text-right">
              <p className="text-xs font-black uppercase tracking-wider text-primary">{labels.permRequired}</p>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{labels.permDesc}</p>
            </div>
          </div>
          <span className="text-[10px] font-black bg-primary text-background px-3 py-1.5 rounded-lg group-hover:scale-105 transition-transform">
            {labels.requestAccess}
          </span>
        </button>
      )}
      
      <div className="grid grid-cols-2 gap-4">
        <StatCard 
          label={labels.fps} 
          value={hasPermission ? stats.fps : '---'} 
          unit={hasPermission && typeof stats.fps === 'number' ? 'Hz' : ''}
          icon={<Cpu className="w-5 h-5" />} 
          locked={!hasPermission}
          onClick={!hasPermission ? handleRequestAccess : undefined}
        />
        <StatCard 
          label={labels.thermal} 
          value={hasPermission ? stats.temp : '---'} 
          unit={hasPermission && typeof stats.temp === 'number' ? '°C' : ''} 
          icon={<Thermometer className="w-5 h-5" />} 
          locked={!hasPermission}
          onClick={!hasPermission ? handleRequestAccess : undefined}
        />
        <StatCard 
          label={labels.heap} 
          value={hasPermission ? stats.ramUsed : '---'} 
          unit={hasPermission && stats.ramUsed !== '---' ? 'GB' : ''} 
          icon={<Database className="w-5 h-5" />} 
          locked={!hasPermission}
          onClick={!hasPermission ? handleRequestAccess : undefined}
        />
        <StatCard 
          label={labels.battery} 
          value={hasPermission ? stats.battery : '---'} 
          unit={hasPermission && stats.battery !== '---' ? '%' : ''} 
          icon={<Battery className={hasPermission && stats.isCharging ? "text-green-500 w-5 h-5" : "w-5 h-5"} />} 
          locked={!hasPermission}
          onClick={!hasPermission ? handleRequestAccess : undefined}
        />
      </div>
    </div>
  )
}
