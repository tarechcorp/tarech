import { Metadata } from 'next'
import AboutPage from './AboutPageContent'

export const metadata: Metadata = {
  title: 'About Tarech | AI Research in Africa',
  description: 'Founded in 2020, Tarech is a pan-African AI research organization with teams across Kenya, Nigeria, South Africa, and Rwanda.',
  openGraph: {
    title: 'About Tarech | AI Research in Africa',
    description: 'Founded in 2020, Tarech is a pan-African AI research organization with teams across Kenya, Nigeria, South Africa, and Rwanda.',
    url: 'https://tarech.org/about',
    siteName: 'Tarech',
    images: [{ url: 'https://tarech.org/og-image.jpg', width: 1200, height: 630, alt: 'About Tarech' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Tarech | AI Research in Africa',
    description: 'Founded in 2020, Tarech is a pan-African AI research organization with teams across Kenya, Nigeria, South Africa, and Rwanda.',
    images: ['https://tarech.org/twitter-image.jpg'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://tarech.org/about' },
}

export default function AboutPageWrapper() {
  return <AboutPage />
}
