'use client'

import { useRef } from 'react'
import { Star, ShoppingBag, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { CoverImage } from '@/components/myImage'

// ─── Types & Data ─────────────────────────────────────────────────────────────

interface Product {
  id: string
  name: string
  descriptor: string
  image: string
  imageAlt: string
  price: number
  comparePrice?: number
  rating: number
  reviewCount: number
  badge?: { label: string; variant: 'new' | 'top' | 'sale' }
  href: string
}

const PRODUCTS: Product[] = [
  {
    id: 'ortho-hybrid-mattress',
    name: 'OrthoRest Hybrid Mattress',
    descriptor: 'Queen · Dual-Layer Foam + Pocket Spring',
    image: '/product-ortho-mattress.jpg',
    imageAlt: 'Cross-section of an orthopedic hybrid mattress showing foam and spring layers.',
    price: 285_000,
    comparePrice: 320_000,
    rating: 5,
    reviewCount: 312,
    badge: { label: 'Top Rated', variant: 'top' },
    href: '/mattresses/orthorest-hybrid',
  },
  {
    id: 'linen-sheet-set',
    name: 'The Lagos Linen Set',
    descriptor: 'King · 100% Pure Cotton Linen',
    image: '/product-linen-sheets.jpg',
    imageAlt: 'A folded set of crisp cloud-dancer linen sheets tied with a natural ribbon.',
    price: 62_000,
    rating: 5,
    reviewCount: 487,
    badge: { label: 'Best Seller', variant: 'top' },
    href: '/bedding/lagos-linen-set',
  },
  {
    id: 'baked-clay-duvet',
    name: 'Terracotta Duvet Cover',
    descriptor: 'Queen · Washed Cotton · Reversible',
    image: '/product-duvet-set.jpg',
    imageAlt: 'A baked-clay terracotta duvet cover folded to reveal its crisp white inner lining.',
    price: 48_500,
    comparePrice: 58_000,
    rating: 4,
    reviewCount: 198,
    badge: { label: 'New', variant: 'new' },
    href: '/bedding/terracotta-duvet',
  },
  {
    id: 'silk-pillow',
    name: 'Premium Microfiber Pillow',
    descriptor: 'Standard - Premium Microfiber & Memory Foam',
    image: '/product-silk-pillow.jpg',
    imageAlt: 'A plump ivory mulberry silk pillow with elegant piping edge detail.',
    price: 34_000,
    rating: 5,
    reviewCount: 261,
    badge: { label: 'New', variant: 'new' },
    href: '/pillows/mulberry-silk',
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

const BADGE_STYLES = {
  new:  'bg-muted-sage/20  text-muted-sage  border-muted-sage/30',
  top:  'bg-primary/12    text-primary      border-primary/25',
  sale: 'bg-accent/20     text-accent-foreground border-accent/30',
}

function formatNaira(amount: number) {
  return '₦' + amount.toLocaleString('en-NG')
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${
              i < rating
                ? 'fill-primary text-primary'
                : 'fill-muted text-muted-foreground/40'
            }`}
            aria-hidden="true"
          />
        ))}
      </div>
      <span className="text-[11px] text-muted-foreground font-medium">
        ({count.toLocaleString()})
      </span>
    </div>
  )
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: Product }) {
  const { name, descriptor, image, imageAlt, price, comparePrice, rating, reviewCount, badge, href } = product

  return (
    <article className="group flex-none w-[72vw] sm:w-auto">
      <a href={href} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-2xl">

        {/* ── Image container ── */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-muted mb-4">

          <CoverImage
            src={image}
            alt={imageAlt}
            sizes="(max-width: 640px) 72vw, (max-width: 1024px) 50vw, 25vw"
            className="
              transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
              group-hover:scale-105
            "
          />

          {/* Badge */}
          {badge && (
            <span className={`
              absolute top-3 left-3 z-10
              inline-flex items-center
              px-2.5 py-1 rounded-full
              text-[10px] font-bold uppercase tracking-[0.14em]
              border backdrop-blur-sm
              ${BADGE_STYLES[badge.variant]}
            `}>
              {badge.label}
            </span>
          )}

          {/* ── Quick Add overlay — slides up on hover ── */}
          <div className="
            absolute inset-x-3 bottom-3 z-10
            translate-y-2 opacity-0
            group-hover:translate-y-0 group-hover:opacity-100
            transition-all duration-300 ease-out
          ">
            <button
              aria-label={`Quick add ${name} to cart`}
              onClick={(e) => e.preventDefault()}
              className="
                w-full flex items-center justify-center gap-2
                bg-foreground/90 backdrop-blur-md text-background
                py-3 rounded-xl
                text-[12px] font-semibold tracking-wide
                hover:bg-foreground
                transition-colors duration-150
              "
            >
              <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
              Quick Add
            </button>
          </div>
        </div>

        {/* ── Card copy ── */}
        <div className="space-y-1.5">
          <StarRating rating={rating} count={reviewCount} />

          {/* Product name — font-sans to feel contemporary vs. the editorial serif headings */}
          <h3 className="
            font-sans text-[15px] font-semibold leading-snug
            text-foreground group-hover:text-primary
            transition-colors duration-150
          ">
            {name}
          </h3>

          <p className="text-[12px] text-muted-foreground font-medium leading-snug">
            {descriptor}
          </p>

          {/* Price row */}
          <div className="flex items-baseline gap-2 pt-0.5">
            <span className="text-[15px] font-bold text-foreground">
              {formatNaira(price)}
            </span>
            {comparePrice && (
              <span className="text-[12px] text-muted-foreground/70 line-through font-medium">
                {formatNaira(comparePrice)}
              </span>
            )}
            {comparePrice && (
              <span className="text-[11px] font-bold text-primary ml-auto">
                Save {formatNaira(comparePrice - price)}
              </span>
            )}
          </div>
        </div>
      </a>
    </article>
  )
}

// ─── Best Sellers Section ─────────────────────────────────────────────────────

export default function BestSellers() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const cardW = el.querySelector('article')?.clientWidth ?? 280
    el.scrollBy({ left: dir === 'left' ? -(cardW + 16) : (cardW + 16), behavior: 'smooth' })
  }

  return (
    <section
      id="best-sellers"
      aria-labelledby="bestsellers-heading"
      className="w-full bg-muted/50 py-20 lg:py-28"
    >
      <div className="max-w-[1320px] mx-auto px-5 xl:px-8">

        {/* ── Section Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 lg:mb-14">
          <div>
            {/* Eyebrow — same 10px tracked uppercase as CategoryGrid */}
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground mb-3">
              Customer Favourites
            </p>
            <h2
              id="bestsellers-heading"
              className="
                font-heading
                text-[32px] sm:text-[38px] lg:text-[44px]
                font-semibold leading-[1.1] tracking-[-0.02em]
                text-foreground
              "
            >
              Our Best{' '}
              <span className="
                relative inline-block
                before:absolute before:-bottom-1 before:left-0 before:w-full before:h-[2px]
                before:bg-gradient-to-r before:from-primary before:to-accent
                before:rounded-full
              ">
                Sellers
              </span>
            </h2>
          </div>

          {/* Desktop controls */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="/shop"
              className="
                inline-flex items-center gap-2 shrink-0
                text-[13px] font-semibold text-muted-foreground
                hover:text-foreground transition-colors duration-150
                border-b border-transparent hover:border-foreground pb-0.5
                mr-2
              "
            >
              View all products <ArrowRight className="w-3.5 h-3.5" />
            </a>
            {/* Scroll arrow controls — visible only on md (before the 4-col kicks in) */}
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="
                lg:hidden
                w-9 h-9 rounded-full border border-border
                flex items-center justify-center
                text-muted-foreground hover:text-foreground hover:border-foreground
                transition-all
              "
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="
                lg:hidden
                w-9 h-9 rounded-full border border-border
                flex items-center justify-center
                text-muted-foreground hover:text-foreground hover:border-foreground
                transition-all
              "
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/*
          ── Product Grid / Carousel ──────────────────────────────────────────
          Mobile  → horizontal scroll carousel (72vw cards, scrollbar hidden)
          sm      → 2-col grid
          lg      → 4-col grid
        */}
        <div
          ref={scrollRef}
          className="
            flex gap-4
            overflow-x-auto scroll-smooth scrollbar-hide
            sm:grid sm:grid-cols-2 sm:overflow-visible
            lg:grid-cols-4
            pb-2 sm:pb-0
          "
        >
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile: View All + arrows row */}
        <div className="mt-8 sm:hidden flex items-center gap-3">
          <a
            href="/shop"
            className="
              flex-1 flex items-center justify-center gap-2
              border border-border text-foreground
              py-3.5 rounded-full
              text-[14px] font-medium
              hover:border-foreground hover:bg-foreground/5
              transition-all duration-200
            "
          >
            View all products <ArrowRight className="w-4 h-4" />
          </a>
          <button
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            className="
              w-12 h-12 rounded-full border border-border shrink-0
              flex items-center justify-center
              text-muted-foreground hover:text-foreground hover:border-foreground
              transition-all
            "
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            className="
              w-12 h-12 rounded-full border border-border shrink-0
              flex items-center justify-center
              text-muted-foreground hover:text-foreground hover:border-foreground
              transition-all
            "
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  )
}
