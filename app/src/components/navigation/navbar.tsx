'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Landmark, Search, Compass, MapPin, BookOpen, Archive,
  ScanLine, Menu, X, ChevronDown, Globe
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { SUPPORTED_LANGUAGES } from '@/data/heritage'

/* ─── Nav Links ──────────────────────────────────────────────────────────── */

const NAV_LINKS = [
  {
    label: 'Heritage',
    href:  '/heritage',
    icon:  Landmark,
    desc:  'Browse all heritage assets',
  },
  {
    label: 'Explore',
    href:  '/explore',
    icon:  Compass,
    desc:  'Discover by region and period',
  },
  {
    label: 'AI Scanner',
    href:  '/scanner',
    icon:  ScanLine,
    desc:  'Identify monuments and artefacts',
  },
  {
    label: 'Map',
    href:  '/map',
    icon:  MapPin,
    desc:  'Interactive heritage map of India',
  },
  {
    label: 'Stories',
    href:  '/stories',
    icon:  BookOpen,
    desc:  'Historical storytelling experiences',
  },
  {
    label: 'Archive',
    href:  '/archive',
    icon:  Archive,
    desc:  'Digital heritage archive',
  },
]

/* ─── Component ──────────────────────────────────────────────────────────── */

export function Navbar() {
  const pathname            = usePathname()
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [langOpen,    setLangOpen]    = useState(false)
  const [searchOpen,  setSearchOpen]  = useState(false)
  const [activeLang,  setActiveLang]  = useState('en')
  const searchRef = useRef<HTMLInputElement>(null)

  /* Scroll detection — transition navbar from transparent to solid */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* Close mobile menu on route change */
  useEffect(() => {
    setMobileOpen(false)
    setLangOpen(false)
    setSearchOpen(false)
  }, [pathname])

  /* Focus search input when opened */
  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  const isHome   = pathname === '/'
  const isActive = (href: string) => pathname.startsWith(href)

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === activeLang)

  return (
    <>
      <header
        role="banner"
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-500 ease-cinematic',
          scrolled || !isHome
            ? 'bg-[#faf5e4]/95 backdrop-blur-sm border-b border-[var(--border-light)] shadow-heritage-sm'
            : 'bg-transparent',
        )}
        style={{ height: 'var(--nav-height)' }}
      >
        <nav
          className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 h-full flex items-center justify-between gap-6"
          aria-label="Main navigation"
        >

          {/* ── Logo / Wordmark ── */}
          <Link
            href="/"
            className="flex items-center gap-2.5 flex-shrink-0 group"
            aria-label="VIRASAT — Home"
          >
            {/* Decorative mark */}
            <div
              className={cn(
                'w-7 h-7 border flex items-center justify-center flex-shrink-0',
                'transition-colors duration-300',
                scrolled || !isHome
                  ? 'border-bronze-500/50 text-bronze-500'
                  : 'border-parchment-200/50 text-parchment-200',
              )}
              style={{ borderRadius: '1px' }}
              aria-hidden="true"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="5" height="5" fill="currentColor" opacity="0.7" />
                <rect x="8" y="1" width="5" height="5" fill="currentColor" opacity="0.4" />
                <rect x="1" y="8" width="5" height="5" fill="currentColor" opacity="0.4" />
                <rect x="8" y="8" width="5" height="5" fill="currentColor" opacity="0.7" />
              </svg>
            </div>

            {/* Text wordmark — DO NOT REPLACE WITH LOGO until asset provided */}
            <div className="flex flex-col leading-none">
              <span
                className={cn(
                  'font-monument text-base tracking-[0.12em] transition-colors duration-300',
                  scrolled || !isHome ? 'text-walnut-800' : 'text-parchment-100',
                )}
              >
                VIRASAT
              </span>
              <span
                className={cn(
                  'font-ui text-[0.5rem] tracking-[0.18em] uppercase transition-colors duration-300',
                  scrolled || !isHome ? 'text-stone-400' : 'text-parchment-300/60',
                )}
              >
                Digital Heritage
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <ul
            className="hidden lg:flex items-center gap-1 flex-1 justify-center"
            role="list"
          >
            {NAV_LINKS.map(({ label, href, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5',
                    'font-ui text-sm font-medium tracking-[0.02em]',
                    'transition-all duration-200',
                    'rounded-[1px]',
                    isActive(href)
                      ? scrolled || !isHome
                        ? 'text-walnut-800 bg-sandstone-300/40'
                        : 'text-parchment-100 bg-parchment-100/10'
                      : scrolled || !isHome
                        ? 'text-stone-500 hover:text-walnut-700 hover:bg-sandstone-200/40'
                        : 'text-parchment-200/70 hover:text-parchment-100 hover:bg-parchment-100/10',
                  )}
                  aria-current={isActive(href) ? 'page' : undefined}
                >
                  <Icon size={14} aria-hidden="true" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Right Controls ── */}
          <div className="flex items-center gap-1 flex-shrink-0">

            {/* Search */}
            <button
              id="nav-search-btn"
              onClick={() => setSearchOpen(true)}
              className={cn(
                'p-2 transition-colors duration-200 rounded-[1px]',
                scrolled || !isHome
                  ? 'text-stone-400 hover:text-walnut-700 hover:bg-sandstone-200/40'
                  : 'text-parchment-200/60 hover:text-parchment-100 hover:bg-parchment-100/10',
              )}
              aria-label="Open search"
            >
              <Search size={18} />
            </button>

            {/* Language selector */}
            <div className="relative hidden md:block">
              <button
                id="nav-lang-btn"
                onClick={() => setLangOpen(!langOpen)}
                className={cn(
                  'flex items-center gap-1 px-2.5 py-1.5 transition-colors duration-200 rounded-[1px]',
                  scrolled || !isHome
                    ? 'text-stone-400 hover:text-walnut-700 hover:bg-sandstone-200/40'
                    : 'text-parchment-200/60 hover:text-parchment-100 hover:bg-parchment-100/10',
                )}
                aria-expanded={langOpen}
                aria-label="Select language"
              >
                <Globe size={14} />
                <span className="font-ui text-xs font-medium">
                  {currentLang?.nativeLabel}
                </span>
                <ChevronDown size={12} className={cn('transition-transform duration-200', langOpen && 'rotate-180')} />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 py-1 min-w-[160px]
                               bg-[var(--bg-elevated)] border border-[var(--border-main)]
                               shadow-heritage-md z-50"
                    style={{ borderRadius: '1px' }}
                    role="menu"
                    aria-label="Language options"
                  >
                    {SUPPORTED_LANGUAGES.map(lang => (
                      <button
                        key={lang.code}
                        role="menuitem"
                        onClick={() => { setActiveLang(lang.code); setLangOpen(false) }}
                        className={cn(
                          'w-full flex items-center justify-between px-4 py-2',
                          'font-ui text-sm transition-colors duration-150',
                          activeLang === lang.code
                            ? 'bg-sandstone-200/60 text-walnut-700'
                            : 'text-[var(--text-secondary)] hover:bg-sandstone-100/60 hover:text-walnut-700',
                        )}
                      >
                        <span>{lang.nativeLabel}</span>
                        <span className="text-xs text-[var(--text-faint)]">{lang.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile hamburger */}
            <button
              id="nav-mobile-menu-btn"
              className={cn(
                'lg:hidden p-2 transition-colors duration-200 rounded-[1px]',
                scrolled || !isHome
                  ? 'text-stone-400 hover:text-walnut-700'
                  : 'text-parchment-200/60 hover:text-parchment-100',
              )}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile Menu ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-walnut-900/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-72
                         bg-[var(--bg-page)] border-l border-[var(--border-light)]
                         shadow-heritage-lg flex flex-col lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-light)]">
                <span className="font-monument text-sm text-walnut-800 tracking-widest">VIRASAT</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 text-stone-400 hover:text-walnut-700 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto py-4 px-3" aria-label="Mobile navigation links">
                <ul role="list" className="flex flex-col gap-1">
                  {NAV_LINKS.map(({ label, href, icon: Icon, desc }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className={cn(
                          'flex items-start gap-3 px-3 py-3 rounded-[1px]',
                          'transition-colors duration-150',
                          isActive(href)
                            ? 'bg-sandstone-200/60 text-walnut-800'
                            : 'text-[var(--text-secondary)] hover:bg-sandstone-100/40 hover:text-walnut-700',
                        )}
                        aria-current={isActive(href) ? 'page' : undefined}
                      >
                        <Icon size={18} className="mt-0.5 flex-shrink-0 text-bronze-500" />
                        <div>
                          <div className="font-ui text-sm font-medium">{label}</div>
                          <div className="font-ui text-xs text-[var(--text-muted)] mt-0.5">{desc}</div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Language selector (mobile) */}
              <div className="border-t border-[var(--border-light)] p-4">
                <p className="text-museum-label mb-2">Language</p>
                <div className="flex flex-wrap gap-1.5">
                  {SUPPORTED_LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => setActiveLang(lang.code)}
                      className={cn(
                        'px-2.5 py-1 font-ui text-xs rounded-[1px] transition-colors',
                        activeLang === lang.code
                          ? 'bg-walnut-700 text-parchment-100'
                          : 'border border-[var(--border-main)] text-[var(--text-muted)] hover:border-bronze-500/50',
                      )}
                    >
                      {lang.nativeLabel}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Search Overlay ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-walnut-900/60 backdrop-blur-sm flex items-start justify-center pt-32 px-4"
            onClick={(e) => { if (e.target === e.currentTarget) setSearchOpen(false) }}
            role="dialog"
            aria-modal="true"
            aria-label="Search heritage"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 400 }}
              className="w-full max-w-2xl bg-[var(--bg-elevated)] border border-[var(--border-main)]
                         shadow-heritage-lg overflow-hidden"
              style={{ borderRadius: '1px' }}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--border-light)]">
                <Search size={18} className="text-[var(--text-muted)] flex-shrink-0" aria-hidden="true" />
                <input
                  ref={searchRef}
                  id="heritage-search-input"
                  type="search"
                  placeholder="Search India's heritage…"
                  className="flex-1 bg-transparent font-ui text-base text-[var(--text-primary)]
                             placeholder:text-[var(--text-faint)] outline-none"
                  aria-label="Search heritage"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  aria-label="Close search"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Search suggestions */}
              <div className="p-5">
                <p className="text-museum-label mb-3">Popular searches</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Ajanta Caves', 'Chola Temples', 'Warli Art',
                    'Rajasthan Forts', 'Classical Dance', 'Mohenjo-daro',
                    'Mughal Architecture', 'Bharatanatyam',
                  ].map(term => (
                    <button
                      key={term}
                      className="px-3 py-1.5 font-ui text-sm text-[var(--text-secondary)]
                                 border border-[var(--border-light)] hover:border-bronze-500/50
                                 hover:text-walnut-700 transition-colors"
                      style={{ borderRadius: '1px' }}
                      onClick={() => {
                        if (searchRef.current) searchRef.current.value = term
                        searchRef.current?.focus()
                      }}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
