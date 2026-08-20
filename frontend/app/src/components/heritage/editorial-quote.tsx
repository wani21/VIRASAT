'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Ornament } from '@/components/ui/museum-primitives'

/* ─── Component ──────────────────────────────────────────────────────────── */

export function EditorialQuote() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-60px' })

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-[var(--bg-page)] relative overflow-hidden"
      aria-label="Heritage editorial quote"
    >
      {/* Background pattern — very faint diagonal grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #3d2b1f 0px,
            #3d2b1f 1px,
            transparent 1px,
            transparent 40px
          )`,
        }}
        aria-hidden="true"
      />

      {/* Side ornamental lines */}
      <div
        className="absolute left-8 top-1/2 -translate-y-1/2 w-px h-32
                   bg-gradient-to-b from-transparent via-bronze-500/30 to-transparent
                   hidden lg:block"
        aria-hidden="true"
      />
      <div
        className="absolute right-8 top-1/2 -translate-y-1/2 w-px h-32
                   bg-gradient-to-b from-transparent via-bronze-500/30 to-transparent
                   hidden lg:block"
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto px-4 md:px-8 flex flex-col items-center text-center gap-8">

        {/* Opening marks */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          aria-hidden="true"
        >
          <Ornament variant="lotus" size="md" className="text-bronze-500/25" />
        </motion.div>

        {/* Large decorative quotation mark */}
        <motion.div
          className="font-display text-[8rem] md:text-[10rem] text-bronze-500/10 leading-none
                     select-none -mb-12 md:-mb-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          aria-hidden="true"
        >
          "
        </motion.div>

        {/* Quote text */}
        <motion.blockquote
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-display text-display-sm md:text-display-md text-[var(--text-primary)]
                        leading-relaxed italic max-w-3xl">
            Every monument is a letter from our ancestors.
            Every artefact, a question they have left for us to answer.
          </p>
        </motion.blockquote>

        {/* Attribution */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.45 }}
        >
          <div className="divider-heritage w-16 mx-auto" />
          <cite className="not-italic flex flex-col items-center gap-1">
            <span className="font-ui text-sm font-semibold text-[var(--text-secondary)] tracking-wide">
              VIRASAT Heritage Initiative
            </span>
            <span className="text-museum-label text-[var(--text-muted)]">
              Digital Preservation of Indian Cultural Heritage
            </span>
          </cite>
        </motion.div>

        {/* Stat row — reinforces the quote with scale */}
        <motion.div
          className="mt-6 flex items-center gap-10 md:gap-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          {[
            { value: '5,000+',  label: 'Years of recorded history' },
            { value: '40+',     label: 'UNESCO World Heritage Sites' },
            { value: '1,600+',  label: 'Intangible heritage elements' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="font-display text-2xl md:text-3xl text-[var(--text-primary)]">
                {stat.value}
              </span>
              <span className="font-ui text-xs text-[var(--text-muted)] tracking-wide text-center max-w-[100px]">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Bottom ornament */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          aria-hidden="true"
        >
          <Ornament variant="lotus" size="md" className="text-bronze-500/25" />
        </motion.div>
      </div>
    </section>
  )
}
