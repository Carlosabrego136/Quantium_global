'use client'

import { motion } from 'framer-motion'
import type { CSSProperties, ElementType, ReactNode } from 'react'

type FadeUpTag = 'div' | 'section' | 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'nav'

interface FadeUpProps {
  children: ReactNode
  delay?: number
  duration?: number
  y?: number
  className?: string
  style?: CSSProperties
  as?: FadeUpTag
  once?: boolean
}

const tagMap: Record<FadeUpTag, ElementType> = {
  div: motion.div,
  section: motion.section,
  span: motion.span,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  nav: motion.nav,
}

export function FadeUp({
  children,
  delay = 0,
  duration = 0.7,
  y = 24,
  className,
  style,
  as = 'div',
  once = true,
}: FadeUpProps) {
  const MotionTag = tagMap[as] as any

  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}
