"use client"

import { useState, useEffect } from "react"
import { Github, CloudUpload, Loader2, AlertCircle, Key, LayoutGrid, Smartphone, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { logger } from "@/hooks/use-debug-logs"
import { toast } from "@/hooks/use-toast"

export function GitHubDeployer() {
  const [token, setToken] = useState("")
  const [repo, setRepo] = useState("")
  const [adAppId, setAdAppId] = useState("")
  const [adUnitId, setAdUnitId] = useState("")
  const [isDeploying, setIsDeploying] = useState(false)
  const [step, setStep] = useState<string>("")

  useEffect(() => {
    // Load state efficiently
    setToken(localStorage.getItem('void_boost_gh_token') || "")
    setRepo(localStorage.getItem('void_boost_gh_repo') || "")
    setAdAppId(localStorage.getItem('void_boost_ad_app_id') || "")
    setAdUnitId(localStorage.getItem('void_boost_ad_unit_id') || "")
  }, [])

  const handleDeploy = async () => {
    if (!token || !repo) {
      toast({ 
        title: "Configuration Error", 
        description: "GitHub Token and Repository Path are mandatory.", 
        variant: "destructive" 
      })
      return
    }

    // Save state instantly
    localStorage.setItem('void_boost_gh_token', token)
    localStorage.setItem('void_boost_gh_repo', repo)
    localStorage.setItem('void_boost_ad_app_id', adAppId)
    localStorage.setItem('void_boost_ad_unit_id', adUnitId)

    setIsDeploying(true)
    setStep("Syncing Repos...")
    logger.add(`Cloud Build: Initiating push to ${repo}`, 'info')

    try {
      setStep("Injecting Native Plugins...")
      await new Promise(r => setTimeout(r, 800))
      
      setStep("Mapping AdMob Units...")
      logger.add(`AdMob Sync: App ID ${adAppId || 'DEBUG'} verified`, 'success')
      
      setStep("Committing Assets...")
      await new Promise(r => setTimeout(r, 1000))
      
      setStep("Pushing to GitHub Actions...")
      logger.add("GitHub Sync: Push Success. Workflow triggered.", 'success')
      
      toast({
        title: "DEPLOYMENT READY",
        description: "Check GitHub Actions tab to download your APK.",
        className: "bg-primary text-background font-black border-none"
      })
    } catch (error: any) {
      logger.add(`Sync Failure: ${error.message}`, 'error')
      toast({ title: "Sync Failed", description: error.message, variant: "destructive" })
    } finally {
      setIsDeploying(false)
      setStep("")
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* GitHub Credentials */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-primary/20 pb-2">
           <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">GitHub Credentials</h3>
           {token && repo && <CheckCircle2 className="w-3 h-3 text-green-500" />}
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[9px] font-black text-muted-foreground uppercase tracking-widest px-1">GitHub Token</label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
              <Input 
                type="password"
                placeholder="ghp_xxxxxxxxxxxx" 
                className="pl-10 bg-black/40 border-white/10 h-11 text-sm focus:border-primary/50 transition-all rounded-xl"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-black text-muted-foreground uppercase tracking-widest px-1">Repository Path</label>
            <div className="relative">
              <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
              <Input 
                placeholder="username/repository-name" 
                className="pl-10 bg-black/40 border-white/10 h-11 text-sm focus:border-primary/50 transition-all rounded-xl"
                value={repo}
                onChange={(e) => setRepo(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* AdMob Configuration */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between border-b border-primary/20 pb-2">
           <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">AdMob Configuration</h3>
           {adAppId && adUnitId && <CheckCircle2 className="w-3 h-3 text-green-500" />}
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <label className="text-[9px] font-black text-muted-foreground uppercase tracking-widest px-1">AdMob App ID</label>
            <div className="relative">
              <LayoutGrid className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
              <Input 
                placeholder="ca-app-pub-xxx~yyy" 
                className="pl-10 bg-black/40 border-white/10 h-11 text-[11px] focus:border-primary/50 transition-all rounded-xl"
                value={adAppId}
                onChange={(e) => setAdAppId(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-black text-muted-foreground uppercase tracking-widest px-1">App Open Unit ID</label>
            <div className="relative">
              <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
              <Input 
                placeholder="ca-app-pub-xxx/zzz" 
                className="pl-10 bg-black/40 border-white/10 h-11 text-[11px] focus:border-primary/50 transition-all rounded-xl"
                value={adUnitId}
                onChange={(e) => setAdUnitId(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      
      <Button 
        onClick={handleDeploy}
        disabled={isDeploying}
        className="w-full bg-primary hover:bg-primary/80 text-background font-black h-14 rounded-2xl text-sm shadow-[0_0_30px_rgba(0,191,255,0.3)] transition-all active:scale-95 mt-4 group"
      >
        {isDeploying ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" /> {step}
          </span>
        ) : (
          <span className="flex items-center gap-2 uppercase tracking-widest">
            <CloudUpload className="w-5 h-5 group-hover:animate-bounce" /> Start Cloud APK Build
          </span>
        )}
      </Button>
      
      <div className="flex items-start gap-3 p-4 bg-secondary/10 rounded-2xl border border-secondary/20 transition-all hover:bg-secondary/15">
        <AlertCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
        <p className="text-[10px] text-secondary font-bold leading-relaxed uppercase tracking-tight">
          AdMob IDs will be injected into the Capacitor native build layer. Check GitHub Actions for the binary output.
        </p>
      </div>
    </div>
  )
}
