
"use client"

import { useState, useRef } from "react"
import { Play, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface Game {
  id: string
  name: string
  image: string
  genre: string
}

interface GameLauncherProps {
  labels: any
}

export function GameLauncher({ labels }: GameLauncherProps) {
  const [games, setGames] = useState<Game[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAddClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const newGame: Game = {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name.split('.')[0],
          image: event.target?.result as string,
          genre: "Installed"
        }
        setGames([...games, newGame])
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLaunch = (gameName: string) => {
    // Attempting native intent for Android
    // In a real Android environment, this would be an intent:// protocol
    window.location.href = `intent://#Intent;scheme=package;package=com.example.${gameName.toLowerCase().replace(/\s/g, '')};end`
    
    // Fallback simulation
    setTimeout(() => {
      alert(`Simulating launch for: ${gameName}`)
    }, 500)
  }

  const removeGame = (id: string) => {
    setGames(games.filter(g => g.id !== id))
  }

  return (
    <div className="space-y-6">
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileChange} 
      />
      
      <div className="flex items-center justify-between px-2">
        <h2 className="font-headline text-lg font-bold">{labels.library}</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleAddClick}
          className="text-primary hover:text-primary/80 hover:bg-primary/10"
        >
          <Plus className="w-4 h-4 mr-2" />
          {labels.add}
        </Button>
      </div>

      {games.length === 0 ? (
        <div className="glass p-12 rounded-2xl flex flex-col items-center justify-center gap-4 text-muted-foreground opacity-50 border-dashed border-2">
          <Plus className="w-12 h-12" />
          <p className="font-headline font-bold text-sm tracking-widest">{labels.noGames}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {games.map((game) => (
            <div 
              key={game.id} 
              className="group relative aspect-square rounded-2xl overflow-hidden glass hover:neon-border transition-all duration-300"
            >
              <Image 
                src={game.image} 
                alt={game.name}
                fill
                className="object-cover opacity-60 group-hover:opacity-40 transition-opacity group-hover:scale-110 duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent"></div>
              
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button 
                  variant="destructive" 
                  size="icon" 
                  className="w-8 h-8 rounded-lg"
                  onClick={() => removeGame(game.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <p className="text-[10px] text-primary font-bold uppercase tracking-wider">{game.genre}</p>
                <h3 className="font-headline text-sm font-bold truncate">{game.name}</h3>
              </div>
              
              <div 
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                onClick={() => handleLaunch(game.name)}
              >
                <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center text-background scale-50 group-hover:scale-100 transition-transform duration-300">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
