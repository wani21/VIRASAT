'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { HERITAGE_TIMELINE } from '@/data/heritage'
import { HeritageDivider, EraBadge, Ornament } from '@/components/ui/museum-primitives'
import { cn } from '@/lib/utils'
import type { HistoricalPeriod } from '@/types/heritage'

/* ─── Period colour map ──────────────────────────────────────────────────── */

const PERIOD_COLORS: Record<HistoricalPeriod, string> = {
  ancient:  'bg-sandstone-400 text-walnut-900',
  medieval: 'bg-terracotta-500 text-parchment-100',
  mughal:   'bg-maroon-700 text-parchment-100',
  colonial: 'bg-stone-400 text-walnut-900',
  modern:   'bg-walnut-700 text-parchment-100',
  living:   'bg-bronze-500 text-parchment-100',
}

const PERIOD_LINE_COLOR: Record<HistoricalPeriod, string> = {
  ancient:  'bg-sandstone-400/60',
  medieval: 'bg-terracotta-500/60',
  mughal:   'bg-maroon-700/60',
  colonial: 'bg-stone-400/60',
  modern:   'bg-walnut-700/60',
  living:   'bg-bronze-500/60',
}

/* ─── Component ──────────────────────────────────────────────────────────── */

export function HeritagePeriods() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-60px' })

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-walnut-800 relative overflow-hidden"
      aria-labelledby="heritage-periods-heading"
    >
      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Crect x='29' y='1' width='2' height='2' fill='%23faf5e4'/%3E%3Crect x='1' y='29' width='2' height='2' fill='%23faf5e4'/%3E%3Crect x='57' y='29' width='2' height='2' fill='%23faf5e4'/%3E%3Crect x='29' y='57' width='2' height='2' fill='%23faf5e4'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          className="flex flex-col items-center text-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-bronze-500/50" />
            <span className="text-era text-bronze-500/80">Historical Journey</span>
            <div className="w-8 h-px bg-bronze-500/50" />
          </div>

          <h2
            id="heritage-periods-heading"
            className="font-display text-display-md text-parchment-100"
          >
            5,000 Years of Heritage
          </h2>

          <p className="font-ui text-base text-parchment-200/60 max-w-lg leading-relaxed">
            From the Indus Valley to the living traditions of today —
            explore heritage across the sweep of Indian history.
          </p>
        </motion.div>

        {/* ── Timeline ── */}
        <div className="relative">

          {/* Central spine line */}
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b
                       from-transparent via-bronze-500/30 to-transparent hidden md:block"
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3 }}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-0">
            {HERITAGE_TIMELINE.map((event, i) => {
              const isLeft = i % 2 === 0

              return (
                <motion.article
                  key={event.id}
                  className={cn(
                    'relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 py-6',
                    i < HERITAGE_TIMELINE.length - 1 && 'pb-8'
                  )}
                  initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  aria-label={`${event.year}: ${event.title}`}
                >
                  {/* Year dot on spine (desktop) */}
                  <div
                    className={cn(
                      'absolute left-1/2 top-8 -translate-x-1/2 z-10',
                      'w-3 h-3 rounded-full border-2 border-walnut-800 hidden md:block',
                      PERIOD_LINE_COLOR[event.era]
                    )}
                    aria-hidden="true"
                  />

                  {/* Left column (even items: content; odd items: year) */}
                  <div
                    className={cn(
                      'flex flex-col',
                      isLeft ? 'md:text-right md:items-end' : 'md:col-start-2 md:text-left'
                    )}
                  >
                    {isLeft ? (
                      /* Content — left aligned on desktop */
                      <TimelineContent event={event} align="right" />
                    ) : (
                      /* Year label — right side on desktop */
                      <TimelineYear event={event} />
                    )}
                  </div>

                  {/* Right column */}
                  <div
                    className={cn(
                      'flex flex-col',
                      isLeft ? 'md:col-start-2' : '',
                    )}
                  >
                    {isLeft ? (
                      <TimelineYear event={event} />
                    ) : (
                      <TimelineContent event={event} align="left" />
                    )}
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Sub-components ─────────────────────────────────────────────────────── */

function TimelineYear({ event }: { event: (typeof HERITAGE_TIMELINE)[0] }) {
  return (
    <div className="flex md:justify-center items-center gap-3 md:flex-col md:gap-1 pt-1">
      <span
        className={cn(
          'font-monument text-sm px-3 py-1 tracking-wider',
          PERIOD_COLORS[event.era]
        )}
        style={{ borderRadius: '1px' }}
      >
        {event.year}
      </span>
    </div>
  )
}

function TimelineContent({
  event,
  align,
}: {
  event: (typeof HERITAGE_TIMELINE)[0]
  align: 'left' | 'right'
}) {
  return (
    <div
      className={cn(
        'max-w-sm',
        align === 'right' ? 'md:ml-auto' : 'md:mr-auto'
      )}
    >
      <h3 className="font-heading text-lg text-parchment-100 mb-2">
        {event.title}
      </h3>
      <p className="font-ui text-sm text-parchment-200/60 leading-relaxed">
        {event.description}
      </p>
    </div>
  )
}
