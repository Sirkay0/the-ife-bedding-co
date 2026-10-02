'use client'

import { FaWhatsapp } from 'react-icons/fa6'

const WA_NUMBER = '2349003761897'
const WA_MESSAGE = encodeURIComponent('Hi! I\'d like to enquire about your bedding products.')

export default function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="
        fixed bottom-6 right-6 z-[9999]
        group
        flex items-center justify-center
        w-14 h-14
        bg-[#25D366] text-white
        rounded-full
        shadow-[0_8px_24px_rgba(37,211,102,0.40)]
        hover:shadow-[0_12px_32px_rgba(37,211,102,0.58)]
        hover:scale-110
        transition-all duration-300 ease-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2
      "
    >
      {/* Ripple pulse — gentle, non-intrusive */}
      <span
        aria-hidden="true"
        className="
          absolute inset-0 rounded-full
          bg-[#25D366]
          animate-[wa-ping_2.8s_ease-out_infinite]
          opacity-0
        "
      />

      <FaWhatsapp className="w-7 h-7 relative z-10 drop-shadow-sm" />

      {/* Tooltip label — slides in from the right on hover */}
      <span className="
        absolute right-[calc(100%+12px)]
        whitespace-nowrap
        bg-[#2B1D18] text-[#F7F5F0]
        text-[12px] font-semibold
        px-3 py-1.5 rounded-full
        opacity-0 translate-x-2
        group-hover:opacity-100 group-hover:translate-x-0
        transition-all duration-200
        pointer-events-none
        shadow-md
      ">
        Chat with us
      </span>
    </a>
  )
}
