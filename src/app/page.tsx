"use client"

import { useState, useEffect, useTransition } from "react"
import { BoostButton } from "@/components/dashboard/boost-button"
import { DeviceMonitor } from "@/components/dashboard/device-monitor"
import { GameLauncher } from "@/components/game/game-launcher"
import { AIAdvisor } from "@/components/dashboard/ai-advisor"
import { SidebarTools } from "@/components/dashboard/sidebar-tools"
import { DebugConsole } from "@/components/dashboard/debug-console"
import { GitHubDeployer } from "@/components/dashboard/github-deployer"
import { AppOpenAd } from "@/components/ads/app-open-ad"
import { Shield, User, Globe, Cloud } from "lucide-react"
import { Toaster } from "@/components/ui/toaster"
import { logger } from "@/hooks/use-debug-logs"

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
    library: "NEURAL REGISTRY",
    add: "ADD GAME",
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
    scan: "SCANNING PACKAGES...",
    found: "GAMES IDENTIFIED",
    launch: "LAUNCH",
    discovery: "System App Discovery",
    syncing: "SYNCING REGISTRY...",
    refresh: "REFRESH LIST",
    report: "REPORT BUG",
    cloudTitle: "CLOUD APK BUILDER",
    cloudDesc: "Push code to GitHub to build APK",
    adSettings: "AdMob Settings",
    adId: "AdMob App ID",
    unitId: "Ad Unit ID (App Open)"
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
    library: "السجل العصبي",
    add: "إضافة لعبة",
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
    scan: "جاري فحص الحزم...",
    found: "تم تحديد الألعاب",
    launch: "تشغيل",
    discovery: "اكتشاف تطبيقات النظام",
    syncing: "جاري مزامنة السجل...",
    refresh: "تحديث القائمة",
    report: "إبلاغ عن خطأ",
    cloudTitle: "باني APK السحابي",
    cloudDesc: "ارفع الكود إلى GitHub لبناء APK",
    adSettings: "إعدادات AdMob",
    adId: "معرف تطبيق AdMob",
    unitId: "معرف وحدة الإعلان"
  }
}

export default function Home() {
  const [lang, setLang] = useState<Language>('en')
  const [hasPermission, setHasPermission] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [showAd, setShowAd] = useState(true)
  const [debugVisible, setDebugVisible] = useState(false)
  const [logoTaps, setLogoTaps] = useState(0)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    // Initial sync
    const savedLang = localStorage.getItem('void_boost_lang') as Language || 'en'
    const savedPerm = localStorage.getItem('void_boost_perm') === 'true'
    
    setLang(savedLang)
    setHasPermission(savedPerm)
    
    logger.add(`App Optimize: Startup Sync Complete (Lang: ${savedLang.toUpperCase()})`, 'success')
    setIsReady(true)
  }, [])

  const toggleLang = () => {
    startTransition(() => {
      const newLang = lang === 'en' ? 'ar' : 'en'
      setLang(newLang)
      localStorage.setItem('void_boost_lang', newLang)
      logger.add(`UI Context Switched: ${newLang.toUpperCase()}`, 'info')
    })
  }

  const handlePermissionChange = (val: boolean) => {
    setHasPermission(val)
    localStorage.setItem('void_boost_perm', String(val))
    logger.add(`Telemetry Status: ${val ? 'LINKED' : 'LOCKED'}`, val ? 'success' : 'warn')
  }

  const handleLogoTap = () => {
    const newCount = logoTaps + 1
    if (newCount >= 5) {
      setDebugVisible(true)
      setLogoTaps(0)
      logger.add('Security Bypass: Developer Console Unlocked', 'success')
    } else {
      setLogoTaps(newCount)
    }
  }

  const scrollToDeploy = () => {
    const el = document.getElementById('cloud-deploy-section')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  if (!isReady) return <div className="min-h-screen bg-[#0A0C12] flex items-center justify-center"><Shield className="w-12 h-12 text-primary animate-pulse" /></div>;

  if (showAd) {
    return <AppOpenAd onClose={() => setShowAd(false)} />
  }

  const t = DICTIONARY[lang]

  return (
    <div 
      className={`min-h-screen max-w-md mx-auto bg-[#0A0C12] relative flex flex-col overflow-hidden pb-12 transition-colors duration-300 gpu-accelerated ${lang === 'ar' ? 'rtl font-headline' : 'ltr font-body'}`} 
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      suppressHydrationWarning
    >
      <div className="absolute top-[-10%] right-[-20%] w-[100%] h-[50%] bg-primary/5 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
      
      <header className="p-6 flex items-center justify-between relative z-50">
        <div 
          className="flex items-center gap-3 cursor-pointer select-none active:scale-95 transition-transform"
          onClick={handleLogoTap}
        >
          <div className="w-10 h-10 rounded-xl glass border-primary/20 flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-headline font-black text-xl leading-none" translate="no">
                <span className="text-foreground">VOID BOOST</span>
              </h1>
              <span className="text-[8px] bg-primary/20 text-primary px-1.5 py-0.5 rounded border border-primary/30 font-black">STABLE</span>
            </div>
            <p className="text-[10px] text-primary font-bold tracking-widest uppercase">
              {t.status}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={toggleLang}
            className="w-10 h-10 rounded-xl glass flex items-center justify-center text-primary border border-primary/20 hover:bg-primary/10 transition-all active:scale-95"
            aria-label="Toggle Language"
          >
            <Globe className="w-5 h-5" />
          </button>
          <button 
            onClick={scrollToDeploy}
            className="w-10 h-10 rounded-xl glass border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary transition-all active:scale-95"
            aria-label="Cloud Deployment"
          >
            <Cloud className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-8 overflow-y-auto custom-scrollbar relative z-10 scroll-smooth">
        <section className="animate-in fade-in duration-300">
          <DeviceMonitor hasPermission={hasPermission} setHasPermission={handlePermissionChange} labels={t} />
        </section>

        <section className="animate-in fade-in zoom-in duration-300">
          <BoostButton labels={t} />
        </section>

        <section id="cloud-deploy-section" className="animate-in fade-in slide-in-from-bottom-4 duration-500 gpu-accelerated">
          <div className="glass p-6 rounded-3xl border-primary/20 bg-primary/5">
             <div className="flex items-center gap-3 mb-4">
               <div className="p-2.5 rounded-xl bg-primary/20 text-primary">
                 <Cloud className="w-6 h-6" />
               </div>
               <div>
                 <h2 className="font-headline text-lg font-bold uppercase tracking-tight">{t.cloudTitle}</h2>
                 <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{t.cloudDesc}</p>
               </div>
             </div>
             <GitHubDeployer />
          </div>
        </section>

        <section className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <AIAdvisor labels={t} hasPermission={hasPermission} />
        </section>

        <section className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <GameLauncher labels={t} />
        </section>
      </main>

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[340px] glass h-16 rounded-3xl flex items-center justify-around px-4 border-white/5 z-40 shadow-2xl">
        <button className="p-2 rounded-xl text-primary bg-primary/10 transition-transform active:scale-110">
          <Shield className="w-6 h-6" />
        </button>
        <button onClick={scrollToDeploy} className="p-2 rounded-xl text-muted-foreground hover:text-primary transition-all active:scale-110">
          <Cloud className="w-6 h-6" />
        </button>
      </nav>

      <SidebarTools 
        lang={lang} 
        setLang={toggleLang} 
        hasPermission={hasPermission} 
        setHasPermission={handlePermissionChange}
        labels={t}
      />

      {debugVisible && <DebugConsole onClose={() => setDebugVisible(false)} />}
      
      <Toaster />
    </div>
  )
}
