'use client'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260514_135830_bb6491d1-9b66-4aec-9722-13b4dfe3fb46.mp4'

export function VideoBackground() {
  return (
    <div className="video-background" aria-hidden="true">
      <video
        className="video-background-el"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        src={VIDEO_URL}
      />
      <div className="video-background-overlay" />
      <div className="video-vignette-breathe" />
      <div className="video-grain" />
    </div>
  )
}
