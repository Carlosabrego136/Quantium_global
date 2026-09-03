import type { Metadata } from 'next'
import type { ReactNode } from 'react'

const description =
  'La historia, la misión y el equipo detrás de Quantium: por qué construimos una plataforma de inteligencia de mercado para el inversor independiente.'

export const metadata: Metadata = {
  title: 'Nosotros',
  description,
  alternates: {
    canonical: '/nosotros',
  },
  openGraph: {
    type: 'website',
    url: '/nosotros',
    title: 'Nosotros · Quantium Global',
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nosotros · Quantium Global',
    description,
  },
}

export default function NosotrosLayout({ children }: { children: ReactNode }) {
  return children
}
