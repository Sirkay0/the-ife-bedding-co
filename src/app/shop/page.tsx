'use client'

import { useState, useMemo, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  Star,
  ShoppingBag,
  SlidersHorizontal,
  X,
  ChevronDown,
  ArrowRight,
  Check,
} from 'lucide-react'
import { CoverImage } from '@/components/myImage'
import Navbar from '@/components/homepage/navbar'

// ─── Types ────────────────────────────────────────────────────────────────────

type TopCategory = 'all' | 'mattresses' | 'pillows' | 'bedding'
type BrandLine   = 'Green Earth' | 'Prestige' | 'Vono'
type SpecType    = 'Full Orthopedic' | 'Semi-Orthopedic' | 'Spring' | 'Fibre' | 'Memory Foam' | 'Bedding'
type SortKey     = 'featured' | 'price-asc' | 'price-desc'

interface Product {
  id: string
  name: string
  brand: BrandLine
  category: Exclude<TopCategory, 'all'>
  spec: SpecType
  descriptor: string
  image: string
  imageAlt: string
  price: number
  comparePrice?: number
  rating: number
  reviewCount: number
  badge?: { label: string; variant: 'new' | 'top' | 'sale' }
  href: string
  featured: boolean
}

// ─── Catalog Data ─────────────────────────────────────────────────────────────

const ALL_PRODUCTS: Product[] = [
  // ── GREEN EARTH MATTRESSES ──
  {
    id: 'ge-snoozy-villa',
    name: 'Snoozy Villa',
    brand: 'Green Earth',
    category: 'mattresses',
    spec: 'Full Orthopedic',
    descriptor: 'Full Orthopedic · King 6×6',
    image: '/category-mattress.jpg',
    imageAlt: 'Green Earth Snoozy Villa full orthopedic mattress in a bright bedroom.',
    price: 265_000,
    comparePrice: 295_000,
    rating: 5,
    reviewCount: 421,
    badge: { label: 'Best Seller', variant: 'top' },
    href: '/mattresses/green-earth/snoozy-villa',
    featured: true,
  },
  {
    id: 'ge-comfort-cloud',
    name: 'Comfort Cloud',
    brand: 'Green Earth',
    category: 'mattresses',
    spec: 'Semi-Orthopedic',
    descriptor: 'Semi-Orthopedic · Queen 6×4.5',
    image: '/product-ortho-mattress.jpg',
    imageAlt: 'Green Earth Comfort Cloud semi-orthopedic mattress with soft quilted surface.',
    price: 198_000,
    comparePrice: 225_000,
    rating: 5,
    reviewCount: 318,
    badge: { label: 'New', variant: 'new' },
    href: '/mattresses/green-earth/comfort-cloud',
    featured: true,
  },

  // ── PRESTIGE MATTRESSES ──
  {
    id: 'pr-apex',
    name: 'Apex',
    brand: 'Prestige',
    category: 'mattresses',
    spec: 'Spring',
    descriptor: 'Spring + Topper · King 6×6',
    image: '/product-ortho-mattress.jpg',
    imageAlt: 'Prestige Apex spring mattress with integrated mattress topper, side profile.',
    price: 215_000,
    comparePrice: 248_000,
    rating: 5,
    reviewCount: 204,
    badge: { label: 'Top Rated', variant: 'top' },
    href: '/mattresses/prestige/apex',
    featured: true,
  },
  {
    id: 'pr-phenix',
    name: 'Phenix',
    brand: 'Prestige',
    category: 'mattresses',
    spec: 'Spring',
    descriptor: 'Spring Mattress · Queen 6×4.5',
    image: '/category-mattress.jpg',
    imageAlt: 'Prestige Phenix spring mattress with clean white quilted surface.',
    price: 178_000,
    rating: 4,
    reviewCount: 156,
    href: '/mattresses/prestige/phenix',
    featured: false,
  },
  {
    id: 'pr-sp',
    name: 'Semi Orthopedic (SP)',
    brand: 'Prestige',
    category: 'mattresses',
    spec: 'Semi-Orthopedic',
    descriptor: 'Semi-Orthopedic · King 6×6',
    image: '/product-ortho-mattress.jpg',
    imageAlt: 'Prestige Semi Orthopedic SP mattress with medium-firm support layers.',
    price: 192_000,
    comparePrice: 215_000,
    rating: 4,
    reviewCount: 98,
    badge: { label: 'Sale', variant: 'sale' },
    href: '/mattresses/prestige/sp',
    featured: false,
  },
  {
    id: 'pr-dp1',
    name: 'Soft Feel Orthopedic (DP1)',
    brand: 'Prestige',
    category: 'mattresses',
    spec: 'Full Orthopedic',
    descriptor: 'Full Orthopedic · Queen 6×4.5',
    image: '/category-mattress.jpg',
    imageAlt: 'Prestige Soft Feel Orthopedic DP1 mattress with plush quilted surface.',
    price: 235_000,
    rating: 5,
    reviewCount: 174,
    href: '/mattresses/prestige/dp1',
    featured: false,
  },
  {
    id: 'pr-dp2',
    name: 'Orthopedic/Semi (DP2)',
    brand: 'Prestige',
    category: 'mattresses',
    spec: 'Semi-Orthopedic',
    descriptor: 'Orthopedic/Semi · King 6×6',
    image: '/product-ortho-mattress.jpg',
    imageAlt: 'Prestige Orthopedic Semi DP2 mattress, clean white profile on bedroom floor.',
    price: 208_000,
    rating: 4,
    reviewCount: 112,
    href: '/mattresses/prestige/dp2',
    featured: false,
  },

  // ── VONO MATTRESSES ──
  {
    id: 'vn-majestic',
    name: 'Majestic',
    brand: 'Vono',
    category: 'mattresses',
    spec: 'Full Orthopedic',
    descriptor: 'Full Orthopedic · King 6×6',
    image: '/product-ortho-mattress.jpg',
    imageAlt: 'Vono Majestic full orthopedic mattress, premium quilted surface.',
    price: 285_000,
    comparePrice: 325_000,
    rating: 5,
    reviewCount: 532,
    badge: { label: 'Top Rated', variant: 'top' },
    href: '/mattresses/vono/majestic',
    featured: true,
  },
  {
    id: 'vn-rastapedic',
    name: 'Rastapedic',
    brand: 'Vono',
    category: 'mattresses',
    spec: 'Semi-Orthopedic',
    descriptor: 'Semi-Orthopedic · Queen 6×4.5',
    image: '/category-mattress.jpg',
    imageAlt: 'Vono Rastapedic semi-orthopedic mattress with layered foam construction.',
    price: 225_000,
    comparePrice: 258_000,
    rating: 5,
    reviewCount: 287,
    badge: { label: 'Sale', variant: 'sale' },
    href: '/mattresses/vono/rastapedic',
    featured: true,
  },
  {
    id: 'vn-orthorest',
    name: 'Orthorest',
    brand: 'Vono',
    category: 'mattresses',
    spec: 'Full Orthopedic',
    descriptor: 'Full Orthopedic · King 6×6',
    image: '/product-ortho-mattress.jpg',
    imageAlt: 'Vono Orthorest full orthopedic mattress, firm support profile.',
    price: 248_000,
    rating: 4,
    reviewCount: 193,
    href: '/mattresses/vono/orthorest',
    featured: false,
  },
  {
    id: 'vn-orthofirm',
    name: 'Orthofirm',
    brand: 'Vono',
    category: 'mattresses',
    spec: 'Full Orthopedic',
    descriptor: 'Full Orthopedic · Queen 6×4.5',
    image: '/category-mattress.jpg',
    imageAlt: 'Vono Orthofirm mattress with extra-firm orthopedic support system.',
    price: 238_000,
    rating: 4,
    reviewCount: 141,
    href: '/mattresses/vono/orthofirm',
    featured: false,
  },
  {
    id: 'vn-victoria',
    name: 'Victoria',
    brand: 'Vono',
    category: 'mattresses',
    spec: 'Semi-Orthopedic',
    descriptor: 'Semi-Orthopedic · King 6×6',
    image: '/product-ortho-mattress.jpg',
    imageAlt: 'Vono Victoria semi-orthopedic mattress in an elegant bedroom setting.',
    price: 212_000,
    rating: 4,
    reviewCount: 167,
    href: '/mattresses/vono/victoria',
    featured: false,
  },
  {
    id: 'vn-sleep-well',
    name: 'Sleep Well',
    brand: 'Vono',
    category: 'mattresses',
    spec: 'Semi-Orthopedic',
    descriptor: 'Semi-Orthopedic · Queen 6×4.5',
    image: '/category-mattress.jpg',
    imageAlt: 'Vono Sleep Well semi-orthopedic mattress, medium-firm comfort level.',
    price: 185_000,
    rating: 4,
    reviewCount: 203,
    href: '/mattresses/vono/sleep-well',
    featured: false,
  },
  {
    id: 'vn-venus',
    name: 'Venus',
    brand: 'Vono',
    category: 'mattresses',
    spec: 'Semi-Orthopedic',
    descriptor: 'Semi-Orthopedic · King 6×6',
    image: '/product-ortho-mattress.jpg',
    imageAlt: 'Vono Venus mattress with graceful curved profile and premium fabric.',
    price: 195_000,
    rating: 4,
    reviewCount: 178,
    href: '/mattresses/vono/venus',
    featured: false,
  },
  {
    id: 'vn-comet',
    name: 'Comet',
    brand: 'Vono',
    category: 'mattresses',
    spec: 'Semi-Orthopedic',
    descriptor: 'Semi-Orthopedic · Queen 6×4.5',
    image: '/category-mattress.jpg',
    imageAlt: 'Vono Comet mattress with clean white quilted surface on a wood floor.',
    price: 172_000,
    rating: 4,
    reviewCount: 134,
    badge: { label: 'New', variant: 'new' },
    href: '/mattresses/vono/comet',
    featured: false,
  },

  // ── PILLOWS ──
  {
    id: 'ge-pillow',
    name: 'Green Earth Pillow',
    brand: 'Green Earth',
    category: 'pillows',
    spec: 'Fibre',
    descriptor: 'Fibre Fill · Standard Size',
    image: '/product-silk-pillow.jpg',
    imageAlt: 'Green Earth pillow, cloud-white fibre fill, fluffy and plump.',
    price: 18_500,
    rating: 5,
    reviewCount: 312,
    href: '/pillows/green-earth/green-earth-pillow',
    featured: false,
  },
  {
    id: 'pr-voyage',
    name: 'Prestige Voyage Pillow',
    brand: 'Prestige',
    category: 'pillows',
    spec: 'Fibre',
    descriptor: 'Premium Fibre · Standard Size',
    image: '/category-pillows.jpg',
    imageAlt: 'Prestige Voyage pillow with tailored piping edge, elegant and plump.',
    price: 24_500,
    rating: 5,
    reviewCount: 487,
    badge: { label: 'Best Seller', variant: 'top' },
    href: '/pillows/prestige/voyage',
    featured: true,
  },
  {
    id: 'vn-fibre-pillow',
    name: 'Vono Fibre Pillow',
    brand: 'Vono',
    category: 'pillows',
    spec: 'Fibre',
    descriptor: 'Fibre Fill · Standard Size',
    image: '/product-silk-pillow.jpg',
    imageAlt: 'Vono Fibre pillow, full and soft, on ivory linen.',
    price: 16_000,
    rating: 4,
    reviewCount: 268,
    href: '/pillows/vono/fibre',
    featured: false,
  },
  {
    id: 'vn-executive-pillow',
    name: 'Vono Executive Pillow',
    brand: 'Vono',
    category: 'pillows',
    spec: 'Fibre',
    descriptor: 'Premium Microfibre · Standard Size',
    image: '/category-pillows.jpg',
    imageAlt: 'Vono Executive pillow, plump and cloud-white, on a neatly made bed.',
    price: 28_000,
    rating: 5,
    reviewCount: 361,
    badge: { label: 'New', variant: 'new' },
    href: '/pillows/vono/executive',
    featured: true,
  },
  {
    id: 'vn-memory-pillow',
    name: 'Vono Memory Pillow',
    brand: 'Vono',
    category: 'pillows',
    spec: 'Memory Foam',
    descriptor: 'Memory Foam · Standard Size',
    image: '/product-silk-pillow.jpg',
    imageAlt: 'Vono Memory Foam pillow with contour support shape, grey cover.',
    price: 35_000,
    comparePrice: 42_000,
    rating: 5,
    reviewCount: 219,
    badge: { label: 'Sale', variant: 'sale' },
    href: '/pillows/vono/memory',
    featured: true,
  },
  {
    id: 'vn-mercury-pillow',
    name: 'Vono Mercury Fibre Pillow',
    brand: 'Vono',
    category: 'pillows',
    spec: 'Fibre',
    descriptor: 'Premium Mercury Fibre · Standard Size',
    image: '/category-pillows.jpg',
    imageAlt: 'Vono Mercury Fibre pillow, ultra-soft and hotel-grade, on white bed.',
    price: 22_000,
    rating: 4,
    reviewCount: 183,
    href: '/pillows/vono/mercury-fibre',
    featured: false,
  },

  // ── BEDDING & ACCESSORIES ──
  {
    id: 'bd-bedsheets',
    name: 'Premium Bedsheet Set',
    brand: 'Green Earth',
    category: 'bedding',
    spec: 'Bedding',
    descriptor: 'Cotton · King Size · 4-Piece Set',
    image: '/product-linen-sheets.jpg',
    imageAlt: 'Folded premium cotton bedsheet set in ivory, tied with a natural ribbon.',
    price: 45_000,
    comparePrice: 55_000,
    rating: 5,
    reviewCount: 394,
    badge: { label: 'Best Seller', variant: 'top' },
    href: '/bedding/bedsheets',
    featured: true,
  },
  {
    id: 'bd-duvet',
    name: 'Duvet Cover Set',
    brand: 'Prestige',
    category: 'bedding',
    spec: 'Bedding',
    descriptor: 'Microfibre · Queen · Reversible',
    image: '/product-duvet-set.jpg',
    imageAlt: 'Prestige duvet cover set, crisp and neatly folded on a bed.',
    price: 52_000,
    comparePrice: 62_000,
    rating: 5,
    reviewCount: 247,
    badge: { label: 'New', variant: 'new' },
    href: '/bedding/duvets',
    featured: true,
  },
  {
    id: 'bd-bedcover',
    name: 'Quilted Bedcover',
    brand: 'Vono',
    category: 'bedding',
    spec: 'Bedding',
    descriptor: 'Quilted · King · Machine Washable',
    image: '/product-duvet-set.jpg',
    imageAlt: 'Quilted Vono bedcover on a king bed with warm natural tones.',
    price: 38_000,
    rating: 4,
    reviewCount: 198,
    href: '/bedding/bedcovers',
    featured: false,
  },
  {
    id: 'bd-mackintosh',
    name: 'Mackintosh Mattress Protector',
    brand: 'Vono',
    category: 'bedding',
    spec: 'Bedding',
    descriptor: 'Waterproof · King 6×6 · Fitted',
    image: '/product-linen-sheets.jpg',
    imageAlt: 'Vono Mackintosh waterproof mattress protector, white, fitted style.',
    price: 22_500,
    rating: 5,
    reviewCount: 512,
    badge: { label: 'Top Rated', variant: 'top' },
    href: '/bedding/mackintosh',
    featured: true,
  },
  {
    id: 'bd-topper',
    name: 'Mattress Topper',
    brand: 'Green Earth',
    category: 'bedding',
    spec: 'Bedding',
    descriptor: 'Memory Foam · King 6×6 · 5cm Depth',
    image: '/product-linen-sheets.jpg',
    imageAlt: 'Green Earth memory foam mattress topper, cloud-white, rolled for display.',
    price: 48_000,
    comparePrice: 58_000,
    rating: 5,
    reviewCount: 176,
    badge: { label: 'Sale', variant: 'sale' },
    href: '/bedding/mattress-toppers',
    featured: false,
  },
]

// ─── Constants ────────────────────────────────────────────────────────────────

const TOP_TABS: { label: string; value: TopCategory }[] = [
  { label: 'All Products', value: 'all' },
  { label: 'Mattresses',   value: 'mattresses' },
  { label: 'Pillows',      value: 'pillows' },
  { label: 'Bedding & Accessories', value: 'bedding' },
]

const BRAND_LINES: BrandLine[] = ['Green Earth', 'Prestige', 'Vono']

const SPEC_TYPES: { label: string; value: SpecType }[] = [
  { label: 'Full Orthopedic',  value: 'Full Orthopedic' },
  { label: 'Semi-Orthopedic',  value: 'Semi-Orthopedic' },
  { label: 'Spring',           value: 'Spring' },
  { label: 'Fibre',            value: 'Fibre' },
  { label: 'Memory Foam',      value: 'Memory Foam' },
  { label: 'Bedding',          value: 'Bedding' },
]

const SORT_OPTIONS: { label: string; value: SortKey }[] = [
  { label: 'Featured',           value: 'featured'   },
  { label: 'Price: Low to High', value: 'price-asc'  },
  { label: 'Price: High to Low', value: 'price-desc' },
]

const BADGE_STYLES = {
  new:  'bg-muted-sage/20 text-muted-sage border-muted-sage/30',
  top:  'bg-primary/12 text-primary border-primary/25',
  sale: 'bg-accent/20 text-accent-foreground border-accent/30',
}

const BRAND_PILL: Record<BrandLine, string> = {
  'Green Earth': 'bg-muted-sage/15 text-muted-sage',
  'Prestige':    'bg-primary/10 text-primary',
  'Vono':        'bg-dusty-rose/20 text-deep-espresso',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return '₦' + n.toLocaleString('en-NG')
}

function pct(orig: number, sale: number) {
  return Math.round(((orig - sale) / orig) * 100)
}

// ─── Star Rating ──────────────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${
              i < rating ? 'fill-primary text-primary' : 'fill-muted text-muted-foreground/40'
            }`}
            aria-hidden="true"
          />
        ))}
      </div>
      <span className="text-[11px] text-muted-foreground font-medium">({count.toLocaleString()})</span>
    </div>
  )
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: Product }) {
  const { name, brand, descriptor, image, imageAlt, price, comparePrice, rating, reviewCount, badge, href } = product
  const discount = comparePrice ? pct(comparePrice, price) : null

  return (
    <article className="group flex flex-col">
      <Link href={href} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-2xl">

        {/* Image */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-muted mb-4">
          <CoverImage
            src={image}
            alt={imageAlt}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
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

          {/* Discount % pill */}
          {discount && (
            <span className="
              absolute top-3 right-3 z-10
              bg-deep-espresso text-cloud-dancer
              px-2 py-1 rounded-full
              text-[10px] font-bold
            ">
              −{discount}%
            </span>
          )}

          {/* Quick Add overlay */}
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
                bg-deep-espresso/90 backdrop-blur-md text-cloud-dancer
                py-3 rounded-xl
                text-[12px] font-semibold tracking-wide
                hover:bg-deep-espresso
                transition-colors duration-150
              "
            >
              <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
              Add to Cart
            </button>
          </div>
        </div>

        {/* Copy */}
        <div className="space-y-1.5">
          {/* Brand pill */}
          <span className={`inline-block text-[10px] font-bold uppercase tracking-[0.14em] px-2 py-0.5 rounded-full ${BRAND_PILL[brand]}`}>
            {brand}
          </span>

          <StarRating rating={rating} count={reviewCount} />

          <h3 className="
            font-sans text-[15px] font-semibold leading-snug
            text-foreground group-hover:text-primary
            transition-colors duration-150
          ">
            {name}
          </h3>

          <p className="text-[12px] text-muted-foreground font-medium leading-snug">{descriptor}</p>

          {/* Price */}
          <div className="flex items-baseline gap-2 pt-0.5">
            <span className="text-[15px] font-bold text-foreground">{fmt(price)}</span>
            {comparePrice && (
              <span className="text-[12px] text-muted-foreground/70 line-through font-medium">
                {fmt(comparePrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  )
}

// ─── Filter Checkbox Row ──────────────────────────────────────────────────────

function FilterCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <button
      onClick={onChange}
      className="flex items-center gap-2.5 py-1.5 w-full text-left group"
    >
      <span className={`
        flex-shrink-0 w-4 h-4 rounded border
        flex items-center justify-center
        transition-colors duration-150
        ${checked
          ? 'bg-primary border-primary text-primary-foreground'
          : 'border-border bg-background group-hover:border-primary/50'
        }
      `}>
        {checked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
      </span>
      <span className={`text-[13px] font-medium transition-colors ${checked ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
        {label}
      </span>
    </button>
  )
}

// ─── Filter Panel (shared by sidebar and drawer) ──────────────────────────────

function FilterPanel({
  brands,
  specs,
  activeBrands,
  activeSpecs,
  onToggleBrand,
  onToggleSpec,
  onClearAll,
}: {
  brands: BrandLine[]
  specs: typeof SPEC_TYPES
  activeBrands: Set<BrandLine>
  activeSpecs: Set<SpecType>
  onToggleBrand: (b: BrandLine) => void
  onToggleSpec: (s: SpecType) => void
  onClearAll: () => void
}) {
  const hasFilters = activeBrands.size > 0 || activeSpecs.size > 0

  return (
    <div className="space-y-6">

      {/* Clear all */}
      {hasFilters && (
        <button
          onClick={onClearAll}
          className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary hover:text-primary/80 transition-colors"
        >
          Clear all filters
        </button>
      )}

      {/* Brand Line */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-3">
          Brand Line
        </p>
        <div className="space-y-0.5">
          {brands.map((b) => (
            <FilterCheckbox
              key={b}
              label={b}
              checked={activeBrands.has(b)}
              onChange={() => onToggleBrand(b)}
            />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-border" />

      {/* Spec / Firmness */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-3">
          Type / Spec
        </p>
        <div className="space-y-0.5">
          {specs.map(({ label, value }) => (
            <FilterCheckbox
              key={value}
              label={label}
              checked={activeSpecs.has(value)}
              onChange={() => onToggleSpec(value)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Mobile Filter Drawer ─────────────────────────────────────────────────────

function MobileFilterDrawer({
  open,
  onClose,
  ...filterProps
}: {
  open: boolean
  onClose: () => void
} & React.ComponentProps<typeof FilterPanel>) {
  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40 bg-deep-espresso/50 backdrop-blur-sm
          transition-opacity duration-300
          ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      />

      {/* Drawer */}
      <aside
        className={`
          fixed bottom-0 left-0 right-0 z-50
          bg-cloud-dancer rounded-t-3xl
          shadow-[0_-24px_64px_rgba(43,29,24,0.18)]
          transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${open ? 'translate-y-0' : 'translate-y-full'}
          max-h-[82svh] flex flex-col
        `}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <span className="w-10 h-1 bg-border rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
          <span className="font-heading text-[18px] font-semibold text-deep-espresso">Filters</span>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close filters"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto px-6 py-6 flex-1">
          <FilterPanel {...filterProps} />
        </div>

        {/* Apply CTA */}
        <div className="px-6 py-5 border-t border-border shrink-0">
          <button
            onClick={onClose}
            className="
              w-full bg-primary text-primary-foreground
              py-3.5 rounded-full
              text-[14px] font-semibold tracking-wide
              hover:bg-primary/90 transition-colors
              shadow-[0_4px_24px_rgba(200,107,83,0.28)]
            "
          >
            Show Results
          </button>
        </div>
      </aside>
    </>
  )
}

// ─── Sort Dropdown ────────────────────────────────────────────────────────────

function SortDropdown({
  value,
  onChange,
}: {
  value: SortKey
  onChange: (v: SortKey) => void
}) {
  const [open, setOpen] = useState(false)
  const current = SORT_OPTIONS.find((o) => o.value === value)!

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="
          flex items-center gap-2
          border border-border rounded-full
          px-4 py-2
          text-[13px] font-medium text-foreground
          hover:border-foreground transition-colors
          bg-background
        "
      >
        <span>{current.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="
            absolute right-0 top-[calc(100%+6px)] z-20
            w-48 bg-cloud-dancer
            border border-border rounded-2xl
            shadow-[0_12px_40px_rgba(43,29,24,0.14)]
            overflow-hidden
            animate-[fadeIn_0.15s_ease]
          ">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { onChange(opt.value); setOpen(false) }}
                className={`
                  w-full flex items-center justify-between
                  px-4 py-3 text-[13px] font-medium
                  hover:bg-muted transition-colors text-left
                  ${value === opt.value ? 'text-primary' : 'text-foreground'}
                `}
              >
                {opt.label}
                {value === opt.value && <Check className="w-3.5 h-3.5 text-primary" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

function ShopContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') as TopCategory | null

  const [activeTab,    setActiveTab]    = useState<TopCategory>(
    initialCategory === 'mattresses' || initialCategory === 'pillows' || initialCategory === 'bedding'
      ? initialCategory
      : 'all'
  )
  const [activeBrands, setActiveBrands] = useState<Set<BrandLine>>(new Set())
  const [activeSpecs,  setActiveSpecs]  = useState<Set<SpecType>>(new Set())
  const [sortKey,      setSortKey]      = useState<SortKey>('featured')
  const [drawerOpen,   setDrawerOpen]   = useState(false)

  // Sync category param if URL changes
  useEffect(() => {
    if (initialCategory && ['mattresses', 'pillows', 'bedding'].includes(initialCategory)) {
      setActiveTab(initialCategory as TopCategory)
    }
  }, [initialCategory])

  // ── Derived: visible specs based on active tab ──
  const visibleSpecs = useMemo(() => {
    if (activeTab === 'pillows') return SPEC_TYPES.filter(s => s.value === 'Fibre' || s.value === 'Memory Foam')
    if (activeTab === 'bedding') return SPEC_TYPES.filter(s => s.value === 'Bedding')
    if (activeTab === 'mattresses') return SPEC_TYPES.filter(s => s.value !== 'Fibre' && s.value !== 'Memory Foam' && s.value !== 'Bedding')
    return SPEC_TYPES
  }, [activeTab])

  // ── Tab change: clear spec filters that no longer apply ──
  const handleTabChange = (tab: TopCategory) => {
    setActiveTab(tab)
    setActiveSpecs(new Set())
  }

  const toggleBrand = (b: BrandLine) => {
    setActiveBrands(prev => {
      const next = new Set(prev)
      next.has(b) ? next.delete(b) : next.add(b)
      return next
    })
  }

  const toggleSpec = (s: SpecType) => {
    setActiveSpecs(prev => {
      const next = new Set(prev)
      next.has(s) ? next.delete(s) : next.add(s)
      return next
    })
  }

  const clearAll = () => {
    setActiveBrands(new Set())
    setActiveSpecs(new Set())
  }

  // ── Filter + Sort ──
  const displayedProducts = useMemo(() => {
    let list = ALL_PRODUCTS

    if (activeTab !== 'all')       list = list.filter(p => p.category === activeTab)
    if (activeBrands.size > 0)     list = list.filter(p => activeBrands.has(p.brand))
    if (activeSpecs.size > 0)      list = list.filter(p => activeSpecs.has(p.spec))

    if (sortKey === 'featured')    list = [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    if (sortKey === 'price-asc')   list = [...list].sort((a, b) => a.price - b.price)
    if (sortKey === 'price-desc')  list = [...list].sort((a, b) => b.price - a.price)

    return list
  }, [activeTab, activeBrands, activeSpecs, sortKey])

  const hasFilters = activeBrands.size > 0 || activeSpecs.size > 0
  const activeFilterCount = activeBrands.size + activeSpecs.size

  const filterPanelProps = {
    brands: BRAND_LINES,
    specs: visibleSpecs,
    activeBrands,
    activeSpecs,
    onToggleBrand: toggleBrand,
    onToggleSpec: toggleSpec,
    onClearAll: clearAll,
  }

  return (
    <>
      <Navbar />

      <main className="bg-background min-h-screen">

        {/* ── Page Hero Header ────────────────────────────────────────────── */}
        <section className="bg-cloud-dancer border-b border-border">
          <div className="max-w-[1320px] mx-auto px-5 xl:px-8 pt-14 pb-10 lg:pt-16 lg:pb-12">

            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground mb-3">
              The Ife Bedding Co.
            </p>
            <h1 className="font-heading text-[36px] sm:text-[44px] lg:text-[52px] font-semibold leading-[1.08] tracking-[-0.02em] text-foreground mb-3">
              Our{' '}
              <span className="
                relative inline-block
                before:absolute before:-bottom-1 before:left-0 before:w-full before:h-[3px]
                before:bg-gradient-to-r before:from-primary before:to-accent
                before:rounded-full
              ">
                Collections
              </span>
            </h1>
            <p className="text-[15px] text-muted-foreground max-w-[520px] leading-relaxed mb-8">
              Green Earth, Prestige & Vono — every mattress, pillow, and bedding piece we carry, in one place.
            </p>

            {/* ── Top Category Tabs ── */}
            <div className="flex items-center gap-2 flex-wrap">
              {TOP_TABS.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => handleTabChange(tab.value)}
                  className={`
                    px-5 py-2.5 rounded-full text-[13px] font-semibold
                    border transition-all duration-200
                    ${activeTab === tab.value
                      ? 'bg-primary text-primary-foreground border-primary shadow-[0_2px_12px_rgba(200,107,83,0.28)]'
                      : 'bg-transparent text-foreground border-border hover:border-foreground hover:bg-foreground/5'
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Main Content: Sidebar + Grid ────────────────────────────────── */}
        <div className="max-w-[1320px] mx-auto px-5 xl:px-8 py-10 lg:py-14">
          <div className="flex gap-10 xl:gap-14 items-start">

            {/* ── SIDEBAR — desktop only ── */}
            <aside className="hidden lg:block w-[220px] xl:w-[240px] shrink-0 sticky top-28 self-start">

              {/* Sidebar header */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-heading text-[17px] font-semibold text-foreground">Filters</span>
                {hasFilters && (
                  <button
                    onClick={clearAll}
                    className="text-[11px] font-semibold text-primary hover:text-primary/80 transition-colors uppercase tracking-[0.1em]"
                  >
                    Clear
                  </button>
                )}
              </div>

              <FilterPanel {...filterPanelProps} />
            </aside>

            {/* ── RIGHT COLUMN ── */}
            <div className="flex-1 min-w-0">

              {/* Toolbar: result count + mobile filter + sort */}
              <div className="flex items-center justify-between gap-4 mb-8">

                <div className="flex items-center gap-3">
                  {/* Mobile filter trigger */}
                  <button
                    onClick={() => setDrawerOpen(true)}
                    className="
                      lg:hidden
                      flex items-center gap-2
                      border border-border rounded-full
                      px-4 py-2
                      text-[13px] font-medium text-foreground
                      hover:border-foreground transition-colors
                      relative
                    "
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    Filters
                    {activeFilterCount > 0 && (
                      <span className="
                        absolute -top-1.5 -right-1.5
                        min-w-[18px] h-[18px] px-1
                        bg-primary text-primary-foreground
                        text-[9px] font-bold rounded-full
                        flex items-center justify-center
                      ">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>

                  <p className="text-[13px] text-muted-foreground font-medium">
                    <span className="text-foreground font-semibold">{displayedProducts.length}</span>
                    {' '}products
                  </p>
                </div>

                <SortDropdown value={sortKey} onChange={setSortKey} />
              </div>

              {/* Active filter chips */}
              {hasFilters && (
                <div className="flex items-center gap-2 flex-wrap mb-6">
                  {[...activeBrands].map(b => (
                    <button
                      key={b}
                      onClick={() => toggleBrand(b)}
                      className="
                        flex items-center gap-1.5
                        bg-primary/10 text-primary
                        border border-primary/20
                        px-3 py-1 rounded-full
                        text-[11px] font-semibold uppercase tracking-[0.1em]
                        hover:bg-primary/20 transition-colors
                      "
                    >
                      {b}
                      <X className="w-3 h-3" />
                    </button>
                  ))}
                  {[...activeSpecs].map(s => (
                    <button
                      key={s}
                      onClick={() => toggleSpec(s)}
                      className="
                        flex items-center gap-1.5
                        bg-muted text-muted-foreground
                        border border-border
                        px-3 py-1 rounded-full
                        text-[11px] font-semibold uppercase tracking-[0.1em]
                        hover:bg-muted/80 transition-colors
                      "
                    >
                      {s}
                      <X className="w-3 h-3" />
                    </button>
                  ))}
                </div>
              )}

              {/* Product Grid */}
              {displayedProducts.length > 0 ? (
                <div className="
                  grid gap-5
                  grid-cols-2
                  sm:grid-cols-2
                  md:grid-cols-3
                  xl:grid-cols-4
                ">
                  {displayedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                /* Empty state */
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-5">
                    <SlidersHorizontal className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-heading text-[20px] font-semibold text-foreground mb-2">
                    No products found
                  </h3>
                  <p className="text-[14px] text-muted-foreground mb-6 max-w-[280px]">
                    Try adjusting your filters or browsing all categories.
                  </p>
                  <button
                    onClick={clearAll}
                    className="
                      flex items-center gap-2
                      bg-primary text-primary-foreground
                      px-6 py-3 rounded-full
                      text-[13px] font-semibold
                      hover:bg-primary/90 transition-colors
                    "
                  >
                    Clear filters <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Mobile Drawer ── */}
        <MobileFilterDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          {...filterPanelProps}
        />

      </main>
    </>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ShopContent />
    </Suspense>
  )
}


