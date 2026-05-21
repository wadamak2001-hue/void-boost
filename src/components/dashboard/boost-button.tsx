
"use client"

import { useState } from "react"
import { Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

interface BoostButtonProps {
  labels: any
}

export function BoostButton({ labels }: BoostButtonProps) {
  const [isBoosting, setIsBoosting] = useState(false)

  const handleBoost = () => {
    if (isBoosting) return

    setIsBoosting(true)
    
    // Simulate Native System Haptics & Garbage Collection
    if (typeof window !== "undefined") {
      if (window.navigator.vibrate) {
        window.navigator.vibrate([50, 30, 100])
      }
      
      try {
        // Real-world clearing of browser cache/state for performance
        sessionStorage.clear()
        localStorage.removeItem('void_boost_temp_cache') 
        
        // Simulating memory heap pressure release
        const releaseBuffer = new Array(1000).fill(null);
        releaseBuffer.length = 0;
      } catch (e) {}
    }

    setTimeout(() => {
      setIsBoosting(false)
      toast({
        title: labels.optimized,
        description: labels.optimizedDesc,
        className: "bg-primary text-primary-foreground border-none font-headline font-bold",
      })
    }, 1200)
  }

  return (
    <div className="relative flex items-center justify-center py-4 pointer-events-auto">
      <div className={cn(
        "absolute w-64 h-64 bg-primary/20 rounded-full blur-[60px] transition-all duration-300",
        isBoosting ? "scale-150 opacity-100" : "scale-100 opacity-60"
      )}></div>
      
      <button
        onClick={handleBoost}
        disabled={isBoosting}
        className={cn(
          "relative w-44 h-44 rounded-full border-4 border-primary transition-all duration-200 flex flex-col items-center justify-center gap-2",
          "hover:scale-105 active:scale-95 pointer-events-auto",
          "bg-background/80 backdrop-blur-md shadow-[0_0_30px_rgba(0,191,255,0.3)]",
          isBoosting ? "animate-pulse border-primary scale-110" : "border-primary/50 animate-float"
        )}
      >
        <div className={cn(
          "transition-transform duration-300",
          isBoosting ? "scale-150 rotate-12" : "scale-100"
        )}>
          <Zap className={cn(
            "w-10 h-10",
            isBoosting ? "text-primary fill-primary" : "text-primary/70"
          )} />
        </div>
        
        <span className={cn(
          "font-headline text-xl font-black tracking-tighter transition-all",
          isBoosting ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
        )}>
          {isBoosting ? labels.purging : labels.boost}
        </span>
        
        {isBoosting && (
          <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping"></div>
        )}
      </button>
    </div>
  )
}
