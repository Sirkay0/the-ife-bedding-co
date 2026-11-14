'use client'

import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

// ─── Branded SVG Placeholder (shown when an image is missing / 404) ───────────
// Renders inline — no extra network request, works for every future product page.

function ImagePlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center bg-[#EFECE6] gap-3",
        className,
      )}
      aria-hidden="true"
    >
      {/* Minimal bed icon drawn with divs — matches Soft Earth palette */}
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-40"
      >
        <rect x="6" y="28" width="36" height="10" rx="2" fill="#8C7A70" />
        <rect x="6" y="20" width="36" height="10" rx="2" fill="#C8B4AC" />
        <rect x="8" y="14" width="10" height="8" rx="2" fill="#8C7A70" />
        <rect x="30" y="14" width="10" height="8" rx="2" fill="#8C7A70" />
        <rect x="6" y="38" width="4" height="4" rx="1" fill="#8C7A70" />
        <rect x="38" y="38" width="4" height="4" rx="1" fill="#8C7A70" />
      </svg>
      <span
        style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
        className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8C7A70]"
      >
        Photo Coming Soon
      </span>
    </div>
  );
}

// ─── CoverImage ───────────────────────────────────────────────────────────────

export const CoverImage = ({
  src,
  mobileImage,
  alt,
  className,
  position,
  placeholder,
  sizes,
  handleOnLoad,
}: {
  src: string;
  alt: string;
  className?: string;
  mobileImage?: string;
  position?: string;
  placeholder?: boolean;
  sizes?: string;
  handleOnLoad?: () => void;
}) => {
  const [primaryError, setPrimaryError]   = useState(false);
  const [mobileError,  setMobileError]    = useState(false);

  if (primaryError && !mobileImage) {
    return <ImagePlaceholder />;
  }

  return (
    <>
      {/* Desktop / primary image */}
      {!primaryError ? (
        <Image
          src={src}
          blurDataURL={placeholder ? "/assets/pngs/placeholder.png" : undefined}
          alt={alt}
          fill
          style={{ objectFit: "cover", objectPosition: position }}
          priority
          className={cn(`${className}`, mobileImage && "md:hidden")}
          sizes={sizes || "(max-width: 768px) 100vw, 33vw"}
          onError={() => setPrimaryError(true)}
          onLoad={!mobileImage ? handleOnLoad : undefined}
        />
      ) : (
        <ImagePlaceholder className={mobileImage ? "md:hidden" : undefined} />
      )}

      {/* Mobile image (only rendered when mobileImage prop is provided) */}
      {mobileImage && (
        <>
          {!mobileError ? (
            <Image
              src={mobileImage}
              blurDataURL={placeholder ? "/assets/pngs/placeholder.png" : undefined}
              alt={alt}
              fill
              style={{ objectFit: "cover", objectPosition: position }}
              priority
              className={cn(`${className}`, "hidden md:inline-block")}
              sizes={sizes || "(max-width: 768px) 100vw, 33vw"}
              onError={() => setMobileError(true)}
              onLoad={handleOnLoad}
            />
          ) : (
            <ImagePlaceholder className="hidden md:flex" />
          )}
        </>
      )}
    </>
  );
};

// ─── ContainImage ─────────────────────────────────────────────────────────────

export const ContainImage = ({
  src,
  alt,
  mobileImage,
  className,
  placeholder,
  position,
  sizes,
}: {
  src: string;
  alt: string;
  mobileImage?: string;
  position?: string;
  className?: string;
  placeholder?: boolean;
  sizes?: string;
}) => {
  const [primaryError, setPrimaryError] = useState(false);
  const [mobileError,  setMobileError]  = useState(false);

  if (primaryError && !mobileImage) {
    return <ImagePlaceholder />;
  }

  return (
    <>
      {!primaryError ? (
        <Image
          src={src}
          blurDataURL={placeholder ? "/assets/pngs/placeholder.png" : undefined}
          alt={alt}
          fill
          style={{ objectFit: "contain", objectPosition: position }}
          priority
          className={cn(`${className}`, mobileImage && "md:hidden")}
          sizes={sizes || "(max-width: 768px) 100vw, 33vw"}
          onError={() => setPrimaryError(true)}
        />
      ) : (
        <ImagePlaceholder className={mobileImage ? "md:hidden" : undefined} />
      )}

      {mobileImage && (
        <>
          {!mobileError ? (
            <Image
              src={mobileImage}
              blurDataURL={placeholder ? "/assets/pngs/placeholder.png" : undefined}
              alt={alt}
              fill
              style={{ objectFit: "contain", objectPosition: position }}
              priority
              className={cn(`${className}`, "hidden md:inline-block")}
              sizes={sizes || "(max-width: 768px) 100vw, 33vw"}
              onError={() => setMobileError(true)}
            />
          ) : (
            <ImagePlaceholder className="hidden md:flex" />
          )}
        </>
      )}
    </>
  );
};

