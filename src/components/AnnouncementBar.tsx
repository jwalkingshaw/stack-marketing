'use client'

export default function AnnouncementBar() {
  return (
    <div className="fixed left-0 right-0 top-0 z-[70] h-[3rem] border-b border-[var(--border-subtle)] bg-[rgba(250,249,245,0.96)] px-3 font-[var(--font-ibm-plex-mono)] text-xs font-medium tracking-[0.04em] text-[var(--text-secondary)] backdrop-blur">
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-center gap-2 overflow-hidden text-center">
        <span className="shrink-0 font-semibold text-[var(--color-accent)]">Live now</span>
        <span className="shrink-0 text-[var(--border-default)]">/</span>
        <span className="truncate">Structured product content, partner portal delivery, and pricing that scales by volume.</span>
      </div>
    </div>
  )
}
