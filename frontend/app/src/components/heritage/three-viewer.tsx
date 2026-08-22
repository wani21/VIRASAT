'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import {
  RotateCcw,
  Maximize2,
  Minimize2,
  Box,
  Layers,
  Sparkles,
  Info,
  Smartphone,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'

// 3D Model Preset Definitions
const MODELS_3D = [
  {
    id: 'kumbhalgarh-wall',
    name: 'Kumbhalgarh Fort Rampart Wall',
    type: 'Granite Citadel Photogrammetry',
    color: 0x8c8070, // Stone Grey
    geometryType: 'fort',
    hotspots: [
      { id: 'hs-1', label: 'Rampart Thickness (15 ft)', x: 0, y: 1.2, z: 0.5 },
      { id: 'hs-2', label: 'Parapet Watchtower', x: -1.5, y: 0.8, z: -0.5 },
    ],
  },
  {
    id: 'nataraja-bronze',
    name: 'Chola Nataraja Bronze Sculpture',
    type: 'Panchaloha Bronze Mesh',
    color: 0x8b6914, // Antique Bronze
    geometryType: 'sculpture',
    hotspots: [
      { id: 'hs-1', label: 'Damaru (Creation Drum)', x: 0.8, y: 1.0, z: 0 },
      { id: 'hs-2', label: 'Apasmara (Ignorance Dwarf)', x: 0, y: -1.2, z: 0 },
    ],
  },
  {
    id: 'ajanta-pillar',
    name: 'Ajanta Cave #1 Rock Pillar',
    type: 'Basalt Rock-Cut Architecture',
    color: 0x4a3728, // Dark Walnut Basalt
    geometryType: 'pillar',
    hotspots: [
      { id: 'hs-1', label: 'Jataka Mural Pigment', x: 0, y: 0.5, z: 0.8 },
      { id: 'hs-2', label: 'Carved Lotus Capital', x: 0, y: 1.5, z: 0 },
    ],
  },
]

export function ThreeViewer() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [activeModelIdx, setActiveModelIdx] = useState(0)
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null)
  const [arActive, setArActive] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const currentModel = MODELS_3D[activeModelIdx]

  useEffect(() => {
    if (!mountRef.current) return

    const container = mountRef.current
    const width = container.clientWidth
    const height = container.clientHeight || 400

    // 1. Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x1a1a1a) // Dark charcoal background

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.set(0, 1.5, 5)

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.replaceChildren(renderer.domElement)

    // 4. Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xfff8e7, 1.2)
    directionalLight.position.set(5, 10, 7)
    scene.add(directionalLight)

    const pointLight = new THREE.PointLight(0xc4a03a, 1, 10)
    pointLight.position.set(-3, -2, 3)
    scene.add(pointLight)

    // 5. Mesh creation based on currentModel
    let mesh: THREE.Mesh

    if (currentModel.geometryType === 'fort') {
      const geo = new THREE.BoxGeometry(2.5, 1.8, 1.2)
      const mat = new THREE.MeshStandardMaterial({
        color: currentModel.color,
        roughness: 0.8,
        metalness: 0.2,
      })
      mesh = new THREE.Mesh(geo, mat)
    } else if (currentModel.geometryType === 'sculpture') {
      const geo = new THREE.TorusGeometry(1.2, 0.15, 16, 100)
      const mat = new THREE.MeshStandardMaterial({
        color: currentModel.color,
        roughness: 0.3,
        metalness: 0.8,
      })
      mesh = new THREE.Mesh(geo, mat)
    } else {
      const geo = new THREE.CylinderGeometry(0.8, 0.9, 3, 32)
      const mat = new THREE.MeshStandardMaterial({
        color: currentModel.color,
        roughness: 0.9,
        metalness: 0.1,
      })
      mesh = new THREE.Mesh(geo, mat)
    }

    scene.add(mesh)

    // 6. Interactive Orbit Rotation Animation loop
    let animationFrameId: number
    let isDragging = false
    let previousMousePosition = { x: 0, y: 0 }

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true
      previousMousePosition = { x: e.clientX, y: e.clientY }
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      const deltaX = e.clientX - previousMousePosition.x
      const deltaY = e.clientY - previousMousePosition.y

      mesh.rotation.y += deltaX * 0.01
      mesh.rotation.x += deltaY * 0.01

      previousMousePosition = { x: e.clientX, y: e.clientY }
    }

    const onMouseUp = () => {
      isDragging = false
    }

    container.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      if (!isDragging) {
        mesh.rotation.y += 0.005 // Gentle auto-rotation
      }
      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return
      const w = mountRef.current.clientWidth
      const h = mountRef.current.clientHeight || 400
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      container.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
    }
  }, [activeModelIdx])

  return (
    <div className="w-full bg-walnut-900 border border-bronze-500/30 text-parchment-100 flex flex-col shadow-heritage-lg">
      {/* ── Top Header Toolbar ── */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-parchment-100/10">
        <div className="flex items-center gap-2">
          <Box className="w-5 h-5 text-bronze-400" />
          <span className="font-monument text-xs text-parchment-200 tracking-widest">
            3D PHOTOGRAMMETRY VIEWPORT
          </span>
        </div>

        {/* Model Switcher Tabs */}
        <div className="flex gap-1.5 overflow-x-auto">
          {MODELS_3D.map((m, i) => (
            <button
              key={m.id}
              onClick={() => setActiveModelIdx(i)}
              className={`px-3 py-1 font-ui text-xs border transition-colors ${
                activeModelIdx === i
                  ? 'bg-bronze-500 text-parchment-100 border-bronze-500 font-semibold'
                  : 'bg-walnut-800 text-parchment-300/60 border-parchment-100/10 hover:border-bronze-500/40'
              }`}
            >
              {m.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* ── 3D Viewport Canvas Container ── */}
      <div className="relative w-full h-[420px] bg-walnut-950 flex items-center justify-center overflow-hidden">
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Interactive Hotspot Buttons Overlay */}
        {currentModel.hotspots.map((hs) => (
          <button
            key={hs.id}
            onClick={() => setSelectedHotspot(selectedHotspot === hs.id ? null : hs.id)}
            className="absolute z-20 group"
            style={{
              left: `${50 + hs.x * 20}%`,
              top: `${50 - hs.y * 15}%`,
            }}
          >
            <span className="relative flex h-5 w-5 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bronze-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-bronze-500 border border-parchment-100" />
            </span>

            {/* Hotspot Card Overlay */}
            {selectedHotspot === hs.id && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-7 w-48 bg-walnut-800 border border-bronze-400 p-2.5 shadow-heritage-md text-left z-30">
                <span className="font-monument text-[0.6rem] text-bronze-400 block mb-1">SPECIFICATION ANNOTATION</span>
                <p className="font-ui text-xs text-parchment-100 font-semibold">{hs.label}</p>
              </div>
            )}
          </button>
        ))}

        {/* User Interaction Instructions Overlay */}
        <div className="absolute bottom-4 left-4 z-10 font-ui text-[0.65rem] text-parchment-300/50 flex items-center gap-1.5 bg-walnut-900/80 px-3 py-1.5 border border-parchment-100/10 backdrop-blur-xs">
          <Info className="w-3.5 h-3.5 text-bronze-400" /> Click and drag to rotate 3D mesh
        </div>

        {/* AR Button */}
        <button
          onClick={() => setArActive(!arActive)}
          className={`absolute bottom-4 right-4 z-10 btn-heritage-accent py-1.5 px-3 text-xs gap-1.5 ${
            arActive ? 'bg-green-700 border-green-700' : ''
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          {arActive ? 'AR Mode Active (WebXR)' : 'View in AR Space'}
        </button>
      </div>

      {/* ── Bottom Telemetry Footer ── */}
      <div className="p-4 bg-walnut-800 border-t border-parchment-100/10 flex items-center justify-between font-ui text-xs">
        <div>
          <span className="font-semibold text-parchment-100">{currentModel.name}</span>
          <span className="text-parchment-300/50 block text-[0.7rem]">{currentModel.type}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[0.65rem] text-bronze-400 bg-walnut-900 px-2 py-1 border border-parchment-100/10">
            POLYGONS: 124,000
          </span>
        </div>
      </div>
    </div>
  )
}
