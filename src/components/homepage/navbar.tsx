'use client'

import { useState, useEffect, useRef } from 'react'
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Package,
  Phone,
  ArrowRight,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
  label: string
  href: string
  dropdown?: DropdownColumn[]
}

interface DropdownColumn {
  heading: string
  links: { label: string; href: string; badge?: string }[]
}

// ─── Navigation Data ──────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Bedding',
    href: '/bedding',
    dropdown: [
      {
        heading: 'Sheet Sets',
        links: [
          { label: 'French Linen Sheets', href: '/bedding/linen-sheets', badge: 'New' },
          { label: 'Egyptian Cotton Sets', href: '/bedding/egyptian-cotton' },
          { label: 'Sateen Weave', href: '/bedding/sateen' },
          { label: 'Percale Weave', href: '/bedding/percale' },
        ],
      },
      {
        heading: 'Duvet Covers',
        links: [
          { label: 'Organic Linen Duvet', href: '/bedding/linen-duvet', badge: 'Best Seller' },
          { label: 'Washed Cotton Duvet', href: '/bedding/cotton-duvet' },
          { label: 'Silk-Blend Duvet', href: '/bedding/silk-duvet' },
        ],
      },
      {
        heading: 'Collections',
        links: [
          { label: 'The Solace Collection', href: '/collections/solace' },
          { label: 'The Dusk Collection', href: '/collections/dusk' },
          { label: 'Gift Sets', href: '/collections/gifts', badge: 'Sale' },
        ],
      },
    ],
  },
  {
    label: 'Mattresses',
    href: '/mattresses',
    dropdown: [
      {
        heading: 'By Type',
        links: [
          { label: 'Organic Hybrid Latex', href: '/mattresses/hybrid-latex', badge: 'Top Rated' },
          { label: 'Natural Latex Foam', href: '/mattresses/latex-foam' },
          { label: 'Innerspring Coil', href: '/mattresses/innerspring' },
          { label: 'Memory Foam', href: '/mattresses/memory-foam' },
        ],
      },
      {
        heading: 'By Firmness',
        links: [
          { label: 'Plush Soft', href: '/mattresses/plush' },
          { label: 'Medium Feel', href: '/mattresses/medium' },
          { label: 'Firm Support', href: '/mattresses/firm' },
        ],
      },
      {
        heading: 'Accessories',
        links: [
          { label: 'Mattress Protectors', href: '/mattresses/protectors' },
          { label: 'Bed Frames & Bases', href: '/mattresses/bases' },
          { label: 'Mattress Toppers', href: '/mattresses/toppers' },
        ],
      },
    ],
  },
  {
    label: 'Pillows',
    href: '/pillows',
    dropdown: [
      {
        heading: 'Sleep Pillows',
        links: [
          { label: 'Mulberry Silk Pillow', href: '/pillows/silk', badge: 'Luxury' },
          { label: 'Down & Feather', href: '/pillows/down' },
          { label: 'Memory Foam Contour', href: '/pillows/memory-foam' },
          { label: 'Organic Buckwheat', href: '/pillows/buckwheat' },
        ],
      },
      {
        heading: 'Specialty',
        links: [
          { label: 'Cooling Pillow', href: '/pillows/cooling' },
          { label: 'Body Pillow', href: '/pillows/body' },
          { label: 'Travel Pillow', href: '/pillows/travel' },
        ],
      },
    ],
  },
  {
    label: 'Throws & Duvets',
    href: '/throws',
    dropdown: [
      {
        heading: 'Duvets',
        links: [
          { label: 'Goose Down All-Season', href: '/throws/goose-down', badge: 'New' },
          { label: 'Microfibre Duvet', href: '/throws/microfibre' },
          { label: 'Wool-Filled Duvet', href: '/throws/wool' },
        ],
      },
      {
        heading: 'Throws & Blankets',
        links: [
          { label: 'Cashmere Throw', href: '/throws/cashmere' },
          { label: 'Waffle-Knit Blanket', href: '/throws/waffle' },
          { label: 'Sherpa Fleece', href: '/throws/sherpa' },
        ],
      },
    ],
  },
  { label: 'Our Story', href: '/about' },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function AnnouncementBar() {
  const messages = [
    '✦ Complimentary global shipping on orders over $200',
    '✦ 100-Night risk-free sleep trial on all mattresses',
    '✦ Organic Tranquility Collection — now available',
  ]
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % messages.length), 4000)
    return () => clearInterval(id)
  }, [messages.length])

  return (
    <div className="bg-deep-espresso text-cloud-dancer text-[11px] font-medium tracking-widest uppercase py-2.5 text-center overflow-hidden">
      <div
        key={index}
        className="animate-[fadeIn_0.5s_ease] inline-flex items-center gap-2"
      >
        {messages[index]}
      </div>
    </div>
  )
}

function MegaMenu({ columns }: { columns: DropdownColumn[] }) {
  return (
    <div
      className="
        absolute top-[calc(100%+1px)] left-1/2 -translate-x-1/2
        w-[620px] bg-cloud-dancer border border-[#8C7A70]/20
        shadow-[0_24px_64px_rgba(43,29,24,0.14)]
        rounded-2xl overflow-hidden
        pointer-events-auto
      "
    >
      {/* Top gradient accent */}
      <div className="h-[2px] bg-gradient-to-r from-baked-clay via-dusty-rose to-muted-sage" />

      <div
        className="grid p-6 gap-8"
        style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
      >
        {columns.map((col) => (
          <div key={col.heading}>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-warm-taupe mb-3">
              {col.heading}
            </p>
            <ul className="space-y-1.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="
                      group/link flex items-center justify-between
                      text-sm text-deep-espresso/80 font-medium
                      hover:text-baked-clay transition-colors duration-150
                      py-1 rounded
                    "
                  >
                    <span className="group-hover/link:translate-x-0.5 transition-transform duration-150">
                      {link.label}
                    </span>
                    {link.badge && (
                      <span
                        className="
                          text-[9px] font-bold uppercase tracking-wide
                          px-1.5 py-0.5 rounded-full
                          bg-baked-clay/10 text-baked-clay
                        "
                      >
                        {link.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer trust strip */}
      <div className="border-t border-[#8C7A70]/15 px-6 py-3 bg-[#EFECE6]/60 flex items-center gap-6">
        {[
          { icon: Package, label: '10-Year Warranty' },
        ].map(({ icon: Icon, label }) => (
          <span key={label} className="flex items-center gap-1.5 text-[11px] text-warm-taupe font-medium">
            <Icon className="w-3.5 h-3.5 text-muted-sage" />
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}

function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [expanded, setExpanded] = useState<string | null>(null)

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

      {/* Panel */}
      <aside
        className={`
          fixed top-0 right-0 z-50 h-full w-[340px] max-w-full
          bg-cloud-dancer flex flex-col
          shadow-[−24px_0_64px_rgba(43,29,24,0.18)]
          transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${open ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#8C7A70]/20">
          <span className="font-heading text-xl font-semibold text-deep-espresso tracking-tight">
            The Ife Bedding Co.
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#8C7A70]/10 text-warm-taupe hover:text-deep-espresso transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <div key={item.label}>
              {item.dropdown ? (
                <>
                  <button
                    onClick={() =>
                      setExpanded(expanded === item.label ? null : item.label)
                    }
                    className="
                      w-full flex items-center justify-between
                      px-4 py-3.5 rounded-xl
                      text-sm font-semibold text-deep-espresso
                      hover:bg-[#8C7A70]/10 transition-colors
                    "
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 text-warm-taupe transition-transform duration-200 ${
                        expanded === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {expanded === item.label && (
                    <div className="ml-4 mt-1 mb-2 space-y-3 border-l-2 border-[#8C7A70]/20 pl-4">
                      {item.dropdown.map((col) => (
                        <div key={col.heading}>
                          <p className="text-[10px] uppercase tracking-widest text-warm-taupe font-bold mb-1.5">
                            {col.heading}
                          </p>
                          {col.links.map((link) => (
                            <a
                              key={link.label}
                              href={link.href}
                              className="flex items-center gap-2 py-1.5 text-sm text-deep-espresso/80 hover:text-baked-clay font-medium transition-colors"
                            >
                              <ArrowRight className="w-3 h-3 text-baked-clay opacity-60" />
                              {link.label}
                              {link.badge && (
                                <span className="text-[9px] bg-baked-clay/10 text-baked-clay font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                                  {link.badge}
                                </span>
                              )}
                            </a>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <a
                  href={item.href}
                  className="flex items-center px-4 py-3.5 rounded-xl text-sm font-semibold text-deep-espresso hover:bg-[#8C7A70]/10 transition-colors"
                >
                  {item.label}
                </a>
              )}
            </div>
          ))}
        </nav>

        {/* Footer actions */}
        <div className="px-6 py-6 border-t border-[#8C7A70]/20 space-y-3">
          <a
            href="/contact"
            className="flex items-center gap-2.5 text-sm font-medium text-warm-taupe hover:text-deep-espresso transition-colors"
          >
            <Phone className="w-4 h-4" /> Customer Support
          </a>
          <a
            href="/shop"
            className="
              w-full flex items-center justify-center gap-2
              bg-baked-clay text-cloud-dancer
              py-3.5 rounded-full text-sm font-semibold
              hover:bg-[#b05a43] transition-colors
            "
          >
            <Sparkles className="w-4 h-4" /> Shop All Collections
          </a>
        </div>
      </aside>
    </>
  )
}

// ─── Main Navbar Component ────────────────────────────────────────────────────

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)
  const menuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Auto-focus search input
  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  // Close menu on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null)
        setSearchOpen(false)
        setMobileOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const handleMenuEnter = (label: string) => {
    if (menuTimeout.current) clearTimeout(menuTimeout.current)
    setActiveMenu(label)
  }

  const handleMenuLeave = () => {
    menuTimeout.current = setTimeout(() => setActiveMenu(null), 180)
  }

  return (
    <>
      <AnnouncementBar />

      <header
        id="site-header"
        className={`
          sticky top-0 z-30 w-full transition-all duration-300
          ${scrolled
            ? 'bg-cloud-dancer/95 backdrop-blur-lg shadow-[0_1px_0_rgba(140,122,112,0.18),0_8px_32px_rgba(43,29,24,0.08)]'
            : 'bg-cloud-dancer border-b border-[#8C7A70]/18'
          }
        `}
      >
        <div className="max-w-[1320px] mx-auto px-5 xl:px-8">

          {/* ── Main Nav Row ── */}
          <div className="h-[72px] flex items-center justify-between gap-6">

            {/* Brand Wordmark */}
            <a
              href="/"
              className="shrink-0 flex flex-col leading-none group"
              aria-label="The Ife Bedding Co. — Home"
            >
              <span className="font-heading text-[22px] md:text-[26px] font-semibold tracking-tight text-deep-espresso group-hover:text-baked-clay transition-colors duration-200">
                The Ife Bedding Co.
              </span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-warm-taupe font-medium mt-0.5 hidden sm:block">
                Organic Luxury Sleep
              </span>
            </a>

            {/* Desktop Nav Links */}
            <nav
              className="hidden lg:flex items-center gap-0.5 flex-1 justify-center"
              role="navigation"
              aria-label="Main navigation"
            >
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.dropdown && handleMenuEnter(item.label)}
                  onMouseLeave={handleMenuLeave}
                >
                  <a
                    href={item.href}
                    className={`
                      relative inline-flex items-center gap-1 px-4 py-2 rounded-full
                      text-[13.5px] font-medium transition-all duration-150
                      ${activeMenu === item.label
                        ? 'text-baked-clay bg-baked-clay/8'
                        : 'text-deep-espresso/80 hover:text-deep-espresso hover:bg-[#8C7A70]/10'
                      }
                    `}
                    aria-haspopup={item.dropdown ? 'true' : undefined}
                    aria-expanded={activeMenu === item.label ? 'true' : 'false'}
                  >
                    {item.label}
                    {item.dropdown && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-warm-taupe transition-transform duration-200 ${
                          activeMenu === item.label ? 'rotate-180' : ''
                        }`}
                      />
                    )}

                    {/* Active underline */}
                    <span
                      className={`
                        absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-baked-clay
                        transition-all duration-200 origin-left
                        ${activeMenu === item.label ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}
                      `}
                    />
                  </a>

                  {/* Mega Menu */}
                  {item.dropdown && activeMenu === item.label && (
                    <div
                      onMouseEnter={() => handleMenuEnter(item.label)}
                      onMouseLeave={handleMenuLeave}
                    >
                      <MegaMenu columns={item.dropdown} />
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-1 shrink-0">

              {/* Search */}
              <div className="relative flex items-center">
                {searchOpen ? (
                  <div className="flex items-center gap-2 border border-[#8C7A70]/40 rounded-full px-4 py-1.5 bg-white/80 backdrop-blur shadow-sm">
                    <Search className="w-3.5 h-3.5 text-warm-taupe shrink-0" />
                    <input
                      ref={searchRef}
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products…"
                      className="
                        w-44 text-sm bg-transparent text-deep-espresso placeholder-warm-taupe/60
                        outline-none border-none
                      "
                      aria-label="Search"
                    />
                    <button
                      onClick={() => { setSearchOpen(false); setSearchQuery('') }}
                      className="text-warm-taupe hover:text-deep-espresso transition-colors"
                      aria-label="Close search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="p-2.5 rounded-full text-warm-taupe hover:text-deep-espresso hover:bg-[#8C7A70]/10 transition-all"
                    aria-label="Open search"
                  >
                    <Search className="w-[18px] h-[18px]" />
                  </button>
                )}
              </div>

              {/* Cart */}
              <a
                href="/cart"
                className="relative p-2.5 rounded-full text-warm-taupe hover:text-deep-espresso hover:bg-[#8C7A70]/10 transition-all"
                aria-label="Shopping bag, 2 items"
              >
                <ShoppingBag className="w-[18px] h-[18px]" />
                <span
                  className="
                    absolute top-1 right-1 min-w-[16px] h-[16px] px-[3px]
                    bg-baked-clay text-cloud-dancer text-[9px] font-bold
                    rounded-full flex items-center justify-center
                    ring-2 ring-cloud-dancer
                  "
                  aria-hidden="true"
                >
                  2
                </span>
              </a>

              {/* Shop CTA — desktop only */}
              <a
                href="/shop"
                className="
                  hidden xl:inline-flex items-center gap-2
                  ml-2 px-5 py-2.5 rounded-full
                  bg-primary text-primary-foreground
                  text-xs font-semibold uppercase tracking-[0.1em]
                  hover:bg-primary/90 transition-colors duration-200
                  shadow-[0_2px_12px_rgba(200,107,83,0.28)]
                "
              >
                Shop Now
              </a>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2.5 rounded-full text-warm-taupe hover:text-deep-espresso hover:bg-[#8C7A70]/10 transition-all ml-1"
                aria-label="Open navigation menu"
                aria-expanded={mobileOpen}
              >
                <Menu className="w-[18px] h-[18px]" />
              </button>
            </div>
          </div>

          {/* ── Category Quick-strip (shown on scroll up, hides on scroll down) ── */}
          <div
            className={`
              hidden lg:flex items-center gap-5 pb-2.5 overflow-x-auto scrollbar-hide
              text-[11px] uppercase tracking-[0.14em] font-medium text-warm-taupe
              transition-all duration-300
              ${scrolled ? 'max-h-0 opacity-0 pb-0 overflow-hidden' : 'max-h-10 opacity-100'}
            `}
          >
            {[
              'Linen Sheets',
              'Mattresses',
              'Pillows',
              'Duvet Covers',
              'Throws',
              'Gift Sets',
              'New Arrivals',
              'Sale',
            ].map((tag) => (
              <a
                key={tag}
                href={`/shop?category=${tag.toLowerCase().replace(' ', '-')}`}
                className="shrink-0 hover:text-baked-clay transition-colors cursor-pointer"
              >
                {tag}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}