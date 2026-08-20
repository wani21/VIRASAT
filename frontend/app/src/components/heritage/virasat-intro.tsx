'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Compass, ScanLine, Archive } from 'lucide-react'
import { HeritageDivider, Ornament } from '@/components/ui/museum-primitives'
import { cn } from '@/lib/utils'

/* ─── Three Pillars ──────────────────────────────────────────────────────── */

const PILLARS = [
  {
    id:      'explore',
    icon:    Compass,
    number:  'I',
    title:   'Explore',
    tagline: 'Thousands of years of history',
    desc:    'Navigate India\'s heritage through an immersive map, browse by historical period, region, dynasty, or category. Every monument, artefact, and tradition connected and accessible.',
  },
  {
    id:      'identify',
    icon:    ScanLine,
    number:  'II',
    title:   'Identify',
    tagline: 'AI-powered recognition',
    desc:    'Photograph a monument or artefact and let AI identify it — surfacing its historical period, cultural significance, dynasty, and related heritage in seconds.',
  },
  {
    id:      'preserve',
    icon:    Archive,
    number:  'III',
    title:   'Preserve',
    tagline: 'Digital memory for future generations',
    desc:    'Document and contribute to India\'s living cultural archive. Every story, image, and record added extends the reach of heritage preservation.',
  },
]

/* ─── Component ──────────────────────────────────────────────────────────── */

export function VirasetIntroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={sectionRef}
      className="texture-paper py-20 md:py-28 bg-[var(--bg-surface)] overflow-hidden"
      aria-labelledby="intro-heading"
    >
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8">

        {/* ── Top label ── */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="w-10 h-px bg-bronze-500/40" />
          <span className="text-era text-bronze-500/80">What is VIRASAT</span>
          <div className="w-10 h-px bg-bronze-500/40" />
        </motion.div>

        {/* ── Main heading ── */}
        <motion.div
          className="text-center mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            id="intro-heading"
            className="font-display text-display-md md:text-display-lg text-[var(--text-primary)] leading-tight"
          >
            Ancient Soul.
            <span className="block italic text-[var(--accent-bronze)]">Modern Technology.</span>
          </h2>
        </motion.div>

        {/* ── Mission text ── */}
        <motion.p
          className="font-ui text-base md:text-lg text-[var(--text-muted)] max-w-2xl mx-auto
                     text-center leading-relaxed mb-14 md:mb-20"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          VIRASAT is India's AI-powered digital museum — built to explore, identify, and preserve
          the full breadth of Indian cultural heritage. From Harappan artefacts to living folk
          traditions, every record connected through one immersive experience.
        </motion.p>

        {/* ── Ornamental divider ── */}
        <motion.div
          className="flex justify-center mb-14"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Ornament variant="lotus" size="lg" className="text-bronze-500/30" />
        </motion.div>

        {/* ── Three pillars ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:divide-x divide-[var(--border-light)]">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.id}
                className={cn(
                  'flex flex-col gap-5 px-6 md:px-10 py-8 md:py-10',
                  i !== 0 && 'border-t md:border-t-0 border-[var(--border-light)]',
                )}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.35 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Number + icon row */}
                <div className="flex items-center justify-between">
                  <span
                    className="font-monument text-4xl text-[var(--border-main)] leading-none select-none"
                    aria-hidden="true"
                  >
                    {pillar.number}
                  </span>
                  <div
                    className="w-10 h-10 flex items-center justify-center
                               border border-[var(--border-main)]"
                    style={{ borderRadius: '1px' }}
                    aria-hidden="true"
                  >
                    <Icon size={18} className="text-bronze-500" />
                  </div>
                </div>

                {/* Title */}
                <div className="flex flex-col gap-1">
                  <h3 className="font-heading text-xl text-[var(--text-primary)]">
                    {pillar.title}
                  </h3>
                  <span className="text-era text-bronze-500/70">{pillar.tagline}</span>
                </div>

                {/* Description */}
                <p className="font-ui text-sm text-[var(--text-muted)] leading-relaxed">
                  {pillar.desc}
                </p>

                {/* Bottom accent line */}
                <div className="w-8 h-0.5 bg-bronze-500/30 mt-auto" aria-hidden="true" />
              </motion.div>
            )
          })}
        </div>

        {/* ── Bottom ornament ── */}
        <motion.div
          className="flex justify-center gap-3 mt-14 text-bronze-500/20"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.7 }}
          aria-hidden="true"
        >
          <Ornament variant="diamond" size="sm" />
          <Ornament variant="diamond" size="sm" />
          <Ornament variant="diamond" size="sm" />
        </motion.div>
      </div>
    </section>
  )
}
