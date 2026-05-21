"use client"

import { Cpu, Thermometer, Database, Battery, ShieldAlert, Loader2 } from "lucide-react"
import { StatCard } from "./stat-card"
import { useHardwareStats } from "@/hooks/use-hardware-stats"
import { useState } from "react"
import { logger } from "@/hooks/use-debug-logs"

interface DeviceMonitorProps {
  hasPermission: boolean
  setHasPermission: (val: boolean) => void
  labels: any
}

export function DeviceMonitor({ hasPermission, setHasPermission, labels }: DeviceMonitorProps) {
  const [isRequesting, setIsRequesting] = useState(false)
  const stats = useHardwareStats(hasPermission)

  const handleRequestAccess = () => {
    setIsRequesting(true)
    logger.add('System: Requesting Overlay & Usage Permissions...', 'info')
    
    // Simulate Android System Dialog delay
    setTimeout(() => {
      setHasPermission(true)
      setIsRequesting(false)
      logger.add('System: Permissions Granted by User', 'success')
    }, 1200)
  }

  return (
    <div className="space-y-4">
      {!hasPermission && (
        <button 
          onClick={handleRequestAccess}
          disabled={isRequesting}
          className="w-full glass p-5 rounded-3xl flex items-center justify-between border-primary/40 bg-primary/10 hover:bg-primary/20 transition-all group animate-in slide-in-from-top-4 duration-500 active:scale-95"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-primary/20 text-primary">
              {isRequesting ? <Loader2 className="w-6 h-6 animate-spin" /> : <ShieldAlert className="w-6 h-6" />}
            </div>
            <div className="text-left rtl:text-right">
              <p className="text-sm font-black uppercase tracking-wider text-primary">{labels.permRequired}</p>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{labels.permDesc}</p>
            </div>
          </div>
          <span className="text-[10px] font-black bg-primary text-background px-4 py-2 rounded-xl group-hover:scale-105 transition-transform uppercase">
            {isRequesting ? 'Authorizing...' : labels.requestAccess}
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
          unit={hasPermission && stats.temp !== 'Locked' ? '°C' : ''} 
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
