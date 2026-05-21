
"use client"

import { useState } from "react"
import { BrainCircuit, Loader2, CheckCircle2, Lock } from "lucide-react"
import { aiOptimizedGamingProfile, type AIOptimizedGamingProfileOutput } from "@/ai/flows/ai-optimized-gaming-profile"
import { Button } from "@/components/ui/button"
import { useHardwareStats } from "@/hooks/use-hardware-stats"

interface AIAdvisorProps {
  labels: any
  hasPermission: boolean
}

export function AIAdvisor({ labels, hasPermission }: AIAdvisorProps) {
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState<AIOptimizedGamingProfileOutput | null>(null)
  const stats = useHardwareStats(hasPermission)

  const analyze = async () => {
    if (!hasPermission) return
    setLoading(true)
    try {
      const result = await aiOptimizedGamingProfile({
        gameName: "Dynamic Session",
        gameGenre: "Active Process",
        cpuUsagePercent: typeof stats.fps === 'number' ? Math.min(100, (stats.fps / 60) * 80) : 50,
        ramUsageMB: typeof stats.ramUsed === 'string' && stats.ramUsed !== '---' ? parseFloat(stats.ramUsed) * 1024 : 2048,
        totalRamMB: typeof stats.ramTotal === 'string' && stats.ramTotal !== '---' ? parseFloat(stats.ramTotal) * 1024 : 8192,
        batteryLevelPercent: typeof stats.battery === 'number' ? stats.battery : 50,
        deviceTemperatureCelsius: stats.temp === 'Locked' ? 35 : 40,
        currentBrightnessPercent: 80,
        notificationsEnabled: true
      })
      setProfile(result)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass p-6 rounded-3xl space-y-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <BrainCircuit className="w-24 h-24 text-secondary" />
      </div>

      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-secondary/20 text-secondary">
          <BrainCircuit className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-headline text-lg font-bold uppercase">{labels.aiMode}</h2>
          <p className="text-xs text-muted-foreground">{labels.aiDesc}</p>
        </div>
      </div>

      {!profile && !loading && (
        <div className="py-4">
          <Button 
            onClick={analyze}
            disabled={!hasPermission}
            className="w-full bg-secondary hover:bg-secondary/80 text-white font-headline font-bold py-6 rounded-2xl shadow-[0_0_20px_rgba(122,92,255,0.4)] disabled:opacity-50 disabled:grayscale"
          >
            {!hasPermission ? (
              <span className="flex items-center gap-2">
                <Lock className="w-4 h-4" /> ACCESS REQUIRED
              </span>
            ) : (
              "START REAL-TIME ANALYSIS"
            )}
          </Button>
        </div>
      )}

      {loading && (
        <div className="py-8 flex flex-col items-center justify-center gap-4 text-secondary">
          <Loader2 className="w-12 h-12 animate-spin" />
          <p className="font-headline font-bold animate-pulse text-sm">SCANNING HARDWARE LAYERS...</p>
        </div>
      )}

      {profile && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Profile</p>
              <p className="text-secondary font-black text-sm uppercase">{profile.suggestedPerformanceProfile}</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Brightness</p>
              <p className="text-primary font-black text-sm uppercase">{profile.suggestedBrightnessPercent}%</p>
            </div>
          </div>
          
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">DND Mode</p>
              <p className="font-bold text-sm">{profile.suggestedNotificationControl}</p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground italic leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/5">
            "{profile.explanation}"
          </p>

          <Button 
            variant="ghost" 
            onClick={() => setProfile(null)}
            className="w-full text-[10px] font-bold tracking-widest uppercase opacity-50 hover:opacity-100"
          >
            REFRESH STATUS
          </Button>
        </div>
      )}
    </div>
  )
}
