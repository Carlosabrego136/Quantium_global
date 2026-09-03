import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const siteUrl = 'https://quantium-global-4tcu.vercel.app'
const siteName = 'Quantium Global'
const description =
  '77 herramientas de análisis de mercado: flujo de opciones, gamma del dealer, dark pool, volatilidad, insiders y macro. Datos institucionales en tiempo real, en una sola pantalla.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Quantium: Flujo de opciones, gamma y dark pool en tiempo real',
    template: '%s · Quantium',
  },
  description,
  keywords: [
    'flujo de opciones',
    'options flow',
    'gamma del dealer',
    'dealer gamma',
    'dark pool',
    'volatilidad implícita',
    'insider trading',
    'trades del Congreso',
    'niveles de mercado',
    'gamma flip',
    'inteligencia de mercado',
    'trading en tiempo real',
    'Quantium',
  ],
  authors: [{ name: 'Quantium Global', url: siteUrl }],
  creator: 'Quantium Global',
  publisher: 'Quantium Global',
  applicationName: siteName,
  generator: 'v0.app',
  category: 'Finance',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: siteUrl,
    siteName,
    title: 'Quantium: Flujo de opciones, gamma y dark pool en tiempo real',
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quantium: Flujo de opciones, gamma y dark pool en tiempo real',
    description,
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteName,
  alternateName: 'Quantium',
  url: siteUrl,
  logo: `${siteUrl}/brand/logo.jpg`,
  description,
  sameAs: [],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-background">
      <head>
        <link rel="preconnect" href="https://d8j0ntlcm91z4.cloudfront.net" />
        <link rel="preconnect" href="https://db.onlinewebfonts.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://d2ol7oe51mr4n9.cloudfront.net" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
