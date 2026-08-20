import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind class names safely using clsx + tailwind-merge.
 * Install: npm install clsx tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a historical period label for display.
 */
export function formatPeriod(period: string): string {
  const map: Record<string, string> = {
    ancient:  'Ancient India',
    medieval: 'Medieval Period',
    mughal:   'Mughal Era',
    colonial: 'Colonial Period',
    modern:   'Modern India',
    living:   'Living Heritage',
  }
  return map[period] ?? period
}

/**
 * Truncate a string to a given length with ellipsis.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength).trimEnd() + '…'
}

/**
 * Slugify a string (for URLs).
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

/**
 * Capitalize the first letter of each word.
 */
export function titleCase(str: string): string {
  return str.replace(/\b\w/g, c => c.toUpperCase())
}

/**
 * Map a HeritageCategory to a display label.
 */
export function categoryLabel(category: string): string {
  const map: Record<string, string> = {
    monument:     'Monument',
    artefact:     'Artefact',
    painting:     'Painting',
    sculpture:    'Sculpture',
    textile:      'Textile',
    music:        'Music',
    dance:        'Dance',
    festival:     'Festival',
    tradition:    'Tradition',
    manuscript:   'Manuscript',
    architecture: 'Architecture',
  }
  return map[category] ?? titleCase(category)
}
