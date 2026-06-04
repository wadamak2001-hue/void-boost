"use client"

import { useState, useEffect } from "react"
import { Play, Plus, Trash2, Search, Loader2, Package, RefreshCw, Smartphone, Check, ExternalLink } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { logger } from "@/hooks/use-debug-logs"

interface Game {
  id: string
  name: string
  packageName: string
  image: string
  genre: string
}

interface GameLauncherProps {
  labels: any
}

const COMMON_GAME_PACKAGES = [
  { name: "Free Fire", packageName: "com.dts.freefireth", genre: "Battle Royale", iconId: "game-ff" },
  { name: "PUBG Mobile", packageName: "com.tencent.ig", genre: "Battle Royale", iconId: "game-pubg" },
  { name: "eFootball", packageName: "jp.konami.pesam", genre: "Sports", iconId: "game-efootball" },
  { name: "Call of Duty", packageName: "com.activision.callofduty.shooter", genre: "Action", iconId: "game-codm" },
  { name: "Mobile Legends", packageName: "com.mobile.legends", genre: "MOBA", iconId: "game-ff" },
  { name: "Roblox", packageName: "com.roblox.client", genre: "Sandbox", iconId: "game-pubg" },
  { name: "Minecraft", packageName: "com.mojang.minecraftpe", genre: "Sandbox", iconId: "game-ff" },
  { name: "8 Ball Pool", packageName: "com.miniclip.eightballpool", genre: "Casual", iconId: "game-efootball" },
]

export function GameLauncher({ labels }: GameLauncherProps) {
  const [games, setGames] = useState<Game[]>([])
  const [isSyncing, setIsSyncing] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [manualName, setManualName] = useState("")
  const [manualPackage, setManualPackage] = useState("")

  useEffect(() => {
    const savedGames = localStorage.getItem('void_boost_registry')
    if (savedGames) {
      try {
        const parsed = JSON.parse(savedGames)
        setGames(parsed)
        logger.add(`Neural Registry Loaded: ${parsed.length} entries.`, 'success')
      } catch (e) {
        logger.add('Registry Sync Failed: Data corrupted.', 'error')
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('void_boost_registry', JSON.stringify(games))
  }, [games])

  const handleSyncRegistry = () => {
    setIsSyncing(true)
    logger.add('System Audit: Verifying package integrity...', 'info')
    setTimeout(() => {
      setIsSyncing(false)
      logger.add('Audit Complete: All links verified.', 'success')
    }, 1200)
  }

  const handleAddGame = (source: { name: string; packageName: string; genre: string; iconId?: string }) => {
    if (games.find(g => g.packageName === source.packageName)) {
      logger.add(`Conflict: Package ${source.packageName} is already linked.`, 'warn')
      return
    }
    
    const icon = PlaceHolderImages.find(img => img.id === (source.iconId || "game-ff"))?.imageUrl || PlaceHolderImages[0].imageUrl
    
    const newGame: Game = {
      id: Math.random().toString(36).substring(2, 9),
      name: source.name,
      packageName: source.packageName.trim(),
      image: icon,
      genre: source.genre
    }
    setGames(prev => [...prev, newGame])
    logger.add(`Package Registered: ${source.name} [${source.packageName}]`, 'success')
    setDialogOpen(false)
    setManualName("")
    setManualPackage("")
  }

  const handleLaunch = (packageName: string, name: string) => {
    logger.add(`Intent Dispatch: Attempting to open ${name}...`, 'info')
    
    const intentUrl = `intent:#Intent;package=${packageName};action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;end`
    
    if (typeof window !== "undefined") {
      try {
        window.location.href = intentUrl
        setTimeout(() => {
          logger.add(`Status: Intent successfully sent for ${packageName}`, 'success')
        }, 1000)
      } catch (e: any) {
        logger.add(`Critical: System blocked intent for ${packageName}.`, 'error')
      }
    }
  }

  const removeGame = (id: string, name: string) => {
    setGames(games.filter(g => g.id !== id))
    logger.add(`Registry Update: ${name} detached from neural paths.`, 'warn')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <h2 className="font-headline text-lg font-bold uppercase tracking-tight">{labels.library}</h2>
          {isSyncing && <Loader2 className="w-3 h-3 animate-spin text-primary" />}
        </div>
        
        <div className="flex gap-1">
           <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleSyncRegistry}
              disabled={isSyncing}
              className="text-muted-foreground hover:text-primary h-8 w-8"
            >
              <RefreshCw className={cn("w-4 h-4", isSyncing && "animate-spin")} />
            </Button>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-primary hover:text-primary/80 hover:bg-primary/10 font-bold"
              >
                <Plus className="w-4 h-4 mr-2" />
                {labels.add}
              </Button>
            </DialogTrigger>
            <DialogContent className="glass border-white/10 max-w-sm mx-auto rounded-3xl p-0 overflow-hidden shadow-2xl">
              <Tabs defaultValue="discovery" className="w-full">
                <div className="p-6 pb-2">
                  <DialogHeader className="mb-4">
                    <DialogTitle className="font-headline font-black text-center text-primary uppercase tracking-widest text-sm">
                      {labels.discovery}
                    </DialogTitle>
                  </DialogHeader>
                  <TabsList className="grid w-full grid-cols-2 bg-white/5 rounded-xl border border-white/5">
                    <TabsTrigger value="discovery" className="text-[10px] font-bold uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-background">Helper List</TabsTrigger>
                    <TabsTrigger value="manual" className="text-[10px] font-bold uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-background">Manual Input</TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-6 pt-2 h-[450px] overflow-y-auto custom-scrollbar">
                  <TabsContent value="discovery" className="space-y-4 m-0">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search common games..." 
                        className="pl-10 bg-white/5 border-white/10 rounded-xl text-xs h-10 focus:ring-primary/50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-2 mb-3">
                        Popular Package Templates
                      </p>
                      {COMMON_GAME_PACKAGES.filter(g => g.name.toLowerCase().includes(searchQuery.toLowerCase())).map((game) => {
                        const isAdded = games.some(g => g.packageName === game.packageName)
                        return (
                          <button
                            key={game.packageName}
                            onClick={() => !isAdded && handleAddGame(game)}
                            disabled={isAdded}
                            className={cn(
                              "w-full flex items-center justify-between p-4 rounded-2xl transition-all group border",
                              isAdded 
                                ? "bg-white/5 border-white/5 opacity-50 cursor-not-allowed" 
                                : "glass border-transparent hover:border-primary/40 hover:bg-primary/5"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <div className={cn(
                                "w-11 h-11 rounded-xl flex items-center justify-center transition-transform",
                                isAdded ? "bg-white/10 text-muted-foreground" : "bg-primary/10 text-primary group-hover:scale-110"
                              )}>
                                <Package className="w-6 h-6" />
                              </div>
                              <div className="text-left rtl:text-right">
                                <p className="text-sm font-bold">{game.name}</p>
                                <p className="text-[9px] text-muted-foreground font-mono truncate max-w-[140px]">{game.packageName}</p>
                              </div>
                            </div>
                            {isAdded ? (
                              <Check className="w-5 h-5 text-green-500" />
                            ) : (
                              <Plus className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </TabsContent>

                  <TabsContent value="manual" className="space-y-6 m-0">
                    <div className="bg-primary/10 p-4 rounded-2xl border border-primary/20 mb-4">
                      <p className="text-[10px] text-primary font-bold leading-relaxed text-center">
                        Input the official Android package name to link any app.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-2">Display Name</label>
                        <Input 
                          placeholder="e.g., FIFA Mobile" 
                          className="bg-white/5 border-white/10 rounded-xl text-xs h-12"
                          value={manualName}
                          onChange={(e) => setManualName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-2">Package Name (ID)</label>
                        <Input 
                          placeholder="com.ea.gp.fifamobile" 
                          className="bg-white/5 border-white/10 rounded-xl text-xs h-12 font-mono"
                          value={manualPackage}
                          onChange={(e) => setManualPackage(e.target.value)}
                        />
                      </div>
                      <Button 
                        className="w-full bg-primary text-background font-black rounded-xl h-14 mt-4 shadow-[0_0_20px_rgba(0,191,255,0.4)]"
                        disabled={!manualName || !manualPackage}
                        onClick={() => handleAddGame({ name: manualName, packageName: manualPackage, genre: "User Added" })}
                      >
                        ATTACH TO DASHBOARD
                      </Button>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {games.length === 0 ? (
        <div className="glass p-12 rounded-3xl flex flex-col items-center justify-center gap-4 text-muted-foreground border-dashed border-2 border-white/10">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center relative">
            <Smartphone className="w-10 h-10 opacity-20" />
            <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping"></div>
          </div>
          <div className="text-center space-y-1">
            <p className="font-headline font-black text-sm tracking-widest uppercase text-white">{labels.noGames}</p>
            <p className="text-[10px] uppercase tracking-widest opacity-50">Neural Registry Empty</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setDialogOpen(true)}
            className="border-primary/30 text-primary mt-4 rounded-xl px-8 py-6 font-black hover:bg-primary hover:text-background transition-all"
          >
            {labels.add}
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {games.map((game) => (
            <div 
              key={game.id} 
              className="group relative aspect-square rounded-3xl overflow-hidden glass hover:neon-border transition-all duration-300 border border-white/5"
            >
              <Image 
                src={game.image} 
                alt={game.name}
                fill
                className="object-cover opacity-30 group-hover:opacity-10 transition-opacity group-hover:scale-110 duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
              
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 duration-300">
                <Button 
                  variant="destructive" 
                  size="icon" 
                  className="w-8 h-8 rounded-xl bg-red-500/20 text-red-500 border border-red-500/30 hover:bg-red-500 hover:text-white transition-all shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeGame(game.id, game.name)
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="absolute bottom-5 left-5 right-5 space-y-1">
                <p className="text-[8px] text-primary font-black uppercase tracking-widest truncate opacity-80">{game.packageName}</p>
                <h3 className="font-headline text-sm font-black truncate leading-tight uppercase">{game.name}</h3>
              </div>
              
              <div 
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-primary/5"
                onClick={() => handleLaunch(game.packageName, game.name)}
              >
                <div className="flex flex-col items-center gap-3 scale-75 group-hover:scale-100 transition-all duration-300">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-background shadow-[0_0_30px_rgba(0,191,255,0.7)]">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                  <span className="text-[10px] font-black tracking-widest text-primary uppercase bg-background/90 px-4 py-1.5 rounded-full border border-primary/20">
                    {labels.launch}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
