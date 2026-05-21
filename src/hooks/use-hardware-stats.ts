"use client"

import { useState, useEffect } from "react"

export interface HardwareStats {
  fps: number | string
  temp: number | string
  ramUsed: number | string
  ramTotal: number | string
  battery: number | string
  isCharging: boolean
}

export function useHardwareStats() {
  const [stats, setStats] = useState<HardwareStats>({
    fps: "---",
    temp: "Locked",
    ramUsed: "---",
    ramTotal: "---",
    battery: "---",
    isCharging: false,
  })

  useEffect(() => {
    let frames = 0
    let lastTime = performance.now()
    let rafId: number

    const calculateFPS = (now: number) => {
      frames++
      if (now > lastTime + 1000) {
        const currentFps = Math.round((frames * 1000) / (now - lastTime))
        setStats((prev) => ({ ...prev, fps: currentFps }))
        lastTime = now
        frames = 0
      }
      rafId = requestAnimationFrame(calculateFPS)
    }

    rafId = requestAnimationFrame(calculateFPS)

    const updateBattery = async () => {
      if ("getBattery" in navigator) {
        try {
          const battery = await (navigator as any).getBattery()
          const batteryUpdate = () => {
            setStats((prev) => ({
              ...prev,
              battery: Math.round(battery.level * 100),
              isCharging: battery.charging,
            }))
          }
          battery.addEventListener("levelchange", batteryUpdate)
          battery.addEventListener("chargingchange", batteryUpdate)
          batteryUpdate()
        } catch (e) {
          console.error("Battery API access denied")
        }
      }
    }

    const updateMemory = () => {
      const mem = (performance as any).memory
      if (mem) {
        setStats((prev) => ({
          ...prev,
          ramUsed: (mem.usedJSHeapSize / (1024 * 1024 * 1024)).toFixed(1),
          ramTotal: (mem.jsHeapSizeLimit / (1024 * 1024 * 1024)).toFixed(1),
        }))
      }
    }

    updateBattery()
    const memInterval = setInterval(updateMemory, 2000)
    updateMemory()

    return () => {
      cancelAnimationFrame(rafId)
      clearInterval(memInterval)
    }
  }, [])

  return stats
}
