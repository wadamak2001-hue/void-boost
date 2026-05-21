
"use client"

import { useState } from "react"
import { 
  Sun, BellOff, Camera, Video, 
  Settings, Cpu, Monitor, Lock,
  ChevronLeft, Globe, ShieldCheck
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { type Language } from "@/app/page"

const TOOLS = [
  { icon: <Sun className="w-5 h-5" />, label: "Brightness" },
  { icon: <BellOff className="w-5 h-5" />, label: "DND" },
  { icon: <Camera className="w-5 h-5" />, label: "Screenshot" },
  { icon: <Video className="w-5 h-5" />, label: "Record" },
]

interface SidebarToolsProps {
  lang: Language
  setLang: (l: Language) => void
  hasPermission: boolean
  setHasPermission: (v: boolean) => void
  labels: any
}

export function SidebarTools({ lang, setLang, hasPermission, setHasPermission, labels }: SidebarToolsProps) {
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
            <h3 className="font-headline text-sm font-black text-primary tracking-widest uppercase">{labels.tools}</h3>
            <p className="text-xs text-muted-foreground">{labels.toolsDesc}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl glass">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-primary" />
                <span className="text-xs font-bold">{labels.lang}</span>
              </div>
              <button 
                onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                className="text-[10px] font-black uppercase text-primary bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20"
              >
                {lang === 'en' ? 'ARABIC' : 'ENGLISH'}
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl glass">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-secondary" />
                <span className="text-xs font-bold">{labels.sysAccess}</span>
              </div>
              <Switch 
                checked={hasPermission} 
                onCheckedChange={setHasPermission}
              />
            </div>
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
        </div>
      </div>
    </div>
  )
}
