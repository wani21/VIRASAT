'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Filter,
  Grid,
  List,
  LayoutGrid,
  X,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  Compass,
} from 'lucide-react'
import { ArtifactCard } from '@/components/ui/artifact-card'
import {
  EraBadge,
  ArchiveTag,
  HeritageDivider,
  Ornament,
} from '@/components/ui/museum-primitives'
import { getHeritageAssets } from '@/services/heritage-service'
import { INDIAN_STATES, HERITAGE_CATEGORIES } from '@/data/heritage'
import type {
  HeritageAsset,
  HeritageCategory,
  HistoricalPeriod,
  HeritageStatus,
  SearchFilters,
} from '@/types/heritage'

/* ─── View Modes ────────────────────────────────────────────────────────── */
type ViewMode = 'grid' | 'museum' | 'archive'

/* ─── Period options ────────────────────────────────────────────────────── */
const PERIOD_OPTIONS: { id: HistoricalPeriod | 'all'; label: string }[] = [
  { id: 'all', label: 'All Eras' },
  { id: 'ancient', label: 'Ancient India (Pre-700 CE)' },
  { id: 'medieval', label: 'Medieval Era (700–1526 CE)' },
  { id: 'mughal', label: 'Mughal Period (1526–1757 CE)' },
  { id: 'colonial', label: 'Colonial Era (1757–1947 CE)' },
  { id: 'modern', label: 'Modern India (1947–Present)' },
  { id: 'living', label: 'Living Heritage' },
]

/* ─── Category options ──────────────────────────────────────────────────── */
const CATEGORY_OPTIONS: { id: HeritageCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Categories' },
  { id: 'monument', label: 'Monuments' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'artefact', label: 'Artefacts' },
  { id: 'sculpture', label: 'Sculptures' },
  { id: 'painting', label: 'Paintings & Murals' },
  { id: 'textile', label: 'Textiles & Crafts' },
  { id: 'dance', label: 'Performing Arts' },
  { id: 'tradition', label: 'Living Traditions' },
]

export default function ExplorePage() {
  const [assets, setAssets] = useState<HeritageAsset[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<ViewMode>('museum')

  // Search & Filter state
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<HeritageCategory | 'all'>('all')
  const [selectedPeriod, setSelectedPeriod] = useState<HistoricalPeriod | 'all'>('all')
  const [selectedState, setSelectedState] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  // Mobile filter drawer state
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)

  // Fetch data whenever filters change
  useEffect(() => {
    let isMounted = true
    setLoading(true)

    const filters: SearchFilters = {
      query,
      category: selectedCategory,
      period: selectedPeriod,
      state: selectedState,
      status: selectedStatus !== 'all' ? (selectedStatus as HeritageStatus) : undefined,
    }

    getHeritageAssets(filters).then((res) => {
      if (isMounted) {
        setAssets(res.assets)
        setLoading(false)
      }
    })

    return () => {
      isMounted = false
    }
  }, [query, selectedCategory, selectedPeriod, selectedState, selectedStatus])

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0
    if (selectedCategory !== 'all') count++
    if (selectedPeriod !== 'all') count++
    if (selectedState !== 'all') count++
    if (selectedStatus !== 'all') count++
    if (query.trim() !== '') count++
    return count
  }, [selectedCategory, selectedPeriod, selectedState, selectedStatus, query])

  const resetFilters = () => {
    setQuery('')
    setSelectedCategory('all')
    setSelectedPeriod('all')
    setSelectedState('all')
    setSelectedStatus('all')
  }

  return (
    <div className="min-h-screen pt-[var(--nav-height)] bg-[var(--bg-page)] pb-24">
      {/* ── Page Header ── */}
      <section className="texture-paper py-12 md:py-16 border-b border-[var(--border-light)] bg-[var(--bg-surface)]">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 text-center flex flex-col items-center gap-4">
          <HeritageDivider label="Digital Heritage Archive" />
          <h1 className="font-display text-display-md md:text-display-lg text-[var(--text-primary)]">
            Explore India's Legacy
          </h1>
          <p className="font-ui text-base text-[var(--text-muted)] max-w-xl leading-relaxed">
            Browse archaeological monuments, rare artefacts, ancient manuscripts, and living cultural traditions.
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-2xl mt-4 relative">
            <div className="relative flex items-center bg-[var(--bg-elevated)] border border-[var(--border-main)] shadow-heritage-sm">
              <Search className="absolute left-4 text-[var(--text-muted)] w-5 h-5" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search monuments, artefacts, dynasties, states..."
                className="w-full pl-12 pr-10 py-3.5 bg-transparent font-ui text-base text-[var(--text-primary)] placeholder:text-[var(--text-faint)] outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-4 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content Area ── */}
      <main className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 mt-8">
        {/* Controls Bar: Filters & View Switcher */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[var(--border-light)]">
          {/* Active Filter Pills & Counter */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-monument text-xs text-[var(--text-muted)] tracking-wider">
              {loading ? 'Searching...' : `${assets.length} HERITAGE RECORDS`}
            </span>

            {/* Active Pills */}
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-bronze-500/10 border border-bronze-500/30 text-bronze-600 font-ui text-xs">
                Category: {selectedCategory}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('all')} />
              </span>
            )}
            {selectedPeriod !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-bronze-500/10 border border-bronze-500/30 text-bronze-600 font-ui text-xs">
                Period: {selectedPeriod}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedPeriod('all')} />
              </span>
            )}
            {selectedState !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-bronze-500/10 border border-bronze-500/30 text-bronze-600 font-ui text-xs">
                State: {selectedState}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedState('all')} />
              </span>
            )}

            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="font-ui text-xs text-terracotta-600 hover:underline flex items-center gap-1 ml-2"
              >
                <RotateCcw className="w-3 h-3" /> Reset all
              </button>
            )}
          </div>

          {/* Right Controls: Mobile Filter Button & Desktop View Mode Switcher */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <button
              onClick={() => setFilterDrawerOpen(true)}
              className="lg:hidden btn-heritage-secondary py-2 px-3 text-xs flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4 text-bronze-500" />
              Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>

            {/* View Mode Switcher */}
            <div className="flex items-center border border-[var(--border-main)] bg-[var(--bg-elevated)] p-0.5">
              <button
                onClick={() => setViewMode('museum')}
                className={`p-1.5 transition-colors ${
                  viewMode === 'museum' ? 'bg-walnut-700 text-parchment-100' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
                title="Museum Exhibition View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 transition-colors ${
                  viewMode === 'grid' ? 'bg-walnut-700 text-parchment-100' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
                title="Large Feature Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('archive')}
                className={`p-1.5 transition-colors ${
                  viewMode === 'archive' ? 'bg-walnut-700 text-parchment-100' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
                title="Compact List Archive View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Two Column Layout: Filter Sidebar (Desktop) + Assets Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:flex flex-col gap-6 p-5 bg-[var(--bg-elevated)] border border-[var(--border-light)] h-fit sticky top-24">
            <div className="flex items-center justify-between border-b border-[var(--border-light)] pb-3">
              <span className="font-monument text-xs text-walnut-800 tracking-wider flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-bronze-500" />
                FILTER ARCHIVE
              </span>
              {activeFilterCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="font-ui text-xs text-[var(--text-muted)] hover:text-terracotta-600 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-museum-label">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                className="w-full p-2.5 bg-[var(--bg-page)] border border-[var(--border-main)] font-ui text-sm text-[var(--text-primary)] outline-none"
              >
                {CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Historical Period Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-museum-label">Historical Period</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as any)}
                className="w-full p-2.5 bg-[var(--bg-page)] border border-[var(--border-main)] font-ui text-sm text-[var(--text-primary)] outline-none"
              >
                {PERIOD_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* State Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-museum-label">State / Region</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full p-2.5 bg-[var(--bg-page)] border border-[var(--border-main)] font-ui text-sm text-[var(--text-primary)] outline-none"
              >
                <option value="all">All States</option>
                {INDIAN_STATES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* UNESCO / Status Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-museum-label">Preservation Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full p-2.5 bg-[var(--bg-page)] border border-[var(--border-main)] font-ui text-sm text-[var(--text-primary)] outline-none"
              >
                <option value="all">All Heritage Statuses</option>
                <option value="UNESCO World Heritage Site">UNESCO World Heritage Site</option>
                <option value="National Heritage">National Heritage</option>
                <option value="Intangible Heritage">Intangible Heritage</option>
              </select>
            </div>
          </aside>

          {/* Asset Results Display */}
          <div className="lg:col-span-3">
            {loading ? (
              // Thematic Loading State
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div className="w-10 h-10 border-2 border-bronze-500/30 border-t-bronze-500 rounded-full animate-spin" />
                <p className="font-ui text-sm text-[var(--text-muted)] tracking-wider">
                  Accessing Archaeological Archives...
                </p>
              </div>
            ) : assets.length === 0 ? (
              // Meaningful Thematic Empty State
              <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-[var(--bg-elevated)] border border-[var(--border-light)] gap-4">
                <Compass className="w-12 h-12 text-bronze-500/50" />
                <h3 className="font-heading text-xl text-[var(--text-primary)]">
                  No heritage records found for this journey
                </h3>
                <p className="font-ui text-sm text-[var(--text-muted)] max-w-md">
                  We couldn't find any historical monuments or artefacts matching your search parameters. Try adjusting your filters or search term.
                </p>
                <button onClick={resetFilters} className="btn-heritage-accent mt-2">
                  Reset Search Filters
                </button>
              </div>
            ) : (
              // Assets Grid according to ViewMode
              <motion.div
                layout
                className={
                  viewMode === 'archive'
                    ? 'flex flex-col gap-3'
                    : viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
                    : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                }
              >
                {assets.map((asset) => (
                  <ArtifactCard
                    key={asset.id}
                    asset={asset}
                    variant={viewMode === 'grid' ? 'feature' : viewMode === 'archive' ? 'archive' : 'museum'}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
