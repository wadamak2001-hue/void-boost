"use client"

import { useState } from "react"
import { 
  Sun, BellOff, Camera, Video, 
  Settings, Cpu, Monitor, Lock,
  ChevronLeft
} from "lucide-react"
import { cn } from "@/lib/utils"

const TOOLS = [
  { icon: <Sun className="w-5 h-5" />, label: "Brightness" },
  { icon: <BellOff className="w-5 h-5" />, label: "DND" },
  { icon: <Camera className="w-5 h-5" />, label: "Screenshot" },
  { icon: <Video className="w-5 h-5" />, label: "Record" },
  { icon: <Cpu className="w-5 h-5" />, label: "Boost" },
  { icon: <Monitor className="w-5 h-5" />, label: "FPS Lock" },
  { icon: <Lock className="w-5 h-5" />, label: "Lock Touch" },
]

export function SidebarTools() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={cn(
      "fixed right-0 top-1/2 -translate-y-1/2 z-50 transition-transform duration-500 ease-in-out flex items-center",
      isOpen ? "translate-x-0" : "translate-x-[calc(100%-20px)]"
    )}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-24 glass rounded-l-2xl flex items-center justify-center border-r-0 hover:bg-primary/20 group transition-colors"
      >
        <ChevronLeft className={cn(
          "w-6 h-6 text-primary transition-transform duration-500",
          isOpen ? "rotate-180" : "rotate-0 group-hover:-translate-x-1"
        )} />
      </button>

      <div className="w-72 glass rounded-l-2xl p-6 border-r-0 h-[600px] overflow-y-auto custom-scrollbar">
        <div className="space-y-8">
          <div className="space-y-2">
            <h3 className="font-headline text-sm font-black text-primary tracking-widest uppercase">Gaming Tools</h3>
            <p className="text-xs text-muted-foreground">Optimize your experience</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {TOOLS.map((tool, idx) => (
              <button 
                key={idx}
                className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl glass hover:neon-border group transition-all"
              >
                <div className="text-primary group-hover:scale-110 transition-transform">
                  {tool.icon}
                </div>
                <span className="text-[10px] text-muted-foreground group-hover:text-foreground transition-colors uppercase font-medium">
                  {tool.label}
                </span>
              </button>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold">Performance</span>
              <span className="text-[10px] text-primary px-2 py-0.5 rounded-full bg-primary/20">TURBO</span>
            </div>
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-4/5 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}