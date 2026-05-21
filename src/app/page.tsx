"use client"

import { useState, useEffect } from "react"
import { BoostButton } from "@/components/dashboard/boost-button"
import { DeviceMonitor } from "@/components/dashboard/device-monitor"
import { GameLauncher } from "@/components/game/game-launcher"
import { AIAdvisor } from "@/components/dashboard/ai-advisor"
import { SidebarTools } from "@/components/dashboard/sidebar-tools"
import { Shield, Settings, Bell, User } from "lucide-react"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  if (showSplash) {
    return (
      <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-[100] transition-opacity duration-1000" suppressHydrationWarning>
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full scale-150 animate-pulse"></div>
          <div className="relative animate-bounce">
            <Shield className="w-24 h-24 text-primary fill-primary/10 drop-shadow-[0_0_15px_rgba(0,191,255,0.6)]" />
          </div>
        </div>
        <h1 className="mt-8 font-headline text-4xl font-black tracking-tighter neon-text animate-pulse" translate="no">
          <span className="text-foreground">VOID</span> <span className="text-primary">BOOST</span>
        </h1>
        <p className="mt-2 text-muted-foreground font-headline tracking-[0.3em] text-[10px] uppercase opacity-60">
          <span>Hyper-Optimized Gaming</span>
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen max-w-md mx-auto bg-[#0A0C12] relative flex flex-col overflow-hidden pb-12" suppressHydrationWarning>
      <div className="absolute top-[-10%] right-[-20%] w-[100%] h-[50%] bg-primary/5 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-[-5%] left-[-10%] w-[80%] h-[40%] bg-secondary/5 blur-[100px] rounded-full -z-10"></div>

      <header className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl glass border-primary/20 flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="font-headline font-black text-xl leading-none" translate="no">
              <span className="text-foreground">VOID BOOST</span>
            </h1>
            <p className="text-[10px] text-primary font-bold tracking-widest">
              <span>SYSTEM ONLINE</span>
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-primary hover:neon-border transition-all">
            <Bell className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-primary hover:neon-border transition-all">
            <User className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-8 overflow-y-auto custom-scrollbar">
        <section className="animate-in fade-in slide-in-from-top-4 duration-700">
          <DeviceMonitor />
        </section>

        <section className="animate-in fade-in zoom-in duration-700 delay-100">
          <BoostButton />
        </section>

        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <AIAdvisor />
        </section>

        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <GameLauncher />
        </section>
      </main>

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[340px] glass h-16 rounded-3xl flex items-center justify-around px-4 border-white/5 z-40">
        <button className="p-2 rounded-xl text-primary bg-primary/10">
          <Shield className="w-6 h-6" />
        </button>
        <button className="p-2 rounded-xl text-muted-foreground hover:text-primary transition-colors">
          <CpuIcon className="w-6 h-6" />
        </button>
        <button className="p-2 rounded-xl text-muted-foreground hover:text-primary transition-colors">
          <Settings className="w-6 h-6" />
        </button>
      </nav>

      <SidebarTools />
      <Toaster />
    </div>
  )
}

function CpuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M15 2v2" />
      <path d="M15 20v2" />
      <path d="M2 15h2" />
      <path d="M2 9h2" />
      <path d="M20 15h2" />
      <path d="M20 9h2" />
      <path d="M9 2v2" />
      <path d="M9 20v2" />
    </svg>
  )
}
