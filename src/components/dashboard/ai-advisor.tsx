"use client"

import { useState } from "react"
import { BrainCircuit, Loader2, CheckCircle2 } from "lucide-react"
import { aiOptimizedGamingProfile, type AIOptimizedGamingProfileOutput } from "@/ai/flows/ai-optimized-gaming-profile"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function AIAdvisor() {
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState<AIOptimizedGamingProfileOutput | null>(null)

  const analyze = async () => {
    setLoading(true)
    try {
      const result = await aiOptimizedGamingProfile({
        gameName: "PUBG Mobile",
        gameGenre: "Battle Royale",
        cpuUsagePercent: 68,
        ramUsageMB: 4200,
        totalRamMB: 8192,
        batteryLevelPercent: 72,
        deviceTemperatureCelsius: 38,
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
          <h2 className="font-headline text-lg font-bold">AI GAMING MODE</h2>
          <p className="text-xs text-muted-foreground">Smart optimization based on status</p>
        </div>
      </div>

      {!profile && !loading && (
        <div className="py-4">
          <Button 
            onClick={analyze}
            className="w-full bg-secondary hover:bg-secondary/80 text-white font-headline font-bold py-6 rounded-2xl shadow-[0_0_20px_rgba(122,92,255,0.4)]"
          >
            START AI ANALYSIS
          </Button>
        </div>
      )}

      {loading && (
        <div className="py-8 flex flex-col items-center justify-center gap-4 text-secondary">
          <Loader2 className="w-12 h-12 animate-spin" />
          <p className="font-headline font-bold animate-pulse text-sm">ANALYZING DEVICE HEALTH...</p>
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