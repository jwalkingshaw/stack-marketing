'use client'

export default function AnnouncementBar() {
  return (
    <div className="fixed left-0 right-0 top-0 z-[70] h-[3rem] border-b border-[var(--color-border)] bg-[rgba(251,248,243,0.96)] px-3 font-[var(--font-ibm-plex-mono)] text-xs font-medium tracking-[0.04em] text-[var(--color-foreground-muted)] backdrop-blur">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-center gap-2 text-center">
        <span className="font-semibold text-[var(--color-accent)]">Live now</span>
        <span className="text-[var(--color-border-strong)]">/</span>
        Structured product content, partner portal delivery, and pricing that scales by volume.
      </div>
    </div>
  )
}
