'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  MapPin,
  Compass,
  Filter,
  Layers,
  X,
  ArrowRight,
  Info,
  Sparkles,
  Maximize2,
  Minimize2,
  Search,
} from 'lucide-react'
import {
  EraBadge,
  LocationMarker,
  ArchiveTag,
  HeritageDivider,
  Ornament,
  ExhibitionFrame,
} from '@/components/ui/museum-primitives'
import { MAP_MARKERS } from '@/data/heritage'
import { ALL_HERITAGE_ASSETS } from '@/services/heritage-service'
import type { HeritageCategory, HistoricalPeriod, MapMarker as MapMarkerType, HeritageAsset } from '@/types/heritage'

/* ─── India Map Coordinates Data (Archaeological Map Projection) ────────── */
// Scaled map markers mapped to SVG percentage coordinates for precise archaeological map layout
const INDIA_MAP_SITES: (MapMarkerType & { x: number; y: number; asset: HeritageAsset })[] = [
  {
    id: 'mk-001',
    assetId: 'mon-001',
    name: 'Kumbhalgarh Fort',
    category: 'monument',
    state: 'Rajasthan',
    lat: 25.1484,
    lng: 73.5882,
    x: 32,
    y: 38,
    thumbnail: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&q=80',
    asset: ALL_HERITAGE_ASSETS[0],
  },
  {
    id: 'mk-002',
    assetId: 'mon-002',
    name: 'Brihadeeswarar Temple',
    category: 'architecture',
    state: 'Tamil Nadu',
    lat: 10.7825,
    lng: 79.1316,
    x: 48,
    y: 84,
    thumbnail: 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=400&q=80',
    asset: ALL_HERITAGE_ASSETS[1],
  },
  {
    id: 'mk-003',
    assetId: 'mon-003',
    name: 'Hampi Vijayanagara',
    category: 'monument',
    state: 'Karnataka',
    lat: 15.335,
    lng: 76.46,
    x: 42,
    y: 68,
    thumbnail: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=400&q=80',
    asset: ALL_HERITAGE_ASSETS[2],
  },
  {
    id: 'mk-004',
    assetId: 'mon-004',
    name: 'Ajanta Cave Murals',
    category: 'architecture',
    state: 'Maharashtra',
    lat: 20.5523,
    lng: 75.7033,
    x: 38,
    y: 52,
    thumbnail: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=80',
    asset: ALL_HERITAGE_ASSETS[3],
  },
  {
    id: 'mk-005',
    assetId: 'art-001',
    name: 'Mohenjo-daro Bronze',
    category: 'sculpture',
    state: 'Indus Valley',
    lat: 27.3244,
    lng: 68.1378,
    x: 20,
    y: 30,
    thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80',
    asset: ALL_HERITAGE_ASSETS[4],
  },
  {
    id: 'mk-006',
    assetId: 'trd-002',
    name: 'Warli Art Region',
    category: 'tradition',
    state: 'Maharashtra',
    lat: 19.8,
    lng: 72.7,
    x: 30,
    y: 56,
    thumbnail: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&q=80',
    asset: ALL_HERITAGE_ASSETS[5],
  },
  {
    id: 'mk-007',
    assetId: 'trd-001',
    name: 'Bharatanatyam Origin',
    category: 'dance',
    state: 'Tamil Nadu',
    lat: 11.9416,
    lng: 79.8083,
    x: 52,
    y: 80,
    thumbnail: 'https://images.unsplash.com/photo-1617688319108-cb3bdc88f587?w=400&q=80',
    asset: ALL_HERITAGE_ASSETS[6],
  },
]

export default function HeritageMapPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all')
  const [activeSite, setActiveSite] = useState<typeof INDIA_MAP_SITES[0] | null>(INDIA_MAP_SITES[0])
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Filter sites
  const filteredSites = useMemo(() => {
    return INDIA_MAP_SITES.filter((site) => {
      if (selectedCategory !== 'all' && site.category !== selectedCategory) return false
      if (selectedPeriod !== 'all' && site.asset.period !== selectedPeriod) return false
      return true
    })
  }, [selectedCategory, selectedPeriod])

  return (
    <div className="min-h-screen pt-[var(--nav-height)] bg-[var(--bg-page)] pb-24">
      {/* ── Header ── */}
      <section className="texture-paper py-10 md:py-12 border-b border-[var(--border-light)] bg-[var(--bg-surface)]">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 text-center flex flex-col items-center gap-3">
          <HeritageDivider label="Archaeological Mapping" />
          <h1 className="font-display text-display-md md:text-display-lg text-[var(--text-primary)]">
            Interactive Heritage Map of India
          </h1>
          <p className="font-ui text-base text-[var(--text-muted)] max-w-xl leading-relaxed">
            Explore ancient monuments, sacred temples, traditional art regions, and UNESCO sites plotted across the Indian subcontinent.
          </p>
        </div>
      </section>

      {/* ── Map Workspace ── */}
      <main className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 mt-8">
        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[var(--border-light)]">
          {/* Category & Period Filter Pills */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-monument text-xs text-[var(--text-muted)] tracking-wider flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-bronze-500" /> CATEGORY:
            </span>
            {[
              { id: 'all', label: 'All Heritage' },
              { id: 'monument', label: 'Monuments' },
              { id: 'architecture', label: 'Architecture' },
              { id: 'sculpture', label: 'Sculptures' },
              { id: 'tradition', label: 'Traditions' },
              { id: 'dance', label: 'Performing Arts' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 font-ui text-xs border transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-walnut-700 text-parchment-100 border-walnut-700'
                    : 'bg-[var(--bg-elevated)] text-[var(--text-muted)] border-[var(--border-main)] hover:border-bronze-500'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="font-monument text-xs text-bronze-500 tracking-wider">
            {filteredSites.length} SITES PLOTTED
          </div>
        </div>

        {/* ── Main Map + Exhibition Drawer Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6 items-start">
          {/* Left 2 Columns: Archaeological SVG Map Canvas */}
          <div className="lg:col-span-2 relative bg-walnut-900 border border-bronze-500/30 p-6 shadow-heritage-md overflow-hidden min-h-[520px] flex flex-col justify-between">
            {/* Top Bar Telemetry */}
            <div className="flex items-center justify-between border-b border-parchment-100/10 pb-3 z-10">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-bronze-400 animate-spin-slow" />
                <span className="font-monument text-xs text-parchment-200 tracking-widest">
                  ARCHAEOLOGICAL SURVEY PROJECTION · INDIA
                </span>
              </div>
              <span className="font-ui text-[0.65rem] text-parchment-300/50">GRID: 20°N 78°E</span>
            </div>

            {/* Map Canvas with Topo Grid & Site Markers */}
            <div className="relative w-full h-[460px] my-4 flex items-center justify-center">
              {/* Background Topo & Grid Lines */}
              <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#c4a03a" strokeWidth="0.5" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
                {/* Compass Rose */}
                <circle cx="85%" cy="20%" r="40" stroke="#c4a03a" strokeWidth="0.5" fill="none" />
                <path d="M 85% 10% L 85% 30% M 75% 20% L 95% 20%" stroke="#c4a03a" strokeWidth="0.5" />
              </svg>

              {/* Stylized India Subcontinent Outline Path (Archaeological Silhouette) */}
              <svg className="w-full h-full max-h-[440px] opacity-35" viewBox="0 0 500 550" fill="none">
                <path
                  d="M 170 80 L 220 50 L 300 80 L 320 130 L 380 150 L 450 170 L 440 220 L 360 220 L 310 260 L 270 340 L 240 440 L 220 490 L 200 440 L 160 320 L 120 280 L 100 220 L 130 160 Z"
                  stroke="#c9a87c"
                  strokeWidth="1.5"
                  fill="#3d2b1f"
                  strokeDasharray="4 2"
                />
              </svg>

              {/* Plotted Site Markers */}
              {filteredSites.map((site) => {
                const isSelected = activeSite?.id === site.id

                return (
                  <motion.button
                    key={site.id}
                    onClick={() => setActiveSite(site)}
                    style={{ left: `${site.x}%`, top: `${site.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group z-20 focus:outline-none"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Reticle Ping Ring */}
                    {isSelected && (
                      <span className="absolute -inset-2 rounded-full border border-bronze-400 animate-ping opacity-75" />
                    )}

                    {/* Marker Dot */}
                    <div
                      className={`relative w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-bronze-500 border-parchment-100 text-parchment-100 shadow-[0_0_12px_#c4a03a]'
                          : 'bg-walnut-900 border-bronze-400/60 text-bronze-400 group-hover:bg-bronze-500 group-hover:text-parchment-100'
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                    </div>

                    {/* Marker Tooltip */}
                    <span className="absolute left-1/2 -bottom-6 -translate-x-1/2 whitespace-nowrap font-ui text-[0.65rem] font-semibold text-parchment-200 bg-walnut-900 px-2 py-0.5 border border-bronze-500/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      {site.name}
                    </span>
                  </motion.button>
                )
              })}
            </div>

            {/* Bottom Map Legend */}
            <div className="flex items-center justify-between border-t border-parchment-100/10 pt-3 text-[0.65rem] text-parchment-300/60 font-ui">
              <span>✦ CLICK ANY MARKER TO EXAMINE EXCAVATION DETAILS</span>
              <span>PROJECTION: LAMBERT CONFORMAL</span>
            </div>
          </div>

          {/* Right Column: Selected Site Exhibition Panel */}
          <div className="lg:col-span-1">
            {activeSite ? (
              <motion.div
                key={activeSite.id}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-[var(--bg-elevated)] border border-[var(--border-main)] p-6 shadow-heritage-md flex flex-col gap-4"
              >
                <div className="flex items-center justify-between border-b border-[var(--border-light)] pb-3">
                  <EraBadge era={activeSite.asset.periodLabel} size="sm" />
                  <ArchiveTag label={activeSite.category} variant="filled" />
                </div>

                <div className="relative aspect-[4/3] w-full border border-[var(--border-light)] overflow-hidden">
                  <Image src={activeSite.thumbnail} alt={activeSite.name} fill className="object-cover" />
                </div>

                <h3 className="font-heading text-xl text-[var(--text-primary)]">{activeSite.name}</h3>

                <LocationMarker state={activeSite.state} district={activeSite.asset.location.district} />

                <p className="font-ui text-sm text-[var(--text-muted)] leading-relaxed">
                  {activeSite.asset.shortDesc}
                </p>

                <div className="p-3 bg-[var(--bg-surface)] border border-[var(--border-light)] flex flex-col gap-1.5 font-ui text-xs">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Status:</span>
                    <span className="font-semibold text-walnut-800">{activeSite.asset.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Coordinates:</span>
                    <span className="font-mono text-bronze-600">{activeSite.lat}° N, {activeSite.lng}° E</span>
                  </div>
                </div>

                <Link
                  href={`/heritage/${activeSite.asset.slug}`}
                  className="btn-heritage-accent py-2.5 px-4 text-xs flex items-center justify-center gap-2 mt-2"
                >
                  Explore Full Heritage Record <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ) : (
              <div className="bg-[var(--bg-elevated)] border border-[var(--border-light)] p-8 text-center flex flex-col items-center gap-3">
                <Compass className="w-10 h-10 text-bronze-500/40" />
                <p className="font-ui text-sm text-[var(--text-muted)]">Select a site marker on the map to inspect historical details.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
