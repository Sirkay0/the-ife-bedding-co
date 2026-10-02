'use client'

import { useState } from 'react'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { FaInstagram, FaXTwitter, FaTiktok, FaWhatsapp } from 'react-icons/fa6'

// ─── Data ─────────────────────────────────────────────────────────────────────

const LINK_COLUMNS = [
  {
    heading: 'Shop',
    links: [
      { label: 'Mattresses',   href: '/mattresses'           },
      { label: 'Duvets',       href: '/bedding/duvets'        },
      { label: 'Pillows',      href: '/pillows'               },
      { label: 'Bedding Sets', href: '/bedding'               },
      { label: 'New Arrivals', href: '/shop?filter=new'       },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'FAQs',                href: '/faqs'           },
      { label: 'Shipping & Delivery', href: '/shipping'       },
      { label: 'Returns Policy',      href: '/returns'        },
      { label: 'Contact Us',          href: '/contact'        },
      { label: 'Track My Order',      href: '/track'          },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Our Story',          href: '/about'            },
      { label: 'Sustainability',     href: '/sustainability'   },
      { label: 'B2B & Hospitality',  href: '/b2b'             },
      { label: 'Press',              href: '/press'            },
      { label: 'Careers',            href: '/careers'          },
    ],
  },
] as const

const SOCIALS = [
  { icon: FaInstagram, label: 'Instagram', href: 'https://instagram.com' },
  { icon: FaXTwitter,  label: 'X (Twitter)',  href: 'https://x.com'      },
  { icon: FaTiktok,    label: 'TikTok',    href: 'https://tiktok.com'    },
  { icon: FaWhatsapp,  label: 'WhatsApp',  href: 'https://wa.me'         },
] as const

// ─── Newsletter Form ──────────────────────────────────────────────────────────

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) setSubmitted(true)
  }

  if (submitted) {
    return (
      <p className="text-[13px] text-[#98A892] font-medium py-3">
        ✓ You're on the list — thank you!
      </p>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-stretch mt-4 max-w-[340px]"
      aria-label="Newsletter signup"
    >
      <label htmlFor="footer-email" className="sr-only">Email address</label>
      <input
        id="footer-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="your@email.com"
        className="
          flex-1 min-w-0
          bg-[#F7F5F0]/8 border border-[#F7F5F0]/15
          text-[#F7F5F0] placeholder-[#F7F5F0]/35
          text-[13px] font-medium
          px-4 py-3 rounded-l-full
          outline-none
          focus:border-[#C86B53]/70 focus:bg-[#F7F5F0]/12
          transition-all duration-150
        "
      />
      <button
        type="submit"
        aria-label="Subscribe to newsletter"
        className="
          flex items-center justify-center gap-1.5
          bg-[#C86B53] text-[#F7F5F0]
          px-5 py-3 rounded-r-full
          text-[12px] font-semibold
          hover:bg-[#b05a43]
          transition-colors duration-200
          shrink-0
        "
      >
        Join <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </form>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer
      id="site-footer"
      aria-label="Site footer"
      className="bg-[#2B1D18] text-[#F7F5F0] mt-auto"
    >
      {/* ── Main grid ── */}
      <div className="max-w-[1320px] mx-auto px-5 xl:px-8 pt-16 pb-12 lg:pt-20 lg:pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* ── Brand + Newsletter column (wider) ── */}
          <div className="sm:col-span-2 lg:col-span-4 xl:col-span-4">

            {/* Brand wordmark */}
            <a href="/" className="inline-block mb-4 group" aria-label="The Ife Bedding Co. — Home">
              <span className="
                font-heading text-[22px] font-semibold tracking-tight
                text-[#F7F5F0] group-hover:text-[#C86B53]
                transition-colors duration-200
              ">
                The Ife Bedding Co.
              </span>
              <span className="block text-[10px] uppercase tracking-[0.22em] text-[#8C7A70] font-medium mt-0.5">
                Premium Sleep. Nigerian Made.
              </span>
            </a>

            {/* Tagline */}
            <p className="text-[14px] leading-[1.72] text-[#F7F5F0]/55 font-medium max-w-[300px] mb-6">
              Hotel-quality bedding and orthopedic mattresses, built for the warmth of the Nigerian home.
            </p>

            {/* Newsletter */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8C7A70] mb-1">
                Get sleep tips & exclusive offers
              </p>
              <NewsletterForm />
            </div>
          </div>

          {/* ── Link columns ── */}
          {LINK_COLUMNS.map((col) => (
            <div key={col.heading} className="lg:col-span-2 xl:col-span-2">
              <p className="
                text-[10.5px] font-bold uppercase tracking-[0.2em]
                text-[#8C7A70] mb-5
              ">
                {col.heading}
              </p>
              <ul className="space-y-3">
                {col.links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="
                        text-[13.5px] font-medium text-[#F7F5F0]/65
                        hover:text-[#F7F5F0]
                        transition-colors duration-150
                        inline-flex items-center gap-0
                        hover:gap-1
                        group/link
                      "
                    >
                      <span className="
                        block w-0 overflow-hidden group-hover/link:w-3
                        transition-all duration-200
                        text-[#C86B53]
                      " aria-hidden="true">›</span>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* ── Contact quick-info column ── */}
          <div className="lg:col-span-2 xl:col-span-2">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#8C7A70] mb-5">
              Contact
            </p>
            <ul className="space-y-4">
              {[
                { label: 'WhatsApp',  value: '+234 9003 761 8972', href: 'https://wa.me/23490037618972' },
                { label: 'Email',     value: 'ayobamiadefowope@gmail.com', href: 'mailto:ayobamiadefowope@gmail.com' },
                { label: 'Hours',     value: 'Mon–Sat · 8am–8pm WAT', href: null },
                { label: 'Location',  value: 'Lagos, Nigeria', href: null },
              ].map(({ label, value, href }) => (
                <li key={label}>
                  <p className="text-[10px] uppercase tracking-widest text-[#8C7A70]/70 font-bold mb-0.5">
                    {label}
                  </p>
                  {href ? (
                    <a href={href} className="text-[13px] font-medium text-[#F7F5F0]/65 hover:text-[#F7F5F0] transition-colors duration-150">
                      {value}
                    </a>
                  ) : (
                    <p className="text-[13px] font-medium text-[#F7F5F0]/65">
                      {value}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="border-t border-[#F7F5F0]/8" />

      {/* ── Base bar ── */}
      <div className="max-w-[1320px] mx-auto px-5 xl:px-8 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Copyright + secure badge */}
          <div className="flex items-center gap-4 order-2 sm:order-1">
            <p className="text-[11.5px] text-[#F7F5F0]/35 font-medium">
              © 2026 The Ife Bedding Co. All rights reserved.
            </p>
            <span className="hidden sm:flex items-center gap-1 text-[10.5px] text-[#8C7A70] font-medium">
              <ShieldCheck className="w-3 h-3 text-[#98A892]" aria-hidden="true" />
              Secure Payments
            </span>
          </div>

          {/* Legal links */}
          <div className="flex items-center gap-4 order-3 sm:order-2">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-[11px] text-[#F7F5F0]/30 hover:text-[#F7F5F0]/60 font-medium transition-colors duration-150"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-2 order-1 sm:order-3">
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="
                  w-8 h-8 rounded-full
                  border border-[#F7F5F0]/12
                  flex items-center justify-center
                  text-[#F7F5F0]/45 hover:text-[#F7F5F0]
                  hover:border-[#F7F5F0]/30 hover:bg-[#F7F5F0]/6
                  transition-all duration-200
                "
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
