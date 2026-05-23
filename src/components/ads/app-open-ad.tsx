"use client"

import { useState, useEffect } from "react"
import { X, ExternalLink, ShieldCheck, Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { logger } from "@/hooks/use-debug-logs"

interface AppOpenAdProps {
  onClose: () => void
}

export function AppOpenAd({ onClose }: AppOpenAdProps) {
  const [progress, setProgress] = useState(0)
  const [canClose, setCanClose] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const savedUnitId = localStorage.getItem('void_boost_ad_unit_id') || "TEST_MODE"
    logger.add(`AdMob: Pre-loading App Open Ad [Unit: ${savedUnitId}]`, 'info')
    
    const duration = 3000 // Optimized to 3 seconds for better UX
    const interval = 30
    const step = (interval / duration) * 100

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setCanClose(true)
          return 100
        }
        return prev + step
      })
    }, interval)

    return () => clearInterval(timer)
  }, [])

  const handleClose = () => {
    if (canClose && !isExiting) {
      setIsExiting(true)
      logger.add('AdMob: Ad Impression Success', 'success')
      // Small delay for smooth exit transition
      setTimeout(onClose, 200)
    }
  }

  return (
    <div className={`fixed inset-0 z-[200] bg-background flex flex-col transition-opacity duration-300 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
      {/* Ad Header */}
      <div className="p-4 flex items-center justify-between border-b border-white/5 bg-card/50">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-primary" />
          </div>
          <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">Sponsored Ad</span>
        </div>
        <button 
          onClick={handleClose}
          disabled={!canClose}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            canClose ? "bg-primary text-background shadow-[0_0_15px_rgba(0,191,255,0.4)]" : "bg-white/5 text-white/20"
          }`}
        >
          {canClose ? <X className="w-5 h-5" /> : <span className="text-[12px] font-bold">{Math.ceil((100 - progress) / 33.3)}</span>}
        </button>
      </div>

      {/* Ad Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-8 relative overflow-hidden gpu-accelerated">
        <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full -z-10 animate-pulse"></div>
        
        <div className="w-full aspect-[4/5] glass rounded-3xl border-primary/20 flex flex-col items-center justify-center p-6 space-y-6 relative group overflow-hidden">
          <img 
            src="https://picsum.photos/seed/voidad/600/800" 
            alt="Void Shield Pro" 
            className="absolute inset-0 object-cover opacity-30 group-hover:scale-105 transition-transform duration-[length:2000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
          
          <div className="relative z-10 text-center space-y-4">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-primary flex items-center justify-center shadow-[0_0_40px_rgba(0,191,255,0.6)] animate-float">
              <ShieldCheck className="w-12 h-12 text-background" />
            </div>
            <div className="space-y-1">
              <h2 className="text-3xl font-black font-headline uppercase tracking-tighter neon-text">VOID SHIELD</h2>
              <p className="text-xs text-primary font-bold tracking-[0.3em] uppercase">SYSTEM ARMOR</p>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
              Zero-latency protection for pro gaming. Trusted by the VOID ecosystem.
            </p>
          </div>

          <button className="relative z-10 w-full bg-primary text-background font-black py-4 rounded-2xl flex items-center justify-center gap-2 group-hover:shadow-[0_0_40px_rgba(0,191,255,0.6)] transition-all active:scale-95 uppercase tracking-widest text-sm">
            UPGRADE NOW <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Ad Footer / Progress */}
      <div className="p-6 bg-card/50 space-y-4 border-t border-white/5">
        <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          <span className="flex items-center gap-2">
             {canClose ? "READY TO BOOST" : <Loader2 className="w-3 h-3 animate-spin text-primary" />} 
             {canClose ? "SYSTEM INITIALIZED" : "LOADING DASHBOARD..."}
          </span>
          <span className="text-primary">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-1 bg-white/5" />
      </div>
    </div>
  )
}
