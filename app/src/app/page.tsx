import { HeroSection } from '@/components/heritage/hero-section'
import { FeaturedHeritage } from '@/components/heritage/featured-heritage'
import { HeritagePeriods } from '@/components/heritage/heritage-periods'
import { HeritageCategories } from '@/components/heritage/heritage-categories'
import { SiteFooter } from '@/components/navigation/footer'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedHeritage />
      <HeritagePeriods />
      <HeritageCategories />
      <SiteFooter />
    </>
  )
}
