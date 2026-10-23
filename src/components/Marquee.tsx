import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { ribbon } from '../content'

// Outlined ribbon that follows straight on from the hero. It drifts slowly
// left, speeds up with scrolling and reverses when the page scrolls back up.
// The list is rendered twice so x can wrap within one copy and never run out.
export function Marquee({ reducedMotion }: { reducedMotion: boolean }) {
  const track = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = track.current
    if (reducedMotion || !el) return
    const DRIFT = 40 // px per second at rest
    let half = el.scrollWidth / 2
    let x = 0
    let dir = -1
    let boost = 0
    const setX = gsap.quickSetter(el, 'x', 'px')
    const ro = new ResizeObserver(() => {
      half = el.scrollWidth / 2
    })
    ro.observe(el)

    const tick = (_t: number, deltaMs: number) => {
      const dt = Math.min(deltaMs, 64) / 1000
      x += dir * (DRIFT + boost) * dt
      boost *= 0.92
      setX(gsap.utils.wrap(-half, 0, x))
    }
    gsap.ticker.add(tick)

    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        dir = self.direction === 1 ? -1 : 1
        boost = Math.min(1600, Math.abs(self.getVelocity()) * 0.6)
      },
    })

    return () => {
      gsap.ticker.remove(tick)
      st.kill()
      ro.disconnect()
      gsap.set(el, { clearProps: 'transform' })
    }
  }, [reducedMotion])

  return (
    <div className="marquee overflow-hidden bg-paper">
      <div ref={track} className="flex w-max will-change-transform">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1 || undefined}>
            {ribbon.map((item, i) => (
              <li key={item} className="flex items-center">
                <span className={`marquee-item ${i % 2 ? 'is-accent' : ''}`}>{item}</span>
                <span className="grad-text px-[0.5em] text-[clamp(1rem,2vw,1.75rem)] leading-none" aria-hidden="true">
                  ✦
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
