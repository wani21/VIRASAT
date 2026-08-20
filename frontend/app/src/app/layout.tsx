import type { Metadata, Viewport } from 'next'
import {
  Cormorant_Garamond,
  Playfair_Display,
  Cinzel,
  Source_Sans_3,
  Manrope,
} from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/navigation/navbar'

/* ─── Heritage Typefaces ─────────────────────────────────────────────────── */

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cinzel',
  display: 'swap',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-source-sans',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
})

/* ─── Metadata ───────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: {
    default: 'VIRASAT — Digital Preservation of Indian Cultural Heritage',
    template: '%s | VIRASAT',
  },
  description:
    'Explore, discover and preserve India\'s rich cultural heritage through AI-powered recognition, interactive storytelling, and immersive digital experiences.',
  keywords: [
    'Indian heritage', 'cultural preservation', 'monuments', 'artefacts',
    'AI heritage scanner', 'digital museum', 'India history', 'VIRASAT',
  ],
  authors: [{ name: 'VIRASAT Team' }],
  creator: 'VIRASAT',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    title: 'VIRASAT — Digital Preservation of Indian Cultural Heritage',
    description:
      'Explore India\'s living heritage through AI-powered recognition, interactive storytelling, and immersive digital experiences.',
    siteName: 'VIRASAT',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VIRASAT — Digital Preservation of Indian Cultural Heritage',
    description: 'Explore India\'s living heritage through AI-powered digital preservation.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3d2b1f',
}

/* ─── Root Layout ────────────────────────────────────────────────────────── */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const fontVariables = [
    cormorant.variable,
    playfair.variable,
    cinzel.variable,
    sourceSans.variable,
    manrope.variable,
  ].join(' ')

  return (
    <html
      lang="en"
      className={`${fontVariables} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col antialiased bg-[#faf5e4] text-[#3d2b1f]">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  )
}
