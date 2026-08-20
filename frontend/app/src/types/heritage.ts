/* ─────────────────────────────────────────────────────────────────────────────
   VIRASAT — Core TypeScript Types
   All frontend interfaces and enums for heritage data model
   ───────────────────────────────────────────────────────────────────────── */

/* ─── Enums ──────────────────────────────────────────────────────────────── */

export type HeritageCategory =
  | 'monument'
  | 'artefact'
  | 'painting'
  | 'sculpture'
  | 'textile'
  | 'music'
  | 'dance'
  | 'festival'
  | 'tradition'
  | 'manuscript'
  | 'architecture'

export type HistoricalPeriod =
  | 'ancient'        // before 700 CE
  | 'medieval'       // 700–1526 CE
  | 'mughal'         // 1526–1757 CE
  | 'colonial'       // 1757–1947 CE
  | 'modern'         // 1947–present
  | 'living'         // ongoing cultural practice

export type HeritageStatus =
  | 'UNESCO World Heritage Site'
  | 'National Heritage'
  | 'State Heritage'
  | 'Intangible Heritage'
  | 'At Risk'
  | 'Preserved'

export type UserRole = 'explorer' | 'curator' | 'admin'

export type SupportedLanguage =
  | 'en'
  | 'hi'
  | 'mr'
  | 'bn'
  | 'ta'
  | 'te'
  | 'gu'
  | 'kn'
  | 'ml'
  | 'pa'

/* ─── Location ───────────────────────────────────────────────────────────── */

export interface HeritageLocation {
  state:     string
  district?: string
  city?:     string
  region:    string   // e.g. "Rajasthan", "Deccan", "Eastern India"
  lat?:      number
  lng?:      number
}

/* ─── Heritage Asset — base type ─────────────────────────────────────────── */

export interface HeritageAsset {
  id:          string
  slug:        string
  name:        string
  category:    HeritageCategory
  period:      HistoricalPeriod
  periodLabel: string        // e.g. "12th Century", "c. 1000 BCE"
  status:      HeritageStatus
  location:    HeritageLocation
  shortDesc:   string        // 1–2 sentences
  description: string        // full description
  imageUrl:    string
  images?:     string[]      // gallery
  tags:        string[]
  featured?:   boolean
  createdAt:   string        // ISO date
  updatedAt:   string        // ISO date
}

/* ─── Monument ───────────────────────────────────────────────────────────── */

export interface Monument extends HeritageAsset {
  category:       'monument' | 'architecture'
  architectStyle: string     // e.g. "Rajput", "Mughal", "Dravidian"
  builder?:       string
  buildYear?:     string
  dimensions?:    string
  materials?:     string[]
}

/* ─── Artefact ───────────────────────────────────────────────────────────── */

export interface Artefact extends HeritageAsset {
  category:  'artefact' | 'sculpture' | 'painting' | 'textile' | 'manuscript'
  medium?:   string           // e.g. "Bronze", "Terracotta", "Paper"
  dynasty?:  string
  museum?:   string           // current location
  accession?: string
}

/* ─── Cultural Tradition ─────────────────────────────────────────────────── */

export interface CulturalTradition extends HeritageAsset {
  category:   'music' | 'dance' | 'festival' | 'tradition'
  origin:     string          // state/region of origin
  language?:  string
  performers?: string[]       // known practitioners/schools
  occasion?:  string          // when practiced
}

/* ─── Historical Event ───────────────────────────────────────────────────── */

export interface HistoricalEvent {
  id:          string
  year:        number | string   // can be "c. 1200" or "1573"
  era:         HistoricalPeriod
  title:       string
  description: string
  relatedAssets?: string[]       // HeritageAsset IDs
  significance: 'local' | 'regional' | 'national' | 'global'
}

/* ─── Story ──────────────────────────────────────────────────────────────── */

export interface StoryChapter {
  id:    string
  order: number
  title: string
  body:  string
  year?: string
  imageUrl?: string
}

export interface HeritageStory {
  id:        string
  assetId:   string      // related HeritageAsset
  title:     string
  tagline?:  string
  chapters:  StoryChapter[]
  narrationUrl?: string  // audio URL
  language:  SupportedLanguage
  authoredBy?: string
}

/* ─── Audio Narration ────────────────────────────────────────────────────── */

export interface AudioNarration {
  id:        string
  assetId:   string
  title:     string
  duration:  number          // seconds
  audioUrl:  string
  language:  SupportedLanguage
  voiceType: 'human' | 'ai'
  transcript?: string
}

/* ─── AI Recognition ─────────────────────────────────────────────────────── */

export interface RecognitionResult {
  id:             string
  imageUrl:       string
  detectedAsset?: HeritageAsset
  confidence:     number         // 0–1
  period?:        HistoricalPeriod
  periodLabel?:   string
  location?:      HeritageLocation
  description?:   string
  relatedAssets:  HeritageAsset[]
  culturalContext?: string
  analysisSteps:  AnalysisStep[]
  processedAt:    string
}

export interface AnalysisStep {
  label:     string
  status:    'pending' | 'processing' | 'done'
  detail?:   string
}

/* ─── Related Heritage ───────────────────────────────────────────────────── */

export interface RelatedHeritage {
  assetId:      string
  relationship: 'same_period' | 'same_location' | 'same_style' | 'same_dynasty' | 'influenced_by'
  asset:        HeritageAsset
}

/* ─── Search ─────────────────────────────────────────────────────────────── */

export interface SearchFilters {
  query?:    string
  category?: HeritageCategory | 'all'
  period?:   HistoricalPeriod | 'all'
  state?:    string
  status?:   HeritageStatus
}

export interface SearchResult {
  assets:  HeritageAsset[]
  total:   number
  page:    number
  perPage: number
  query:   string
  filters: SearchFilters
}

/* ─── Map ────────────────────────────────────────────────────────────────── */

export interface MapMarker {
  id:        string
  assetId:   string
  name:      string
  category:  HeritageCategory
  state:     string
  lat:       number
  lng:       number
  thumbnail: string
}

/* ─── User / Auth ────────────────────────────────────────────────────────── */

export interface UserProfile {
  id:             string
  email:          string
  displayName:    string
  avatarUrl?:     string
  role:           UserRole
  preferredLang:  SupportedLanguage
  savedAssets:    string[]     // HeritageAsset IDs
  scannedHistory: string[]     // RecognitionResult IDs
  viewedAssets:   string[]     // recently viewed IDs
  joinedAt:       string
}

/* ─── API Response Wrapper ───────────────────────────────────────────────── */

export interface ApiResponse<T> {
  data:    T | null
  error:   string | null
  status:  number
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total:   number
  page:    number
  perPage: number
}
