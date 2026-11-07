"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import type React from "react"

export type ThemeMode = "light" | "dark" | "system"
type Resolved = "light" | "dark"

const STORAGE_KEY = "atom-theme"

interface ThemeContextValue {
  mode: ThemeMode
  resolved: Resolved
  setMode: (mode: ThemeMode) => void
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: "system",
  resolved: "light",
  setMode: () => {},
  toggle: () => {},
})

function systemTheme(): Resolved {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function readMode(): ThemeMode {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === "light" || saved === "dark" || saved === "system") return saved
  } catch {}
  return "system"
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("system")
  const [resolved, setResolved] = useState<Resolved>("light")

  useEffect(() => {
    setModeState(readMode())
  }, [])

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const apply = () => {
      const next: Resolved = mode === "system" ? systemTheme() : mode
      document.documentElement.classList.toggle("dark", next === "dark")
      setResolved(next)
    }
    apply()
    if (mode !== "system") return
    media.addEventListener("change", apply)
    return () => media.removeEventListener("change", apply)
  }, [mode])

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {}
  }, [])

  const toggle = useCallback(() => setMode(resolved === "dark" ? "light" : "dark"), [resolved, setMode])

  const value = useMemo(() => ({ mode, resolved, setMode, toggle }), [mode, resolved, setMode, toggle])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}

export const themeInitScript = `(function(){try{var m=localStorage.getItem("${STORAGE_KEY}");var d=m==="dark"||((m!=="light")&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(d)document.documentElement.classList.add("dark")}catch(e){}})()`
