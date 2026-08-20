'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  Landmark, Gem, Scroll, Layers, Music, Globe,
} from 'lucide-react'
import { HERITAGE_CATEGORIES } from '@/data/heritage'
import { HeritageDivider } from '@/components/ui/museum-primitives'
import { cn } from '@/lib/utils'

/* ─── Icon map ───────────────────────────────────────────────────────────── */

const ICON_MAP: Record<string, React.ElementType> = {
  Landmark, Gem, Scroll, Layers, Music, Globe,
}

/* ─── Component ──────────────────────────────────────────────────────────── */

export function HeritageCategories() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-60px' })

  return (
    <section
      ref={sectionRef}
      className="texture-paper py-20 md:py-28 bg-[var(--bg-surface)]"
      aria-labelledby="categories-heading"
    >
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          className="flex flex-col items-center text-center gap-4 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <HeritageDivider label="Explore by Category" />

          <h2
            id="categories-heading"
            className="font-display text-display-md text-[var(--text-primary)] max-w-2xl"
          >
            India's Heritage in All Its Forms
          </h2>

          <p className="font-ui text-base text-[var(--text-muted)] max-w-lg leading-relaxed">
            Monuments and artefacts to music, textiles and living traditions —
            explore the full breadth of India's cultural inheritance.
          </p>
        </motion.div>

        {/* ── Categories grid ── */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
          role="list"
        >
          {HERITAGE_CATEGORIES.map((cat, i) => {
            const Icon = ICON_MAP[cat.icon] ?? Globe
            const href = `/explore?category=${cat.id}`

            return (
              <motion.div
                key={cat.id}
                role="listitem"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={href}
                  id={`category-${cat.id}-btn`}
                  className={cn(
                    'group relative flex flex-col overflow-hidden',
                    'border border-[var(--border-light)] hover:border-[var(--border-strong)]',
                    'transition-all duration-300 hover:shadow-heritage-md',
                    'bg-[var(--bg-elevated)]',
                    // Make the first card larger — spans 2 columns on md+
                    i === 0 ? 'md:col-span-1' : '',
                  )}
                  style={{ borderRadius: '1px' }}
                  aria-label={`Explore ${cat.label} — ${cat.count.toLocaleString()} records`}
                >
                  {/* Image */}
                  <div className="relative h-40 md:h-48 overflow-hidden">
                    <Image
                      src={cat.imageUrl}
                      alt={cat.label}
                      fill
                      sizes="(max-width: 640px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 ease-cinematic group-hover:scale-105"
                    />
                    {/* Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-walnut-900/70 to-transparent" />

                    {/* Icon badge */}
                    <div
                      className="absolute top-3 left-3 w-8 h-8 flex items-center justify-center
                                 bg-[var(--bg-elevated)]/90 border border-[var(--border-light)]"
                      style={{ borderRadius: '1px' }}
                    >
                      <Icon size={16} className="text-bronze-500" aria-hidden="true" />
                    </div>

                    {/* Count badge — bottom right of image */}
                    <div className="absolute bottom-3 right-3">
                      <span
                        className="font-monument text-[0.6rem] text-parchment-200/70
                                   tracking-wider bg-walnut-900/60 px-2 py-0.5 backdrop-blur-xs"
                        style={{ borderRadius: '1px' }}
                      >
                        {cat.count.toLocaleString()} records
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col gap-1.5">
                    <h3 className="font-heading text-sm md:text-base text-[var(--text-primary)]
                                   group-hover:text-walnut-600 transition-colors leading-snug">
                      {cat.label}
                    </h3>
                    <p className="font-ui text-xs text-[var(--text-muted)] leading-relaxed line-clamp-2">
                      {cat.desc}
                    </p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          className="mt-14 flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="divider-heritage max-w-xs" />
          <p className="font-ui text-sm text-[var(--text-muted)] text-center max-w-md">
            Can't find it? Use our AI scanner to identify any monument or artefact from a photograph.
          </p>
          <Link href="/scanner" id="categories-scanner-cta" className="btn-heritage-accent">
            Scan an Artefact
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
