'use client'

import { useDragMarquee, useMarqueeTrackRef } from '@/components/use-drag-marquee'

export type MarqueeSlide = {
  number: string
  title: string
  text: string
  image?: string
  video?: string
  accent?: 'gold' | 'red' | 'white'
}

export function ToolsMarquee({ slides }: { slides: MarqueeSlide[] }) {
  const trackRef = useMarqueeTrackRef()
  useDragMarquee(trackRef)

  const doubled = [...slides, ...slides]

  return (
    <div className="nz-marquee-section">
      <div className="nz-marquee-mask nz-marquee-mask-top" aria-hidden="true">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0 0H1440V50C1440 50 1200 100 720 100C240 100 0 50 0 50V0Z" />
        </svg>
      </div>

      <div ref={trackRef} className="nz-marquee-track">
        {doubled.map((slide, i) => (
          <div className={`nz-marquee-slide accent-${slide.accent ?? 'gold'}`} key={`${slide.number}-${i}`}>
            <div className="nz-marquee-media">
              {slide.video ? (
                <video src={slide.video} autoPlay muted loop playsInline preload="auto" />
              ) : slide.image ? (
                <img src={slide.image} alt={slide.title} loading="lazy" draggable={false} />
              ) : (
                <div className="nz-marquee-media-placeholder" />
              )}
              <span className="nz-marquee-number">{slide.number}</span>
            </div>
            <div className="nz-marquee-info">
              <h3>{slide.title}</h3>
              <p>{slide.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="nz-marquee-mask nz-marquee-mask-bottom" aria-hidden="true">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0 100H1440V50C1440 50 1200 0 720 0C240 0 0 50 0 50V100Z" />
        </svg>
      </div>
    </div>
  )
}
