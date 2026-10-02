import { Armchair, Wind, Medal } from 'lucide-react'
import { CoverImage } from '@/components/myImage'

// ─── Data ─────────────────────────────────────────────────────────────────────

const PILLARS = [
  {
    number: '01',
    icon: Armchair,
    heading: 'Doctor-Recommended Orthopedic Support',
    body: 'Our mattresses are engineered with zoned pocket springs and high-density memory foam that align your spine through the night. Wake up without the back pain — every morning.',
    stat: { value: '94%', label: 'of customers report reduced back pain in 30 days' },
  },
  {
    number: '02',
    icon: Wind,
    heading: 'Breathable Fabrics Built for Our Climate',
    body: 'Every sheet, duvet, and pillowcase in our range is woven from open-weave cotton that actively wicks heat away from your body — so you sleep cool and dry, even on the warmest Lagos night.',
    stat: { value: '40%', label: 'cooler than standard polyester bedding' },
  },
  {
    number: '03',
    icon: Medal,
    heading: 'Hotel-Grade Durability, Made to Last',
    body: 'We source the same materials used in Nigeria\'s top 5-star hotels. Our bedding maintains its colour, softness, and structure through hundreds of washes — built to serve your family for years.',
    stat: { value: '5+', label: 'years of full performance guaranteed' },
  },
] as const

// ─── Sub-components ───────────────────────────────────────────────────────────

function PillarRow({
  number,
  icon: Icon,
  heading,
  body,
  stat,
  isLast,
}: (typeof PILLARS)[number] & { isLast: boolean }) {
  return (
    <div className={`flex gap-5 ${isLast ? '' : 'pb-8 border-b border-border'}`}>

      {/* Number + icon stack */}
      <div className="flex flex-col items-center gap-2 shrink-0 pt-1">
        <span className="
          text-[11px] font-bold uppercase tracking-[0.18em]
          text-muted-foreground/50 tabular-nums
        ">
          {number}
        </span>
        <div className="
          w-10 h-10 rounded-xl
          bg-primary/10 border border-primary/20
          flex items-center justify-center
        ">
          <Icon className="w-[18px] h-[18px] text-primary" aria-hidden="true" />
        </div>
      </div>

      {/* Copy */}
      <div className="flex-1 min-w-0">
        <h3 className="
          font-heading text-[18px] sm:text-[20px]
          font-semibold leading-snug tracking-[-0.01em]
          text-foreground mb-2
        ">
          {heading}
        </h3>
        <p className="text-[14px] sm:text-[15px] leading-[1.72] text-muted-foreground mb-4">
          {body}
        </p>

        {/* Micro-stat pill */}
        <div className="inline-flex items-baseline gap-2 bg-muted rounded-full px-3.5 py-1.5">
          <span className="font-heading text-[17px] font-semibold text-primary">
            {stat.value}
          </span>
          <span className="text-[11.5px] text-muted-foreground font-medium leading-snug">
            {stat.label}
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function BrandNarrative() {
  return (
    <section
      id="brand-narrative"
      aria-labelledby="brand-narrative-heading"
      className="w-full bg-background py-20 lg:py-28 overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto px-5 xl:px-8">

        {/*
          ── Top: Full-width editorial pull-quote strip ────────────────────
          Sets the editorial magazine tone before the split layout below.
        */}
        <div className="mb-14 lg:mb-20">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground mb-4">
            Why The Ife Bedding Co.
          </p>
          <h2
            id="brand-narrative-heading"
            className="
              font-heading
              text-[32px] sm:text-[40px] lg:text-[52px]
              font-semibold leading-[1.08] tracking-[-0.025em]
              text-foreground max-w-[720px]
            "
          >
            Sleep isn't a luxury.{' '}
            <span className="
              relative inline-block text-primary
              before:absolute before:-bottom-1 before:left-0 before:w-full before:h-[2px]
              before:bg-gradient-to-r before:from-primary before:to-accent
              before:rounded-full
            ">
              It's a foundation.
            </span>
          </h2>
        </div>

        {/*
          ── Main: Asymmetric split layout ────────────────────────────────
          Image: sticky 5/12 portrait on left (lg+), full-width on mobile
          Pillars: 7/12 stacked feature rows on right
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* ── LEFT: sticky image column ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">

            {/* Outer frame — same 2.5rem left-rounded treatment as Hero image */}
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl lg:rounded-[2rem] shadow-[0_24px_64px_rgba(43,29,24,0.14)] border border-border">
              <CoverImage
                src="/brand-narrative.jpg"
                alt="Crisp breathable cotton sheets on a beautifully made bed beside an open louvred window, a rattan nightstand, a cold glass of water and a tropical plant — evoking cool sleep in a warm Nigerian climate."
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-top"
              />

              {/* Subtle bottom gradient — prevents harsh cut */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-foreground/10 via-transparent to-transparent pointer-events-none"
              />

              {/* ── Floating editorial caption ── */}
              <div className="
                absolute bottom-4 left-4 right-4
                bg-background/88 backdrop-blur-md
                rounded-xl border border-border
                px-4 py-3
              ">
                <p className="font-heading text-[13px] font-semibold text-foreground leading-snug mb-0.5">
                  "Designed for Nigeria's warmth."
                </p>
                <p className="text-[11px] text-muted-foreground font-medium">
                  Open-weave cotton · Breathable · Hotel-certified
                </p>
              </div>
            </div>

            {/* ── Social proof numbers beneath image ── */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { value: '24/7', label: 'Customer Support' },
                { value: '4.9★',    label: 'Avg. Rating'    },
                { value: 'Nationwide', label: 'Delivery Available' },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center bg-muted rounded-xl p-3"
                >
                  <span className="font-heading text-[16px] font-semibold text-foreground leading-none">
                    {value}
                  </span>
                  <span className="text-[10.5px] text-muted-foreground font-medium mt-1 leading-snug">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: feature pillars ── */}
          <div className="lg:col-span-7 flex flex-col gap-8">

            {PILLARS.map((pillar, i) => (
              <PillarRow
                key={pillar.number}
                {...pillar}
                isLast={i === PILLARS.length - 1}
              />
            ))}

            {/* ── CTA row — mirrors Hero primary CTA style exactly ── */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="/shop"
                id="narrative-cta-primary"
                className="
                  inline-flex items-center justify-center gap-2
                  bg-primary text-primary-foreground
                  px-8 py-4 rounded-full
                  text-[14px] font-semibold tracking-wide
                  hover:bg-primary/90 transition-all duration-300
                  shadow-[0_4px_24px_rgba(200,107,83,0.28)]
                  hover:shadow-[0_6px_32px_rgba(200,107,83,0.42)]
                "
              >
                Shop Our Range
              </a>
              <a
                href="/about"
                className="
                  inline-flex items-center justify-center gap-2
                  border border-border text-foreground
                  px-7 py-4 rounded-full
                  text-[14px] font-medium
                  hover:border-foreground hover:bg-foreground/5
                  transition-all duration-200
                "
              >
                Our Story
              </a>
            </div>
          </div>
        </div>

      </div>

      {/*
        ── Bottom: Deep Espresso editorial band ─────────────────────────────
        Full-bleed magazine-style pull-quote — breaks the Cloud Dancer
        background rhythm to signal a section transition.
      */}
      <div className="mt-20 lg:mt-28 bg-foreground">
        <div className="max-w-[1320px] mx-auto px-5 xl:px-8 py-12 lg:py-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <p className="
            font-heading
            text-[20px] sm:text-[24px] lg:text-[28px]
            font-semibold leading-snug tracking-[-0.015em]
            text-background max-w-[560px]
          ">
            "We spent several years selling bedding that understands the African body — and the African night."
          </p>
          <div className="flex items-center gap-4 shrink-0">
            <div className="w-10 h-[1px] bg-primary hidden lg:block" aria-hidden="true" />
            <div>
              <p className="text-[13px] font-semibold text-background/90 leading-snug">
                Founder, The Ife Bedding Co.
              </p>
              <p className="text-[11px] text-background/50 font-medium mt-0.5">
                Lagos, Nigeria
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
