import {
  FEATURED_MONUMENTS,
  FEATURED_ARTEFACTS,
  FEATURED_TRADITIONS,
} from '@/data/heritage'
import type {
  HeritageAsset,
  HeritageCategory,
  HistoricalPeriod,
  HeritageStatus,
  SearchFilters,
  RecognitionResult,
  HeritageStory,
} from '@/types/heritage'

/* ─────────────────────────────────────────────────────────────────────────────
   VIRASAT — Heritage Service Layer
   Clean API abstraction layer. Consumed by UI components.
   Can easily switch from mock data to Supabase queries in the future.
   ───────────────────────────────────────────────────────────────────────── */

// Combine all mock assets into a master collection
export const ALL_HERITAGE_ASSETS: HeritageAsset[] = [
  ...FEATURED_MONUMENTS,
  ...FEATURED_ARTEFACTS,
  ...FEATURED_TRADITIONS,
]

/**
 * Fetch heritage assets matching specified search filters
 */
export async function getHeritageAssets(filters: SearchFilters = {}): Promise<{
  assets: HeritageAsset[]
  total: number
}> {
  // Simulate minor network delay for realistic UI loading states
  await new Promise((res) => setTimeout(res, 200))

  let filtered = [...ALL_HERITAGE_ASSETS]

  // Filter by query (name, description, tags, builder)
  if (filters.query && filters.query.trim() !== '') {
    const q = filters.query.toLowerCase().trim()
    filtered = filtered.filter(
      (asset) =>
        asset.name.toLowerCase().includes(q) ||
        asset.shortDesc.toLowerCase().includes(q) ||
        asset.description.toLowerCase().includes(q) ||
        asset.location.state.toLowerCase().includes(q) ||
        asset.tags.some((tag) => tag.toLowerCase().includes(q))
    )
  }

  // Filter by category
  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter((asset) => asset.category === filters.category)
  }

  // Filter by historical period
  if (filters.period && filters.period !== 'all') {
    filtered = filtered.filter((asset) => asset.period === filters.period)
  }

  // Filter by state
  if (filters.state && filters.state !== 'all') {
    filtered = filtered.filter((asset) => asset.location.state === filters.state)
  }

  // Filter by status
  if (filters.status) {
    filtered = filtered.filter((asset) => asset.status === filters.status)
  }

  return {
    assets: filtered,
    total: filtered.length,
  }
}

/**
 * Fetch a single heritage asset by its URL slug
 */
export async function getHeritageBySlug(slug: string): Promise<HeritageAsset | null> {
  await new Promise((res) => setTimeout(res, 150))
  const found = ALL_HERITAGE_ASSETS.find((asset) => asset.slug === slug)
  return found || null
}

/**
 * Fetch related heritage items for a given asset
 */
export async function getRelatedAssets(
  assetId: string,
  limit: number = 3
): Promise<HeritageAsset[]> {
  await new Promise((res) => setTimeout(res, 100))
  const current = ALL_HERITAGE_ASSETS.find((a) => a.id === assetId)
  if (!current) return ALL_HERITAGE_ASSETS.slice(0, limit)

  // Find assets in the same period or location or category
  const related = ALL_HERITAGE_ASSETS.filter(
    (a) =>
      a.id !== assetId &&
      (a.period === current.period ||
        a.location.state === current.location.state ||
        a.category === current.category)
  )

  return related.length > 0
    ? related.slice(0, limit)
    : ALL_HERITAGE_ASSETS.filter((a) => a.id !== assetId).slice(0, limit)
}

/**
 * Fetch story narrative & chapters for a heritage asset
 */
export async function getStoryForAsset(assetId: string): Promise<HeritageStory | null> {
  const asset = ALL_HERITAGE_ASSETS.find((a) => a.id === assetId) || ALL_HERITAGE_ASSETS[0]

  return {
    id: `story-${asset.id}`,
    assetId: asset.id,
    title: `The Saga of ${asset.name}`,
    tagline: 'Carved into stone and woven through centuries of tradition',
    language: 'en',
    chapters: [
      {
        id: 'ch-1',
        order: 1,
        title: 'Genesis & Patronage',
        year: asset.periodLabel,
        body: `${asset.name} stands as a testament to the vision of its creators during the ${asset.periodLabel}. Commissioned as a landmark of spiritual and political prominence, its construction brought together the finest artisans, sculptors, and engineers of the region.`,
        imageUrl: asset.imageUrl,
      },
      {
        id: 'ch-2',
        order: 2,
        title: 'Architectural & Cultural Splendour',
        body: `The artistic style reflects deep cultural symbolisms. Every carving, pillar, and motif tells stories from ancient epics, astronomical alignments, and royal decrees that defined civilisations.`,
      },
      {
        id: 'ch-3',
        order: 3,
        title: 'Digital Preservation for Humanity',
        body: `Today, through high-resolution 3D photogrammetry, AI visual analysis, and community archival, ${asset.name} is digitally preserved for future generations to explore and cherish.`,
      },
    ],
  }
}

/**
 * Simulate AI image recognition processing
 */
export async function analyzeArtefactImage(
  imageSource: string
): Promise<RecognitionResult> {
  // Simulate AI processing latency (2.5 seconds)
  await new Promise((res) => setTimeout(res, 2500))

  // Match based on string or default to Kumbhalgarh/Nataraja/Ajanta
  let detectedAsset = ALL_HERITAGE_ASSETS[0]

  if (imageSource.includes('nataraja') || imageSource.includes('bronze')) {
    detectedAsset = ALL_HERITAGE_ASSETS.find((a) => a.slug === 'nataraja-bronze') || ALL_HERITAGE_ASSETS[1]
  } else if (imageSource.includes('warli') || imageSource.includes('painting')) {
    detectedAsset = ALL_HERITAGE_ASSETS.find((a) => a.slug === 'warli-painting') || ALL_HERITAGE_ASSETS[5]
  } else if (imageSource.includes('ajanta') || imageSource.includes('cave')) {
    detectedAsset = ALL_HERITAGE_ASSETS.find((a) => a.slug === 'ajanta-caves') || ALL_HERITAGE_ASSETS[3]
  } else if (imageSource.includes('brihadeeswarar') || imageSource.includes('temple')) {
    detectedAsset = ALL_HERITAGE_ASSETS.find((a) => a.slug === 'brihadeeswarar-temple') || ALL_HERITAGE_ASSETS[1]
  }

  return {
    id: `rec-${Date.now()}`,
    imageUrl: imageSource,
    detectedAsset,
    confidence: 0.964,
    period: detectedAsset.period,
    periodLabel: detectedAsset.periodLabel,
    location: detectedAsset.location,
    description: detectedAsset.shortDesc,
    relatedAssets: ALL_HERITAGE_ASSETS.filter((a) => a.id !== detectedAsset.id).slice(0, 3),
    culturalContext: `${detectedAsset.name} displays distinctive visual markers of the ${detectedAsset.periodLabel} (${detectedAsset.location.state}). AI vision models identified architectural geometry and stylistic iconography with 96.4% confidence.`,
    analysisSteps: [
      { label: 'Visual geometry & edge detection', status: 'done', detail: 'Match score 0.98' },
      { label: 'Architectural pattern classification', status: 'done', detail: `${detectedAsset.category.toUpperCase()} classifier` },
      { label: 'ASI Archival Record Cross-reference', status: 'done', detail: 'Record #ASI-2024-HER' },
      { label: 'Cultural significance synthesis', status: 'done', detail: 'Complete' },
    ],
    processedAt: new Date().toISOString(),
  }
}
