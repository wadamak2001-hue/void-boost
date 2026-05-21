
"use client"

import { useState } from "react"
import { 
  Sun, BellOff, Camera, Video, 
  Globe, ShieldCheck, Bug,
  ChevronLeft, Cloud
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"
import { type Language } from "@/app/page"
import { logger } from "@/hooks/use-debug-logs"
import { toast } from "@/hooks/use-toast"
import { GitHubDeployer } from "./github-deployer"

interface SidebarToolsProps {
  lang: Language
  setLang: (l: Language) => void
  hasPermission: boolean
  setHasPermission: (v: boolean) => void
  labels: any
}

export function SidebarTools({ lang, setLang, hasPermission, setHasPermission, labels }: SidebarToolsProps) {
  const [isOpen, setIsOpen] = useState(false)

  const TOOLS = [
    { icon: <Sun className="w-5 h-5" />, label: labels.brightness },
    { icon: <BellOff className="w-5 h-5" />, label: labels.dnd },
    { icon: <Camera className="w-5 h-5" />, label: labels.screenshot },
    { icon: <Video className="w-5 h-5" />, label: labels.record },
  ]

  const handleToggleOpen = () => setIsOpen(!isOpen)

  const handleReportBug = () => {
    logger.add('Beta Feedback Triggered: Capturing State...', 'info')
    const stateSnapshot = {
      lang,
      hasPermission,
      logs: logger.getLogs().length,
      timestamp: new Date().toISOString()
    }
    logger.add(`State Captured: ${JSON.stringify(stateSnapshot)}`, 'success')
    toast({
      title: "REPORT SAVED",
      description: "App logs and state captured for analysis.",
      className: "bg-secondary text-white font-bold"
    })
  }

  return (
    <div className={cn(
      "fixed top-1/2 -translate-y-1/2 z-50 transition-all duration-500 ease-in-out flex items-center",
      lang === 'ar' 
        ? (isOpen ? "left-0" : "left-[calc(-100%+20px)] flex-row-reverse")
        : (isOpen ? "right-0" : "right-[calc(-100%+20px)]")
    )}>
      <button 
        onClick={handleToggleOpen}
        className={cn(
          "w-10 h-24 glass flex items-center justify-center hover:bg-primary/20 group transition-colors",
          lang === 'ar' ? "rounded-r-2xl border-l-0" : "rounded-l-2xl border-r-0"
        )}
      >
        <ChevronLeft className={cn(
          "w-6 h-6 text-primary transition-transform duration-500",
          lang === 'ar' 
            ? (isOpen ? "rotate-0" : "rotate-180")
            : (isOpen ? "rotate-180" : "rotate-0")
        )} />
      </button>

      <div className={cn(
        "w-72 glass p-6 h-[85vh] overflow-y-auto custom-scrollbar shadow-2xl",
        lang === 'ar' ? "rounded-r-2xl border-l-0" : "rounded-l-2xl border-r-0"
      )}>
        <div className="space-y-8">
          <div className="space-y-2">
            <h3 className="font-headline text-sm font-black text-primary tracking-widest uppercase">{labels.tools}</h3>
            <p className="text-xs text-muted-foreground">{labels.toolsDesc}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl glass border-white/5">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-primary" />
                <span className="text-xs font-bold">{labels.lang}</span>
              </div>
              <button 
                onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                className="text-[10px] font-black uppercase text-primary bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20"
              >
                {lang === 'en' ? 'العربية' : 'ENGLISH'}
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl glass border-white/5">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-secondary" />
                <span className="text-xs font-bold">{labels.sysAccess}</span>
              </div>
              <Switch 
                checked={hasPermission} 
                onCheckedChange={setHasPermission}
              />
            </div>

            <button 
              onClick={handleReportBug}
              className="w-full flex items-center justify-between p-4 rounded-xl glass border-white/5 hover:bg-secondary/10 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Bug className="w-5 h-5 text-secondary group-hover:animate-bounce" />
                <span className="text-xs font-bold uppercase tracking-wider">{labels.report}</span>
              </div>
            </button>
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

          <GitHubDeployer />
        </div>
      </div>
    </div>
  )
}
