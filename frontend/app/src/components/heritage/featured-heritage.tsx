'use client'

import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { ArtifactCard } from '@/components/ui/artifact-card'
import { HeritageDivider } from '@/components/ui/museum-primitives'
import { FEATURED_MONUMENTS, FEATURED_ARTEFACTS, FEATURED_TRADITIONS } from '@/data/heritage'
import Link from 'next/link'
import type { HeritageAsset } from '@/types/heritage'

const ALL_FEATURED: HeritageAsset[] = [
  ...FEATURED_MONUMENTS.slice(0, 3),
  ...FEATURED_ARTEFACTS.slice(0, 1),
]

/* ─── Fade-up stagger animation ─────────────────────────────────────────── */

const fadeUpVariants: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
}

/* ─── Component ──────────────────────────────────────────────────────────── */

export function FeaturedHeritage() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={sectionRef}
      className="texture-paper py-20 md:py-28 bg-[var(--bg-page)]"
      aria-labelledby="featured-heritage-heading"
    >
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8">

        {/* ── Section header ── */}
        <motion.div
          className="flex flex-col items-center text-center gap-4 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <HeritageDivider label="Heritage of India" />

          <h2
            id="featured-heritage-heading"
            className="font-display text-display-md text-[var(--text-primary)] max-w-2xl"
          >
            Monuments That Shaped a Civilisation
          </h2>

          <p className="font-ui text-base text-[var(--text-muted)] max-w-lg leading-relaxed">
            From Ajanta's ancient murals to Rajasthan's mighty forts —
            explore India's most significant heritage sites.
          </p>
        </motion.div>

        {/* ── Featured grid ── */}
        {/* Main layout: large card left + smaller cards right */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Large feature card — spans 2 rows on desktop */}
          <motion.div
            className="md:col-span-1 lg:col-span-1 lg:row-span-2"
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <ArtifactCard
              asset={ALL_FEATURED[0]}
              variant="feature"
              className="h-full min-h-[340px] lg:min-h-[520px]"
              priority
            />
          </motion.div>

          {/* Medium cards — top-right */}
          {ALL_FEATURED.slice(1, 4).map((asset, i) => (
            <motion.div
              key={asset.id}
              custom={i + 1}
              variants={fadeUpVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <ArtifactCard
                asset={asset}
                variant="museum"
                className="h-full min-h-[240px]"
              />
            </motion.div>
          ))}
        </div>

        {/* ── Also Explore: Traditions row ── */}
        <motion.div
          className="mt-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-xl text-[var(--text-primary)]">
              Living Traditions
            </h3>
            <Link
              href="/explore?category=tradition"
              className="font-ui text-sm text-bronze-500 hover:text-bronze-600 transition-colors
                         flex items-center gap-1.5 tracking-wide"
            >
              All traditions
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FEATURED_TRADITIONS.map((tradition, i) => (
              <motion.div
                key={tradition.id}
                custom={i + 4}
                variants={fadeUpVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
              >
                <ArtifactCard asset={tradition} variant="archive" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── View all CTA ── */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link href="/explore" id="featured-explore-all-btn" className="btn-heritage-secondary">
            Explore all heritage
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
