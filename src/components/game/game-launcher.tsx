
"use client"

import { useState, useEffect } from "react"
import { Play, Plus, Trash2, Search, Loader2, Package, RefreshCw, Smartphone } from "lucide-react"
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
  { name: "Call of Duty: Mobile", packageName: "com.activision.callofduty.shooter", genre: "Action", iconId: "game-codm" },
  { name: "Genshin Impact", packageName: "com.miHoYo.GenshinImpact", genre: "RPG", iconId: "game-ff" },
  { name: "Mobile Legends", packageName: "com.mobile.legends", genre: "MOBA", iconId: "game-codm" },
  { name: "Roblox", packageName: "com.roblox.client", genre: "Sandbox", iconId: "game-ff" },
  { name: "Minecraft", packageName: "com.mojang.minecraftpe", genre: "Sandbox", iconId: "game-pubg" },
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
        logger.add(`Registry Loaded: ${parsed.length} items identified.`, 'info')
      } catch (e) {
        logger.add('Registry Parse Error: Corrupt local storage.', 'error')
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('void_boost_registry', JSON.stringify(games))
  }, [games])

  const handleSyncRegistry = () => {
    setIsSyncing(true)
    logger.add('Sync Command: SCANNING LOCAL PACKAGES...', 'info')
    setTimeout(() => {
      setIsSyncing(false)
      logger.add('Sync Complete: Local cache validated.', 'success')
    }, 1000)
  }

  const handleAddGame = (source: { name: string; packageName: string; genre: string; iconId?: string }) => {
    if (games.find(g => g.packageName === source.packageName)) {
      logger.add(`Registry Conflict: ${source.packageName} already exists.`, 'warn')
      return
    }
    
    const icon = PlaceHolderImages.find(img => img.id === (source.iconId || "game-ff"))?.imageUrl || PlaceHolderImages[0].imageUrl
    
    const newGame: Game = {
      id: Math.random().toString(36).substring(2, 9),
      name: source.name,
      packageName: source.packageName,
      image: icon,
      genre: source.genre
    }
    setGames(prev => [...prev, newGame])
    logger.add(`Registry Append: ${source.name} added.`, 'success')
    setDialogOpen(false)
    setManualName("")
    setManualPackage("")
  }

  const handleLaunch = (packageName: string) => {
    logger.add(`Execution Request: ${packageName}`, 'info')
    const intentUrl = `intent://launch#Intent;package=${packageName};end`
    
    if (typeof window !== "undefined") {
      try {
        window.location.href = intentUrl
        logger.add(`Intent Sent: Package redirect dispatched.`, 'success')
      } catch (e: any) {
        logger.add(`Sandbox Violation: Browser blocked action or intent invalid.`, 'error')
      }
    }
  }

  const removeGame = (id: string, name: string) => {
    setGames(games.filter(g => g.id !== id))
    logger.add(`Registry Delete: ${name} removed.`, 'warn')
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
              title={labels.refresh}
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
            <DialogContent className="glass border-white/10 max-w-sm mx-auto rounded-3xl p-0 overflow-hidden">
              <Tabs defaultValue="discovery" className="w-full">
                <div className="p-6 pb-2">
                  <DialogHeader className="mb-4">
                    <DialogTitle className="font-headline font-black text-center text-primary uppercase tracking-widest text-sm">
                      {labels.discovery}
                    </DialogTitle>
                  </DialogHeader>
                  <TabsList className="grid w-full grid-cols-2 bg-white/5 rounded-xl">
                    <TabsTrigger value="discovery" className="text-[10px] font-bold uppercase tracking-wider">Search</TabsTrigger>
                    <TabsTrigger value="manual" className="text-[10px] font-bold uppercase tracking-wider">Manual</TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-6 pt-2 h-[400px] overflow-y-auto custom-scrollbar">
                  <TabsContent value="discovery" className="space-y-4 m-0">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search system packages..." 
                        className="pl-10 bg-white/5 border-white/10 rounded-xl text-xs h-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-2">
                        Common Suggestions
                      </p>
                      {COMMON_GAME_PACKAGES.filter(g => g.name.toLowerCase().includes(searchQuery.toLowerCase())).map((game) => (
                        <button
                          key={game.packageName}
                          onClick={() => handleAddGame(game)}
                          className="w-full flex items-center justify-between p-3 rounded-2xl glass hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                              <Package className="w-5 h-5" />
                            </div>
                            <div className="text-left rtl:text-right">
                              <p className="text-xs font-bold">{game.name}</p>
                              <p className="text-[9px] text-muted-foreground font-mono">{game.packageName}</p>
                            </div>
                          </div>
                          <Plus className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="manual" className="space-y-6 m-0">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-2">Game Name</label>
                        <Input 
                          placeholder="e.g., Free Fire" 
                          className="bg-white/5 border-white/10 rounded-xl text-xs"
                          value={manualName}
                          onChange={(e) => setManualName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-2">Package Name</label>
                        <Input 
                          placeholder="com.example.game" 
                          className="bg-white/5 border-white/10 rounded-xl text-xs"
                          value={manualPackage}
                          onChange={(e) => setManualPackage(e.target.value)}
                        />
                      </div>
                      <Button 
                        className="w-full bg-primary text-background font-black rounded-xl h-12 mt-4"
                        disabled={!manualName || !manualPackage}
                        onClick={() => handleAddGame({ name: manualName, packageName: manualPackage, genre: "Manual Entry" })}
                      >
                        ADD TO REGISTRY
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
        <div className="glass p-12 rounded-3xl flex flex-col items-center justify-center gap-4 text-muted-foreground border-dashed border-2 border-white/5">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
            <Smartphone className="w-8 h-8 opacity-20" />
          </div>
          <div className="text-center space-y-1">
            <p className="font-headline font-black text-xs tracking-widest uppercase">{labels.noGames}</p>
            <p className="text-[9px] uppercase tracking-tighter opacity-50">Neural Registry Empty</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setDialogOpen(true)}
            className="border-primary/30 text-primary mt-2 rounded-xl"
          >
            {labels.add}
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {games.map((game) => (
            <div 
              key={game.id} 
              className="group relative aspect-square rounded-3xl overflow-hidden glass hover:neon-border transition-all duration-300"
            >
              <Image 
                src={game.image} 
                alt={game.name}
                fill
                className="object-cover opacity-60 group-hover:opacity-30 transition-opacity group-hover:scale-110 duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-transparent"></div>
              
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 duration-300">
                <Button 
                  variant="destructive" 
                  size="icon" 
                  className="w-8 h-8 rounded-xl bg-red-500/20 text-red-500 border border-red-500/30 hover:bg-red-500 hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeGame(game.id, game.name)
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <p className="text-[9px] text-primary font-black uppercase tracking-widest truncate">{game.packageName}</p>
                <h3 className="font-headline text-sm font-black truncate">{game.name}</h3>
              </div>
              
              <div 
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
                onClick={() => handleLaunch(game.packageName)}
              >
                <div className="flex flex-col items-center gap-2 scale-75 group-hover:scale-100 transition-all duration-300">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-background shadow-[0_0_20px_rgba(0,191,255,0.6)]">
                    <Play className="w-7 h-7 fill-current ml-1" />
                  </div>
                  <span className="text-[10px] font-black tracking-widest text-primary uppercase">{labels.launch}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
