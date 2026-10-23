import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { ArrowDown, RotateCcw } from 'lucide-react'
import { gsap } from '../lib/gsap'
import { markVideoSettled } from '../lib/readiness'
import { profile } from '../content'

type Props = { start: boolean; reducedMotion: boolean }

export function Hero({ start, reducedMotion }: Props) {
  const root = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)
  const [showStill, setShowStill] = useState(reducedMotion)
  const [ended, setEnded] = useState(false)

  // Report video readiness to the preloader; errors count as settled so the
  // page never waits on a broken asset.
  useLayoutEffect(() => {
    const v = video.current
    if (!v) return
    const settle = () => markVideoSettled()
    const fail = () => {
      setShowStill(true)
      markVideoSettled()
    }
    if (v.readyState >= 3) settle()
    // With <source> children, a total failure fires 'error' on the last source.
    const lastSource = v.querySelector('source:last-of-type')
    v.addEventListener('canplaythrough', settle)
    v.addEventListener('error', fail)
    lastSource?.addEventListener('error', fail)
    return () => {
      v.removeEventListener('canplaythrough', settle)
      v.removeEventListener('error', fail)
      lastSource?.removeEventListener('error', fail)
    }
  }, [])

  // Build the typography timeline once, paused, with everything hidden.
  useLayoutEffect(() => {
    if (reducedMotion) return
    const ctx = gsap.context(() => {
      const t = gsap.timeline({ paused: true, defaults: { ease: 'expo.out', duration: 1.1 } })
      // Beats are timed against the walk: she enters around 0.6s, stops and
      // turns towards camera near 4.5s, and closes in by 8s.
      t.from('[data-hero="hello"]', { yPercent: 110 }, 0.7)
        .from('[data-hero="name"] [data-char]', { yPercent: 110, stagger: 0.05, duration: 1.2 }, 1.3)
        .from('[data-hero="rule"]', { scaleX: 0, duration: 1.2, ease: 'expo.inOut' }, 2.1)
        .from('[data-hero="role"]', { yPercent: 110 }, 2.7)
        .from('[data-hero="sub"]', { yPercent: 110 }, 3.6)
        .from('[data-hero="intro"]', { opacity: 0, y: 14, duration: 1 }, 4.6)
        .from('[data-hero="ui"]', { opacity: 0, y: 10, stagger: 0.08, duration: 0.9 }, 5.1)
      tl.current = t
    }, root)
    return () => {
      tl.current = null
      ctx.revert()
    }
  }, [reducedMotion])

  // Start the walk and the timeline together once the preloader reveals.
  useLayoutEffect(() => {
    if (!start) return
    const v = video.current
    if (reducedMotion || !v) {
      setShowStill(true)
      return
    }
    v.muted = true
    v.currentTime = 0
    v.play()
      .catch(() => setShowStill(true))
      .finally(() => tl.current?.play(0))
  }, [start, reducedMotion])

  const replay = useCallback(() => {
    const v = video.current
    if (!v) return
    setEnded(false)
    setShowStill(false)
    v.currentTime = 0
    v.play().catch(() => setShowStill(true))
  }, [])

  const name = `${profile.firstName}.`.toUpperCase().split('')

  return (
    <section
      ref={root}
      id="top"
      aria-label="Introduction"
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-paper"
    >
      <div className="hero-stage" aria-hidden="true">
        <video
          ref={video}
          poster={`${import.meta.env.BASE_URL}media/shairy-poster.jpg`}
          muted
          playsInline
          preload="auto"
          onEnded={() => setEnded(true)}
          className={showStill ? 'hidden' : 'block'}
        >
          <source src={`${import.meta.env.BASE_URL}media/shairy-walk.mp4`} type="video/mp4" />
          <source src={`${import.meta.env.BASE_URL}media/shairy-walk.webm`} type="video/webm" />
        </video>
        {showStill && (
          <img src={`${import.meta.env.BASE_URL}media/shairy-still.jpg`} alt="" className="block" />
        )}
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col px-5 pt-24 pb-8 sm:px-8 md:justify-center md:px-12 md:pt-20 lg:px-16">
        <div className="max-w-[46rem] md:max-w-[42vw]">
          <p className="eyebrow line-mask text-ink">
            <span data-hero="hello">Hello, I’m</span>
          </p>

          <h1
            data-hero="name"
            className="display mt-3 flex text-[clamp(4.2rem,17vw,9.5rem)] text-signal md:text-[clamp(4.5rem,8.6vw,11rem)]"
            aria-label={`${profile.firstName}, ${profile.title}`}
          >
            {name.map((ch, i) => (
              <span key={i} className="line-mask" aria-hidden="true">
                <span data-char className="grad-text">{ch}</span>
              </span>
            ))}
          </h1>

          <div data-hero="rule" className="mt-5 h-[3px] w-16 origin-left bg-signal md:mt-7" />

          <p className="display line-mask mt-5 text-[clamp(1.35rem,5.4vw,2.2rem)] font-[800] text-ink md:mt-7 md:text-[clamp(1.4rem,2.3vw,2.6rem)]">
            <span data-hero="role">{profile.title}.</span>
          </p>
          <p className="line-mask mt-2 font-display text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-ink sm:text-sm md:text-[clamp(0.8rem,1vw,1rem)]">
            <span data-hero="sub">
              {profile.specialism.split(' · ').map((part, i) => (
                <span key={part} className="inline">
                  {i > 0 && <span className="mx-2 text-signal">·</span>}
                  {part}
                </span>
              ))}
            </span>
          </p>

          <p data-hero="intro" className="mt-6 hidden max-w-md text-[0.95rem] leading-relaxed text-muted md:block">
            {profile.intro}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 md:mt-8">
            <a
              data-hero="ui"
              href="#work"
              className="group inline-flex items-center gap-2 bg-ink px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-signal"
            >
              See the work
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
            </a>
            <a
              data-hero="ui"
              href="#contact"
              className="inline-flex items-center px-5 py-3 text-sm font-semibold text-ink underline decoration-signal decoration-2 underline-offset-[6px] hover:text-signal"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>

      {!reducedMotion && ended && (
        <div className="absolute right-5 bottom-5 z-10 flex gap-2 sm:right-8 md:right-12 md:bottom-8 lg:right-16">
          <button
            type="button"
            onClick={replay}
            className="inline-flex items-center gap-2 border border-ink/15 bg-paper/80 px-3 py-2 text-xs font-semibold text-ink backdrop-blur-sm hover:border-ink"
          >
            <RotateCcw className="size-3.5" aria-hidden="true" />
            Replay
          </button>
        </div>
      )}
    </section>
  )
}
