'use client'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260808_112712_da9d53df-6d27-4b12-bdf6-aa9dc2622bdf.mp4'

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
    </div>
  )
}
