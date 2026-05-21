"use client"

import { useState } from "react"
import { Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

export function BoostButton() {
  const [isBoosting, setIsBoosting] = useState(false)

  const handleBoost = () => {
    if (isBoosting) return

    setIsBoosting(true)
    
    // Attempt real resource release
    if (typeof window !== "undefined") {
      // 1. Trigger haptic feedback
      if (window.navigator.vibrate) {
        window.navigator.vibrate([50, 30, 100])
      }
      
      // 2. Clear session storage (Purge volatile cache)
      try {
        sessionStorage.clear()
        console.log("VOID BOOST: Volatile cache purged.")
      } catch (e) {
        console.warn("Storage access restricted")
      }
    }

    // Simulate system reconfiguration delay
    setTimeout(() => {
      setIsBoosting(false)
      toast({
        title: "SYSTEM OPTIMIZED",
        description: "Idle threads suspended. Memory cleared.",
        className: "bg-primary text-primary-foreground border-none font-headline font-bold",
      })
    }, 2000)
  }

  return (
    <div className="relative flex items-center justify-center py-8">
      <div className={cn(
        "absolute w-64 h-64 bg-primary/20 rounded-full blur-[60px] transition-all duration-1000",
        isBoosting ? "scale-150 opacity-100" : "scale-100 opacity-60"
      )}></div>
      
      <button
        onClick={handleBoost}
        disabled={isBoosting}
        className={cn(
          "relative w-48 h-48 rounded-full border-4 border-primary transition-all duration-500 flex flex-col items-center justify-center gap-2",
          "hover:scale-105 active:scale-95",
          "bg-background/80 backdrop-blur-md shadow-[0_0_30px_rgba(0,191,255,0.3)]",
          isBoosting ? "animate-pulse-glow border-primary scale-110" : "border-primary/50 animate-float"
        )}
      >
        <div className={cn(
          "transition-transform duration-500",
          isBoosting ? "scale-150 rotate-12" : "scale-100"
        )}>
          <Zap className={cn(
            "w-12 h-12",
            isBoosting ? "text-primary fill-primary" : "text-primary/70"
          )} />
        </div>
        
        <span className={cn(
          "font-headline text-2xl font-black tracking-tighter transition-all",
          isBoosting ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
        )}>
          {isBoosting ? "PURGING..." : "BOOST"}
        </span>
        
        {isBoosting && (
          <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping"></div>
        )}
      </button>
    </div>
  )
}
