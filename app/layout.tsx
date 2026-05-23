import './globals.css'
import type { Metadata } from 'next'
import { DM_Sans, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
import AnnouncementBanner from './components/AnnouncementBanner'
import CookieBanner from './components/CookieBanner'
import PageTransition from './components/v2/PageTransition'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-jetbrains-mono' })
const ogImageUrl = 'https://www.discipulusventures.com/Discipulus%20-%20Logo%20Small.png'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.discipulusventures.com'),
  title: 'Discipulus Ventures',
  description: 'Cultivating a visionary vanguard of founders solving America\'s hardest problems in El Segundo.',
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: 'Discipulus Ventures',
    description: 'Cultivating a visionary vanguard of founders solving America\'s hardest problems in El Segundo.',
    url: 'https://www.discipulusventures.com',
    siteName: 'Discipulus Ventures',
    images: [
      {
        url: ogImageUrl,
        width: 2160,
        height: 2160,
        type: 'image/png',
        alt: 'Discipulus Ventures - Cultivating visionary founders',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Discipulus Ventures',
    description: 'Cultivating a visionary vanguard of founders solving America\'s hardest problems in El Segundo.',
    images: [ogImageUrl],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/bzq7scp.css" />
      </head>
      <body className={`${dmSans.variable} ${jetbrainsMono.variable} font-sans`}>
        <AnnouncementBanner />
        <PageTransition>
          {children}
        </PageTransition>
        <CookieBanner />
        <Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload" />
      </body>
    </html>
  )
}
