import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Nosotros — Quantium Global',
  description: 'La historia, la misión y el equipo detrás de Quantium: por qué construimos una plataforma de inteligencia de mercado para el inversor independiente.',
}

export default function NosotrosLayout({ children }: { children: ReactNode }) {
  return children
}
