"use client"

import { useState, useCallback, createContext, useContext, ReactNode, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Check, X, Info, AlertTriangle } from "lucide-react"

type ToastType = "success" | "error" | "info" | "warning"

interface Toast {
  id: number
  message: string
  type: ToastType
  visible: boolean
  progress: number
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

const TOAST_DURATION = 3000

export function useSimpleToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useSimpleToast must be used within a SimpleToastProvider")
  }
  return context
}

export function SimpleToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  // Progress bar animation
  useEffect(() => {
    if (toasts.length === 0) return

    const interval = setInterval(() => {
      setToasts(prev => prev.map(t => ({
        ...t,
        progress: Math.max(0, t.progress - (100 / (TOAST_DURATION / 50)))
      })))
    }, 50)

    return () => clearInterval(interval)
  }, [toasts.length > 0])

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = Date.now()
    
    // Add toast in hidden state (starting lower)
    setToasts(prev => [...prev, { id, message, type, visible: false, progress: 100 }])

    // Force browser paint → then trigger smooth slide-up entry
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setToasts(prev =>
          prev.map(t => t.id === id ? { ...t, visible: true } : t)
        )
      })
    })

    // Auto-dismiss timer
    setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, visible: false } : t))
    }, TOAST_DURATION)

    // Remove after exit animation completes
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, TOAST_DURATION + 400)
  }, [])

  const dismissToast = useCallback((id: number) => {
    setToasts(prev => prev.map(t => t.id === id ? { ...t, visible: false } : t))
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 400)
  }, [])

  const getIcon = (type: ToastType) => {
    const iconClass = "w-4 h-4"
    switch (type) {
      case "success":
        return <Check className={iconClass} strokeWidth={2.5} />
      case "error":
        return <X className={iconClass} strokeWidth={2.5} />
      case "info":
        return <Info className={iconClass} strokeWidth={2.5} />
      case "warning":
        return <AlertTriangle className={iconClass} strokeWidth={2.5} />
    }
  }

  const getStyles = (type: ToastType) => {
    switch (type) {
      case "success":
        return {
          text: "text-emerald-400",
          icon: "bg-emerald-500/20 text-emerald-400",
          progress: "bg-emerald-500"
        }
      case "error":
        return {
          text: "text-red-400",
          icon: "bg-red-500/20 text-red-400",
          progress: "bg-red-500"
        }
      case "info":
        return {
          text: "text-blue-400",
          icon: "bg-blue-500/20 text-blue-400",
          progress: "bg-blue-500"
        }
      case "warning":
        return {
          text: "text-amber-400",
          icon: "bg-amber-500/20 text-amber-400",
          progress: "bg-amber-500"
        }
    }
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Toast Container – bottom positioned, newest on bottom */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => {
          const styles = getStyles(toast.type)
          return (
            <div
              key={toast.id}
              className={cn(
                "relative overflow-hidden rounded-2xl shadow-2xl pointer-events-auto",
                "bg-gray-950 border border-gray-800/50",
                "transition-[opacity,transform] duration-300 ease-out will-change-transform",
                toast.visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"   // +translate-y = starts & ends lower
              )}
              style={{
                boxShadow: "0 20px 50px -15px rgba(0,0,0,0.4), 0 10px 30px -10px rgba(0,0,0,0.3)",
              }}
            >
              <div className="flex items-center gap-3 px-5 py-3.5 pr-10">
                {/* Icon */}
                <span className={cn(
                  "flex items-center justify-center w-7 h-7 rounded-full",
                  "backdrop-blur-sm",
                  styles.icon
                )}>
                  {getIcon(toast.type)}
                </span>
                
                {/* Message */}
                <span className={cn(
                  "text-sm font-medium whitespace-nowrap tracking-wide",
                  styles.text
                )}>
                  {toast.message}
                </span>

                {/* Dismiss button */}
                <button
                  onClick={() => dismissToast(toast.id)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full 
                    hover:bg-white/20 transition-colors duration-200 text-white/70 hover:text-white"
                  aria-label="Dismiss"
                >
                  <X className="w-3.5 h-3.5" strokeWidth={2.5} />
                </button>
              </div>

              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10">
                <div 
                  className={cn("h-full transition-all duration-75 ease-linear", styles.progress)}
                  style={{ width: `${toast.progress}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}