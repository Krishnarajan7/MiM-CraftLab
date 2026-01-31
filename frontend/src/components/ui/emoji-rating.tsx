"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface RatingInteractionProps {
  onChange?: (rating: number) => void
  onRatingComplete?: (rating: number) => void
  className?: string
}

const ratingData = [
  { emoji: "😔", label: "Terrible" },
  { emoji: "😕", label: "Poor" },
  { emoji: "😐", label: "Okay" },
  { emoji: "🙂", label: "Good" },
  { emoji: "😍", label: "Amazing" },
]

// Vibrant paper confetti colors
const confettiColors = [
  '#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181',
  '#AA96DA', '#FCBAD3', '#A8D8EA', '#FF9F43', '#6C5CE7',
  '#00CEC9', '#FD79A8', '#FFEAA7', '#74B9FF', '#55EFC4'
]

interface Particle {
  id: number
  x: number
  y: number
  color: string
  width: number
  height: number
  speedX: number
  speedY: number
  rotateX: number
  rotateY: number
  rotateZ: number
  rotateSpeedX: number
  rotateSpeedY: number
  rotateSpeedZ: number
  opacity: number
  wobble: number
  wobbleSpeed: number
}

export function RatingInteraction({ onChange, onRatingComplete, className }: RatingInteractionProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])

  const createParticles = () => {
    const newParticles: Particle[] = []
    
    for (let i = 0; i < 50; i++) {
      // Even distribution in all directions
      const angle = (Math.PI * 2 * i) / 50
      const velocity = 5 + Math.random() * 5
      // Add some randomness to spread
      const spread = (Math.random() - 0.5) * 0.3
      
      newParticles.push({
        id: i,
        x: 0,
        y: 0,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        width: 8 + Math.random() * 6,
        height: 6 + Math.random() * 4,
        speedX: Math.cos(angle + spread) * velocity,
        speedY: Math.sin(angle + spread) * velocity - 6,
        rotateX: Math.random() * 360,
        rotateY: Math.random() * 360,
        rotateZ: Math.random() * 360,
        rotateSpeedX: (Math.random() - 0.5) * 30,
        rotateSpeedY: (Math.random() - 0.5) * 30,
        rotateSpeedZ: (Math.random() - 0.5) * 20,
        opacity: 1,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.1 + Math.random() * 0.1
      })
    }
    setParticles(newParticles)
  }

  useEffect(() => {
    if (particles.length === 0) return

    const interval = setInterval(() => {
      setParticles(prev => {
        const updated = prev.map(p => ({
          ...p,
          x: p.x + p.speedX + Math.sin(p.wobble) * 2,
          y: p.y + p.speedY,
          speedX: p.speedX * 0.99,
          speedY: p.speedY + 0.25,
          rotateX: p.rotateX + p.rotateSpeedX,
          rotateY: p.rotateY + p.rotateSpeedY,
          rotateZ: p.rotateZ + p.rotateSpeedZ,
          wobble: p.wobble + p.wobbleSpeed,
          opacity: p.opacity - 0.012
        })).filter(p => p.opacity > 0)
        
        if (updated.length === 0) {
          clearInterval(interval)
        }
        return updated
      })
    }, 16)

    return () => clearInterval(interval)
  }, [particles.length > 0])

  const handleClick = (value: number) => {
    setRating(value)
    onChange?.(value)
    setShowSuccess(true)
    createParticles()
    
    setTimeout(() => {
      setShowSuccess(false)
      onRatingComplete?.(value)
    }, 1800)
  }

  const displayRating = hoverRating || rating

  const renderParticle = (particle: Particle) => {
    // 3D transform for paper tumbling effect
    const transform = `
      translate(${particle.x}px, ${particle.y}px) 
      rotateX(${particle.rotateX}deg) 
      rotateY(${particle.rotateY}deg) 
      rotateZ(${particle.rotateZ}deg)
    `
    
    return (
      <div
        key={particle.id}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: particle.width,
          height: particle.height,
          backgroundColor: particle.color,
          borderRadius: '2px',
          transform,
          opacity: particle.opacity,
          pointerEvents: 'none',
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'visible',
          boxShadow: `0 1px 3px rgba(0,0,0,0.2)`
        }}
      />
    )
  }

  return (
    <div className={cn("flex flex-col items-center gap-6 relative py-4", className)}>
      {/* Confetti particles */}
      {particles.length > 0 && (
        <div className="absolute inset-0 overflow-visible z-50 pointer-events-none">
          {particles.map(renderParticle)}
        </div>
      )}

      {/* Blur overlay when success */}
      <div 
        className={cn(
          "absolute inset-0 backdrop-blur-sm bg-background/20 rounded-3xl transition-all duration-300 z-30",
          showSuccess ? "opacity-100" : "opacity-0 pointer-events-none"
        )} 
      />

      {/* Success checkmark overlay */}
      {showSuccess && (
        <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
          <div className="animate-success-pop">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-2xl ring-4 ring-emerald-400/30"
              style={{ boxShadow: '0 0 40px rgba(16, 185, 129, 0.5)' }}>
              <Check className="w-10 h-10 text-white" strokeWidth={3} />
            </div>
          </div>
        </div>
      )}

      {/* Emoji rating buttons */}
      <div 
        className={cn(
          "flex items-center gap-3 transition-all duration-300",
          showSuccess && "blur-sm scale-95 opacity-50"
        )}
      >
        {ratingData.map((item, i) => {
          const value = i + 1
          const isActive = value <= displayRating

          return (
            <button
              key={value}
              onClick={() => handleClick(value)}
              onMouseEnter={() => setHoverRating(value)}
              onMouseLeave={() => setHoverRating(0)}
              className="group relative focus:outline-none"
              aria-label={`Rate ${value}: ${item.label}`}
              disabled={showSuccess}
            >
              <div
                className={cn(
                  "relative flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 ease-out",
                  isActive ? "scale-110" : "scale-100 group-hover:scale-105",
                )}
              >
                <span
                  className={cn(
                    "text-3xl transition-all duration-300 ease-out select-none",
                    isActive
                      ? "grayscale-0 drop-shadow-lg"
                      : "grayscale opacity-40 group-hover:opacity-70 group-hover:grayscale-[0.3]",
                  )}
                >
                  {item.emoji}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      <div 
        className={cn(
          "relative h-7 w-32 transition-all duration-300",
          showSuccess && "blur-md opacity-0"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out",
            displayRating > 0 ? "opacity-0 blur-md scale-95" : "opacity-100 blur-0 scale-100",
          )}
        >
          <span className="text-sm font-medium text-muted-foreground">Rate us</span>
        </div>

        {ratingData.map((item, i) => (
          <div
            key={i}
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out",
              displayRating === i + 1 ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-md scale-105",
            )}
          >
            <span className="text-sm font-semibold tracking-wide text-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
