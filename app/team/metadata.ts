import type { Metadata } from 'next'

const title = 'Our Team — Discipulus Ventures'
const description = 'Meet the Discipulus Ventures team and advisors in El Segundo.'

const url = 'https://www.discipulusventures.com/team'
const image = 'https://www.discipulusventures.com/og-image-v2.png'

const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url,
    siteName: 'Discipulus Ventures',
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Discipulus Ventures team page hero',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [image],
  },
}

export default metadata


