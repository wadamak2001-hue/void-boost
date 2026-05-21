"use client"

import { Play, Plus } from "lucide-react"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Button } from "@/components/ui/button"

const GAMES = [
  { id: 1, name: "Free Fire", image: PlaceHolderImages[1].imageUrl, genre: "Action" },
  { id: 2, name: "PUBG Mobile", image: PlaceHolderImages[0].imageUrl, genre: "Battle Royale" },
  { id: 3, name: "eFootball", image: PlaceHolderImages[2].imageUrl, genre: "Sports" },
  { id: 4, name: "COD Mobile", image: PlaceHolderImages[3].imageUrl, genre: "Military" },
]

export function GameLauncher() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <h2 className="font-headline text-lg font-bold">GAME LIBRARY</h2>
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 hover:bg-primary/10">
          <Plus className="w-4 h-4 mr-2" />
          ADD
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {GAMES.map((game) => (
          <div 
            key={game.id} 
            className="group relative aspect-square rounded-2xl overflow-hidden glass hover:neon-border transition-all duration-300 cursor-pointer"
          >
            <Image 
              src={game.image} 
              alt={game.name}
              fill
              className="object-cover opacity-60 group-hover:opacity-40 transition-opacity group-hover:scale-110 duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent"></div>
            
            <div className="absolute bottom-4 left-4 right-4 space-y-1">
              <p className="text-[10px] text-primary font-bold uppercase tracking-wider">{game.genre}</p>
              <h3 className="font-headline text-sm font-bold truncate">{game.name}</h3>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center text-background scale-50 group-hover:scale-100 transition-transform duration-300">
                <Play className="w-6 h-6 fill-current ml-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}