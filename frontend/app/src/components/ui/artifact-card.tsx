import { cn } from '@/lib/utils'
import { EraBadge, LocationMarker, ArchiveTag, ExhibitionFrame } from './museum-primitives'
import type { HeritageAsset } from '@/types/heritage'
import Image from 'next/image'
import Link from 'next/link'

/* ─────────────────────────────────────────────────────────────────────────────
   ArtifactCard — Primary heritage content card
   Variants:
     - 'feature'   : large, hero-style card (homepage featured)
     - 'archive'   : compact card for archive/grid views
     - 'museum'    : vertical exhibition panel with metadata
   ───────────────────────────────────────────────────────────────────────── */

interface ArtifactCardProps {
  asset:     HeritageAsset
  variant?:  'feature' | 'archive' | 'museum'
  className?: string
  priority?:  boolean
}

export function ArtifactCard({
  asset,
  variant = 'archive',
  className,
  priority = false,
}: ArtifactCardProps) {
  const href = `/heritage/${asset.slug}`

  if (variant === 'feature') {
    return (
      <Link
        href={href}
        className={cn(
          'group relative flex flex-col justify-end overflow-hidden',
          'bg-walnut-800 cursor-pointer',
          'transition-shadow duration-500 hover:shadow-heritage-lg',
          className
        )}
        style={{ borderRadius: '1px' }}
      >
        {/* Image */}
        <div className="absolute inset-0">
          <Image
            src={asset.imageUrl}
            alt={asset.name}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-cinematic group-hover:scale-105"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-walnut-900/90 via-walnut-900/30 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 md:p-8 flex flex-col gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <EraBadge era={asset.periodLabel} />
            <LocationMarker state={asset.location.state} variant="light" />
          </div>

          <h3 className="font-display text-2xl md:text-3xl text-parchment-100 leading-tight
                         group-hover:text-parchment-200 transition-colors">
            {asset.name}
          </h3>

          <p className="font-ui text-sm text-parchment-300/75 line-clamp-2 leading-relaxed">
            {asset.shortDesc}
          </p>

          {/* Bottom row */}
          <div className="flex items-center justify-between pt-2 mt-1 border-t border-parchment-100/10">
            <ArchiveTag label={asset.category} variant="filled" />
            <span className="font-monument text-[0.6rem] text-parchment-200/50 tracking-widest uppercase">
              View Heritage →
            </span>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 'museum') {
    return (
      <Link
        href={href}
        className={cn(
          'group flex flex-col bg-[var(--bg-elevated)]',
          'border border-[var(--border-light)] hover:border-[var(--border-strong)]',
          'transition-all duration-300 hover:shadow-heritage-md',
          className
        )}
        style={{ borderRadius: '1px' }}
      >
        {/* Image frame */}
        <ExhibitionFrame variant="simple" className="border-0 border-b border-[var(--border-light)]">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={asset.imageUrl}
              alt={asset.name}
              fill
              priority={priority}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-cinematic group-hover:scale-103"
            />
          </div>
        </ExhibitionFrame>

        {/* Museum label panel */}
        <div className="flex flex-col gap-3 p-4">
          <div className="flex items-start justify-between gap-2">
            <EraBadge era={asset.periodLabel} size="sm" />
            <ArchiveTag label={asset.category} variant="subtle" />
          </div>

          <h3 className="font-heading text-base text-[var(--text-primary)] leading-snug
                         group-hover:text-walnut-600 transition-colors">
            {asset.name}
          </h3>

          <p className="font-ui text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed">
            {asset.shortDesc}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-[var(--border-light)]">
            <LocationMarker state={asset.location.state} />
            <span className="font-monument text-[0.55rem] text-bronze-500/60 tracking-widest uppercase">
              {asset.status}
            </span>
          </div>
        </div>
      </Link>
    )
  }

  // archive — compact
  return (
    <Link
      href={href}
      className={cn(
        'group flex gap-4 p-3 bg-[var(--bg-elevated)]',
        'border border-[var(--border-light)] hover:border-[var(--border-strong)]',
        'transition-all duration-300 hover:shadow-heritage-sm',
        className
      )}
      style={{ borderRadius: '1px' }}
    >
      {/* Thumbnail */}
      <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden">
        <Image
          src={asset.imageUrl}
          alt={asset.name}
          fill
          sizes="80px"
          className="object-cover transition-transform duration-400 group-hover:scale-105"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1.5 justify-center min-w-0">
        <EraBadge era={asset.periodLabel} size="sm" />
        <h4 className="font-heading text-sm text-[var(--text-primary)] leading-snug
                       group-hover:text-walnut-600 transition-colors line-clamp-1">
          {asset.name}
        </h4>
        <LocationMarker state={asset.location.state} />
      </div>
    </Link>
  )
}
