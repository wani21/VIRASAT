import Link from 'next/link'
import { HeritageDivider, Ornament } from '@/components/ui/museum-primitives'

const NAV_COLS = [
  {
    heading: 'Explore',
    links: [
      { label: 'All Heritage',       href: '/explore' },
      { label: 'Monuments',          href: '/explore?category=monument' },
      { label: 'Artefacts',          href: '/explore?category=artefact' },
      { label: 'Performing Arts',    href: '/explore?category=dance' },
      { label: 'Manuscripts',        href: '/explore?category=manuscript' },
    ],
  },
  {
    heading: 'Discover',
    links: [
      { label: 'Heritage Map',       href: '/map' },
      { label: 'Historical Stories', href: '/stories' },
      { label: 'Archive',            href: '/archive' },
      { label: 'AI Scanner',         href: '/scanner' },
    ],
  },
  {
    heading: 'Regions',
    links: [
      { label: 'Rajasthan',          href: '/explore?state=Rajasthan' },
      { label: 'Tamil Nadu',         href: '/explore?state=Tamil+Nadu' },
      { label: 'Maharashtra',        href: '/explore?state=Maharashtra' },
      { label: 'Karnataka',          href: '/explore?state=Karnataka' },
      { label: 'Uttar Pradesh',      href: '/explore?state=Uttar+Pradesh' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="bg-walnut-900 text-parchment-200/70" role="contentinfo">

      {/* Main footer content */}
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12">

          {/* Brand column */}
          <div className="flex flex-col gap-5">
            {/* Text wordmark — placeholder until logo asset is provided */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-7 h-7 border border-bronze-500/40 flex items-center justify-center flex-shrink-0"
                  style={{ borderRadius: '1px' }}
                  aria-hidden="true"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="1" y="1" width="5" height="5" fill="#c9a87c" opacity="0.7" />
                    <rect x="8" y="1" width="5" height="5" fill="#c9a87c" opacity="0.4" />
                    <rect x="1" y="8" width="5" height="5" fill="#c9a87c" opacity="0.4" />
                    <rect x="8" y="8" width="5" height="5" fill="#c9a87c" opacity="0.7" />
                  </svg>
                </div>
                <span className="font-monument text-base text-parchment-100 tracking-[0.12em]">
                  VIRASAT
                </span>
              </div>
              <p className="font-ui text-xs text-parchment-200/40 tracking-[0.12em] uppercase pl-9">
                Digital Heritage Platform
              </p>
            </div>

            <p className="font-ui text-sm text-parchment-200/50 leading-relaxed max-w-xs">
              AI-powered digital preservation and interactive exploration of India's cultural heritage.
            </p>

            {/* Project note */}
            <div
              className="border border-bronze-500/20 px-3 py-2 mt-2"
              style={{ borderRadius: '1px' }}
            >
              <p className="font-ui text-xs text-parchment-200/40 leading-relaxed">
                SIH Internal Hackathon Project<br />
                PS03 — Heritage & Culture
              </p>
            </div>
          </div>

          {/* Navigation columns */}
          {NAV_COLS.map(col => (
            <div key={col.heading} className="flex flex-col gap-4">
              <h3 className="text-museum-label text-parchment-200/40">
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-2.5" role="list">
                {col.links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-ui text-sm text-parchment-200/55 hover:text-parchment-100
                                 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-parchment-100/5">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 py-5
                        flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-ui text-xs text-parchment-200/30">
            © 2025 VIRASAT. Built for SIH Internal Hackathon.
          </p>
          <div className="flex items-center gap-2">
            <Ornament variant="diamond" size="sm" className="text-bronze-500/20" />
            <span className="font-monument text-xs text-parchment-200/20 tracking-widest">
              PRESERVING INDIA'S HERITAGE
            </span>
            <Ornament variant="diamond" size="sm" className="text-bronze-500/20" />
          </div>
        </div>
      </div>
    </footer>
  )
}
