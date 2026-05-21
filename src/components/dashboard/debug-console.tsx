
"use client"

import { useDebugLogs } from "@/hooks/use-debug-logs"
import { X, Trash2, Bug, Terminal } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

interface DebugConsoleProps {
  onClose: () => void
}

export function DebugConsole({ onClose }: DebugConsoleProps) {
  const { logs, clearLogs } = useDebugLogs()

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md h-[500px] glass border-primary/30 flex flex-col overflow-hidden rounded-3xl shadow-[0_0_50px_rgba(0,191,255,0.2)]">
        <header className="p-4 border-b border-white/10 flex items-center justify-between bg-primary/10">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-primary" />
            <h3 className="text-xs font-black uppercase tracking-widest text-primary">System Debugger</h3>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={clearLogs}
              className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground transition-colors"
              title="Clear Logs"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button 
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        <ScrollArea className="flex-1 p-4 font-mono text-[10px]">
          <div className="space-y-2">
            {logs.length === 0 && (
              <div className="h-64 flex flex-col items-center justify-center text-muted-foreground opacity-30 gap-2">
                <Bug className="w-8 h-8" />
                <p>NO ACTIVE LOGS</p>
              </div>
            )}
            {logs.map((log, idx) => (
              <div 
                key={idx} 
                className={cn(
                  "p-2 rounded border-l-2",
                  log.level === 'error' ? "bg-red-500/10 border-red-500 text-red-400" :
                  log.level === 'warn' ? "bg-yellow-500/10 border-yellow-500 text-yellow-400" :
                  log.level === 'success' ? "bg-green-500/10 border-green-500 text-green-400" :
                  "bg-white/5 border-primary/50 text-muted-foreground"
                )}
              >
                <div className="flex justify-between mb-1 opacity-50">
                  <span className="uppercase text-[8px] font-bold">{log.level}</span>
                  <span>{log.timestamp}</span>
                </div>
                <p className="leading-tight">{log.message}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <footer className="p-4 bg-white/5 border-t border-white/10">
          <p className="text-[8px] text-muted-foreground text-center uppercase tracking-tighter">
            Build v1.0.4-beta // Hardware Layer: Active
          </p>
        </footer>
      </div>
    </div>
  )
}
