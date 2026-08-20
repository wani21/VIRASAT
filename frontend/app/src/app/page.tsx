import { HeroSection }        from '@/components/heritage/hero-section'
import { VirasetIntroSection } from '@/components/heritage/virasat-intro'
import { FeaturedHeritage }    from '@/components/heritage/featured-heritage'
import { EditorialQuote }      from '@/components/heritage/editorial-quote'
import { HeritagePeriods }     from '@/components/heritage/heritage-periods'
import { ScannerTeaser }       from '@/components/heritage/scanner-teaser'
import { HeritageCategories }  from '@/components/heritage/heritage-categories'
import { SiteFooter }          from '@/components/navigation/footer'

export default function HomePage() {
  return (
    <>
      {/* 1 — Full-viewport immersive hero with rotating heritage photography */}
      <HeroSection />

      {/* 2 — "Ancient Soul. Modern Technology." — mission + 3 pillars */}
      <VirasetIntroSection />

      {/* 3 — Featured monuments and traditions grid */}
      <FeaturedHeritage />

      {/* 4 — Editorial heritage quote + supporting statistics */}
      <EditorialQuote />

      {/* 5 — 5,000-year historical timeline */}
      <HeritagePeriods />

      {/* 6 — "Scan a Piece of History" — AI scanner teaser */}
      <ScannerTeaser />

      {/* 7 — Heritage categories browse grid */}
      <HeritageCategories />

      {/* 8 — Footer */}
      <SiteFooter />
    </>
  )
}
