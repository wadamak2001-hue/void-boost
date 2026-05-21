
"use client"

import { useState, useEffect } from "react"
import { BoostButton } from "@/components/dashboard/boost-button"
import { DeviceMonitor } from "@/components/dashboard/device-monitor"
import { GameLauncher } from "@/components/game/game-launcher"
import { AIAdvisor } from "@/components/dashboard/ai-advisor"
import { SidebarTools } from "@/components/dashboard/sidebar-tools"
import { Shield, Bell, User, Cpu } from "lucide-react"
import { Toaster } from "@/components/ui/toaster"

export type Language = 'en' | 'ar';

const DICTIONARY = {
  en: {
    brand: "VOID BOOST",
    status: "SYSTEM ONLINE",
    boost: "BOOST",
    purging: "PURGING...",
    fps: "LIVE FPS",
    thermal: "THERMAL STATUS",
    heap: "HEAP MEMORY",
    battery: "BATTERY LEVEL",
    library: "GAME LIBRARY",
    add: "ADD",
    noGames: "0 GAMES LINKED",
    aiMode: "AI GAMING MODE",
    aiDesc: "Smart optimization based on live status",
    tools: "Gaming Tools",
    toolsDesc: "Optimize your experience",
    sysAccess: "System Access",
    lang: "Language",
    optimized: "SYSTEM OPTIMIZED",
    optimizedDesc: "Idle threads suspended. Memory cleared."
  },
  ar: {
    brand: "فويد بوست",
    status: "النظام متصل",
    boost: "تعزيز",
    purging: "جاري التنظيف...",
    fps: "الإطارات الحية",
    thermal: "الحالة الحرارية",
    heap: "ذاكرة الكومة",
    battery: "مستوى البطارية",
    library: "مكتبة الألعاب",
    add: "إضافة",
    noGames: "0 ألعاب مرتبطة",
    aiMode: "وضع الألعاب الذكي",
    aiDesc: "تحسين ذكي بناءً على الحالة الحية",
    tools: "أدوات الألعاب",
    toolsDesc: "تحسين تجربتك",
    sysAccess: "الوصول للنظام",
    lang: "اللغة",
    optimized: "تم تحسين النظام",
    optimizedDesc: "تم تعليق العمليات الخاملة. تم مسح الذاكرة."
  }
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)
  const [lang, setLang] = useState<Language>('en')
  const [hasPermission, setHasPermission] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  const t = DICTIONARY[lang]

  if (showSplash) {
    return (
      <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-[100]" suppressHydrationWarning>
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
    <div 
      className={`min-h-screen max-w-md mx-auto bg-[#0A0C12] relative flex flex-col overflow-hidden pb-12 ${lang === 'ar' ? 'rtl' : 'ltr'}`} 
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      suppressHydrationWarning
    >
      <div className="absolute top-[-10%] right-[-20%] w-[100%] h-[50%] bg-primary/5 blur-[120px] rounded-full -z-10"></div>
      
      <header className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl glass border-primary/20 flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="font-headline font-black text-xl leading-none" translate="no">
              <span className="text-foreground">{t.brand}</span>
            </h1>
            <p className="text-[10px] text-primary font-bold tracking-widest">
              <span>{t.status}</span>
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-primary transition-all">
            <Bell className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-primary transition-all">
            <User className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-8 overflow-y-auto custom-scrollbar">
        <section className="animate-in fade-in slide-in-from-top-4 duration-700">
          <DeviceMonitor hasPermission={hasPermission} labels={t} />
        </section>

        <section className="animate-in fade-in zoom-in duration-700 delay-100">
          <BoostButton labels={t} />
        </section>

        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <AIAdvisor labels={t} hasPermission={hasPermission} />
        </section>

        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <GameLauncher labels={t} />
        </section>
      </main>

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[340px] glass h-16 rounded-3xl flex items-center justify-around px-4 border-white/5 z-40">
        <button className="p-2 rounded-xl text-primary bg-primary/10">
          <Shield className="w-6 h-6" />
        </button>
        <button className="p-2 rounded-xl text-muted-foreground hover:text-primary transition-colors">
          <Cpu className="w-6 h-6" />
        </button>
      </nav>

      <SidebarTools 
        lang={lang} 
        setLang={setLang} 
        hasPermission={hasPermission} 
        setHasPermission={setHasPermission}
        labels={t}
      />
      <Toaster />
    </div>
  )
}
