'use client'

export default function AnnouncementBar() {
  return (
    <div className="fixed left-0 right-0 top-0 z-[70] h-[3rem] border-b border-[var(--color-border)] bg-[rgba(251,248,243,0.96)] px-3 font-[var(--font-ibm-plex-mono)] text-xs font-medium tracking-[0.04em] text-[var(--color-foreground-muted)] backdrop-blur">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-center gap-2 overflow-hidden text-center">
        <span className="shrink-0 font-semibold text-[var(--color-accent)]">Live now</span>
        <span className="shrink-0 text-[var(--color-border-strong)]">/</span>
        <span className="truncate">Structured product content, partner portal delivery, and pricing that scales by volume.</span>
      </div>
    </div>
  )
}
