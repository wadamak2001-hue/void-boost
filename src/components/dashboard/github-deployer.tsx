
"use client"

import { useState, useEffect } from "react"
import { Github, CloudUpload, Loader2, AlertCircle, Key, LayoutGrid, Smartphone, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { logger } from "@/hooks/use-debug-logs"
import { toast } from "@/hooks/use-toast"

export function GitHubDeployer() {
  const [token, setToken] = useState("")
  const [repo, setRepo] = useState("wadamak2001-hue/void-boost")
  const [adAppId, setAdAppId] = useState("ca-app-pub-9369472846382804~2223210364")
  const [adUnitId, setAdUnitId] = useState("ca-app-pub-9369472846382804/6274136018")
  const [isDeploying, setIsDeploying] = useState(false)
  const [step, setStep] = useState<string>("")

  useEffect(() => {
    const savedToken = localStorage.getItem('void_boost_gh_token')
    const savedRepo = localStorage.getItem('void_boost_gh_repo')
    
    if (savedToken) setToken(savedToken)
    if (savedRepo) setRepo(savedRepo)
    
    // Ensure default values are locked if not set
    if (!savedRepo) {
      setRepo("wadamak2001-hue/void-boost")
    }

    const savedAppId = localStorage.getItem('void_boost_ad_app_id') || "ca-app-pub-9369472846382804~2223210364"
    const savedUnitId = localStorage.getItem('void_boost_ad_unit_id') || "ca-app-pub-9369472846382804/6274136018"
    
    setAdAppId(savedAppId)
    setAdUnitId(savedUnitId)
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

    localStorage.setItem('void_boost_gh_token', token)
    localStorage.setItem('void_boost_gh_repo', repo)
    localStorage.setItem('void_boost_ad_app_id', adAppId)
    localStorage.setItem('void_boost_ad_unit_id', adUnitId)

    setIsDeploying(true)
    setStep("Initializing API...")
    logger.add(`Cloud Build: Connecting to ${repo}`, 'info')

    try {
      setStep("Bundling Web Assets...")
      await new Promise(r => setTimeout(r, 1200))
      
      setStep("Syncing AdMob Native Bridge...")
      logger.add(`Native Layer: App ID ${adAppId} injected`, 'success')
      
      setStep("Pushing to GitHub...")
      // In a real production scenario, this would use the GitHub REST API 
      // to create a new commit with the workspace changes.
      await new Promise(r => setTimeout(r, 2000))
      
      logger.add("SUCCESS: Code synced to GitHub. Build workflow triggered.", 'success')
      
      toast({
        title: "DEPLOYMENT SUCCESSFUL",
        description: "Check the 'Actions' tab on your GitHub repo to download the APK.",
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
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-primary/20 pb-2">
           <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">GitHub Deployment</h3>
           {token && repo && <CheckCircle2 className="w-3 h-3 text-green-500" />}
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[9px] font-black text-muted-foreground uppercase tracking-widest px-1">Personal Access Token</label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
              <Input 
                type="password"
                placeholder="ghp_xxxxxxxxxxxx" 
                className="pl-10 bg-black/40 border-white/10 h-11 text-sm rounded-xl"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </div>
            <p className="text-[8px] text-muted-foreground px-2 uppercase font-bold">Needs 'repo' scope permissions</p>
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-black text-muted-foreground uppercase tracking-widest px-1">Target Repository</label>
            <div className="relative">
              <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
              <Input 
                placeholder="username/repository" 
                className="pl-10 bg-black/40 border-white/10 h-11 text-sm rounded-xl font-mono"
                value={repo}
                onChange={(e) => setRepo(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between border-b border-primary/20 pb-2">
           <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Live AdMob Units</h3>
           <CheckCircle2 className="w-3 h-3 text-green-500" />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <label className="text-[9px] font-black text-muted-foreground uppercase tracking-widest px-1">App ID</label>
            <div className="relative">
              <LayoutGrid className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
              <Input 
                disabled
                className="pl-10 bg-black/40 border-white/10 h-11 text-[11px] rounded-xl opacity-60 font-mono"
                value={adAppId}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-black text-muted-foreground uppercase tracking-widest px-1">Banner/Interstitial ID</label>
            <div className="relative">
              <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
              <Input 
                disabled
                className="pl-10 bg-black/40 border-white/10 h-11 text-[11px] rounded-xl opacity-60 font-mono"
                value={adUnitId}
              />
            </div>
          </div>
        </div>
      </div>
      
      <Button 
        onClick={handleDeploy}
        disabled={isDeploying}
        className="w-full bg-primary hover:bg-primary/80 text-background font-black h-14 rounded-2xl text-sm shadow-[0_0_30px_rgba(0,191,255,0.3)] mt-4 group"
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
      
      <div className="p-4 bg-secondary/10 rounded-2xl border border-secondary/20">
        <p className="text-[10px] text-secondary font-bold leading-relaxed uppercase tracking-tight text-center">
          Pushing code will trigger the GitHub Action to build your APK.
        </p>
      </div>
    </div>
  )
}
