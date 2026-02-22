'use client'

import { motion } from 'framer-motion'

export default function LoadingState() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/90 backdrop-blur-xl z-50">
      <div className="relative">
        {/* Outer rings */}
        <motion.div 
          className="absolute inset-0 border-2 border-cyan-500/30 rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div 
          className="absolute inset-0 border-2 border-blue-500/30 rounded-full"
          animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0, 0.2] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        />
        
        {/* Center cube */}
        <motion.div 
          className="w-24 h-24 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl"
          animate={{ 
            rotateY: 360,
            boxShadow: [
              '0 0 20px rgba(6,182,212,0.5)',
              '0 0 40px rgba(6,182,212,0.8)',
              '0 0 20px rgba(6,182,212,0.5)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full bg-black/50 rounded-xl flex items-center justify-center">
            <span className="text-2xl font-bold text-white">G</span>
          </div>
        </motion.div>
        
        {/* Text */}
        <motion.p 
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-sm text-gray-400 whitespace-nowrap"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Initializing neural interface...
        </motion.p>
      </div>
    </div>
  )
}
