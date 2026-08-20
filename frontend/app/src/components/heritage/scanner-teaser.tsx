'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ScanLine, Upload, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Ornament } from '@/components/ui/museum-primitives'
import { cn } from '@/lib/utils'

/* ─── Mock analysis steps displayed in the teaser ───────────────────────── */

const STEPS = [
  { label: 'Detecting visual features',       delay: 0 },
  { label: 'Matching architectural patterns', delay: 0.6 },
  { label: 'Connecting historical records',   delay: 1.2 },
  { label: 'Preparing cultural context',      delay: 1.8 },
]

/* ─── Component ──────────────────────────────────────────────────────────── */

export function ScannerTeaser() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' })
  const [scanning, setScanning] = useState(false)

  function handleDemoScan() {
    if (scanning) return
    setScanning(true)
    setTimeout(() => setScanning(false), 4000)
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-walnut-800 overflow-hidden"
      aria-labelledby="scanner-teaser-heading"
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(250,245,228,1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(250,245,228,1) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      {/* Subtle radial highlight centre */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(139,105,20,0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: Text ── */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Label */}
            <div className="flex items-center gap-3">
              <div className="w-6 h-px bg-bronze-500/50" />
              <span className="text-era text-bronze-500/80">AI Heritage Scanner</span>
            </div>

            {/* Heading */}
            <h2
              id="scanner-teaser-heading"
              className="font-display text-display-md text-parchment-100 leading-tight"
            >
              Scan a Piece
              <span className="block italic text-bronze-400/90">of History.</span>
            </h2>

            {/* Description */}
            <p className="font-ui text-base text-parchment-200/60 leading-relaxed max-w-md">
              Photograph any monument, sculpture, painting, or artefact.
              VIRASAT's AI identifies it — surfacing its historical period,
              dynasty, cultural significance, and related heritage instantly.
            </p>

            {/* Process steps */}
            <div className="flex flex-col gap-3 mt-2">
              {[
                { n: '01', label: 'Upload or photograph an artefact' },
                { n: '02', label: 'AI analyses visual and cultural patterns' },
                { n: '03', label: 'Receive full historical context' },
              ].map((step) => (
                <div
                  key={step.n}
                  className="flex items-center gap-4 py-3 border-b border-parchment-100/8"
                >
                  <span className="font-monument text-xs text-bronze-500/60 w-6 flex-shrink-0">
                    {step.n}
                  </span>
                  <span className="font-ui text-sm text-parchment-200/55">{step.label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <Link
                href="/scanner"
                id="scanner-teaser-cta"
                className="btn-heritage-accent group"
              >
                Try AI Scanner
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <button
                onClick={handleDemoScan}
                className="btn-heritage-ghost"
                aria-label="Watch a demo scan animation"
              >
                Watch demo
              </button>
            </div>
          </motion.div>

          {/* ── Right: Scanner UI mockup ── */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <ScannerMockup scanning={scanning || inView} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─── Scanner Mockup ─────────────────────────────────────────────────────── */

function ScannerMockup({ scanning }: { scanning: boolean }) {
  return (
    <div className="w-full max-w-[420px]">
      {/* Upload frame */}
      <div
        className="relative border border-parchment-100/15 bg-walnut-900/60
                   backdrop-blur-sm overflow-hidden"
        style={{ borderRadius: '1px' }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-parchment-100/10">
          <div className="flex items-center gap-2">
            <ScanLine size={14} className="text-bronze-500" aria-hidden="true" />
            <span className="font-monument text-xs text-parchment-200/50 tracking-widest">
              HERITAGE SCANNER
            </span>
          </div>
          <div className="flex gap-1.5" aria-hidden="true">
            <div className="w-2 h-2 rounded-full bg-parchment-100/10" />
            <div className="w-2 h-2 rounded-full bg-parchment-100/10" />
            <div className="w-2 h-2 rounded-full bg-bronze-500/40" />
          </div>
        </div>

        {/* Drop zone */}
        <div className="relative p-6">
          <div
            className={cn(
              'relative flex flex-col items-center justify-center gap-4 py-10 px-6',
              'border border-dashed transition-colors duration-500',
              scanning
                ? 'border-bronze-500/60 bg-bronze-500/5'
                : 'border-parchment-100/15 bg-parchment-100/3',
            )}
            style={{ borderRadius: '1px' }}
          >
            {/* Scanning corners */}
            {['top-0 left-0', 'top-0 right-0 rotate-90', 'bottom-0 right-0 rotate-180', 'bottom-0 left-0 -rotate-90'].map((pos, i) => (
              <div
                key={i}
                className={cn('absolute w-4 h-4', pos)}
                aria-hidden="true"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M1 8 V1 H8" stroke={scanning ? '#8b6914' : 'rgba(250,245,228,0.15)'} strokeWidth="1.5" />
                </svg>
              </div>
            ))}

            {/* Scanning animation line */}
            <AnimatePresence>
              {scanning && (
                <motion.div
                  className="absolute left-0 right-0 h-px bg-bronze-500/60"
                  style={{ boxShadow: '0 0 8px rgba(139,105,20,0.6)' }}
                  initial={{ top: '10%' }}
                  animate={{ top: ['10%', '90%', '10%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  aria-hidden="true"
                />
              )}
            </AnimatePresence>

            {/* Upload icon */}
            <div
              className={cn(
                'w-12 h-12 flex items-center justify-center border transition-colors duration-500',
                scanning ? 'border-bronze-500/50 bg-bronze-500/10' : 'border-parchment-100/15',
              )}
              style={{ borderRadius: '1px' }}
              aria-hidden="true"
            >
              <Upload size={20} className={cn('transition-colors', scanning ? 'text-bronze-400' : 'text-parchment-200/30')} />
            </div>

            <div className="text-center">
              <p className="font-ui text-sm text-parchment-200/50 mb-1">
                {scanning ? 'Analysing heritage...' : 'Drop image here'}
              </p>
              <p className="font-ui text-xs text-parchment-200/25">
                {scanning ? 'Connecting historical records' : 'Monument · Artefact · Painting · Sculpture'}
              </p>
            </div>

            {!scanning && (
              <button
                className="px-4 py-2 border border-parchment-100/15 font-ui text-xs
                           text-parchment-200/40 hover:border-bronze-500/40 hover:text-parchment-200/70
                           transition-colors"
                style={{ borderRadius: '1px' }}
              >
                Select image
              </button>
            )}
          </div>
        </div>

        {/* Analysis output panel */}
        <div className="border-t border-parchment-100/10 px-4 py-4 flex flex-col gap-2.5">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={12} className="text-bronze-500/60" aria-hidden="true" />
            <span className="font-monument text-[0.6rem] text-parchment-200/30 tracking-widest">
              AI ANALYSIS
            </span>
          </div>

          {STEPS.map((step, i) => (
            <AnalysisStep
              key={step.label}
              label={step.label}
              index={i}
              scanning={scanning}
              delay={step.delay}
            />
          ))}
        </div>
      </div>

      {/* Confidence preview (shown below the frame) */}
      <AnimatePresence>
        {scanning && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.5, delay: 2.2 }}
            className="mt-3 px-4 py-3 border border-bronze-500/20 bg-bronze-500/5 flex items-center gap-3"
            style={{ borderRadius: '1px' }}
          >
            <div className="w-8 h-8 border border-bronze-500/30 flex items-center justify-center flex-shrink-0" style={{ borderRadius: '1px' }}>
              <Sparkles size={14} className="text-bronze-500" aria-hidden="true" />
            </div>
            <div>
              <p className="font-ui text-xs text-parchment-100/70 font-medium">Heritage identified</p>
              <p className="font-ui text-[0.65rem] text-parchment-200/40">Confidence · 94% · Medieval Period</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Single analysis step with progress animation ───────────────────────── */

function AnalysisStep({
  label, index, scanning, delay,
}: {
  label: string
  index: number
  scanning: boolean
  delay: number
}) {
  return (
    <motion.div
      className="flex items-center gap-3"
      animate={scanning ? { opacity: 1 } : { opacity: 0.25 }}
      transition={{ duration: 0.4, delay }}
    >
      {/* Step indicator */}
      <motion.div
        className={cn(
          'w-4 h-4 flex-shrink-0 border flex items-center justify-center transition-colors',
          scanning ? 'border-bronze-500/60 bg-bronze-500/10' : 'border-parchment-100/10',
        )}
        style={{ borderRadius: '1px' }}
        animate={scanning ? { borderColor: 'rgba(139,105,20,0.6)' } : {}}
        transition={{ delay }}
        aria-hidden="true"
      >
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-bronze-500"
          initial={{ scale: 0 }}
          animate={scanning ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: delay + 0.2, type: 'spring' }}
        />
      </motion.div>

      {/* Label */}
      <span className="font-ui text-xs text-parchment-200/50">{label}</span>

      {/* Progress bar */}
      <div className="flex-1 h-px bg-parchment-100/10 overflow-hidden ml-auto max-w-[60px]">
        <motion.div
          className="h-full bg-bronze-500/50"
          initial={{ scaleX: 0, originX: 0 }}
          animate={scanning ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.5, delay: delay + 0.1 }}
        />
      </div>
    </motion.div>
  )
}
