import type {
  HeritageAsset,
  Monument,
  Artefact,
  CulturalTradition,
  HistoricalEvent,
  MapMarker,
} from '@/types/heritage'

/* ─────────────────────────────────────────────────────────────────────────────
   VIRASAT — Mock Heritage Data
   Replace individual data items with real Supabase queries as backend arrives.
   Service layer (src/services/) handles the API abstraction.
   ───────────────────────────────────────────────────────────────────────── */

/* ─── Featured Monuments ─────────────────────────────────────────────────── */

export const FEATURED_MONUMENTS: Monument[] = [
  {
    id:             'mon-001',
    slug:           'kumbhalgarh-fort',
    name:           'Kumbhalgarh Fort',
    category:       'monument',
    period:         'medieval',
    periodLabel:    '15th Century',
    status:         'UNESCO World Heritage Site',
    location:       { state: 'Rajasthan', district: 'Rajsamand', region: 'Rajputana', lat: 25.1484, lng: 73.5882 },
    shortDesc:      'The great wall of India — Kumbhalgarh\'s 36 km rampart is second only to the Great Wall of China.',
    description:    'Built by Maharana Kumbha in the 15th century, Kumbhalgarh Fort stands majestically in the Aravalli hills of Rajasthan. Its massive fortification wall, stretching approximately 36 kilometers, is the second longest continuous wall in the world. Within its bounds lie 360 temples and the birthplace of Maharana Pratap.',
    imageUrl:       'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&q=80',
    architectStyle: 'Rajput',
    builder:        'Maharana Kumbha',
    buildYear:      '1458 CE',
    materials:      ['Granite', 'Limestone', 'Brick'],
    tags:           ['fort', 'rajput', 'rajasthan', 'medieval', 'wall', 'UNESCO'],
    featured:       true,
    createdAt:      '2024-01-01T00:00:00Z',
    updatedAt:      '2024-01-01T00:00:00Z',
  },
  {
    id:             'mon-002',
    slug:           'brihadeeswarar-temple',
    name:           'Brihadeeswarar Temple',
    category:       'architecture',
    period:         'medieval',
    periodLabel:    '11th Century',
    status:         'UNESCO World Heritage Site',
    location:       { state: 'Tamil Nadu', district: 'Thanjavur', region: 'Tamilakam', lat: 10.7825, lng: 79.1316 },
    shortDesc:      'A Chola masterpiece of Dravidian architecture — its 66-metre vimana casts no shadow at noon.',
    description:    'Commissioned by the great Chola emperor Raja Raja I and completed in 1010 CE, the Brihadeeswarar Temple at Thanjavur is one of the greatest glories of Indian architecture. The towering vimana rises to 66 metres, making it among the tallest of its kind. A marvel of engineering, the capstone weighs approximately 80 tonnes.',
    imageUrl:       'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=1200&q=80',
    architectStyle: 'Dravidian',
    builder:        'Emperor Raja Raja I',
    buildYear:      '1010 CE',
    materials:      ['Granite'],
    tags:           ['temple', 'chola', 'dravidian', 'tamil-nadu', 'UNESCO'],
    featured:       true,
    createdAt:      '2024-01-01T00:00:00Z',
    updatedAt:      '2024-01-01T00:00:00Z',
  },
  {
    id:             'mon-003',
    slug:           'hampi-virupaksha',
    name:           'Hampi — Vijayanagara Ruins',
    category:       'monument',
    period:         'medieval',
    periodLabel:    '14th–16th Century',
    status:         'UNESCO World Heritage Site',
    location:       { state: 'Karnataka', district: 'Vijayanagara', region: 'Deccan', lat: 15.3350, lng: 76.4600 },
    shortDesc:      'The once-magnificent capital of the Vijayanagara Empire — a city that rivalled Rome in its time.',
    description:    'Hampi, the capital of the last great Hindu empire — the Vijayanagara Empire — was once one of the world\'s largest cities. The ruins spread over 4,100 hectares and include over 1,600 monuments. The site presents a fascinating blend of Dravidian temple architecture with Indo-Islamic influences from the Deccan Sultanates.',
    imageUrl:       'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=1200&q=80',
    architectStyle: 'Vijayanagara',
    builder:        'Harihara I & Bukka Raya I',
    buildYear:      '1336 CE',
    materials:      ['Granite', 'Stone'],
    tags:           ['ruins', 'vijayanagara', 'karnataka', 'dravidian', 'medieval', 'UNESCO'],
    featured:       true,
    createdAt:      '2024-01-01T00:00:00Z',
    updatedAt:      '2024-01-01T00:00:00Z',
  },
  {
    id:             'mon-004',
    slug:           'ajanta-caves',
    name:           'Ajanta Caves',
    category:       'architecture',
    period:         'ancient',
    periodLabel:    '2nd Century BCE – 5th Century CE',
    status:         'UNESCO World Heritage Site',
    location:       { state: 'Maharashtra', district: 'Aurangabad', region: 'Marathwada', lat: 20.5523, lng: 75.7033 },
    shortDesc:      'Rock-cut Buddhist cave temples with the world\'s finest ancient murals.',
    description:    'The Ajanta Caves, carved into a horseshoe-shaped cliff above the Waghora River, contain some of the finest surviving examples of ancient Indian art. The 30 rock-cut Buddhist caves were excavated between the 2nd century BCE and 6th century CE. The paintings depict Jataka stories and scenes from the life of the Buddha with extraordinary sophistication.',
    imageUrl:       'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=80',
    architectStyle: 'Rock-cut Buddhist',
    builder:        'Buddhist Monks / Royal Patrons',
    buildYear:      '2nd Century BCE',
    materials:      ['Basalt', 'Rock'],
    tags:           ['caves', 'buddhist', 'rock-cut', 'paintings', 'maharashtra', 'UNESCO'],
    featured:       true,
    createdAt:      '2024-01-01T00:00:00Z',
    updatedAt:      '2024-01-01T00:00:00Z',
  },
]

/* ─── Featured Artefacts ─────────────────────────────────────────────────── */

export const FEATURED_ARTEFACTS: Artefact[] = [
  {
    id:          'art-001',
    slug:        'dancing-girl-mohenjo-daro',
    name:        'Dancing Girl of Mohenjo-daro',
    category:    'sculpture',
    period:      'ancient',
    periodLabel: 'c. 2500 BCE',
    status:      'National Heritage',
    location:    { state: 'Sindh (Pakistan)', region: 'Indus Valley', lat: 27.3244, lng: 68.1378 },
    shortDesc:   'A bronze figurine from the Indus Valley Civilisation — one of the oldest known sculptures.',
    description: 'This 10.8 cm bronze statuette of a dancing girl, discovered at Mohenjo-daro in 1926, dates to approximately 2500 BCE. Depicting a young woman standing with one arm on her hip and a bangles-covered arm bent, she represents the remarkable artistic sophistication of the Indus Valley Civilisation. Currently housed at the National Museum of India, New Delhi.',
    imageUrl:    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
    medium:      'Bronze (lost-wax casting)',
    dynasty:     'Indus Valley Civilisation',
    museum:      'National Museum of India, New Delhi',
    tags:        ['bronze', 'indus-valley', 'ancient', 'sculpture', 'national-museum'],
    featured:    true,
    createdAt:   '2024-01-01T00:00:00Z',
    updatedAt:   '2024-01-01T00:00:00Z',
  },
  {
    id:          'art-002',
    slug:        'nataraja-bronze',
    name:        'Nataraja — Lord of the Cosmic Dance',
    category:    'sculpture',
    period:      'medieval',
    periodLabel: '10th–12th Century',
    status:      'National Heritage',
    location:    { state: 'Tamil Nadu', region: 'Tamilakam' },
    shortDesc:   'The supreme achievement of Chola bronze casting — Shiva in his cosmic dance of creation and destruction.',
    description: 'The Chola Nataraja bronzes represent the pinnacle of South Indian metalwork. Cast by the lost-wax (cire perdue) method, these sculptures depict Shiva as Nataraja — Lord of Dance — performing his anandatandava, the dance of bliss. The image encodes complex Hindu cosmology: the damaru drum creates the universe, the flame destroys it, the dwarf Apasmara represents ignorance.',
    imageUrl:    'https://images.unsplash.com/photo-1545126881-d3f8b1389a98?w=800&q=80',
    medium:      'Panchaloha Bronze',
    dynasty:     'Chola Empire',
    museum:      'Various — National Museum of India, Chennai Museum',
    tags:        ['bronze', 'chola', 'shiva', 'nataraja', 'sculpture', 'south-india'],
    featured:    true,
    createdAt:   '2024-01-01T00:00:00Z',
    updatedAt:   '2024-01-01T00:00:00Z',
  },
]

/* ─── Featured Cultural Traditions ──────────────────────────────────────── */

export const FEATURED_TRADITIONS: CulturalTradition[] = [
  {
    id:          'trd-001',
    slug:        'bharatanatyam',
    name:        'Bharatanatyam',
    category:    'dance',
    period:      'ancient',
    periodLabel: 'Ancient — codified 2nd Century BCE',
    status:      'Intangible Heritage',
    location:    { state: 'Tamil Nadu', region: 'South India' },
    shortDesc:   'One of the oldest classical dance forms of India, originating in the temples of Tamil Nadu.',
    description: 'Bharatanatyam is a major genre of Indian classical dance that originated in the Hindu temples of Tamil Nadu. Rooted in the Natya Shastra — the ancient treatise on performance arts — it blends expression, music, beat and dance. The dance expresses Hindu religious stories and spiritual ideas.',
    imageUrl:    'https://images.unsplash.com/photo-1583779457094-ab6f77f7bf57?w=800&q=80',
    origin:      'Tamil Nadu',
    language:    'Tamil / Sanskrit',
    occasion:    'Temple rituals, classical concerts, cultural celebrations',
    tags:        ['dance', 'classical', 'tamil-nadu', 'temple', 'bharatanatyam'],
    featured:    true,
    createdAt:   '2024-01-01T00:00:00Z',
    updatedAt:   '2024-01-01T00:00:00Z',
  },
  {
    id:          'trd-002',
    slug:        'warli-painting',
    name:        'Warli Painting',
    category:    'tradition',
    period:      'ancient',
    periodLabel: 'c. 2500 BCE — Living Tradition',
    status:      'Intangible Heritage',
    location:    { state: 'Maharashtra', region: 'Palghar & Thane districts' },
    shortDesc:   'Ancient tribal art using geometric shapes to depict daily life — a living tradition over 4,000 years old.',
    description: 'Warli painting is one of the oldest art traditions in India, practiced by the Warli tribe of Maharashtra. Using basic geometric shapes — circles, triangles, and squares — these paintings depict daily life, nature, and ritual ceremonies. Traditionally painted in white on mud walls using rice paste, the art form has survived for over 4,000 years.',
    imageUrl:    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    origin:      'Maharashtra (Palghar)',
    occasion:    'Seasonal festivals, marriages, harvests',
    tags:        ['tribal', 'warli', 'painting', 'maharashtra', 'folk-art'],
    featured:    true,
    createdAt:   '2024-01-01T00:00:00Z',
    updatedAt:   '2024-01-01T00:00:00Z',
  },
]

/* ─── Heritage Timeline ──────────────────────────────────────────────────── */

export const HERITAGE_TIMELINE: HistoricalEvent[] = [
  {
    id:           'evt-001',
    year:         '3000 BCE',
    era:          'ancient',
    title:        'Indus Valley Civilisation',
    description:  'One of the world\'s earliest urban civilisations flourishes along the Indus and Saraswati rivers. Mohenjo-daro and Harappa become thriving cities with remarkable town planning, drainage systems, and artistic traditions.',
    significance: 'global',
  },
  {
    id:           'evt-002',
    year:         '500 BCE',
    era:          'ancient',
    title:        'Age of the Vedas & Upanishads',
    description:  'The composition of the Vedas, Upanishads, and the great epics Ramayana and Mahabharata shapes Indian philosophy, literature and culture. Buddhist and Jain traditions emerge.',
    significance: 'global',
  },
  {
    id:           'evt-003',
    year:         '268 BCE',
    era:          'ancient',
    title:        'Maurya Empire — Ashoka\'s Reign',
    description:  'Emperor Ashoka, after the Kalinga War, embraces Buddhism and spreads its message across Asia through edicts carved on stone pillars. The Lion Capital becomes India\'s national emblem.',
    significance: 'global',
  },
  {
    id:           'evt-004',
    year:         '320 CE',
    era:          'ancient',
    title:        'Gupta Golden Age',
    description:  'The Gupta period witnesses extraordinary achievements in art, literature, mathematics, astronomy and philosophy. Kalidasa writes his masterworks. The decimal system and the concept of zero are formalised.',
    significance: 'global',
  },
  {
    id:           'evt-005',
    year:         '1010 CE',
    era:          'medieval',
    title:        'Chola Empire & Temple Architecture',
    description:  'The Chola dynasty reaches its peak under Raja Raja I. The Brihadeeswarar Temple is completed — a pinnacle of Dravidian architecture. Chola bronze casting produces some of the world\'s greatest sculptures.',
    significance: 'global',
  },
  {
    id:           'evt-006',
    year:         '1526 CE',
    era:          'mughal',
    title:        'Mughal Empire — Indo-Persian Synthesis',
    description:  'The Mughals create a unique Indo-Persian cultural synthesis. Architecture (Taj Mahal, Red Fort), miniature painting, music, and cuisine reach new heights under Akbar, Jahangir, and Shah Jahan.',
    significance: 'global',
  },
  {
    id:           'evt-007',
    year:         '1857',
    era:          'colonial',
    title:        'First War of Independence',
    description:  'The Sepoy Mutiny marks the beginning of organised resistance to British colonial rule. The Archaeological Survey of India is established in 1861, beginning systematic documentation of India\'s heritage.',
    significance: 'national',
  },
  {
    id:           'evt-008',
    year:         '1947',
    era:          'modern',
    title:        'Independence & Heritage Preservation',
    description:  'Independent India inherits both the responsibility and the richness of its heritage. Constitutional provisions protect cultural and historical sites. The National Museum opens in 1949.',
    significance: 'national',
  },
  {
    id:           'evt-009',
    year:         'Present',
    era:          'living',
    title:        'Living Heritage — Digital Preservation',
    description:  'India\'s living cultural traditions continue to evolve. Digital initiatives, AI-powered recognition, and platforms like VIRASAT work to preserve, document, and make accessible India\'s vast cultural inheritance.',
    significance: 'national',
  },
]

/* ─── Heritage Categories ────────────────────────────────────────────────── */

export const HERITAGE_CATEGORIES = [
  {
    id:       'monuments',
    label:    'Monuments',
    count:    1240,
    icon:     'Landmark',
    desc:     'Forts, temples, mosques, tombs and historical structures',
    imageUrl: 'https://images.unsplash.com/photo-1609766857165-3c5cf2a48c30?w=600&q=80',
  },
  {
    id:       'artefacts',
    label:    'Artefacts',
    count:    8340,
    icon:     'Gem',
    desc:     'Sculptures, bronzes, ceramics, tools and historical objects',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80',
  },
  {
    id:       'paintings',
    label:    'Paintings & Manuscripts',
    count:    2180,
    icon:     'Scroll',
    desc:     'Miniatures, murals, manuscripts and traditional illustrations',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  },
  {
    id:       'textiles',
    label:    'Textiles & Crafts',
    count:    3420,
    icon:     'Layers',
    desc:     'Weaves, embroideries, pottery and traditional crafts',
    imageUrl: 'https://images.unsplash.com/photo-1603400521630-9f2de124b33b?w=600&q=80',
  },
  {
    id:       'performing',
    label:    'Performing Arts',
    count:    980,
    icon:     'Music',
    desc:     'Classical dance, music, theatre and folk performances',
    imageUrl: 'https://images.unsplash.com/photo-1583779457094-ab6f77f7bf57?w=600&q=80',
  },
  {
    id:       'traditions',
    label:    'Living Traditions',
    count:    1560,
    icon:     'Globe',
    desc:     'Festivals, rituals, cuisine and cultural practices',
    imageUrl: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80',
  },
]

/* ─── Map Markers ────────────────────────────────────────────────────────── */

export const MAP_MARKERS: MapMarker[] = [
  { id: 'mk-001', assetId: 'mon-001', name: 'Kumbhalgarh Fort',      category: 'monument',      state: 'Rajasthan',   lat: 25.1484, lng: 73.5882, thumbnail: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=200&q=80' },
  { id: 'mk-002', assetId: 'mon-002', name: 'Brihadeeswarar Temple', category: 'architecture',  state: 'Tamil Nadu',  lat: 10.7825, lng: 79.1316, thumbnail: 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=200&q=80' },
  { id: 'mk-003', assetId: 'mon-003', name: 'Hampi Ruins',           category: 'monument',      state: 'Karnataka',   lat: 15.3350, lng: 76.4600, thumbnail: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=200&q=80' },
  { id: 'mk-004', assetId: 'mon-004', name: 'Ajanta Caves',          category: 'architecture',  state: 'Maharashtra', lat: 20.5523, lng: 75.7033, thumbnail: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=200&q=80' },
  { id: 'mk-005', assetId: 'trd-002', name: 'Warli Art Village',     category: 'tradition',     state: 'Maharashtra', lat: 19.8000, lng: 72.7000, thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80' },
  { id: 'mk-006', assetId: 'trd-001', name: 'Bharatanatyam Origin',  category: 'dance',         state: 'Tamil Nadu',  lat: 11.9416, lng: 79.8083, thumbnail: 'https://images.unsplash.com/photo-1583779457094-ab6f77f7bf57?w=200&q=80' },
]

/* ─── Mock AI Recognition Steps ─────────────────────────────────────────── */

export const MOCK_ANALYSIS_STEPS = [
  { label: 'Detecting visual features',      status: 'pending' as const },
  { label: 'Matching architectural patterns', status: 'pending' as const },
  { label: 'Connecting historical records',  status: 'pending' as const },
  { label: 'Preparing cultural context',     status: 'pending' as const },
]

/* ─── Indian States (for filters) ───────────────────────────────────────── */

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu & Kashmir', 'Ladakh',
]

/* ─── Supported Languages ────────────────────────────────────────────────── */

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English',  nativeLabel: 'English' },
  { code: 'hi', label: 'Hindi',    nativeLabel: 'हिन्दी' },
  { code: 'mr', label: 'Marathi',  nativeLabel: 'मराठी' },
  { code: 'bn', label: 'Bengali',  nativeLabel: 'বাংলা' },
  { code: 'ta', label: 'Tamil',    nativeLabel: 'தமிழ்' },
  { code: 'te', label: 'Telugu',   nativeLabel: 'తెలుగు' },
  { code: 'gu', label: 'Gujarati', nativeLabel: 'ગુજરાતી' },
  { code: 'kn', label: 'Kannada',  nativeLabel: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'Malayalam',nativeLabel: 'മലയാളം' },
]
