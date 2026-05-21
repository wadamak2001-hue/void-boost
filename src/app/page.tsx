"use client"

import { useState, useEffect } from "react"
import { BoostButton } from "@/components/dashboard/boost-button"
import { DeviceMonitor } from "@/components/dashboard/device-monitor"
import { GameLauncher } from "@/components/game/game-launcher"
import { AIAdvisor } from "@/components/dashboard/ai-advisor"
import { SidebarTools } from "@/components/dashboard/sidebar-tools"
import { Shield, Bell, User, Cpu, Globe } from "lucide-react"
import { Toaster } from "@/components/ui/toaster"

export type Language = 'en' | 'ar';

export const DICTIONARY = {
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
    optimizedDesc: "Idle threads suspended. Memory cleared.",
    permRequired: "Permission Required",
    permDesc: "Unlock system metrics",
    requestAccess: "GRANT ACCESS",
    brightness: "Brightness",
    dnd: "DND Mode",
    screenshot: "Screenshot",
    record: "Screen Record",
    scan: "SCANNING SYSTEM...",
    found: "PACKAGES FOUND",
    launch: "LAUNCH",
    discovery: "App Discovery"
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
    optimizedDesc: "تم تعليق العمليات الخاملة. تم مسح الذاكرة.",
    permRequired: "الأذونات مطلوبة",
    permDesc: "افتح مقاييس النظام",
    requestAccess: "منح الإذن",
    brightness: "السطوع",
    dnd: "وضع الهدوء",
    screenshot: "لقطة شاشة",
    record: "تسجيل الشاشة",
    scan: "جاري فحص النظام...",
    found: "تم العثور على حزم",
    launch: "تشغيل",
    discovery: "اكتشاف التطبيقات"
  }
}

export default function Home() {
  const [lang, setLang] = useState<Language>('en')
  const [hasPermission, setHasPermission] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setIsReady(true)
  }, [])

  const t = DICTIONARY[lang]

  if (!isReady) return null;

  return (
    <div 
      className={`min-h-screen max-w-md mx-auto bg-[#0A0C12] relative flex flex-col overflow-hidden pb-12 pointer-events-auto transition-all duration-300 ${lang === 'ar' ? 'rtl font-headline' : 'ltr font-body'}`} 
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      suppressHydrationWarning
    >
      <div className="absolute top-[-10%] right-[-20%] w-[100%] h-[50%] bg-primary/5 blur-[120px] rounded-full -z-10"></div>
      
      <header className="p-6 flex items-center justify-between pointer-events-auto relative z-50">
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
          <button 
            onClick={() => setLang(l => l === 'en' ? 'ar' : 'en')}
            className="w-10 h-10 rounded-xl glass flex items-center justify-center text-primary border border-primary/20 hover:bg-primary/10 transition-all active:scale-95"
            title="Switch Language"
          >
            <Globe className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-primary transition-all">
            <User className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-8 overflow-y-auto custom-scrollbar pointer-events-auto relative z-10">
        <section className="animate-in fade-in slide-in-from-top-2 duration-300">
          <DeviceMonitor hasPermission={hasPermission} setHasPermission={setHasPermission} labels={t} />
        </section>

        <section className="animate-in fade-in zoom-in duration-300">
          <BoostButton labels={t} />
        </section>

        <section className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <AIAdvisor labels={t} hasPermission={hasPermission} />
        </section>

        <section className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <GameLauncher labels={t} />
        </section>
      </main>

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[340px] glass h-16 rounded-3xl flex items-center justify-around px-4 border-white/5 z-40 pointer-events-auto">
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
