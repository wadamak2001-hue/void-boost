
"use client"

import { useState, useEffect, useCallback } from "react"

export type LogLevel = 'info' | 'warn' | 'error' | 'success'

export interface LogEntry {
  timestamp: string
  message: string
  level: LogLevel
}

const MAX_LOGS = 50
let globalLogs: LogEntry[] = []
let listeners: ((logs: LogEntry[]) => void)[] = []

/**
 * Global logging utility that persists outside the React lifecycle
 */
export const logger = {
  add: (message: string, level: LogLevel = 'info') => {
    const entry: LogEntry = {
      timestamp: new Date().toLocaleTimeString(),
      message,
      level
    }
    globalLogs = [entry, ...globalLogs].slice(0, MAX_LOGS)
    listeners.forEach(listener => listener(globalLogs))
  },
  getLogs: () => globalLogs,
  subscribe: (listener: (logs: LogEntry[]) => void) => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  },
  clear: () => {
    globalLogs = []
    listeners.forEach(listener => listener(globalLogs))
  }
}

export function useDebugLogs() {
  const [logs, setLogs] = useState<LogEntry[]>(globalLogs)

  useEffect(() => {
    return logger.subscribe(setLogs)
  }, [])

  return { logs, clearLogs: logger.clear }
}
