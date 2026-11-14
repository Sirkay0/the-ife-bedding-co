'use client'

import { useState, useMemo, useEffect, use } from 'react'
import Link from 'next/link'
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Check,
  Minus,
  Plus,
  ShoppingBag,
  Heart,
  Share2,
  ChevronDown,
  Info,
  Clock,
  MapPin,
  MessageCircle,
  Award,
  Layers,
  ThermometerSnowflake,
} from 'lucide-react'
import Navbar from '@/components/homepage/navbar'
import { CoverImage } from '@/components/myImage'
import { CATALOG_PRODUCTS } from '@/data/catalog'

// ─── Interfaces ───────────────────────────────────────────────────────────────

interface SizeOption {
  id: string
  label: string
  dimensions: string
  priceOffset: number
  badge?: string
}

interface ThicknessOption {
  id: string
  inches: number
  label: string
  priceOffset: number
  recommended?: boolean
}

interface ProductVariant {
  sizeId: string
  thicknessId: string
  sku: string
  stock: number
}

interface ProductDetailData {
  id: string
  slug: string
  name: string
  brand: 'Vono' | 'Green Earth' | 'Prestige'
  brandLine: string
  modelSeries: string
  specCategory: 'Full Orthopedic' | 'Semi-Orthopedic' | 'Spring' | 'Pillow' | 'Bedding'
  firmnessScore: number // 1 - 10
  firmnessLabel: string
  rating: number
  reviewCount: number
  basePrice: number
  baseComparePrice: number
  images: {
    src: string
    alt: string
    caption: string
  }[]
  tagline: string
  description: string[]
  keyHighlights: {
    title: string
    description: string
    icon: string
  }[]
  sizes: SizeOption[]
  thicknesses: ThicknessOption[]
  variants: ProductVariant[]
  specifications: { [key: string]: string }
  warrantyInfo: string
  deliveryInfo: string
}

// ─── Flagship Mock Data: Vono Majestic ───────────────────────────────────────

const FLAGSHIP_PRODUCT: ProductDetailData = {
  id: 'vono-majestic-orthopedic',
  slug: 'vono-majestic',
  name: 'Vono Majestic Orthopedic Mattress',
  brand: 'Vono',
  brandLine: 'Vono Orthopedic Signature Line',
  modelSeries: 'Majestic Series — Flagship Medical Edition',
  specCategory: 'Full Orthopedic',
  firmnessScore: 9,
  firmnessLabel: 'Full Orthopedic (Firm & Spinal Aligned)',
  rating: 4.9,
  reviewCount: 384,
  basePrice: 285_000,
  baseComparePrice: 335_000,
  tagline: 'Engineered for complete postural stabilization, therapeutic back relief, and enduring Nigerian bedroom luxury.',
  images: [
    {
      src: '/product-ortho-mattress.jpg',
      alt: 'Vono Majestic Full Orthopedic mattress with rich quilted jacquard cover',
      caption: 'Luxury Quilted Jacquard Finish',
    },
    {
      src: '/category-mattress.jpg',
      alt: 'Vono Majestic in an elegant modern master suite',
      caption: 'Bedroom Master Layout',
    },
    {
      src: '/hero-bedroom.jpg',
      alt: 'Serene warm bedroom setup showing mattress profile and deep edge support',
      caption: 'Deep Edge Stabilization',
    },
    {
      src: '/brand-narrative.jpg',
      alt: 'Close-up texture of climate-adapted breathable cooling woven fabrics',
      caption: 'Breathable Climate Weave',
    },
  ],
  description: [
    'The Vono Majestic Full Orthopedic Mattress is the definitive standard in clinical spinal alignment and postural support across Nigeria. Built specifically for individuals managing lumbar discomfort or seeking proactive orthopedic posture correction.',
    'Engineered with ultra-dense bonded orthopedic core foam and wrapped in anti-dust-mite, thermo-neutral damask quilting. It delivers high resilience without bottoming out, resisting sag under multi-year continuous use even in tropical climates.',
  ],
  keyHighlights: [
    {
      title: 'Postural Spine Zero-Sag Core',
      description: 'Medical-grade high density rebonded foam specifically designed to maintain lumbar arch curvature all night.',
      icon: 'shield',
    },
    {
      title: 'Thermo-Regulated Damask',
      description: 'Open-pore surface fabric designed to disperse accumulated body heat, ideal for Lagos and Abuja warm seasons.',
      icon: 'flake',
    },
    {
      title: 'Anti-Microbial & Hypoallergenic',
      description: 'Treated to resist dust mites, mildew, and tropical humidity degradation for lasting hygiene.',
      icon: 'sparkle',
    },
    {
      title: 'Reinforced Dual-Edge Guard',
      description: 'Prevents roll-off and border breakdown when sitting on mattress edges.',
      icon: 'layers',
    },
  ],
  sizes: [
    { id: 'double', label: 'Double', dimensions: '4.5ft x 6ft (54" x 75")', priceOffset: -45_000 },
    { id: 'queen', label: 'Queen', dimensions: '6ft x 4.5ft (72" x 54")', priceOffset: -20_000 },
    { id: 'king', label: 'King', dimensions: '6ft x 6ft (72" x 75")', priceOffset: 0, badge: 'Most Popular' },
    { id: 'super-king', label: 'Super King', dimensions: '6.5ft x 6ft (78" x 75")', priceOffset: 48_000 },
  ],
  thicknesses: [
    { id: 't-8', inches: 8, label: '8-Inch Depth', priceOffset: -30_000 },
    { id: 't-10', inches: 10, label: '10-Inch Classic', priceOffset: 0, recommended: true },
    { id: 't-12', inches: 12, label: '12-Inch Plush Quilt', priceOffset: 38_000 },
    { id: 't-14', inches: 14, label: '14-Inch Deep Luxury', priceOffset: 72_000 },
  ],
  variants: [
    { sizeId: 'king', thicknessId: 't-10', sku: 'VN-MAJ-K10-ORTHO', stock: 14 },
    { sizeId: 'king', thicknessId: 't-8', sku: 'VN-MAJ-K8-ORTHO', stock: 8 },
    { sizeId: 'king', thicknessId: 't-12', sku: 'VN-MAJ-K12-ORTHO', stock: 5 },
    { sizeId: 'king', thicknessId: 't-14', sku: 'VN-MAJ-K14-ORTHO', stock: 3 },
    { sizeId: 'queen', thicknessId: 't-10', sku: 'VN-MAJ-Q10-ORTHO', stock: 12 },
    { sizeId: 'queen', thicknessId: 't-8', sku: 'VN-MAJ-Q8-ORTHO', stock: 6 },
    { sizeId: 'queen', thicknessId: 't-12', sku: 'VN-MAJ-Q12-ORTHO', stock: 4 },
    { sizeId: 'queen', thicknessId: 't-14', sku: 'VN-MAJ-Q14-ORTHO', stock: 2 },
    { sizeId: 'double', thicknessId: 't-8', sku: 'VN-MAJ-D8-ORTHO', stock: 10 },
    { sizeId: 'double', thicknessId: 't-10', sku: 'VN-MAJ-D10-ORTHO', stock: 9 },
    { sizeId: 'double', thicknessId: 't-12', sku: 'VN-MAJ-D12-ORTHO', stock: 3 },
    { sizeId: 'double', thicknessId: 't-14', sku: 'VN-MAJ-D14-ORTHO', stock: 1 },
    { sizeId: 'super-king', thicknessId: 't-10', sku: 'VN-MAJ-SK10-ORTHO', stock: 6 },
    { sizeId: 'super-king', thicknessId: 't-12', sku: 'VN-MAJ-SK12-ORTHO', stock: 4 },
    { sizeId: 'super-king', thicknessId: 't-14', sku: 'VN-MAJ-SK14-ORTHO', stock: 2 },
    { sizeId: 'super-king', thicknessId: 't-8', sku: 'VN-MAJ-SK8-ORTHO', stock: 2 },
  ],
  specifications: {
    'Brand & Line': 'Vono Mattress — Majestic Orthopedic',
    'Firmness Category': 'Full Orthopedic (Rating 9 / 10)',
    'Core Structure': 'Ultra-Density Medical Grade Rebonded Core',
    'Outer Fabric': 'Cool-Touch Jacquard Damask with High-Loft Quilted Top',
    'Country of Origin': 'Assembled in Nigeria under ISO-certified Vono standard',
    'Allergen Treatment': 'Hypoallergenic, dust-mite and anti-fungal sanitized',
    'Flippable': 'Dual-sided symmetric construction for extended longevity',
    'Recommended For': 'Chronic back stiffness, lumbar disc issues, firm sleep lovers',
  },
  warrantyInfo: '10-Year Manufacturer Replacement Warranty covering internal foam breakdown, excessive depression (>1.5 inches), or manufacturing defects.',
  deliveryInfo: 'Free dispatch within Lagos and Abuja on selected dates. Nationwide secure freight delivery takes 2 to 4 working days. Cash or Transfer on Delivery available within selected mainland & island hubs.',
}

// ─── Currency Formatter ───────────────────────────────────────────────────────

function formatNaira(amount: number) {
  return '₦' + amount.toLocaleString('en-NG')
}

// ─── PDP Component ────────────────────────────────────────────────────────────

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // Unwrapping params safely with React 19 / Next.js app router convention
  const resolvedParams = use(params)
  const itemSlug = resolvedParams?.slug || 'majestic'
  const catalogItem = CATALOG_PRODUCTS[itemSlug]

  const product = useMemo<ProductDetailData>(() => {
    if (!catalogItem) return FLAGSHIP_PRODUCT

    return {
      ...FLAGSHIP_PRODUCT,
      id: catalogItem.id,
      slug: catalogItem.slug,
      name: catalogItem.name,
      brand: catalogItem.brand,
      brandLine: catalogItem.brandLine,
      basePrice: catalogItem.basePrice,
      baseComparePrice: catalogItem.baseComparePrice || Math.round(catalogItem.basePrice * 1.15),
      specCategory: (catalogItem.spec as any) || 'Full Orthopedic',
      firmnessScore: catalogItem.firmnessScore ?? 8,
      firmnessLabel: catalogItem.firmnessLabel ?? 'Engineered Orthopedic Comfort',
      tagline: `${catalogItem.descriptor}. Handcrafted for deep rejuvenating sleep across Nigerian homes.`,
      images: [
        {
          src: catalogItem.image,
          alt: catalogItem.name,
          caption: `${catalogItem.name} — Studio View`,
        },
        ...FLAGSHIP_PRODUCT.images.slice(1),
      ],
    }
  }, [catalogItem])

  // Active User State
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [selectedSizeId, setSelectedSizeId] = useState<string>('king')
  const [selectedThicknessId, setSelectedThicknessId] = useState<string>('t-10')
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState<'specs' | 'delivery' | 'warranty'>('specs')
  const [addedNotice, setAddedNotice] = useState(false)

  // Variant calculations
  const selectedSize = useMemo(() => {
    return product.sizes.find((s) => s.id === selectedSizeId) || product.sizes[0]
  }, [product.sizes, selectedSizeId])

  const selectedThickness = useMemo(() => {
    return product.thicknesses.find((t) => t.id === selectedThicknessId) || product.thicknesses[0]
  }, [product.thicknesses, selectedThicknessId])

  const currentPrice = useMemo(() => {
    return product.basePrice + selectedSize.priceOffset + selectedThickness.priceOffset
  }, [product.basePrice, selectedSize.priceOffset, selectedThickness.priceOffset])

  const currentComparePrice = useMemo(() => {
    return product.baseComparePrice + selectedSize.priceOffset + selectedThickness.priceOffset
  }, [product.baseComparePrice, selectedSize.priceOffset, selectedThickness.priceOffset])

  const currentSavings = currentComparePrice - currentPrice
  const savingsPercent = Math.round((currentSavings / currentComparePrice) * 100)

  const activeVariant = useMemo(() => {
    return (
      product.variants.find(
        (v) => v.sizeId === selectedSizeId && v.thicknessId === selectedThicknessId
      ) || product.variants[0]
    )
  }, [product.variants, selectedSizeId, selectedThicknessId])

  const handleAddToCart = () => {
    setAddedNotice(true)
    setTimeout(() => setAddedNotice(false), 3000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-foreground">
      <Navbar />

      <main className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        {/* ── Breadcrumbs ── */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6 sm:mb-8 overflow-x-auto scrollbar-hide py-1">
          <Link href="/" className="hover:text-primary transition-colors shrink-0">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-40" />
          <Link href="/shop" className="hover:text-primary transition-colors shrink-0">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-40" />
          <Link href="/shop?category=mattresses" className="hover:text-primary transition-colors shrink-0">Mattresses</Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-40" />
          <span className="hover:text-primary transition-colors shrink-0">{product.brand}</span>
          <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-40" />
          <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none">{product.name}</span>
        </nav>

        {/* ── Main Product Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
          
          {/* ══════════════════════════════════════════════════════════════════
              LEFT COLUMN: Rich Media Showcase (7 Columns)
             ══════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6 lg:sticky top-24">
            {/* Primary Hero Image Viewport */}
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-muted border border-border shadow-sm group">
              <CoverImage
                src={product.images[activeImageIndex].src}
                alt={product.images[activeImageIndex].alt}
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Floating Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                <span className="px-3 py-1.5 rounded-full bg-deep-espresso/90 backdrop-blur-md text-cloud-dancer text-[11px] font-bold tracking-wider uppercase shadow-md">
                  {product.specCategory}
                </span>
                <span className="px-3 py-1 rounded-full bg-primary/90 backdrop-blur-md text-primary-foreground text-[10px] font-bold tracking-wider uppercase shadow-sm">
                  10-Year Warranty
                </span>
              </div>

              {/* Action Buttons: Wishlist & Share */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  aria-label="Save to Wishlist"
                  className="p-2.5 rounded-full bg-cloud-dancer/90 backdrop-blur-md text-deep-espresso hover:text-primary hover:bg-cloud-dancer transition-all shadow-sm"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-primary text-primary' : ''}`} />
                </button>
              </div>

              {/* Image Caption Pill Overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex justify-between items-center pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-cloud-dancer/85 backdrop-blur-md text-deep-espresso text-xs font-medium border border-border/40">
                  {product.images[activeImageIndex].caption}
                </span>
                <span className="text-[11px] text-cloud-dancer bg-deep-espresso/70 px-2.5 py-1 rounded-full backdrop-blur-md font-mono">
                  {activeImageIndex + 1} / {product.images.length}
                </span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden bg-muted border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-primary ring-2 ring-primary/20 scale-[0.98]'
                      : 'border-transparent hover:border-border opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`View image: ${img.caption}`}
                >
                  <CoverImage
                    src={img.src}
                    alt={img.alt}
                    sizes="120px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* ── Firmness & Ergonomic Feel Gauge ── */}
            <div className="mt-4 p-5 sm:p-6 rounded-2xl bg-muted/60 border border-border flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary" />
                    Sleep Ergonomics & Firmness Scale
                  </h2>
                  <p className="text-sm font-semibold text-foreground mt-0.5">
                    {product.firmnessLabel}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold font-heading text-primary">
                    {product.firmnessScore}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium"> / 10</span>
                </div>
              </div>

              {/* Graphical Scale */}
              <div className="space-y-1.5">
                <div className="relative h-2.5 w-full bg-border rounded-full overflow-hidden flex">
                  <div className="w-[30%] bg-[#D4A5A5]/40" title="Plush/Soft (1-3)" />
                  <div className="w-[30%] bg-[#98A892]/50" title="Medium Balanced (4-6)" />
                  <div className="w-[20%] bg-primary/60" title="Semi-Orthopedic (7-8)" />
                  <div className="w-[20%] bg-primary" title="Full Orthopedic (9-10)" />
                  {/* Marker Pin */}
                  <div
                    className="absolute top-0 bottom-0 w-3 bg-deep-espresso border-2 border-cloud-dancer rounded-full -ml-1.5 shadow-md"
                    style={{ left: `${(product.firmnessScore / 10) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground font-medium tracking-tight">
                  <span>Plush Soft</span>
                  <span>Medium</span>
                  <span>Semi-Ortho</span>
                  <span className="font-bold text-foreground">Full Ortho</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                Doctor-recommended for full spinal stabilization and relief from persistent lower lumbar tension. Zero sagging under heavy body weight.
              </p>
            </div>

            {/* ── Visual Construction Feature Pills ── */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-2">
              {product.keyHighlights.map((hl) => (
                <div key={hl.title} className="p-4 rounded-xl bg-cloud-dancer border border-border/80 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-primary">
                    {hl.icon === 'shield' && <ShieldCheck className="w-4 h-4" />}
                    {hl.icon === 'flake' && <ThermometerSnowflake className="w-4 h-4" />}
                    {hl.icon === 'sparkle' && <Sparkles className="w-4 h-4" />}
                    {hl.icon === 'layers' && <Layers className="w-4 h-4" />}
                    <h3 className="text-xs font-bold text-foreground">{hl.title}</h3>
                  </div>
                  <p className="text-[11.5px] text-muted-foreground leading-relaxed">
                    {hl.description}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* ══════════════════════════════════════════════════════════════════
              RIGHT COLUMN: Buy Box & Product Customizer (5 Columns)
             ══════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Brand Eyebrow & Badges */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                {product.brandLine}
              </span>
              <span className="text-[11px] font-medium text-muted-foreground font-mono">
                SKU: {activeVariant.sku}
              </span>
            </div>

            {/* Product Title & Sub-line */}
            <div>
              <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground tracking-tight leading-[1.15]">
                {product.name}
              </h1>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                {product.tagline}
              </p>
            </div>

            {/* Star Rating & Social Proof */}
            <div className="flex items-center gap-3 pb-4 border-b border-border">
              <div className="flex items-center gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-xs font-semibold text-foreground">{product.rating}</span>
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount} verified Nigerian sleepers)
              </span>
              <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <Check className="w-3 h-3" /> In Stock
              </span>
            </div>

            {/* Price Presentation with Naira Savings */}
            <div className="p-4 sm:p-5 rounded-2xl bg-muted/40 border border-border flex flex-col gap-2">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-3xl sm:text-4xl font-bold font-sans text-foreground tracking-tight">
                  {formatNaira(currentPrice)}
                </span>
                <span className="text-base sm:text-lg text-muted-foreground line-through font-medium">
                  {formatNaira(currentComparePrice)}
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-primary text-primary-foreground tracking-wide">
                  Save {savingsPercent}% ({formatNaira(currentSavings)})
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Price includes standard protective transport wrapping. Free Lagos delivery applies on checkout.
              </p>
            </div>

            {/* ── Dimension Selector (Size) ── */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold uppercase tracking-wider text-muted-foreground">
                  1. Select Size Dimensions:
                </span>
                <span className="font-semibold text-foreground">
                  {selectedSize.label} ({selectedSize.dimensions})
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {product.sizes.map((sz) => {
                  const isSelected = sz.id === selectedSizeId
                  return (
                    <button
                      key={sz.id}
                      onClick={() => setSelectedSizeId(sz.id)}
                      className={`relative p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-primary bg-primary/5 ring-1 ring-primary'
                          : 'border-border bg-cloud-dancer hover:border-foreground/40'
                      }`}
                    >
                      {sz.badge && (
                        <span className="absolute -top-2 right-2 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-deep-espresso text-cloud-dancer">
                          {sz.badge}
                        </span>
                      )}
                      <div>
                        <span className="block text-sm font-semibold text-foreground">
                          {sz.label}
                        </span>
                        <span className="block text-xs text-muted-foreground mt-0.5">
                          {sz.dimensions}
                        </span>
                      </div>
                      <span className="block text-[11px] font-medium text-primary mt-2">
                        {sz.priceOffset === 0
                          ? 'Standard base'
                          : sz.priceOffset > 0
                          ? `+${formatNaira(sz.priceOffset)}`
                          : `-${formatNaira(Math.abs(sz.priceOffset))}`}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* ── Depth / Thickness Selector ── */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold uppercase tracking-wider text-muted-foreground">
                  2. Select Thickness / Height:
                </span>
                <span className="font-semibold text-foreground">
                  {selectedThickness.label}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {product.thicknesses.map((th) => {
                  const isSelected = th.id === selectedThicknessId
                  return (
                    <button
                      key={th.id}
                      onClick={() => setSelectedThicknessId(th.id)}
                      className={`relative py-3 px-2 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'border-primary bg-primary/5 ring-1 ring-primary'
                          : 'border-border bg-cloud-dancer hover:border-foreground/40'
                      }`}
                    >
                      {th.recommended && (
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[8px] font-bold uppercase tracking-tighter px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground whitespace-nowrap">
                          Popular
                        </span>
                      )}
                      <span className="block text-sm font-bold text-foreground">
                        {th.inches}"
                      </span>
                      <span className="block text-[10px] text-muted-foreground font-medium mt-0.5">
                        {th.priceOffset === 0
                          ? 'Base'
                          : th.priceOffset > 0
                          ? `+${th.priceOffset / 1000}k`
                          : `-${Math.abs(th.priceOffset) / 1000}k`}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* ── Quantity & Add to Cart Workflow ── */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity Controller */}
                <div className="flex items-center border border-border rounded-xl bg-cloud-dancer p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-foreground font-mono">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Primary Add to Cart CTA */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 shadow-md hover:shadow-lg transition-all active:scale-[0.99]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart — {formatNaira(currentPrice * quantity)}
                </button>
              </div>

              {/* Added Feedback Toast Banner */}
              {addedNotice && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between animate-[fadeIn_0.3s_ease]">
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    Added {quantity}x {product.name} ({selectedSize.label}) to your cart!
                  </span>
                  <Link href="/cart" className="underline hover:text-emerald-950 font-bold">
                    View Cart
                  </Link>
                </div>
              )}

              {/* Direct WhatsApp Specialist CTA */}
              <a
                href={`https://wa.me/2349037618972?text=${encodeURIComponent(
                  `Hello The Ife Bedding Co. I am inquiring about the ${product.name} (${selectedSize.label}, ${selectedThickness.label}) priced at ${formatNaira(currentPrice)}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-[#25D366]/30 bg-[#25D366]/10 text-deep-espresso hover:bg-[#25D366]/20 text-xs font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                Ask a Sleep Consultant via WhatsApp (Custom Sizes / Delivery)
              </a>
            </div>

            {/* ── Reassurance Strip ── */}
            <div className="grid grid-cols-3 gap-2 py-4 border-y border-border text-center">
              <div className="flex flex-col items-center gap-1 p-2">
                <Truck className="w-4 h-4 text-primary" />
                <span className="text-[11px] font-bold text-foreground">Nationwide</span>
                <span className="text-[10px] text-muted-foreground leading-tight">2-4 Day Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 border-x border-border">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span className="text-[11px] font-bold text-foreground">10-Year Warranty</span>
                <span className="text-[10px] text-muted-foreground leading-tight">Zero-Sag Guarantee</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-[11px] font-bold text-foreground">Showrooms</span>
                <span className="text-[10px] text-muted-foreground leading-tight">Lagos & Abuja</span>
              </div>
            </div>

            {/* ── Interactive Deep Details & Tabs ── */}
            <div className="space-y-4">
              <div className="flex border-b border-border">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2.5 px-4 text-xs font-bold uppercase tracking-wider transition-colors relative ${
                    activeTab === 'specs' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Specifications
                  {activeTab === 'specs' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('delivery')}
                  className={`pb-2.5 px-4 text-xs font-bold uppercase tracking-wider transition-colors relative ${
                    activeTab === 'delivery' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Shipping & Dispatch
                  {activeTab === 'delivery' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('warranty')}
                  className={`pb-2.5 px-4 text-xs font-bold uppercase tracking-wider transition-colors relative ${
                    activeTab === 'warranty' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Warranty & Care
                  {activeTab === 'warranty' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </button>
              </div>

              {/* Tab Contents */}
              <div className="text-xs text-muted-foreground leading-relaxed">
                {activeTab === 'specs' && (
                  <dl className="divide-y divide-border/60">
                    {Object.entries(product.specifications).map(([key, val]) => (
                      <div key={key} className="py-2.5 flex justify-between gap-4">
                        <dt className="font-medium text-foreground w-1/3 shrink-0">{key}</dt>
                        <dd className="text-right w-2/3">{val}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {activeTab === 'delivery' && (
                  <div className="space-y-3 py-1">
                    <p>{product.deliveryInfo}</p>
                    <div className="p-3 rounded-xl bg-cloud-dancer border border-border flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-foreground block">Same-Day / Next-Day Delivery:</span>
                        Available across Ikeja, Lekki, Victoria Island, Ikoyi, Surulere, and Central Abuja.
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'warranty' && (
                  <div className="space-y-3 py-1">
                    <p>{product.warrantyInfo}</p>
                    <ul className="list-disc pl-4 space-y-1.5">
                      <li>Rotate head-to-toe every 3 months for optimal uniform settling.</li>
                      <li>Pair with our waterproof Mackintosh protector to maintain stain-free warranty eligibility.</li>
                      <li>Use on a solid platform or slatted bed base with slat gaps under 3 inches.</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* ── Related Collection Upsell ── */}
        <section className="mt-16 sm:mt-24 pt-12 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2">
                Curated Recommendations
              </p>
              <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-foreground">
                Complete Your Orthopedic Sleep Sanctuary
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              Explore Full Catalog <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                name: 'Vono Executive Pillow',
                descriptor: 'Standard · Premium Microfibre',
                price: 28_000,
                image: '/category-pillows.jpg',
                href: '/pillows',
                badge: 'Perfect Match',
              },
              {
                name: 'Mackintosh Waterproof Protector',
                descriptor: 'King 6×6 · Fitted Shield',
                price: 22_500,
                image: '/product-linen-sheets.jpg',
                href: '/bedding',
                badge: 'Essential',
              },
              {
                name: 'Green Earth Snoozy Villa',
                descriptor: 'Queen · Full Orthopedic',
                price: 265_000,
                image: '/category-mattress.jpg',
                href: '/shop',
              },
              {
                name: 'Prestige Apex Spring + Topper',
                descriptor: 'King 6×6 · Plush Hybrid',
                price: 215_000,
                image: '/product-ortho-mattress.jpg',
                href: '/shop',
              },
            ].map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="group rounded-2xl bg-cloud-dancer border border-border p-3 flex flex-col hover:border-primary/50 transition-all shadow-sm"
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted mb-3">
                  <CoverImage
                    src={item.image}
                    alt={item.name}
                    sizes="250px"
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                  {item.badge && (
                    <span className="absolute top-2 left-2 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-deep-espresso text-cloud-dancer">
                      {item.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">
                  {item.name}
                </h3>
                <span className="text-[11px] text-muted-foreground mt-0.5 truncate">
                  {item.descriptor}
                </span>
                <span className="text-xs font-bold text-foreground mt-2">
                  {formatNaira(item.price)}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* ── Mobile Fixed Sticky Conversion Bar ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-cloud-dancer/95 backdrop-blur-md border-t border-border p-3 px-4 shadow-[0_-8px_24px_rgba(43,29,24,0.08)]">
        <div className="max-w-[500px] mx-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[11px] text-muted-foreground font-medium line-through">
              {formatNaira(currentComparePrice)}
            </span>
            <span className="text-lg font-bold font-sans text-foreground leading-none">
              {formatNaira(currentPrice)}
            </span>
            <span className="text-[10px] text-primary font-semibold mt-0.5">
              {selectedSize.label} · {selectedThickness.label}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex-1 max-w-[240px] py-3 px-4 rounded-xl bg-primary text-primary-foreground font-semibold text-xs tracking-wide shadow-md flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

