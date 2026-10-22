import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { onVideoSettled } from '../lib/readiness'
import { profile } from '../content'

const TIMEOUT_MS = 4500
const MIN_SHOW_MS = 1700

type Props = { reducedMotion: boolean; onReveal: () => void; onFinished: () => void }

export function Preloader({ reducedMotion, onReveal, onFinished }: Props) {
  const root = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLDivElement>(null)
  const pct = useRef<HTMLSpanElement>(null)
  const cbs = useRef({ onReveal, onFinished })

  useLayoutEffect(() => {
    cbs.current = { onReveal, onFinished }
  }, [onReveal, onFinished])

  useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    let finished = false
    const started = performance.now()
    const progress = { value: 0 }
    // Two critical assets: the display fonts and the hero video.
    let settled = 0
    const total = 2

    const ctx = gsap.context(() => {
      if (!reducedMotion) {
        gsap.from('[data-letter]', {
          yPercent: 110,
          opacity: 0,
          duration: 0.9,
          ease: 'expo.out',
          stagger: 0.045,
        })
        gsap.from('[data-pre-sub]', { opacity: 0, y: 8, duration: 0.8, delay: 0.6, ease: 'power2.out' })
      }
    }, el)

    const render = () => {
      if (bar.current) bar.current.style.transform = `scaleX(${progress.value})`
      if (pct.current) pct.current.textContent = String(Math.round(progress.value * 100)).padStart(3, '0')
    }

    const setProgress = (to: number) => {
      gsap.to(progress, { value: to, duration: reducedMotion ? 0 : 0.6, ease: 'power2.out', onUpdate: render })
    }

    const exit = () => {
      if (finished) return
      finished = true
      const wait = Math.max(0, MIN_SHOW_MS - (performance.now() - started))
      gsap.delayedCall(reducedMotion ? 0 : wait / 1000, () => {
        gsap.to(progress, { value: 1, duration: reducedMotion ? 0 : 0.35, onUpdate: render })
        if (reducedMotion) {
          cbs.current.onReveal()
          gsap.to(el, { opacity: 0, duration: 0.2, delay: 0.1, onComplete: () => cbs.current.onFinished() })
          return
        }
        gsap.to(el, {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 1.05,
          delay: 0.45,
          ease: 'expo.inOut',
          onStart: () => cbs.current.onReveal(),
          onComplete: () => cbs.current.onFinished(),
        })
      })
    }

    const tick = () => {
      settled += 1
      setProgress(settled / total)
      if (settled >= total) exit()
    }

    document.fonts.ready.then(tick, tick)
    const off = onVideoSettled(tick)
    const timeout = window.setTimeout(exit, TIMEOUT_MS)

    return () => {
      off()
      window.clearTimeout(timeout)
      gsap.killTweensOf(progress)
      ctx.revert()
    }
  }, [reducedMotion])

  const words = profile.fullName.toUpperCase().split(' ')

  return (
    <div
      ref={root}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-paper px-6"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
    >
      <p className="display flex flex-wrap justify-center text-[clamp(2.4rem,8vw,7rem)] text-ink" aria-label={profile.fullName}>
        {words.map((word, w) => (
          <span key={word} className={`inline-flex whitespace-nowrap ${w > 0 ? 'ml-[0.28em]' : ''}`} aria-hidden="true">
            {word.split('').map((ch, k) => (
              <span key={k} className="inline-block overflow-hidden">
                <span data-letter className="inline-block">
                  {ch}
                </span>
              </span>
            ))}
          </span>
        ))}
      </p>
      <p data-pre-sub className="eyebrow mt-5 text-center text-muted">
        {profile.preloaderRoles.map((r, i) => (
          <span key={r}>
            {i > 0 && <span className="mx-2 text-signal">·</span>}
            {r}
          </span>
        ))}
      </p>

      <div className="absolute inset-x-6 bottom-10 mx-auto max-w-xl md:bottom-14">
        <div className="flex items-baseline justify-between">
          <span className="eyebrow text-ink">Initializing experience</span>
          <span ref={pct} className="eyebrow tabular-nums text-muted">
            000
          </span>
        </div>
        <div className="mt-3 h-px w-full bg-line">
          <div ref={bar} className="h-px w-full origin-left bg-signal" style={{ transform: 'scaleX(0)' }} />
        </div>
      </div>
    </div>
  )
}
