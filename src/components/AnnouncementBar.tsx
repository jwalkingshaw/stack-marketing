'use client'

export default function AnnouncementBar() {
  return (
    <div className="fixed left-0 right-0 top-0 z-[70] h-[3rem] border-b border-[#1d315f] bg-gradient-to-r from-[#0a1a41] via-[#10295d] to-[#15397b] px-3 font-ibm-plex-mono text-xs font-medium tracking-[0.02em] text-slate-100 sm:text-sm">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-center text-center">
        Live now: launch products, manage assets, and share partner-ready content from one workspace.
      </div>
    </div>
  )
}
