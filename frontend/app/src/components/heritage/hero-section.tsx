'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ScanLine } from 'lucide-react'
import { EraBadge, LocationMarker, HeritageDivider, Ornament } from '@/components/ui/museum-primitives'

/* ─── Hero images — rotating through monument photography ───────────────── */

const HERO_IMAGES = [
  {
    src:    'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1800&q=85',
    alt:    'Rajasthan fort at dawn',
    period: '15th Century',
    name:   'Kumbhalgarh Fort',
    state:  'Rajasthan',
  },
  {
    src:    'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1800&q=85',
    alt:    'Ajanta Caves rock-cut architecture',
    period: '2nd Century BCE',
    name:   'Ajanta Caves',
    state:  'Maharashtra',
  },
  {
    src:    'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=1800&q=85',
    alt:    'Brihadeeswarar Temple at dusk',
    period: '11th Century',
    name:   'Brihadeeswarar Temple',
    state:  'Tamil Nadu',
  },
]

/* ─── Component ──────────────────────────────────────────────────────────── */

export function HeroSection() {
  const [activeImage, setActiveImage] = useState(0)
  const [loaded,      setLoaded]      = useState(false)
  const containerRef  = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target:  containerRef,
    offset:  ['start start', 'end start'],
  })

  const heroY     = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const heroOp    = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const contentY  = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])

  /* Auto-rotate hero image every 7 seconds */
  useEffect(() => {
    setLoaded(true)
    const interval = setInterval(() => {
      setActiveImage(prev => (prev + 1) % HERO_IMAGES.length)
    }, 7000)
    return () => clearInterval(interval)
  }, [])

  const current = HERO_IMAGES[activeImage]

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col overflow-hidden bg-walnut-900"
      aria-label="Hero — Discover India's Living Heritage"
    >

      {/* ── Background Images (crossfade) ── */}
      <motion.div
        className="absolute inset-0"
        style={{ y: heroY }}
      >
        {HERO_IMAGES.map((img, i) => (
          <div
            key={img.src}
            className="absolute inset-0 transition-opacity duration-[2000ms] ease-cinematic"
            style={{ opacity: i === activeImage ? 1 : 0 }}
            aria-hidden={i !== activeImage}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              quality={85}
              className="object-cover animate-slow-pan"
            />
          </div>
        ))}

        {/* Layered overlays — parchment-toned gradient over photography */}
        <div className="absolute inset-0 bg-gradient-to-b
                        from-walnut-900/50 via-walnut-900/20 to-walnut-900/85" />
        <div className="absolute inset-0 bg-gradient-to-r
                        from-walnut-900/30 via-transparent to-transparent" />

        {/* Subtle paper texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
          aria-hidden="true"
        />
      </motion.div>

      {/* ── Content ── */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 md:px-8 text-center"
        style={{ y: contentY, opacity: heroOp }}
      >
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : -16 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8 flex items-center gap-3"
        >
          <div className="w-8 h-px bg-bronze-500/60" />
          <span className="text-era text-bronze-500/90">
            Archaeological Survey of India — Digital Preservation Initiative
          </span>
          <div className="w-8 h-px bg-bronze-500/60" />
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="font-display text-display-xl text-parchment-100 max-w-4xl leading-tight">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 32 }}
              transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Discover
            </motion.span>
            <motion.span
              className="block italic text-parchment-300/90"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 32 }}
              transition={{ duration: 0.9, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              India's Living
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 32 }}
              transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              Heritage
            </motion.span>
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          className="mt-6 font-ui text-lg text-parchment-200/70 max-w-xl leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 16 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          Identify monuments and artefacts. Explore historical stories.
          Experience India's rich cultural heritage — preserved with AI.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 16 }}
          transition={{ duration: 0.8, delay: 1.25 }}
        >
          <Link href="/explore" id="hero-explore-btn" className="btn-heritage-primary">
            Explore Heritage
          </Link>
          <Link href="/scanner" id="hero-scanner-btn" className="btn-heritage-ghost gap-2">
            <ScanLine size={16} />
            Scan an Artefact
          </Link>
        </motion.div>

        {/* Heritage stats */}
        <motion.div
          className="mt-16 flex items-center gap-8 md:gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          {[
            { value: '3,691',   label: 'Protected Monuments' },
            { value: '8,000+',  label: 'Artefacts Catalogued' },
            { value: '5,000+',  label: 'Years of History' },
          ].map(stat => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="font-display text-2xl md:text-3xl text-parchment-100">
                {stat.value}
              </span>
              <span className="font-ui text-xs text-parchment-300/60 tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Current monument metadata (bottom-left) ── */}
      <motion.div
        className="absolute bottom-12 left-6 md:left-10 z-10 flex flex-col gap-2"
        style={{ opacity: heroOp }}
        key={activeImage}
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <EraBadge era={current.period} />
        <p className="font-heading text-xl text-parchment-100">{current.name}</p>
        <LocationMarker state={current.state} variant="light" />
      </motion.div>

      {/* ── Image indicators ── */}
      <div className="absolute bottom-12 right-6 md:right-10 z-10 flex flex-col gap-2">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveImage(i)}
            className={`w-0.5 transition-all duration-400 rounded-full ${
              i === activeImage
                ? 'h-8 bg-parchment-200'
                : 'h-3 bg-parchment-200/30 hover:bg-parchment-200/50'
            }`}
            aria-label={`View ${HERO_IMAGES[i].name}`}
            aria-pressed={i === activeImage}
          />
        ))}
      </div>

      {/* ── Decorative corner ornament ── */}
      <div className="absolute top-[var(--nav-height)] right-6 pt-6 z-10 hidden lg:block">
        <Ornament variant="corner" size="md" className="text-parchment-200/20" />
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        style={{ opacity: heroOp }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <span className="text-museum-label text-parchment-300/40">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} className="text-parchment-300/40" />
        </motion.div>
      </motion.div>
    </section>
  )
}
