'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Play,
  Pause,
  Volume2,
  Bookmark,
  Share2,
  ScanLine,
  Box,
  Globe,
  MapPin,
  ChevronLeft,
  Calendar,
  Sparkles,
  Info,
  Layers,
  ArrowRight,
  Check,
} from 'lucide-react'
import {
  EraBadge,
  LocationMarker,
  ArchiveTag,
  MuseumLabelGrid,
  HeritageDivider,
  Ornament,
  ExhibitionFrame,
} from '@/components/ui/museum-primitives'
import { ArtifactCard } from '@/components/ui/artifact-card'
import {
  getHeritageBySlug,
  getRelatedAssets,
  getStoryForAsset,
} from '@/services/heritage-service'
import { SUPPORTED_LANGUAGES } from '@/data/heritage'
import { ThreeViewer } from '@/components/heritage/three-viewer'
import type { HeritageAsset, HeritageStory } from '@/types/heritage'

export default function HeritageDetailPage() {
  const params = useParams()
  const slug = (params?.slug as string) || ''
  const [asset, setAsset] = useState<HeritageAsset | null>(null)
  const [related, setRelated] = useState<HeritageAsset[]>([])
  const [story, setStory] = useState<HeritageStory | null>(null)
  const [loading, setLoading] = useState(true)

  // Audio player state
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioTime, setAudioTime] = useState(0)
  const [audioLang, setAudioLang] = useState('en')
  const [showTranscript, setShowTranscript] = useState(false)

  // Multilingual content state
  const [activeLang, setActiveLang] = useState('en')

  // Save / Share state
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)

  // 3D viewer state (placeholder interaction)
  const [viewer3dActive, setViewer3dActive] = useState(false)



  useEffect(() => {
    if (!slug) return
    let isMounted = true
    setLoading(true)

    getHeritageBySlug(slug).then((res) => {
      if (!isMounted) return
      if (res) {
        setAsset(res)
        getRelatedAssets(res.id).then((rel) => isMounted && setRelated(rel))
        getStoryForAsset(res.id).then((st) => isMounted && setStory(st))
      }
      setLoading(false)
    })

    return () => {
      isMounted = false
    }
  }, [slug])

  // Audio player simulation timer
  useEffect(() => {
    let interval: any
    if (isPlaying) {
      interval = setInterval(() => {
        setAudioTime((t) => {
          if (t >= 154) {
            setIsPlaying(false)
            return 0
          }
          return t + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-[var(--nav-height)] bg-[var(--bg-page)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-bronze-500/30 border-t-bronze-500 rounded-full animate-spin" />
          <p className="font-ui text-sm text-[var(--text-muted)] tracking-wider">
            Unrolling Historical Manuscript...
          </p>
        </div>
      </div>
    )
  }

  if (!asset) {
    return (
      <div className="min-h-screen pt-[var(--nav-height)] bg-[var(--bg-page)] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-heading text-2xl text-[var(--text-primary)] mb-2">Heritage Record Not Found</h2>
        <p className="font-ui text-sm text-[var(--text-muted)] mb-6">The requested monument or artefact record does not exist in our archive.</p>
        <Link href="/explore" className="btn-heritage-primary">Return to Archive</Link>
      </div>
    )
  }

  // Construct label grid values based on asset properties
  const labelItems = [
    { title: 'Dynasty / Patron', value: (asset as any).builder || (asset as any).dynasty || 'Royal Guild' },
    { title: 'Period / Era', value: asset.periodLabel },
    { title: 'Materials & Medium', value: (asset as any).materials?.join(', ') || (asset as any).medium || 'Stone & Masonry' },
    { title: 'Architectural Style', value: (asset as any).architectStyle || 'Classical Indian' },
    { title: 'Preservation Status', value: asset.status },
    { title: 'Current Location', value: `${asset.location.district ? asset.location.district + ', ' : ''}${asset.location.state}` },
  ]

  return (
    <div className="min-h-screen pt-[var(--nav-height)] bg-[var(--bg-page)] pb-24">
      {/* ── Top Navigation Bar / Breadcrumb ── */}
      <div className="bg-[var(--bg-surface)] border-b border-[var(--border-light)] py-3 px-4 md:px-8">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 font-ui text-xs text-[var(--text-muted)] hover:text-walnut-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Archive
          </Link>
          <div className="flex items-center gap-2">
            <ArchiveTag label={asset.category} variant="subtle" />
            <EraBadge era={asset.periodLabel} size="sm" />
          </div>
        </div>
      </div>

      {/* ── Header Hero Image ── */}
      <section className="relative w-full h-[55vh] min-h-[400px] bg-walnut-900 overflow-hidden">
        <Image
          src={asset.imageUrl}
          alt={asset.name}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-walnut-900 via-walnut-900/40 to-transparent" />

        {/* Hero Overlay Text */}
        <div className="absolute bottom-0 left-0 right-0 max-w-screen-xl mx-auto p-6 md:p-10 z-10 flex flex-col gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <EraBadge era={asset.periodLabel} size="lg" />
            <LocationMarker state={asset.location.state} district={asset.location.district} variant="light" />
          </div>

          <h1 className="font-display text-display-md md:text-display-lg text-parchment-100 leading-tight">
            {asset.name}
          </h1>

          <p className="font-ui text-base md:text-lg text-parchment-200/80 max-w-2xl leading-relaxed">
            {asset.shortDesc}
          </p>

          {/* Action Bar */}
          <div className="flex items-center gap-3 mt-4 flex-wrap">
            <button
              onClick={() => setSaved(!saved)}
              className={`btn-heritage-primary py-2.5 px-4 text-xs gap-2 ${saved ? 'bg-bronze-600 border-bronze-600' : ''}`}
            >
              <Bookmark className="w-4 h-4" /> {saved ? 'Saved to Collection' : 'Save to Collection'}
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
              }}
              className="btn-heritage-ghost py-2.5 px-4 text-xs gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
              {copied ? 'Link Copied' : 'Share'}
            </button>
            <Link
              href={`/scanner?preset=${asset.slug}`}
              className="btn-heritage-accent py-2.5 px-4 text-xs gap-2"
            >
              <ScanLine className="w-4 h-4" /> AI Scan Asset
            </Link>
          </div>
        </div>
      </section>

      {/* ── Main Detail Body ── */}
      <main className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left 2 Columns: Main Overview, Story & Audio Narration */}
          <div className="lg:col-span-2 flex flex-col gap-10">
            {/* Museum Label Grid */}
            <div className="bg-[var(--bg-elevated)] border border-[var(--border-light)] p-5">
              <span className="text-museum-label block mb-3">ARCHAEOLOGICAL RECORD DETAILS</span>
              <MuseumLabelGrid items={labelItems} cols={2} />
            </div>

            {/* Multilingual Selector */}
            <div className="flex items-center justify-between bg-[var(--bg-surface)] border border-[var(--border-light)] p-4">
              <span className="font-ui text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-2">
                <Globe className="w-4 h-4 text-bronze-500" /> Read Narrative In:
              </span>
              <div className="flex gap-1.5 flex-wrap">
                {SUPPORTED_LANGUAGES.slice(0, 5).map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setActiveLang(lang.code)}
                    className={`px-2.5 py-1 font-ui text-xs transition-colors ${
                      activeLang === lang.code
                        ? 'bg-walnut-700 text-parchment-100'
                        : 'border border-[var(--border-main)] text-[var(--text-muted)] hover:border-bronze-500/50'
                    }`}
                  >
                    {lang.nativeLabel}
                  </button>
                ))}
              </div>
            </div>

            {/* Description & Overview */}
            <div className="flex flex-col gap-4">
              <h2 className="font-heading text-2xl text-[var(--text-primary)]">Historical Overview</h2>
              <p className="font-ui text-base text-[var(--text-primary)] leading-relaxed space-y-4">
                {asset.description}
              </p>
            </div>

            {/* Museum Audio Narration Player */}
            <div className="bg-walnut-800 text-parchment-100 p-6 border border-bronze-500/30 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-bronze-400" />
                  <span className="font-monument text-xs text-parchment-200 tracking-wider">
                    MUSEUM AUDIO NARRATION
                  </span>
                </div>
                {/* Language Switcher */}
                <select
                  value={audioLang}
                  onChange={(e) => setAudioLang(e.target.value)}
                  className="bg-walnut-900 border border-parchment-100/20 text-parchment-200 font-ui text-xs p-1 outline-none"
                >
                  <option value="en">English Voice</option>
                  <option value="hi">Hindi Voice (हिन्दी)</option>
                  <option value="mr">Marathi Voice (मराठी)</option>
                </select>
              </div>

              {/* Progress Bar & Controls */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 rounded-full bg-bronze-500 hover:bg-bronze-600 text-parchment-100 flex items-center justify-center transition-transform active:scale-95"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>

                <div className="flex-1 flex flex-col gap-1">
                  <div className="relative w-full h-2 bg-walnut-900 overflow-hidden cursor-pointer">
                    <div
                      className="h-full bg-bronze-400"
                      style={{ width: `${(audioTime / 154) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between font-ui text-[0.65rem] text-parchment-300/60">
                    <span>{formatTime(audioTime)}</span>
                    <span>02:34</span>
                  </div>
                </div>
              </div>

              {/* Transcript Drawer Toggle */}
              <button
                onClick={() => setShowTranscript(!showTranscript)}
                className="font-ui text-xs text-bronze-400 hover:underline self-start mt-1"
              >
                {showTranscript ? 'Hide Audio Transcript' : 'View Audio Transcript'}
              </button>

              {showTranscript && (
                <div className="p-3 bg-walnut-900/80 border border-parchment-100/10 font-ui text-xs text-parchment-200/80 leading-relaxed italic">
                  "Welcome to the official digital preservation narration for {asset.name}. Located in {asset.location.state}, this masterpiece dates back to the {asset.periodLabel}. Notice the intricate structural craftsmanship and religious symbolism encoded into its surfaces..."
                </div>
              )}
            </div>

            {/* Historical Chapters Storytelling */}
            {story && (
              <div className="flex flex-col gap-6">
                <HeritageDivider label="Historical Narrative" />
                <div className="flex flex-col gap-6">
                  {story.chapters.map((chapter) => (
                    <div
                      key={chapter.id}
                      className="bg-[var(--bg-elevated)] border border-[var(--border-light)] p-6 flex flex-col gap-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-monument text-xs text-bronze-500 uppercase tracking-widest">
                          CHAPTER {chapter.order}
                        </span>
                        {chapter.year && <EraBadge era={chapter.year} size="sm" />}
                      </div>
                      <h3 className="font-heading text-xl text-[var(--text-primary)]">
                        {chapter.title}
                      </h3>
                      <p className="font-ui text-sm text-[var(--text-muted)] leading-relaxed">
                        {chapter.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: 3D/AR Viewer & Related Heritage */}
          <div className="flex flex-col gap-8">
            {/* 3D / AR Experience Interactive Card */}
            <div className="flex flex-col gap-4">
              <ThreeViewer />
            </div>

            {/* Related Heritage Assets */}
            <div className="flex flex-col gap-4">
              <h3 className="font-heading text-lg text-[var(--text-primary)]">Related Heritage</h3>
              <div className="flex flex-col gap-3">
                {related.map((relAsset) => (
                  <ArtifactCard key={relAsset.id} asset={relAsset} variant="archive" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
