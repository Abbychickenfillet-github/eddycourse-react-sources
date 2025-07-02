import React from 'react'

const DiamondPattern = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100">
    <defs>
      <pattern id="diamondPattern" patternUnits="userSpaceOnUse" width="20" height="20">
        <path d="M10 0 L20 10 L10 20 L0 10 Z" fill="none" stroke="#a0c4ff" strokeWidth="0.5" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#diamondPattern)" />
  </svg>
)

export default function Component() {
  return (
    <div className="grid grid-cols-2 gap-8 p-8 bg-gray-100">
      <div className="relative p-4 bg-white">
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          <DiamondPattern />
        </div>
        <div className="relative z-10 p-4 bg-white">
          <h2 className="text-xl font-bold mb-2">Diamond Border</h2>
          <p>Elegant diamond pattern using SVG</p>
        </div>
      </div>
      
      <div className="p-4 bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 border-8 border-yellow-600" style={{
        boxShadow: 'inset 0 0 0 2px #fff, 0 0 0 4px #c39b3a, 0 0 10px rgba(0,0,0,0.3)',
        borderImage: 'linear-gradient(45deg, #ffd700, #ffcc00, #ffd700) 1',
      }}>
        <div className="bg-white p-4">
          <h2 className="text-xl font-bold mb-2">Gold Noble Border</h2>
          <p>Inspired by European nobility</p>
        </div>
      </div>
      
      <div className="p-4 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 border-4" style={{
        borderColor: '#e0e0e0',
        boxShadow: 'inset 0 0 10px rgba(255,255,255,0.5), 0 0 10px rgba(0,0,0,0.1)',
      }}>
        <div className="bg-white p-4">
          <h2 className="text-xl font-bold mb-2">Silver Minimalist Border</h2>
          <p>Simple and shiny with a metallic feel</p>
        </div>
      </div>
      
      <div className="p-4 bg-gradient-to-br from-yellow-700 via-yellow-600 to-yellow-800 border-4" style={{
        borderColor: '#b87333',
        boxShadow: 'inset 0 0 10px rgba(255,215,0,0.3), 0 0 10px rgba(0,0,0,0.2)',
      }}>
        <div className="bg-white p-4">
          <h2 className="text-xl font-bold mb-2">Copper Metallic Border</h2>
          <p>Rich copper color with metallic sheen</p>
        </div>
      </div>
    </div>
  )
}