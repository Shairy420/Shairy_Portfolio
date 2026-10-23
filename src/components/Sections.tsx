import { ArrowUpRight, Mail } from 'lucide-react'
import type { ReactNode } from 'react'
import { about, certifications, method, profile, skills, surfaces, timeline, work } from '../content'

function SectionHead({ index, label, title }: { index: string; label: string; title: ReactNode }) {
  return (
    <div className="mb-12 md:mb-20">
      <p data-reveal className="eyebrow flex items-center gap-3 text-muted">
        <span className="text-signal">{index}</span>
        <span className="h-px w-8 bg-ink/20" aria-hidden="true" />
        {label}
      </p>
      <h2 data-reveal className="display mt-5 max-w-5xl text-[clamp(2.3rem,6.5vw,6rem)] text-ink">
        {title}
      </h2>
    </div>
  )
}

const YEAR = new Date().getFullYear()

const shell = 'mx-auto max-w-[1600px] px-5 sm:px-8 md:px-12 lg:px-16'

export function About() {
  return (
    <section id="about" className="scroll-mt-16 bg-paper pt-12 pb-24 md:pt-20 md:pb-36">
      <div className={shell}>
        <SectionHead index="01" label="About" title={<>Security, tested <span className="grad-text">the hard way.</span></>} />
        <div className="grid gap-12 md:grid-cols-12">
          <p data-reveal className="font-display text-[clamp(1.4rem,2.6vw,2.4rem)] leading-[1.15] font-semibold tracking-tight text-ink md:col-span-7">
            {about.lead}
          </p>
          <div className="space-y-5 text-base leading-relaxed text-muted md:col-span-5 md:pt-2">
            {about.body.map((p) => (
              <p data-reveal key={p}>
                {p}
              </p>
            ))}
            <p data-reveal className="eyebrow pt-2 text-ink">Based in {profile.location}</p>
          </div>
        </div>
        <dl className="mt-16 grid grid-cols-2 border-t border-line md:mt-24 md:grid-cols-4">
          {about.facts.map((f) => (
            <div data-reveal key={f.label} className="border-b border-line py-8 pr-4 md:border-b-0 md:py-10">
              <dt className="sr-only">{f.label}</dt>
              <dd>
                <span className="display block text-[clamp(2.2rem,4.5vw,4rem)] text-ink">{f.value}</span>
                <span className="mt-3 block text-sm text-muted">{f.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export function Work() {
  return (
    <section id="work" className="scroll-mt-16 bg-ink py-24 text-paper md:py-36">
      <div className={shell}>
        <div className="mb-12 md:mb-20">
          <p data-reveal className="eyebrow flex items-center gap-3 text-paper/60">
            <span className="text-signal">02</span>
            <span className="h-px w-8 bg-paper/25" aria-hidden="true" />
            Selected work
          </p>
          <h2 data-reveal className="display mt-5 max-w-5xl text-[clamp(2.3rem,6.5vw,6rem)]">
            Engagements, <span className="grad-text">by the numbers.</span>
          </h2>
          <p data-reveal className="mt-6 max-w-xl text-paper/60">
            Highlights from three years of VAPT work across two roles.
          </p>
        </div>

        <ol className="divide-y divide-paper/15 border-y border-paper/15">
          {work.map((w) => (
            <li key={w.index} data-work className="grid gap-8 py-12 md:grid-cols-12 md:gap-10 md:py-20">
              <div className="md:col-span-5">
                <p className="eyebrow text-paper/50">
                  {w.index} <span className="mx-2 text-signal">/</span> {w.org}
                </p>
                <p
                  data-work-stat
                  className={`display grad-text mt-6 ${
                    w.stat.length > 3 ? 'text-[clamp(3.6rem,15vw,7.5rem)]' : 'text-[clamp(4.5rem,22vw,11rem)]'
                  }`}
                >
                  {w.stat}
                </p>
                <p className="eyebrow mt-3 text-paper/70">{w.statLabel}</p>
              </div>
              <div className="md:col-span-7 md:pt-4">
                <h3 className="font-display text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.05] font-bold tracking-tight">{w.title}</h3>
                <dl className="mt-8 grid gap-7 text-[0.95rem] leading-relaxed sm:grid-cols-2">
                  <div>
                    <dt className="eyebrow text-paper/50">Problem</dt>
                    <dd className="mt-2 text-paper/80">{w.problem}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-paper/50">Outcome</dt>
                    <dd className="mt-2 text-paper">{w.outcome}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="eyebrow text-paper/50">Her contribution</dt>
                    <dd className="mt-2">
                      <ul className="space-y-2 text-paper/80">
                        {w.contribution.map((c) => (
                          <li key={c} className="flex gap-3">
                            <span className="mt-[0.7em] h-px w-3 shrink-0 bg-signal" aria-hidden="true" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="sr-only">Scope</dt>
                    <dd className="flex flex-wrap gap-2">
                      {w.methods.map((m) => (
                        <span key={m} className="border border-paper/20 px-3 py-1 text-xs font-medium text-paper/80">
                          {m}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-16 bg-mist py-24 md:py-36">
      <div className={shell}>
        <SectionHead index="03" label="Skills" title={<>The <span className="grad-text">toolkit.</span></>} />
        <div className="grid border-t border-ink/10 md:grid-cols-12">
          {skills.map((g, i) => (
            <div
              data-reveal
              key={g.group}
              className={`border-b border-ink/10 py-8 md:py-10 ${i < 2 ? 'md:col-span-6' : 'md:col-span-4'} ${
                i === 0 || i === 2 || i === 3 ? 'md:pr-10' : ''
              }`}
            >
              <h3 className="eyebrow flex items-center gap-3 text-ink">
                <span className="text-signal">{String(i + 1).padStart(2, '0')}</span>
                {g.group}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-2">
                {g.items.map((s) => (
                  <li key={s} className="border border-ink/12 bg-paper px-3 py-1.5 text-sm text-ink">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Focus() {
  return (
    <section id="focus" className="scroll-mt-16 bg-paper py-24 md:py-36">
      <div className={shell}>
        <SectionHead index="04" label="Focus" title={<>Five attack surfaces. <span className="grad-text">One method.</span></>} />

        <ul className="border-t border-ink">
          {surfaces.map((s, i) => (
            <li
              data-reveal
              key={s.name}
              className="group grid items-baseline gap-2 border-b border-line py-6 md:grid-cols-12 md:gap-8 md:py-8"
            >
              <span className="eyebrow text-muted md:col-span-1">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="display text-[clamp(1.9rem,4.6vw,4.2rem)] text-ink transition-colors group-hover:text-signal md:col-span-6">
                {s.name}
              </h3>
              <p className="text-muted md:col-span-5">{s.detail}</p>
            </li>
          ))}
        </ul>

        <ol className="mt-20 grid gap-px bg-line md:mt-28 md:grid-cols-4">
          {method.map((m, i) => (
            <li data-reveal key={m.step} className="bg-paper p-6 md:p-8">
              <span className="eyebrow text-signal">Step {i + 1}</span>
              <h3 className="display mt-4 text-3xl text-ink">{m.step}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{m.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-16 border-t border-line bg-paper py-24 md:py-36">
      <div className={shell}>
        <SectionHead index="05" label="Experience & achievements" title={<>The <span className="grad-text">record.</span></>} />

        <div className="grid gap-16 lg:grid-cols-12">
          <ol className="relative lg:col-span-8" data-timeline>
            <span className="absolute top-2 bottom-2 left-[5px] w-px bg-line" aria-hidden="true" />
            <span data-timeline-line className="absolute top-2 bottom-2 left-[5px] w-px origin-top bg-signal" aria-hidden="true" />
            {timeline.map((t) => (
              <li data-reveal key={t.role} className="relative pb-14 pl-10 last:pb-0 md:pl-14">
                <span
                  className={`absolute top-2 left-0 size-[11px] rounded-full border-2 ${
                    t.kind === 'Education' ? 'border-ink bg-paper' : 'border-signal bg-signal'
                  }`}
                  aria-hidden="true"
                />
                <p className="eyebrow text-muted">
                  {t.when} <span className="mx-2 text-signal">·</span> {t.kind}
                </p>
                <h3 className="display mt-3 text-[clamp(1.6rem,3vw,2.6rem)] text-ink">{t.role}</h3>
                <p className="mt-1 font-medium text-ink">{t.org}</p>
                {t.points.length > 0 && (
                  <ul className="mt-5 space-y-2 text-[0.95rem] leading-relaxed text-muted">
                    {t.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <span className="mt-[0.7em] h-px w-3 shrink-0 bg-signal" aria-hidden="true" />
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>

          <aside className="lg:col-span-4" aria-labelledby="certs-heading">
            <div className="bg-ink p-8 text-paper lg:sticky lg:top-28">
              <h3 id="certs-heading" className="eyebrow text-paper/60">
                Certifications
              </h3>
              <ul className="mt-6 divide-y divide-paper/15">
                {certifications.map((c) => (
                  <li data-reveal key={c.name} className="py-5 first:pt-0 last:pb-0">
                    <p className="font-display text-xl font-bold tracking-tight">{c.name}</p>
                    <p className="mt-1 text-sm text-paper/60">{c.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-16 bg-paper pt-24 md:pt-36">
      <div className={shell}>
        <p data-reveal className="eyebrow flex items-center gap-3 text-muted">
          <span className="text-signal">06</span>
          <span className="h-px w-8 bg-ink/20" aria-hidden="true" />
          Contact
        </p>
        <h2 data-reveal className="display mt-6 text-[clamp(3rem,10vw,10rem)] text-ink">
          Let’s find it
          <br />
          <span className="grad-text">before they do.</span>
        </h2>

        <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2">
          <a
            data-reveal
            href={`mailto:${profile.email}`}
            className="group flex items-center justify-between gap-4 border border-ink bg-ink p-6 text-paper transition-colors hover:border-signal hover:bg-signal md:p-8"
          >
            <span className="min-w-0">
              <span className="eyebrow block text-paper/60 group-hover:text-paper/80">Email</span>
              <span className="mt-2 block truncate font-display text-[clamp(1.1rem,2.2vw,1.8rem)] font-bold">{profile.email}</span>
            </span>
            <Mail className="size-6 shrink-0" aria-hidden="true" />
          </a>
          <a
            data-reveal
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between gap-4 border border-ink p-6 text-ink transition-colors hover:border-signal hover:text-signal md:p-8"
          >
            <span className="min-w-0">
              <span className="eyebrow block text-muted">LinkedIn</span>
              <span className="mt-2 block truncate font-display text-[clamp(1.1rem,2.2vw,1.8rem)] font-bold">/in/shairy-a9b2ab1a3</span>
            </span>
            <ArrowUpRight className="size-6 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </a>
        </div>
      </div>

      <footer className="mt-24 border-t border-line md:mt-36">
        <div className={`${shell} flex flex-col gap-3 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between`}>
          <p>
            <span className="font-semibold text-ink">{profile.fullName}</span> · {profile.title} · {profile.location}
          </p>
          <p>© {YEAR} {profile.fullName}</p>
        </div>
      </footer>
    </section>
  )
}
