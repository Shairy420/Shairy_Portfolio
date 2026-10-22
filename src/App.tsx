import { useCallback, useLayoutEffect, useState } from 'react'
import { Preloader } from './components/Preloader'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About, Contact, Experience, Focus, Skills, Work } from './components/Sections'
import { gsap, ScrollTrigger } from './lib/gsap'
import { useReducedMotion } from './lib/useReducedMotion'

export default function App() {
  const reducedMotion = useReducedMotion()
  const [revealed, setRevealed] = useState(false)
  const [preloading, setPreloading] = useState(true)

  const onReveal = useCallback(() => setRevealed(true), [])
  const onFinished = useCallback(() => setPreloading(false), [])

  // Lock scroll while the preloader covers the page.
  useLayoutEffect(() => {
    document.documentElement.style.overflow = preloading ? 'hidden' : ''
    if (!preloading) ScrollTrigger.refresh()
  }, [preloading])

  // Scroll-driven reveals for everything below the hero.
  useLayoutEffect(() => {
    if (reducedMotion || !revealed) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('main [data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })
      gsap.utils.toArray<HTMLElement>('[data-work]').forEach((el) => {
        const stat = el.querySelector('[data-work-stat]')
        gsap
          .timeline({ scrollTrigger: { trigger: el, start: 'top 75%', once: true } })
          .from(el, { opacity: 0, y: 60, duration: 1.1, ease: 'expo.out' })
          .from(stat, { yPercent: 40, opacity: 0, duration: 1.2, ease: 'expo.out' }, 0.1)
      })
      gsap.from('[data-timeline-line]', {
        scaleY: 0,
        ease: 'none',
        scrollTrigger: { trigger: '[data-timeline]', start: 'top 70%', end: 'bottom 60%', scrub: 0.6 },
      })
    })
    return () => ctx.revert()
  }, [reducedMotion, revealed])

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[200] bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      {preloading && <Preloader reducedMotion={reducedMotion} onReveal={onReveal} onFinished={onFinished} />}
      <Nav />
      <Hero start={revealed} reducedMotion={reducedMotion} />
      <main id="main">
        <About />
        <Work />
        <Skills />
        <Focus />
        <Experience />
        <Contact />
      </main>
    </>
  )
}
