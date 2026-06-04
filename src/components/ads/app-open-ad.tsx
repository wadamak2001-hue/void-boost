
"use client"

import { useState, useEffect } from "react"
import { X, ExternalLink, ShieldCheck, Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { logger } from "@/hooks/use-debug-logs"
import { Capacitor } from '@capacitor/core'
import { AdMob, AdOptions } from '@capacitor-community/admob'

interface AppOpenAdProps {
  onClose: () => void
}

export function AppOpenAd({ onClose }: AppOpenAdProps) {
  const [progress, setProgress] = useState(0)
  const [canClose, setCanClose] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Specific AdMob IDs for VOID BOOST
    const adUnitId = "ca-app-pub-9369472846382804/6274136018"
    
    if (Capacitor.isNativePlatform()) {
        AdMob.initialize({
            requestTrackingAuthorization: true,
        }).then(() => {
            logger.add('AdMob: Native Layer Initialized', 'success')
            
            const options: AdOptions = {
                adId: adUnitId,
                isTesting: false
            }
            AdMob.prepareInterstitial(options)
                .then(() => logger.add('AdMob: Interstitial Buffered', 'info'))
                .catch(() => logger.add('AdMob: Buffer Failed', 'warn'))
        })
    }

    const duration = 3000 
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
      logger.add('AdMob: VOID SHIELD Scan Complete', 'success')
      setTimeout(onClose, 200)
    }
  }

  return (
    <div className={`fixed inset-0 z-[200] bg-[#0A0C12] flex flex-col transition-opacity duration-300 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
      <div className="p-4 flex items-center justify-between border-b border-white/5 bg-card/50">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-primary" />
          </div>
          <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">VOID SHIELD v1.0.4</span>
        </div>
        <button 
          onClick={handleClose}
          disabled={!canClose}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            canClose ? "bg-primary text-background shadow-[0_0_15px_rgba(0,191,255,0.4)]" : "bg-white/5 text-white/20"
          }`}
        >
          {canClose ? <X className="w-5 h-5" /> : <span className="text-[12px] font-bold">{Math.max(1, Math.ceil((100 - progress) / 33.3))}</span>}
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-8 relative overflow-hidden gpu-accelerated">
        <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full -z-10 animate-pulse"></div>
        
        <div className="w-full max-w-sm aspect-[4/5] glass rounded-[2.5rem] border-primary/20 flex flex-col items-center justify-center p-6 space-y-6 relative group overflow-hidden">
          <img 
            src="https://picsum.photos/seed/voidsecurity/600/800" 
            alt="Void Shield Pro" 
            className="absolute inset-0 object-cover opacity-20 group-hover:scale-105 transition-transform [transition-duration:2000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C12] via-[#0A0C12]/60 to-transparent"></div>
          
          <div className="relative z-10 text-center space-y-4">
            <div className="w-24 h-24 mx-auto rounded-[2rem] bg-primary flex items-center justify-center shadow-[0_0_40px_rgba(0,191,255,0.6)] animate-float">
              <ShieldCheck className="w-14 h-14 text-background" />
            </div>
            <div className="space-y-1">
              <h2 className="text-4xl font-black font-headline uppercase tracking-tighter neon-text">VOID SHIELD</h2>
              <p className="text-[10px] text-primary font-bold tracking-[0.4em] uppercase">NEURAL PROTECTION</p>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed font-medium px-4">
              Analyzing system layers for zero-lag gaming environment. Authorized by VOID Ecosystem.
            </p>
          </div>

          <button className="relative z-10 w-full bg-primary text-background font-black py-4 rounded-2xl flex items-center justify-center gap-2 group-hover:shadow-[0_0_40px_rgba(0,191,255,0.6)] transition-all active:scale-95 uppercase tracking-[0.2em] text-xs">
            VERIFYING STATUS <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-8 bg-card/50 space-y-4 border-t border-white/5">
        <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          <span className="flex items-center gap-2">
             {!canClose ? <Loader2 className="w-3 h-3 animate-spin text-primary" /> : <ShieldCheck className="w-3 h-3 text-primary" />} 
             {!canClose ? "SCANNING MALWARE..." : "SYSTEM READY"}
          </span>
          <span className="text-primary font-black">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-1.5 bg-white/5" />
      </div>
    </div>
  )
}
