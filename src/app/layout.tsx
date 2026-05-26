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
  metadataBase: new URL('https://tarech.org/'),
  title: {
    default: 'Tarech - Creative Software Consultancy',
    template: '%s | Tarech'
  },
  description: 'Creative software consultancy building practical digital solutions for Africa, with modern web development and GSAP animations.',
  keywords: ['software consultancy', 'creative development', 'GSAP', 'web development', 'digital solutions', 'Kenya software company'],
  authors: [{ name: 'Tarech' }],
  creator: 'Tarech',
  publisher: 'Tarech',
  openGraph: {
    title: 'Tarech - Creative Software Consultancy',
    description: 'Creative software consultancy building practical digital solutions for Africa.',
    url: 'https://tarech.org/',
    siteName: 'Tarech',
    images: [
      {
        url: 'https://tarech.org/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tarech',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tarech - Creative Software Consultancy',
    description: 'Creative software consultancy building practical digital solutions for Africa.',
    images: ['https://tarech.org/twitter-image.jpg'],
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
    canonical: 'https://tarech.org/',
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
              "@id": "https://tarech.org/#organization",
              name: "Tarech",
              url: "https://tarech.org/",
              logo: "https://tarech.org/logo.png",
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
              "@id": "https://tarech.org/#website",
              url: "https://tarech.org/",
              name: "Tarech",
              publisher: {
                "@id": "https://tarech.org/#organization"
              },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://tarech.org/search?q={search_term_string}"
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