import { CoverImage } from '@/components/myImage'
import { ArrowRight, BadgeCheck, Truck, Lock, Star, Leaf } from 'lucide-react'

// ─── Trust Signals ────────────────────────────────────────────────────────────

const TRUST_SIGNALS = [
  { icon: BadgeCheck, label: 'Premium Quality Guaranteed'  },
  { icon: Truck,      label: 'Fast Nationwide Delivery'    },
  { icon: Lock,       label: 'Secure Checkout'             },
] as const

// ─── Social Proof ─────────────────────────────────────────────────────────────

function StarRow() {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="w-3.5 h-3.5 fill-[#C86B53] text-[#C86B53]"
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

// ─── Hero Component ───────────────────────────────────────────────────────────

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Hero — The Ife Bedding Co."
      className="relative w-full overflow-hidden bg-[#F7F5F0]"
    >
      {/*
        ──────────────────────────────────────────────────────────────
        LAYOUT: two-column grid on lg+; stacked on mobile
        Left  → copy + CTAs (7/12 cols)
        Right → image frame (5/12 cols)
        ──────────────────────────────────────────────────────────────
      */}
      <div className="max-w-[1320px] mx-auto px-5 xl:px-8">
        <div className="grid lg:grid-cols-12 gap-0 min-h-[calc(100svh-112px)] lg:min-h-[88svh]">

          {/* ── Left: Copy Column ────────────────────────────────── */}
          <div className="
            lg:col-span-7 xl:col-span-6
            flex flex-col justify-center
            pt-16 pb-12 lg:pt-0 lg:pb-0
            lg:pr-10 xl:pr-16
          ">

            {/* Social proof bar */}
            <div className="inline-flex items-center gap-3 mb-8 self-start">
              <StarRow />
              <span className="text-[12px] font-medium text-[#8C7A70]">
                <span className="text-[#2B1D18] font-semibold">4.9</span>
                {' '}from over{' '}
                <span className="text-[#2B1D18] font-semibold">14,200</span>
                {' '}verified sleepers
              </span>
            </div>

            {/* Main heading */}
            <h1 className="
              font-heading
              text-[40px] sm:text-[52px] lg:text-[56px] xl:text-[64px]
              font-semibold leading-[1.08] tracking-[-0.02em]
              text-[#2B1D18]
              mb-6
            ">
              Bring the 5-star hotel{' '}
              <span className="
                relative inline-block
                before:absolute before:-bottom-1 before:left-0 before:w-full before:h-[3px]
                before:bg-gradient-to-r before:from-[#C86B53] before:to-[#D4A5A5]
                before:rounded-full
              ">
                experience
              </span>
              {' '}home.
            </h1>

            {/* Sub-copy */}
            <p className="
              text-[16px] sm:text-[17px] leading-[1.72]
              text-[#8C7A70] max-w-[480px]
              mb-10
            ">
              Premium orthopedic mattresses, breathable cotton bedsheets, and plush duvets
              curated for your{' '}
              <em className="text-[#2B1D18] not-italic font-medium">deepest rest.</em>
            </p>

            {/* CTA group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-14">
              {/* Primary CTA */}
              <a
                href="/shop"
                id="hero-cta-primary"
                className="
                  group/cta
                  inline-flex items-center justify-center gap-3
                  bg-primary text-primary-foreground
                  px-8 py-4 rounded-full
                  text-[14px] font-semibold tracking-wide
                  hover:bg-primary/90
                  transition-all duration-300
                  shadow-[0_4px_24px_rgba(200,107,83,0.30)]
                  hover:shadow-[0_6px_32px_rgba(200,107,83,0.45)]
                "
              >
                Shop the Collection
                <ArrowRight className="
                  w-4 h-4 shrink-0
                  group-hover/cta:translate-x-1
                  transition-transform duration-200
                " />
              </a>

              {/* Secondary CTA */}
              <a
                href="/mattresses"
                id="hero-cta-secondary"
                className="
                  inline-flex items-center justify-center gap-2
                  border border-[#8C7A70]/40 text-[#2B1D18]
                  px-7 py-4 rounded-full
                  text-[14px] font-medium
                  hover:border-[#2B1D18] hover:bg-[#2B1D18]/5
                  transition-all duration-200
                "
              >
                Explore Mattresses
              </a>
            </div>

            {/* Trust signal row */}
            <div className="
              flex flex-col sm:flex-row gap-5 sm:gap-8
              pt-8 border-t border-[#8C7A70]/20
            ">
              {TRUST_SIGNALS.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <span className="
                    flex-shrink-0
                    w-8 h-8 rounded-full
                    bg-[#98A892]/18 border border-[#98A892]/30
                    flex items-center justify-center
                  ">
                    <Icon className="w-3.5 h-3.5 text-[#98A892]" aria-hidden="true" />
                  </span>
                  <span className="text-[12.5px] font-medium text-[#2B1D18]/75 leading-snug">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Image Column ───────────────────────────────── */}
          <div className="
            lg:col-span-5 xl:col-span-6
            relative
            flex items-center justify-center
            -mx-5 lg:mx-0
            lg:-mr-8 xl:-mr-16
            order-first lg:order-last
          ">

            {/*
              Outer wrapper — controls the overall frame height on different
              breakpoints. On mobile it's a 4:3 box; on lg+ it fills the
              entire column height.
            */}
            <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[600px]">

              {/* Decorative background blob — Soft Sage tint */}
              <div
                aria-hidden="true"
                className="
                  absolute -top-12 -right-12 w-[380px] h-[380px]
                  rounded-full bg-[#98A892]/12
                  blur-3xl pointer-events-none
                "
              />
              {/* Decorative blob — Dusty Rose tint */}
              <div
                aria-hidden="true"
                className="
                  absolute -bottom-8 -left-8 w-[260px] h-[260px]
                  rounded-full bg-[#D4A5A5]/15
                  blur-3xl pointer-events-none
                "
              />

              {/*
                Image frame — rounded only on the left edge (lg), full radius on mobile.
                Uses a slightly off-white warm border to feel hand-crafted vs sterile.
              */}
              <div className="
                relative
                w-full h-full overflow-hidden
                rounded-2xl lg:rounded-l-[2.5rem] lg:rounded-r-none
                shadow-[0_32px_80px_rgba(43,29,24,0.18)]
                border border-[#8C7A70]/15
              ">
                <CoverImage
                  src="/hero-bedroom.jpg"
                  alt="A serene, organic luxury bedroom by The Ife Bedding Co. — rattan bed frame, cloud-dancer linen sheets, baked-clay linen throw, and pampas grass on a natural wood nightstand"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-center"
                />

                {/* Subtle left-to-right gradient — blends into the Cloud Dancer background */}
                <div
                  aria-hidden="true"
                  className="
                    absolute inset-0
                    bg-gradient-to-r from-[#F7F5F0]/30 via-transparent to-transparent
                    pointer-events-none
                  "
                />

                {/* ── Floating Product Card ── */}
                <div className="
                  absolute bottom-5 left-5 right-5 sm:right-auto sm:w-[260px]
                  bg-[#F7F5F0]/92 backdrop-blur-md
                  rounded-xl border border-[#8C7A70]/25
                  shadow-[0_8px_32px_rgba(43,29,24,0.14)]
                  p-4
                ">
                  {/* Product badge */}
                  <span className="
                    inline-block mb-2
                    text-[10px] font-bold uppercase tracking-[0.16em]
                    bg-[#C86B53]/12 text-[#C86B53]
                    px-2.5 py-1 rounded-full
                  ">
                    Best Seller
                  </span>

                  <h3 className="font-heading text-[15px] font-semibold text-[#2B1D18] leading-snug mb-0.5">
                    The Solace Linen Set
                  </h3>
                  <p className="text-[12px] text-[#8C7A70] mb-3">
                    100% French Linen · Queen
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[16px] font-bold text-[#2B1D18]">₦148,000</span>
                      <span className="text-[12px] text-[#D4A5A5] line-through font-medium">₦175,000</span>
                    </div>
                    <a
                      href="/bedding/solace-linen-set"
                      className="
                        flex items-center gap-1.5
                        bg-[#C86B53] text-[#F7F5F0]
                        px-3.5 py-2 rounded-full
                        text-[11px] font-semibold
                        hover:bg-[#b05a43]
                        transition-colors
                      "
                    >
                      Shop <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* ── Floating delivery badge (top-right corner) ── */}
                <div className="
                  absolute top-4 right-4
                  bg-[#2B1D18]/88 backdrop-blur-sm
                  text-[#F7F5F0]
                  px-3 py-1.5 rounded-full
                  text-[11px] font-semibold
                  flex items-center gap-1.5
                ">
                  <Leaf className="w-3 h-3 text-[#98A892]" aria-hidden="true" />
                  Local Lagos Delivery
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom scroll hint (desktop) ── */}
      <div className="
        hidden lg:flex justify-center pb-6
        text-[11px] uppercase tracking-[0.2em] text-[#8C7A70]/60 font-medium
        items-center gap-2
      ">
        <span className="
          block w-[1px] h-6
          bg-gradient-to-b from-transparent to-[#8C7A70]/40
        " />
        Scroll to explore
      </div>
    </section>
  )
}
