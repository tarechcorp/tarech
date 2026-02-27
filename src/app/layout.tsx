import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { TransitionProvider } from "@/components/providers/transition-provider";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL('http://tarech.org/'),
  title: {
    default: 'Tarech Studio - Creative Software Consultancy',
    template: '%s | Tarech Studio'
  },
  description: 'Creative software consultancy specializing in innovative digital solutions, GSAP animations, and modern web development.',
  keywords: ['software consultancy', 'creative development', 'GSAP', 'web development', 'digital solutions', 'Kenya software company'],
  authors: [{ name: 'Tarech Studio' }],
  creator: 'Tarech Studio',
  publisher: 'Tarech Studio',
  openGraph: {
    title: 'Tarech Studio - Creative Software Consultancy',
    description: 'Creative software consultancy specializing in innovative digital solutions.',
    url: 'http://tarech.org/',
    siteName: 'Tarech Studio',
    images: [
      {
        url: 'http://tarech.org//og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tarech Studio',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tarech Studio - Creative Software Consultancy',
    description: 'Creative software consultancy specializing in innovative digital solutions.',
    images: ['http://tarech.org//twitter-image.jpg'],
    creator: '@tarechstudio',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'http://tarech.org/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "http://tarech.org//#organization",
              name: "Tarech Studio",
              url: "http://tarech.org/",
              logo: "http://tarech.org//logo.png",
              sameAs: [
                "https://twitter.com/tarechstudio",
                "https://linkedin.com/company/tarechstudio"
              ]
            })
          }}
        />

        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "http://tarech.org//#website",
              url: "http://tarech.org/",
              name: "Tarech Studio",
              publisher: {
                "@id": "http://tarech.org//#organization"
              },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "http://tarech.org//search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} antialiased font-sans`}
      >
        <SmoothScroll>
          <TransitionProvider>
            {children}
          </TransitionProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}