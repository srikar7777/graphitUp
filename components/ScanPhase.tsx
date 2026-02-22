'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface ScanPhaseProps {
  progress: number
  phase: string
  url: string
}

export default function ScanPhase({ progress, phase, url }: ScanPhaseProps) {
  const [discovered, setDiscovered] = useState([
    { name: 'DNS Records', status: 'pending' },
    { name: 'TLS Certificate', status: 'pending' },
    { name: 'CDN Provider', status: 'pending' },
    { name: 'Web Server', status: 'pending' },
    { name: 'API Endpoints', status: 'pending' },
    { name: 'JS Frameworks', status: 'pending' },
    { name: 'Third-party Services', status: 'pending' },
    { name: 'Database Indicators', status: 'pending' },
  ])

  useEffect(() => {
    const newDiscovered = [...discovered]
    const completedCount = Math.floor(progress / 12.5)
    
    for (let i = 0; i < newDiscovered.length; i++) {
      if (i < completedCount) {
        newDiscovered[i].status = 'completed'
      } else if (i === completedCount) {
        newDiscovered[i].status = 'scanning'
      } else {
        newDiscovered[i].status = 'pending'
      }
    }
    
    setDiscovered(newDiscovered)
  }, [progress])

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main Scan Animation */}
      <div className="relative mb-12">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 border-2 border-cyan-500/30 rounded-full animate-ping" />
          <div className="w-48 h-48 border-2 border-blue-500/40 rounded-full animate-pulse" />
          <div className="w-32 h-32 border-2 border-purple-500/50 rounded-full animate-pulse-slow" />
        </div>
        
        <div className="relative z-10 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-40 h-40 mx-auto mb-4 rounded-full border-t-4 border-cyan-500 border-r-4 border-blue-500 border-b-4 border-purple-500 border-l-4 border-transparent"
          />
          
          <motion.h2 
            className="text-3xl font-bold mb-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {phase}
          </motion.h2>
          
          <p className="text-gray-400 mb-4">
            Analyzing {url}
          </p>
          
          <div className="w-64 mx-auto h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
          
          <p className="text-sm text-gray-500 mt-2">
            {progress}% Complete
          </p>
        </div>
      </div>
      
      {/* Discovery Feed */}
      <div className="glass-panel rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2" />
          Live Discovery Feed
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          {discovered.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                p-3 rounded-lg border transition-all
                ${item.status === 'completed' ? 'bg-green-500/10 border-green-500/30' : ''}
                ${item.status === 'scanning' ? 'bg-cyan-500/10 border-cyan-500/30 animate-pulse' : ''}
                ${item.status === 'pending' ? 'bg-white/5 border-white/10' : ''}
              `}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm">{item.name}</span>
                {item.status === 'completed' && (
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {item.status === 'scanning' && (
                  <div className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                )}
                {item.status === 'pending' && (
                  <div className="w-5 h-5 rounded-full border-2 border-white/20" />
                )}
              </div>
              
              {item.status === 'completed' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-green-400 mt-1"
                >
                  ✓ Discovered
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Real-time Logs */}
      <div className="mt-4 glass-panel rounded-2xl p-4">
        <div className="font-mono text-xs space-y-1">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-cyan-400"
          >
            {`> Initiating deep scan of ${url}`}
          </motion.p>
          {progress > 10 && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-400"
            >
              {`> Resolving DNS records...`}
            </motion.p>
          )}
          {progress > 25 && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-400"
            >
              {`> Establishing TLS connection...`}
            </motion.p>
          )}
          {progress > 40 && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-400"
            >
              {`> Detecting CDN provider...`}
            </motion.p>
          )}
          {progress > 55 && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-400"
            >
              {`> Mapping API endpoints...`}
            </motion.p>
          )}
          {progress > 70 && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-400"
            >
              {`> Identifying technologies...`}
            </motion.p>
          )}
          {progress > 85 && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-400"
            >
              {`> Building architecture graph...`}
            </motion.p>
          )}
        </div>
      </div>
    </div>
  )
}
