'use client'

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_124917_8316313b-031e-44c7-90fa-d660944081e1.mp4'
const POSTER_URL = 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/dd434947-66e8-4157-9a51-e69b6fab4913.webp'

export function NosotrosVideoBackground() {
  return (
    <div className="nz-video-bg" aria-hidden="true">
      <video className="nz-video-bg-el" autoPlay muted loop playsInline preload="auto" poster={POSTER_URL} src={VIDEO_URL} />
      <div className="nz-video-bg-overlay" />
    </div>
  )
}
