'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  BookOpen,
  Volume2,
  Play,
  Pause,
  ArrowDown,
  Sparkles,
  ArrowRight,
  Clock,
  Share2,
} from 'lucide-react'
import {
  EraBadge,
  HeritageDivider,
  Ornament,
} from '@/components/ui/museum-primitives'
import { ALL_HERITAGE_ASSETS } from '@/services/heritage-service'

/* ─── Story Series Collection ────────────────────────────────────────────── */
const STORIES_COLLECTION = [
  {
    id: 'st-01',
    title: 'The Great Wall of Rajasthan',
    subtitle: 'How Maharana Kumbha built a 36 km fortress wall that never fell',
    period: '15th Century (1458 CE)',
    location: 'Aravalli Hills, Rajasthan',
    readTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&q=80',
    chapters: [
      {
        year: '1443 CE',
        title: 'The Sacred Foundation & Oath',
        body: 'In the rugged Aravalli ranges, Maharana Kumbha envisioned an impregnable citadel. Ancient folklore records that initial walls collapsed repeatedly until a spiritual sacrifice guided the sacred boundary.',
      },
      {
        year: '1458 CE',
        title: '36 Kilometres of Granite Fortification',
        body: 'Over 15 years, thousands of stonemasons erected a rampart broad enough for eight horses to ride abreast. Second only to the Great Wall of China, it enclosed 360 temples and fertile valleys.',
      },
      {
        year: '1573 CE',
        title: 'Birthplace of Maharana Pratap & Siege of Haldighati',
        body: 'Kumbhalgarh became the sanctuary of Mewar royalty. It was here that Maharana Pratap was born and nurtured before the historic resistance against Mughal armies.',
      },
      {
        year: '2024 CE',
        title: 'Digital Twin & AI Preservation',
        body: 'Today, photogrammetric drones and AI spatial mapping document every granite block of Kumbhalgarh, preserving its legacy in the cloud for generations to come.',
      },
    ],
  },
  {
    id: 'st-02',
    title: 'Shadowless Vimana of Thanjavur',
    subtitle: 'The engineering marvel of Chola emperor Raja Raja I',
    period: '11th Century (1010 CE)',
    location: 'Thanjavur, Tamil Nadu',
    readTime: '8 min read',
    coverImage: 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=1200&q=80',
    chapters: [
      {
        year: '1003 CE',
        title: 'The Royal Decree of Raja Raja I',
        body: 'The Chola emperor commanded the construction of a temple unprecedented in scale—a tribute to Lord Shiva that would anchor Tamil naval and cultural supremacy across South Asia.',
      },
      {
        year: '1010 CE',
        title: 'Lifting the 80-Tonne Granite Capstone',
        body: 'Without modern cranes, Chola engineers built a 6-km inclined earthen ramp to haul an 80-tonne single granite block to the apex of the 66-metre Vimana.',
      },
      {
        year: 'Present',
        title: 'Cosmic Geometry & Living Worship',
        body: 'A millennium later, the temple remains an active center of Tamil spiritual life and a UNESCO World Heritage Site.',
      },
    ],
  },
]

export default function StoriesPage() {
  const [activeStoryIdx, setActiveStoryIdx] = useState(0)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const currentStory = STORIES_COLLECTION[activeStoryIdx]

  return (
    <div className="min-h-screen pt-[var(--nav-height)] bg-[var(--bg-page)] pb-24">
      {/* ── Header ── */}
      <section className="texture-paper py-12 md:py-16 border-b border-[var(--border-light)] bg-[var(--bg-surface)]">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 text-center flex flex-col items-center gap-4">
          <HeritageDivider label="Interactive Historical Chronicles" />
          <h1 className="font-display text-display-md md:text-display-lg text-[var(--text-primary)]">
            Heritage Storytelling
          </h1>
          <p className="font-ui text-base text-[var(--text-muted)] max-w-xl leading-relaxed">
            Unravel historical sagas, royal patronage, and ancient craftsmanship through scroll-driven narratives.
          </p>
        </div>
      </section>

      {/* ── Story Selector Tabs ── */}
      <div className="bg-[var(--bg-elevated)] border-b border-[var(--border-light)] py-4">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-center gap-3 overflow-x-auto">
          {STORIES_COLLECTION.map((story, i) => (
            <button
              key={story.id}
              onClick={() => {
                setActiveStoryIdx(i)
                setIsPlayingAudio(false)
              }}
              className={`px-4 py-2 font-ui text-xs font-semibold tracking-wider uppercase transition-colors whitespace-nowrap ${
                activeStoryIdx === i
                  ? 'bg-walnut-800 text-parchment-100'
                  : 'border border-[var(--border-main)] text-[var(--text-muted)] hover:border-bronze-500'
              }`}
            >
              {story.title}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main Scroll Story Workspace ── */}
      <main className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 mt-10">
        {/* Story Banner */}
        <div className="relative w-full h-[50vh] min-h-[380px] bg-walnut-900 overflow-hidden mb-12 border border-bronze-500/30">
          <Image
            src={currentStory.coverImage}
            alt={currentStory.title}
            fill
            priority
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-walnut-900 via-walnut-900/40 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-10 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <EraBadge era={currentStory.period} size="md" />
              <span className="font-ui text-xs text-parchment-200/70 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-bronze-400" /> {currentStory.readTime}
              </span>
            </div>

            <h2 className="font-display text-display-md md:text-display-lg text-parchment-100">
              {currentStory.title}
            </h2>

            <p className="font-ui text-base text-parchment-200/80 max-w-2xl leading-relaxed">
              {currentStory.subtitle}
            </p>

            {/* Audio Narration Toolbar */}
            <div className="mt-4 flex items-center gap-4">
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="btn-heritage-accent py-2 px-4 text-xs flex items-center gap-2"
              >
                {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                {isPlayingAudio ? 'Pause Narration' : 'Listen to Story Audio'}
              </button>
            </div>
          </div>
        </div>

        {/* ── Vertical Timeline Chapters ── */}
        <div className="relative max-w-3xl mx-auto pl-6 md:pl-10">
          {/* Timeline Spine Line */}
          <div className="absolute left-3 md:left-4 top-4 bottom-4 w-0.5 bg-bronze-500/30" />

          <div className="flex flex-col gap-12">
            {currentStory.chapters.map((chapter, idx) => (
              <motion.div
                key={chapter.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative pl-6 md:pl-8"
              >
                {/* Node Circle */}
                <div className="absolute left-[-1.6rem] md:left-[-2.1rem] top-1.5 w-6 h-6 rounded-full bg-walnut-800 border-2 border-bronze-500 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-bronze-400" />
                </div>

                <div className="bg-[var(--bg-elevated)] border border-[var(--border-light)] p-6 shadow-heritage-sm flex flex-col gap-3">
                  <span className="font-monument text-xs text-bronze-600 tracking-wider">
                    {chapter.year}
                  </span>
                  <h3 className="font-heading text-xl text-[var(--text-primary)]">{chapter.title}</h3>
                  <p className="font-ui text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
                    {chapter.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── AI Narrative Synthesis Summary Box ── */}
        <div className="max-w-3xl mx-auto mt-16 bg-walnut-800 text-parchment-100 p-6 border border-bronze-500/30 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-bronze-400" />
            <span className="font-monument text-xs text-parchment-200 tracking-wider">
              AI CULTURAL SIGNIFICANCE SYNTHESIS
            </span>
          </div>
          <p className="font-ui text-sm text-parchment-200/80 leading-relaxed italic">
            "The architectural features of {currentStory.title} demonstrate the interplay of royal prestige, defensive military strategy, and spiritual devotion. VIRASAT AI archives link these narrative records directly to ASI excavation registries."
          </p>
        </div>
      </main>
    </div>
  )
}
