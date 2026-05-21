
"use client"

import { useState, useEffect } from "react"
import { X, ExternalLink, ShieldCheck } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { logger } from "@/hooks/use-debug-logs"

interface AppOpenAdProps {
  onClose: () => void
  adUnitId?: string
}

export function AppOpenAd({ onClose, adUnitId }: AppOpenAdProps) {
  const [progress, setProgress] = useState(0)
  const [canClose, setCanClose] = useState(false)

  useEffect(() => {
    logger.add(`AdMob: Initializing App Open Ad [ID: ${adUnitId || 'DEFAULT_TEST'}]`, 'info')
    
    const duration = 5000 // 5 seconds
    const interval = 50
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
  }, [adUnitId])

  const handleClose = () => {
    if (canClose) {
      logger.add('AdMob: Ad Dismissed', 'success')
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-[200] bg-background flex flex-col animate-in fade-in duration-300">
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
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            canClose ? "bg-white/10 text-white hover:bg-white/20" : "bg-white/5 text-white/20"
          }`}
        >
          {canClose ? <X className="w-4 h-4" /> : <span className="text-[10px]">{Math.ceil((100 - progress) / 20)}</span>}
        </button>
      </div>

      {/* Ad Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full -z-10 animate-pulse"></div>
        
        <div className="w-full aspect-[4/5] glass rounded-3xl border-primary/20 flex flex-col items-center justify-center p-6 space-y-6 relative group overflow-hidden">
          <img 
            src="https://picsum.photos/seed/voidad/600/800" 
            alt="Ad Content" 
            className="absolute inset-0 object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
          
          <div className="relative z-10 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-primary flex items-center justify-center shadow-[0_0_30px_rgba(0,191,255,0.5)]">
              <ShieldCheck className="w-10 h-10 text-background" />
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-black font-headline uppercase tracking-tighter">VOID SHIELD PRO</h2>
              <p className="text-xs text-primary font-bold tracking-widest uppercase">Elite Security & VPN</p>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
              Unlock maximum protection and zero-lag server switching with Void Shield. The ultimate companion for professional gamers.
            </p>
          </div>

          <button className="relative z-10 w-full bg-primary text-background font-black py-4 rounded-2xl flex items-center justify-center gap-2 group-hover:shadow-[0_0_40px_rgba(0,191,255,0.6)] transition-all active:scale-95">
            INSTALL NOW <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Ad Footer / Progress */}
      <div className="p-6 bg-card/50 space-y-4 border-t border-white/5">
        <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          <span>Loading Dashboard...</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-1 bg-white/5" />
      </div>
    </div>
  )
}
