"use client"

import { Cpu, Thermometer, Database, Battery } from "lucide-react"
import { StatCard } from "./stat-card"
import { useState, useEffect } from "react"

export function DeviceMonitor() {
  const [stats, setStats] = useState({
    fps: 60,
    temp: 36.5,
    ram: 4.2,
    battery: 82
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        fps: Math.floor(Math.random() * (62 - 58 + 1) + 58),
        temp: Number((prev.temp + (Math.random() * 0.4 - 0.2)).toFixed(1)),
        ram: Number((prev.ram + (Math.random() * 0.1 - 0.05)).toFixed(1)),
        battery: prev.battery
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-2 gap-4">
      <StatCard 
        label="FPS" 
        value={stats.fps} 
        icon={<Cpu className="w-5 h-5" />} 
      />
      <StatCard 
        label="TEMPERATURE" 
        value={stats.temp} 
        unit="°C" 
        icon={<Thermometer className="w-5 h-5" />} 
      />
      <StatCard 
        label="RAM USAGE" 
        value={stats.ram} 
        unit="GB" 
        icon={<Database className="w-5 h-5" />} 
      />
      <StatCard 
        label="BATTERY" 
        value={stats.battery} 
        unit="%" 
        icon={<Battery className="w-5 h-5" />} 
      />
    </div>
  )
}