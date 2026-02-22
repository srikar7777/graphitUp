'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Home() {
  const [url, setUrl] = useState('')
  const [isScanning, setIsScanning] = useState(false)

  return (
    <main className="relative min-h-screen">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20">
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
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 min-h-screen flex items-center justify-center">
        <div className="max-w-2xl w-full text-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
            className="text-xl text-gray-400 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Enter any URL and watch as we deconstruct its architecture
          </motion.p>
          
          <motion.div 
            className="relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://stripe.com"
              className="w-full px-6 py-4 text-lg bg-white/5 border border-white/10 rounded-2xl 
                       focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20
                       transition-all placeholder:text-gray-600"
            />
            
            <button
              onClick={() => setIsScanning(true)}
              disabled={!url}
              className="absolute right-2 top-2 px-6 py-2 rounded-xl
                       bg-gradient-to-r from-cyan-500 to-blue-500
                       text-white font-semibold
                       transition-all duration-300
                       hover:from-cyan-600 hover:to-blue-600
                       disabled:opacity-50 disabled:cursor-not-allowed
                       shadow-lg shadow-cyan-500/25"
            >
              Analyze →
            </button>
          </motion.div>
          
          <div className="flex justify-center mt-8 space-x-4 text-sm text-gray-500">
            <span>stripe.com</span>
            <span>•</span>
            <span>netflix.com</span>
            <span>•</span>
            <span>uber.com</span>
          </div>
        </div>
      </div>
    </main>
  )
}
