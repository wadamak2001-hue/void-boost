"use client"

import { useState, useMemo } from "react"
import { Play, Plus, Trash2, Search, Loader2, Package } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PlaceHolderImages } from "@/lib/placeholder-images"

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

const DISCOVERABLE_GAMES = [
  { name: "Free Fire", packageName: "com.dts.freefireth", genre: "Battle Royale", iconId: "game-ff" },
  { name: "PUBG Mobile", packageName: "com.tencent.ig", genre: "Battle Royale", iconId: "game-pubg" },
  { name: "eFootball", packageName: "jp.konami.pesam", genre: "Sports", iconId: "game-efootball" },
  { name: "Call of Duty: Mobile", packageName: "com.activision.callofduty.shooter", genre: "Action", iconId: "game-codm" },
  { name: "Genshin Impact", packageName: "com.miHoYo.GenshinImpact", genre: "RPG", iconId: "game-ff" },
  { name: "Mobile Legends", packageName: "com.mobile.legends", genre: "MOBA", iconId: "game-codm" },
]

export function GameLauncher({ labels }: GameLauncherProps) {
  const [games, setGames] = useState<Game[]>([])
  const [isScanning, setIsScanning] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleAddGame = (source: typeof DISCOVERABLE_GAMES[0]) => {
    if (games.find(g => g.packageName === source.packageName)) return
    
    const icon = PlaceHolderImages.find(img => img.id === source.iconId)?.imageUrl || PlaceHolderImages[0].imageUrl
    
    const newGame: Game = {
      id: Math.random().toString(36).substr(2, 9),
      name: source.name,
      packageName: source.packageName,
      image: icon,
      genre: source.genre
    }
    setGames([...games, newGame])
    setDialogOpen(false)
  }

  const handleScan = () => {
    setIsScanning(true)
    setTimeout(() => {
      setIsScanning(false)
    }, 1500)
  }

  const handleLaunch = (packageName: string) => {
    // Native Android Intent protocol
    const intentUrl = `intent://#Intent;scheme=package;package=${packageName};end`
    window.location.href = intentUrl
    
    // In-browser feedback
    console.log(`Executing intent: ${intentUrl}`)
  }

  const removeGame = (id: string) => {
    setGames(games.filter(g => g.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <h2 className="font-headline text-lg font-bold uppercase tracking-tight">{labels.library}</h2>
        
        <Dialog open={dialogOpen} onOpenChange={(val) => {
          setDialogOpen(val)
          if (val) handleScan()
        }}>
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
          <DialogContent className="glass border-white/10 max-w-sm mx-auto rounded-3xl">
            <DialogHeader>
              <DialogTitle className="font-headline font-black text-center text-primary uppercase tracking-widest text-sm">
                {labels.discovery}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 py-4 max-h-[400px] overflow-y-auto custom-scrollbar">
              {isScanning ? (
                <div className="py-12 flex flex-col items-center justify-center gap-4 text-primary">
                  <Loader2 className="w-12 h-12 animate-spin opacity-50" />
                  <p className="font-headline font-bold text-xs animate-pulse tracking-widest">{labels.scan}</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-2 mb-2">
                    {labels.found} ({DISCOVERABLE_GAMES.length})
                  </p>
                  {DISCOVERABLE_GAMES.map((game) => (
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
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {games.length === 0 ? (
        <div className="glass p-12 rounded-2xl flex flex-col items-center justify-center gap-4 text-muted-foreground opacity-50 border-dashed border-2">
          <Search className="w-12 h-12" />
          <p className="font-headline font-bold text-xs tracking-widest uppercase">{labels.noGames}</p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setDialogOpen(true)}
            className="border-primary/30 text-primary mt-2"
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
                  onClick={() => removeGame(game.id)}
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
