'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import ScanPhase from '@/components/ScanPhase'
import ArchitectureViewer from '@/components/ArchitectureViewer'

export default function Home() {
  const [url, setUrl] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [scanPhase, setScanPhase] = useState('')
  const [showArchitecture, setShowArchitecture] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Animated background effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{x: number; y: number; vx: number; vy: number}> = []
    const particleCount = 50

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      })
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.1)'
      ctx.lineWidth = 1
      
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.1 * (1 - distance / 150)})`
            ctx.stroke()
          }
        }
      }
      
      // Draw particles
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(6, 182, 212, 0.5)'
        ctx.fill()
        
        // Update position
        p.x += p.vx
        p.y += p.vy
        
        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
      })
      
      requestAnimationFrame(animate)
    }
    
    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleScan = async () => {
    if (!url) return
    
    setIsScanning(true)
    setShowArchitecture(false)
    
    // Simulate scan progress (replace with real WebSocket)
    const phases = [
      'DNS Resolution',
      'TLS Handshake',
      'CDN Detection',
      'Resource Mapping',
      'API Discovery',
      'Service Classification',
      'Building Graph',
      'Generating Lecture'
    ]
    
    for (let i = 0; i <= 100; i++) {
      setScanProgress(i)
      setScanPhase(phases[Math.floor(i / 12.5)])
      await new Promise(r => setTimeout(r, 50))
    }
    
    setIsScanning(false)
    setShowArchitecture(true)
  }

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />
      
      {/* Scan Line Effect */}
      <div className="scan-line" />
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="py-8 flex justify-between items-center"
        >
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
              <span className="text-2xl font-bold">G</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              graphitUp
            </span>
          </div>
          
          <div className="flex space-x-4">
            <button className="px-4 py-2 rounded-lg glass-panel hover:glass-panel-hover transition-all">
              <span className="text-sm">About</span>
            </button>
            <button className="px-4 py-2 rounded-lg glass-panel hover:glass-panel-hover transition-all">
              <span className="text-sm">Examples</span>
            </button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isScanning && !showArchitecture && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="min-h-[80vh] flex flex-col items-center justify-center"
            >
              <motion.h1 
                className="text-6xl md:text-8xl font-bold text-center mb-8"
                animate={{ 
                  textShadow: [
                    '0 0 20px rgba(6,182,212,0.5)',
                    '0 0 40px rgba(6,182,212,0.8)',
                    '0 0 20px rgba(6,182,212,0.5)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  See How The Web
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                  Really Works
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-400 mb-12 text-center max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Enter any URL and watch as we deconstruct its architecture into 
                a beautiful, interactive visual story
              </motion.p>
              
              <motion.div 
                className="w-full max-w-2xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="relative">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://stripe.com"
                    className="w-full px-6 py-4 text-lg bg-white/5 border border-white/10 rounded-2xl 
                             focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20
                             transition-all placeholder:text-gray-600"
                    onKeyPress={(e) => e.key === 'Enter' && handleScan()}
                  />
                  
                  <motion.button
                    onClick={handleScan}
                    disabled={!url}
                    className={cn(
                      "absolute right-2 top-2 px-6 py-2 rounded-xl",
                      "bg-gradient-to-r from-cyan-500 to-blue-500",
                      "text-white font-semibold",
                      "transition-all duration-300",
                      "hover:from-cyan-600 hover:to-blue-600",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      "shadow-lg shadow-cyan-500/25"
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Analyze →
                  </motion.button>
                </div>
                
                <div className="flex justify-center mt-8 space-x-4 text-sm text-gray-500">
                  <span>Try: stripe.com</span>
                  <span>•</span>
                  <span>netflix.com</span>
                  <span>•</span>
                  <span>uber.com</span>
                </div>
              </motion.div>
            </motion.div>
          )}

          {isScanning && (
            <motion.div
              key="scan"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-[80vh] flex items-center justify-center"
            >
              <ScanPhase 
                progress={scanProgress}
                phase={scanPhase}
                url={url}
              />
            </motion.div>
          )}

          {showArchitecture && (
            <motion.div
              key="architecture"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-8"
            >
              <ArchitectureViewer url={url} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
