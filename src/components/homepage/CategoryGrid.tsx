import { ArrowRight } from 'lucide-react'
import { CoverImage } from '@/components/myImage'

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: 'mattresses',
    label: 'Orthopedic Mattresses',
    tagline: 'Doctor-recommended support for every sleep style.',
    href: '/mattresses',
    image: '/category-mattress.jpg',
    imageAlt: 'A premium orthopedic mattress with quilted fabric, resting on a solid walnut bed frame in a warm-toned bedroom.',
    // Accent gradient per card — reinforces the Soft Earth palette without repetition
    gradient: 'from-deep-espresso/70 via-deep-espresso/30 to-transparent',
    badge: '12 Styles',
  },
  {
    id: 'bedding',
    label: 'Duvets & Bedding',
    tagline: 'Breathable, pure cotton sets designed for cool, comfortable nights.',
    href: '/bedding',
    image: '/category-bedding.jpg',
    imageAlt: 'A beautifully made bed with a cloud-dancer linen duvet and baked-clay throw, bathed in soft morning light.',
    gradient: 'from-baked-clay/65 via-baked-clay/25 to-transparent',
    badge: 'Best Sellers',
  },
  {
    id: 'pillows',
    label: 'Premium Pillows',
    tagline: 'Hotel-grade fiber and memory foam — crafted for perfect neck support.',
    href: '/pillows',
    image: '/category-pillows.jpg',
    imageAlt: 'A curated stack of luxury sleep pillows in ivory, white, and warm taupe linen on a natural bedsheet.',
    gradient: 'from-warm-taupe/70 via-warm-taupe/25 to-transparent',
    badge: 'New Arrivals',
  },
] as const

// ─── Category Card ─────────────────────────────────────────────────────────────

function CategoryCard({
  label,
  tagline,
  href,
  image,
  imageAlt,
  gradient,
  badge,
}: (typeof CATEGORIES)[number]) {
  return (
    <a
      href={href}
      aria-label={`Shop ${label}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {/* ── Image container — 3:4 portrait on mobile, fills row height on lg ── */}
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <CoverImage
          src={image}
          alt={imageAlt}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 400px"
          className="transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
        />

        {/* Bottom-up gradient for legibility — unique tint per card */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 bg-gradient-to-t ${gradient} pointer-events-none`}
        />

        {/* ── Content overlay — anchored to the bottom of the image ── */}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">

          {/* Badge pill */}
          <span className="
            inline-flex items-center mb-3
            px-2.5 py-1 rounded-full
            bg-cloud-dancer/20 backdrop-blur-sm border border-cloud-dancer/25
            text-[10px] font-bold uppercase tracking-[0.16em] text-cloud-dancer
          ">
            {badge}
          </span>

          {/* Category title */}
          <h3 className="
            font-heading text-[22px] sm:text-[24px] font-semibold leading-tight
            text-cloud-dancer mb-1.5
          ">
            {label}
          </h3>

          {/* Tagline */}
          <p className="
            text-[13px] leading-snug text-cloud-dancer/75 font-medium mb-4
            max-w-[240px]
          ">
            {tagline}
          </p>

          {/* Shop Now CTA row */}
          <div className="
            inline-flex items-center gap-2
            text-[13px] font-semibold text-cloud-dancer
            border-b border-cloud-dancer/50
            pb-0.5
            transition-all duration-200
            group-hover:border-cloud-dancer group-hover:gap-3
          ">
            Shop Now
            <ArrowRight className="
              w-3.5 h-3.5 shrink-0
              transition-transform duration-200
              group-hover:translate-x-1
            " />
          </div>
        </div>
      </div>
    </a>
  )
}

// ─── Section Component ─────────────────────────────────────────────────────────

export default function CategoryGrid() {
  return (
    <section
      id="shop-by-category"
      aria-labelledby="category-section-heading"
      className="w-full bg-background py-20 lg:py-28"
    >
      <div className="max-w-[1320px] mx-auto px-5 xl:px-8">

        {/* ── Section Header — mirrors Hero's left-column typography rhythm ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 lg:mb-14">
          <div>
            {/* Eyebrow label — same 10px tracked uppercase as Hero trust strip */}
            <p className="
              text-[10px] font-bold uppercase tracking-[0.22em]
              text-muted-foreground mb-3
            ">
              Curated for You
            </p>

            <h2
              id="category-section-heading"
              className="
                font-heading
                text-[32px] sm:text-[38px] lg:text-[44px]
                font-semibold leading-[1.1] tracking-[-0.02em]
                text-foreground
              "
            >
              Shop by{' '}
              <span className="
                relative inline-block
                before:absolute before:-bottom-1 before:left-0 before:w-full before:h-[2px]
                before:bg-gradient-to-r before:from-primary before:to-accent
                before:rounded-full
              ">
                Category
              </span>
            </h2>
          </div>

          {/* Desktop: View All link — same tracking/weight as hero sub-badge text */}
          <a
            href="/shop"
            className="
              hidden sm:inline-flex items-center gap-2 shrink-0
              text-[13px] font-semibold text-muted-foreground
              hover:text-foreground
              transition-colors duration-150
              border-b border-transparent hover:border-foreground
              pb-0.5
            "
          >
            View all products
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* ── Grid — 1 col mobile / 3 col desktop ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.id} {...cat} />
          ))}
        </div>

        {/* Mobile: View All — full width pill, matches hero secondary CTA style */}
        <div className="mt-8 sm:hidden">
          <a
            href="/shop"
            className="
              w-full flex items-center justify-center gap-2
              border border-border text-foreground
              py-3.5 rounded-full
              text-[14px] font-medium
              hover:border-foreground hover:bg-foreground/5
              transition-all duration-200
            "
          >
            View all products
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  )
}
