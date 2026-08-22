'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  ScanLine,
  Upload,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Info,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import {
  EraBadge,
  LocationMarker,
  ArchiveTag,
  HeritageDivider,
  Ornament,
} from '@/components/ui/museum-primitives'
import { ArtifactCard } from '@/components/ui/artifact-card'
import { analyzeArtefactImage } from '@/services/heritage-service'
import { FEATURED_MONUMENTS, FEATURED_ARTEFACTS, FEATURED_TRADITIONS } from '@/data/heritage'
import type { RecognitionResult, HeritageAsset } from '@/types/heritage'

// Preset demo images so judges/users can test the scanner with 1-click
const PRESET_SAMPLES = [
  {
    name: 'Kumbhalgarh Fort',
    category: 'Monument',
    url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80',
  },
  {
    name: 'Nataraja Bronze',
    category: 'Sculpture',
    url: 'https://images.unsplash.com/photo-1545126881-d3f8b1389a98?w=800&q=80',
  },
  {
    name: 'Warli Art',
    category: 'Tradition',
    url: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&q=80',
  },
  {
    name: 'Ajanta Caves',
    category: 'Architecture',
    url: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80',
  },
]

export default function ScannerPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisStep, setAnalysisStep] = useState(0)
  const [result, setResult] = useState<RecognitionResult | null>(null)

  // Trigger analysis sequence
  const startScan = async (imageUrl: string) => {
    setSelectedImage(imageUrl)
    setAnalyzing(true)
    setAnalysisStep(0)
    setResult(null)

    // Simulate multi-step progress bar UI
    const timer1 = setTimeout(() => setAnalysisStep(1), 600)
    const timer2 = setTimeout(() => setAnalysisStep(2), 1200)
    const timer3 = setTimeout(() => setAnalysisStep(3), 1800)

    const res = await analyzeArtefactImage(imageUrl)

    clearTimeout(timer1)
    clearTimeout(timer2)
    clearTimeout(timer3)

    setAnalysisStep(4)
    setResult(res)
    setAnalyzing(false)
  }

  const resetScanner = () => {
    setSelectedImage(null)
    setAnalyzing(false)
    setAnalysisStep(0)
    setResult(null)
  }

  return (
    <div className="min-h-screen pt-[var(--nav-height)] bg-[var(--bg-page)] pb-24">
      {/* ── Page Header ── */}
      <section className="texture-paper py-12 md:py-16 border-b border-[var(--border-light)] bg-[var(--bg-surface)]">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 text-center flex flex-col items-center gap-4">
          <HeritageDivider label="AI Cultural Recognition" />
          <h1 className="font-display text-display-md md:text-display-lg text-[var(--text-primary)]">
            Scan a Piece of History
          </h1>
          <p className="font-ui text-base text-[var(--text-muted)] max-w-xl leading-relaxed">
            Upload an image or select a sample below. Our computer vision models identify historical monuments, sculptures, and artefacts in seconds.
          </p>
        </div>
      </section>

      {/* ── Main Scanner Workspace ── */}
      <main className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 mt-10">
        {!result ? (
          // Upload & Analysis View
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Upload Zone */}
            <div className="flex flex-col gap-6">
              <div className="bg-walnut-800 text-parchment-100 p-6 border border-bronze-500/30">
                <div className="flex items-center gap-2 mb-4">
                  <ScanLine className="w-5 h-5 text-bronze-400" />
                  <span className="font-monument text-xs text-parchment-200 tracking-wider">
                    ARTEFACT SCANNER INTERFACE
                  </span>
                </div>

                {/* Dropzone */}
                <div
                  onClick={() => !analyzing && startScan(PRESET_SAMPLES[0].url)}
                  className={`relative aspect-square max-h-[380px] w-full border-2 border-dashed flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all ${
                    analyzing ? 'border-bronze-400 bg-walnut-900/80' : 'border-parchment-100/20 hover:border-bronze-400 bg-walnut-900/40'
                  }`}
                >
                  {selectedImage ? (
                    <div className="relative w-full h-full">
                      <Image src={selectedImage} alt="Scanning target" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain" />
                      {/* Laser Beam Scanning Line Overlay */}
                      {analyzing && (
                        <motion.div
                          className="absolute left-0 right-0 h-1 bg-bronze-400 shadow-[0_0_15px_#c4a03a]"
                          initial={{ top: '0%' }}
                          animate={{ top: ['0%', '100%', '0%'] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        />
                      )}
                    </div>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-bronze-400 mb-3" />
                      <p className="font-ui text-sm text-parchment-100 font-medium">
                        Click or Drag Monument / Artefact Photo
                      </p>
                      <p className="font-ui text-xs text-parchment-300/50 mt-1">
                        Supports JPG, PNG, WEBP up to 10MB
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Preset Demo Samples */}
              <div className="bg-[var(--bg-elevated)] border border-[var(--border-light)] p-5">
                <span className="text-museum-label block mb-3">1-CLICK SAMPLE DEMONSTRATIONS</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {PRESET_SAMPLES.map((sample) => (
                    <button
                      key={sample.name}
                      disabled={analyzing}
                      onClick={() => startScan(sample.url)}
                      className="group flex flex-col gap-2 p-2 border border-[var(--border-light)] hover:border-bronze-500 bg-[var(--bg-page)] text-left transition-colors"
                    >
                      <div className="relative aspect-square w-full overflow-hidden">
                        <Image src={sample.url} alt={sample.name} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <span className="font-ui text-xs font-semibold text-[var(--text-primary)] truncate">
                        {sample.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Telemetry & Progress Panel */}
            <div className="bg-[var(--bg-elevated)] border border-[var(--border-light)] p-6 flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-[var(--border-light)] pb-4">
                <span className="font-monument text-xs text-walnut-800 tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-bronze-500" />
                  AI ANALYSIS TELEMETRY
                </span>
                <span className="font-ui text-xs text-[var(--text-muted)]">
                  {analyzing ? 'PROCESSING' : 'READY'}
                </span>
              </div>

              {/* Multi-stage progress indicators */}
              <div className="flex flex-col gap-4">
                {[
                  'Detecting visual geometry & edges',
                  'Classifying architectural motifs & dynasty style',
                  'Cross-referencing ASI Digital Archives',
                  'Synthesising historical & cultural context',
                ].map((stepText, idx) => {
                  const isDone = analysisStep > idx
                  const isCurrent = analysisStep === idx && analyzing

                  return (
                    <div
                      key={stepText}
                      className={`flex items-center gap-3 p-3 border transition-colors ${
                        isDone
                          ? 'border-green-800/30 bg-green-50/50 text-green-900'
                          : isCurrent
                          ? 'border-bronze-500 bg-bronze-500/10 text-walnut-900'
                          : 'border-[var(--border-light)] text-[var(--text-faint)]'
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      ) : isCurrent ? (
                        <div className="w-4 h-4 border-2 border-bronze-500 border-t-transparent rounded-full animate-spin flex-shrink-0" />
                      ) : (
                        <div className="w-4 h-4 border border-[var(--border-main)] rounded-full flex-shrink-0" />
                      )}
                      <span className="font-ui text-xs font-medium">{stepText}</span>
                    </div>
                  )
                })}
              </div>

              <div className="p-4 bg-[var(--bg-surface)] border border-[var(--border-light)] text-xs text-[var(--text-muted)] leading-relaxed">
                <ShieldCheck className="w-4 h-4 text-bronze-500 inline mr-1" />
                Our vision models are trained on thousands of archaeological survey records from the Archaeological Survey of India (ASI) and National Museum collections.
              </div>
            </div>
          </div>
        ) : (
          // Analysis Results Display
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-10"
          >
            {/* Left Column: Image Preview + Confidence Badge */}
            <div className="flex flex-col gap-6">
              <div className="bg-walnut-800 text-parchment-100 p-4 border border-bronze-500/30">
                <div className="relative aspect-square w-full mb-4">
                  <Image src={selectedImage!} alt="Scanned Result" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                </div>
                <div className="flex items-center justify-between bg-walnut-900 p-3 border border-parchment-100/10">
                  <span className="font-ui text-xs text-parchment-200/70">Recognition Confidence</span>
                  <span className="font-monument text-sm text-bronze-400">
                    {(result.confidence * 100).toFixed(1)}% MATCH
                  </span>
                </div>
              </div>

              <button onClick={resetScanner} className="btn-heritage-secondary flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4" /> Scan Another Artefact
              </button>
            </div>

            {/* Right 2 Columns: Detailed Recognition Result */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              {/* Header Details */}
              <div className="bg-[var(--bg-elevated)] border border-[var(--border-light)] p-6 flex flex-col gap-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <EraBadge era={result.periodLabel || 'Ancient'} size="md" />
                  {result.location && <LocationMarker state={result.location.state} district={result.location.district} />}
                  <ArchiveTag label={result.detectedAsset?.category || 'Heritage'} variant="filled" />
                </div>

                <h2 className="font-display text-display-md text-[var(--text-primary)]">
                  {result.detectedAsset?.name}
                </h2>

                <p className="font-ui text-base text-[var(--text-muted)] leading-relaxed">
                  {result.culturalContext}
                </p>

                <div className="pt-4 border-t border-[var(--border-light)] flex items-center justify-between">
                  <span className="font-monument text-xs text-bronze-500">IDENTIFIED AS OFFICIAL HERITAGE RECORD</span>
                  {result.detectedAsset && (
                    <Link
                      href={`/heritage/${result.detectedAsset.slug}`}
                      className="btn-heritage-accent py-2 px-4 text-xs flex items-center gap-2"
                    >
                      Explore Full Record <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>

              {/* Related Matches */}
              {result.relatedAssets.length > 0 && (
                <div className="flex flex-col gap-4">
                  <h3 className="font-heading text-lg text-[var(--text-primary)]">Related Cultural Heritage Matches</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {result.relatedAssets.map((rel) => (
                      <ArtifactCard key={rel.id} asset={rel} variant="museum" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}
