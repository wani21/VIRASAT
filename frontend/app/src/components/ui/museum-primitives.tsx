import { cn } from '@/lib/utils'

/* ─────────────────────────────────────────────────────────────────────────────
   EraBadge — Historical period indicator
   Usage: <EraBadge era="12th Century" />
   ───────────────────────────────────────────────────────────────────────── */

interface EraBadgeProps {
  era:       string
  className?: string
  size?:     'sm' | 'md' | 'lg'
}

export function EraBadge({ era, className, size = 'md' }: EraBadgeProps) {
  const sizeClasses = {
    sm: 'text-[0.6rem] px-2 py-0.5 tracking-[0.14em]',
    md: 'text-[0.6875rem] px-3 py-1 tracking-[0.14em]',
    lg: 'text-xs px-4 py-1.5 tracking-[0.12em]',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-monument uppercase',
        'border border-bronze-500/40 text-bronze-500',
        'bg-bronze-500/8',
        sizeClasses[size],
        className
      )}
      style={{ borderRadius: '1px' }}
    >
      <span className="inline-block w-1 h-1 rounded-full bg-current opacity-70 flex-shrink-0" />
      {era}
    </span>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   LocationMarker — State / region indicator
   Usage: <LocationMarker state="Rajasthan" />
   ───────────────────────────────────────────────────────────────────────── */

interface LocationMarkerProps {
  state:     string
  district?: string
  className?: string
  variant?:  'light' | 'dark'
}

export function LocationMarker({ state, district, className, variant = 'dark' }: LocationMarkerProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-ui text-location',
        variant === 'light' ? 'text-parchment-200/70' : 'text-stone-400',
        className
      )}
    >
      <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
        <path
          d="M5 0C2.24 0 0 2.24 0 5C0 8.75 5 12 5 12C5 12 10 8.75 10 5C10 2.24 7.76 0 5 0ZM5 6.5C4.17 6.5 3.5 5.83 3.5 5C3.5 4.17 4.17 3.5 5 3.5C5.83 3.5 6.5 4.17 6.5 5C6.5 5.83 5.83 6.5 5 6.5Z"
          fill="currentColor"
          fillOpacity="0.7"
        />
      </svg>
      <span>
        {district ? `${district}, ${state}` : state}
      </span>
    </span>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   ArchiveTag — Category / type tag
   Usage: <ArchiveTag label="Sculpture" />
   ───────────────────────────────────────────────────────────────────────── */

interface ArchiveTagProps {
  label:     string
  className?: string
  variant?:  'outline' | 'filled' | 'subtle'
}

export function ArchiveTag({ label, className, variant = 'outline' }: ArchiveTagProps) {
  const variantClasses = {
    outline: 'border border-[var(--border-main)] text-[var(--text-muted)] bg-transparent',
    filled:  'bg-walnut-700 text-parchment-100 border border-walnut-700',
    subtle:  'bg-sandstone-200/60 text-[var(--text-secondary)] border border-sandstone-300/50',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5',
        'font-ui text-[0.6875rem] font-medium tracking-[0.06em] uppercase',
        variantClasses[variant],
        className
      )}
      style={{ borderRadius: '1px' }}
    >
      {label}
    </span>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   MuseumLabel — Exhibition-style information label
   Usage: <MuseumLabel title="Dynasty" value="Chola" />
   ───────────────────────────────────────────────────────────────────────── */

interface MuseumLabelProps {
  title:     string
  value:     string
  className?: string
}

export function MuseumLabel({ title, value, className }: MuseumLabelProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-0.5 py-2 border-b border-[var(--border-light)]',
        className
      )}
    >
      <span className="text-museum-label">{title}</span>
      <span className="font-ui text-sm text-[var(--text-secondary)] font-medium">
        {value}
      </span>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   MuseumLabelGrid — Multiple labels in a grid
   Usage: <MuseumLabelGrid items={[{title, value}]} />
   ───────────────────────────────────────────────────────────────────────── */

interface MuseumLabelGridProps {
  items:     { title: string; value: string }[]
  cols?:     2 | 3 | 4
  className?: string
}

export function MuseumLabelGrid({ items, cols = 2, className }: MuseumLabelGridProps) {
  const colClass = { 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4' }[cols]

  return (
    <div
      className={cn(
        'border border-[var(--border-light)] p-4',
        'grid gap-0',
        colClass,
        className
      )}
      style={{ borderRadius: '1px' }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className={cn(
            'flex flex-col gap-0.5 p-3',
            'border-[var(--border-light)]',
            i % cols !== cols - 1 ? 'border-r' : '',
            i < items.length - cols ? 'border-b' : ''
          )}
        >
          <span className="text-museum-label">{item.title}</span>
          <span className="font-ui text-sm text-[var(--text-secondary)] font-medium leading-snug">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   HeritageDivider — Ornamental section separator
   Usage: <HeritageDivider label="Heritage of India" />
   ───────────────────────────────────────────────────────────────────────── */

interface HeritageDividerProps {
  label?:    string
  className?: string
  variant?:  'thin' | 'ornate' | 'section'
}

export function HeritageDivider({ label, className, variant = 'ornate' }: HeritageDividerProps) {
  if (variant === 'thin') {
    return <div className={cn('divider-heritage', className)} />
  }

  if (variant === 'section') {
    return (
      <div className={cn('flex flex-col items-center gap-3 py-8', className)}>
        <div className="w-12 h-px bg-bronze-500/40" />
        {label && (
          <span className="text-museum-label text-[var(--text-muted)]">{label}</span>
        )}
        <div className="w-12 h-px bg-bronze-500/40" />
      </div>
    )
  }

  // ornate — default
  return (
    <div className={cn('divider-ornament', className)}>
      {label ? (
        <span className="text-museum-label text-[var(--accent-bronze)] flex-shrink-0">
          ✦ {label} ✦
        </span>
      ) : (
        <span className="text-bronze-500/60 text-sm flex-shrink-0">✦</span>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   Ornament — Decorative Indian pattern element
   Usage: <Ornament className="text-bronze-500/30" />
   ───────────────────────────────────────────────────────────────────────── */

interface OrnamentProps {
  variant?: 'diamond' | 'lotus' | 'border-top' | 'corner'
  className?: string
  size?:     'sm' | 'md' | 'lg'
}

export function Ornament({ variant = 'diamond', className, size = 'md' }: OrnamentProps) {
  const sizeMap = { sm: 16, md: 24, lg: 40 }
  const s = sizeMap[size]

  if (variant === 'diamond') {
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none"
        className={cn('text-bronze-500/40', className)}
        aria-hidden="true"
      >
        <rect x="12" y="1" width="15" height="15" rx="1" transform="rotate(45 12 1)"
          stroke="currentColor" strokeWidth="1" fill="none" />
        <rect x="12" y="5" width="9" height="9" rx="0.5" transform="rotate(45 12 5)"
          fill="currentColor" opacity="0.3" />
      </svg>
    )
  }

  if (variant === 'lotus') {
    return (
      <svg width={s * 1.5} height={s} viewBox="0 0 36 24" fill="none"
        className={cn('text-bronze-500/40', className)}
        aria-hidden="true"
      >
        <ellipse cx="18" cy="18" rx="6" ry="8" stroke="currentColor" strokeWidth="0.75" />
        <ellipse cx="10" cy="18" rx="5" ry="7" stroke="currentColor" strokeWidth="0.75" />
        <ellipse cx="26" cy="18" rx="5" ry="7" stroke="currentColor" strokeWidth="0.75" />
        <ellipse cx="4"  cy="18" rx="4" ry="6" stroke="currentColor" strokeWidth="0.75" />
        <ellipse cx="32" cy="18" rx="4" ry="6" stroke="currentColor" strokeWidth="0.75" />
        <line x1="2" y1="21" x2="34" y2="21" stroke="currentColor" strokeWidth="0.75" />
      </svg>
    )
  }

  if (variant === 'border-top') {
    return (
      <div className={cn('w-full', className)} aria-hidden="true">
        <svg width="100%" height="8" viewBox="0 0 400 8" preserveAspectRatio="none">
          <pattern id="dot-line" x="0" y="0" width="16" height="8" patternUnits="userSpaceOnUse">
            <rect width="1" height="8" fill="currentColor" opacity="0.3" />
            <circle cx="8" cy="4" r="1.5" fill="currentColor" opacity="0.5" />
          </pattern>
          <rect width="400" height="8" fill="url(#dot-line)" />
        </svg>
      </div>
    )
  }

  // corner
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"
      className={cn('text-bronze-500/40', className)}
      aria-hidden="true"
    >
      <path d="M1 1 H8 M1 1 V8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M1 4 H5 M4 1 V5" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   ExhibitionFrame — Museum-style image frame
   Usage: <ExhibitionFrame src={...} alt={...} />
   ───────────────────────────────────────────────────────────────────────── */

interface ExhibitionFrameProps {
  children:  React.ReactNode
  label?:    string
  className?: string
  variant?:  'simple' | 'ornate' | 'polaroid'
}

export function ExhibitionFrame({ children, label, className, variant = 'simple' }: ExhibitionFrameProps) {
  if (variant === 'polaroid') {
    return (
      <div
        className={cn(
          'bg-[#fdfbf4] p-3 pb-8 shadow-heritage',
          'border border-[var(--border-light)]',
          className
        )}
        style={{ borderRadius: '1px' }}
      >
        <div className="overflow-hidden">{children}</div>
        {label && (
          <p className="mt-4 text-center font-ui text-xs text-[var(--text-muted)] italic">
            {label}
          </p>
        )}
      </div>
    )
  }

  if (variant === 'ornate') {
    return (
      <div
        className={cn(
          'relative p-3 bg-[#fdfbf4]',
          'border border-[var(--border-main)]',
          'shadow-museum-frame',
          className
        )}
        style={{ borderRadius: '1px' }}
      >
        {/* Corner ornaments */}
        <Ornament variant="corner" size="sm" className="absolute top-1 left-1 text-bronze-500/50" />
        <Ornament variant="corner" size="sm" className="absolute top-1 right-1 rotate-90 text-bronze-500/50" />
        <Ornament variant="corner" size="sm" className="absolute bottom-1 left-1 -rotate-90 text-bronze-500/50" />
        <Ornament variant="corner" size="sm" className="absolute bottom-1 right-1 rotate-180 text-bronze-500/50" />
        <div className="overflow-hidden">{children}</div>
        {label && (
          <p className="mt-2 text-center text-museum-label">{label}</p>
        )}
      </div>
    )
  }

  // simple
  return (
    <div
      className={cn(
        'border border-[var(--border-light)] overflow-hidden',
        'shadow-heritage-sm',
        className
      )}
      style={{ borderRadius: '1px' }}
    >
      {children}
      {label && (
        <div className="px-3 py-2 border-t border-[var(--border-light)]">
          <p className="text-museum-label text-center">{label}</p>
        </div>
      )}
    </div>
  )
}
