import type { Metadata } from 'next'

const title = 'Discipulus Cohort — Discipulus Ventures'
const description =
  "Two week residency in El Segundo with 10 other early-stage, value-aligned founders building hard tech and software for the national interest."

const url = 'https://www.discipulusventures.com/cohort'
const image = 'https://www.discipulusventures.com/Discipulus%20-%20Logo%20Small.png'

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
        width: 2160,
        height: 2160,
        type: 'image/png',
        alt: 'Discipulus Cohort hero background',
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


