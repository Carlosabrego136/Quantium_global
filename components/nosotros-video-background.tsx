'use client'

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260821_183659_804e0948-c701-4565-b56b-a99c78f9bfba.mp4'

export function NosotrosVideoBackground() {
  return (
    <div className="nz-video-bg" aria-hidden="true">
      <video className="nz-video-bg-el" autoPlay muted loop playsInline preload="auto" src={VIDEO_URL} />
      <div className="nz-video-bg-overlay" />
    </div>
  )
}
