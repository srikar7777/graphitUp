'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap,
  Node,
  Edge 
} from 'react-flow-renderer'

interface ArchitectureViewerProps {
  url: string
}

export default function ArchitectureViewer({ url }: ArchitectureViewerProps) {
  const [activeChapter, setActiveChapter] = useState(0)
  
  const chapters = [
    'DNS Resolution',
    'Secure Connection',
    'CDN & Edge',
    'Resource Loading',
    'Backend Architecture',
    'Business Flow',
    'External Services'
  ]
  
  // Sample nodes (will be replaced with real data)
  const nodes: Node[] = [
    {
      id: '1',
      type: 'input',
      data: { label: 'Your Browser' },
      position: { x: 250, y: 25 },
      style: { background: '#0ea5e9', color: 'white', border: 'none' }
    },
    {
      id: '2',
      data: { label: 'DNS Resolver' },
      position: { x: 100, y: 125 },
      style: { background: '#8b5cf6', color: 'white', border: 'none' }
    },
    {
      id: '3',
      data: { label: 'CDN Edge' },
      position: { x: 400, y: 125 },
      style: { background: '#10b981', color: 'white', border: 'none' }
    }
  ]
  
  const edges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e1-3', source: '1', target: '3', animated: true }
  ]
  
  return (
    <div className="w-full">
      {/* Chapter Navigation */}
      <div className="flex overflow-x-auto pb-4 mb-6 space-x-2 no-scrollbar">
        {chapters.map((chapter, index) => (
          <motion.button
            key={chapter}
            onClick={() => setActiveChapter(index)}
            className={`
              px-4 py-2 rounded-lg whitespace-nowrap transition-all
              ${activeChapter === index 
                ? 'glass-panel-hover text-cyan-400 border-cyan-500/50' 
                : 'glass-panel text-gray-400 hover:text-white'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-sm font-medium">
              Chapter {index + 1}: {chapter}
            </span>
          </motion.button>
        ))}
      </div>
      
      {/* Main Visualization Area */}
      <div className="grid grid-cols-12 gap-6">
        {/* Graph View */}
        <div className="col-span-8 glass-panel rounded-2xl p-4 h-[600px]">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
            className="bg-transparent"
          >
            <Background color="#ffffff10" gap={16} />
            <Controls className="bg-white/10 border-white/20" />
            <MiniMap 
              nodeColor="#0ea5e9"
              maskColor="#00000080"
              className="bg-white/5"
            />
          </ReactFlow>
        </div>
        
        {/* Info Panel */}
        <div className="col-span-4 glass-panel rounded-2xl p-6 h-[600px] overflow-y-auto">
          <h3 className="text-xl font-bold mb-4 text-glow">
            Chapter {activeChapter + 1}: {chapters[activeChapter]}
          </h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <h4 className="text-sm text-gray-400 mb-2">What's happening</h4>
              <p className="text-sm">
                Your browser asks DNS servers where {url} lives. 
                This is like looking up an address in a phonebook.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm text-gray-400">Evidence Found</h4>
              <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm">DNS Records</span>
                  <span className="text-xs text-green-400">✓ Verified</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  A: 104.18.25.142<br />
                  AAAA: 2606:4700::6812:198e
                </p>
              </div>
              
              <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Nameservers</span>
                  <span className="text-xs text-cyan-400">Active</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  ns1.cloudflare.com<br />
                  ns2.cloudflare.com
                </p>
              </div>
            </div>
            
            <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl">
              <h4 className="text-sm text-purple-400 mb-2">💡 Beginner Explanation</h4>
              <p className="text-xs text-gray-300">
                Think of DNS like your phone's contacts. When you want to call someone, 
                you don't need to remember their number - you just look up their name. 
                DNS does the same for websites!
              </p>
            </div>
            
            <button className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-sm font-semibold">
              Ask AI About This
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
