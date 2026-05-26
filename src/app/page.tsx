import { Metadata } from 'next'
import TarechHome from './TarechHomeContent'

export const metadata: Metadata = {
  title: 'Tarech — AI Research & Software for Africa',
  description: 'Pan-African AI research organization building tools and datasets that represent African languages, cultures, and needs.',
  openGraph: {
    title: 'Tarech — AI Research & Software for Africa',
    description: 'Pan-African AI research organization building tools and datasets that represent African languages, cultures, and needs.',
    url: 'https://tarech.org/',
    siteName: 'Tarech',
    images: [{ url: 'https://tarech.org/og-image.jpg', width: 1200, height: 630, alt: 'Tarech' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tarech — AI Research & Software for Africa',
    description: 'Pan-African AI research organization building tools and datasets that represent African languages, cultures, and needs.',
    images: ['https://tarech.org/twitter-image.jpg'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://tarech.org/' },
}

export default function TarechHomeWrapper() {
  return <TarechHome />
}
