import { cn } from "@/lib/utils";
import Image from "next/image";

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
}) => (
  <>
    <Image
      src={src}
      blurDataURL={placeholder ? "/assets/pngs/placeholder.png" : undefined}
      alt={alt}
      fill
      style={{ objectFit: "cover", objectPosition: position }}
      priority
      className={cn(`${className}`, mobileImage && "md:hidden")}
      sizes={sizes || "(max-width: 768px) 100vw, 33vw"}
    />

    <Image
      src={mobileImage ?? src}
      blurDataURL={placeholder ? "/assets/pngs/placeholder.png" : undefined}
      alt={alt}
      fill
      style={{ objectFit: "cover", objectPosition: position }}
      priority
      className={cn(`${className}`, mobileImage && "hidden md:inline-block")}
      sizes={sizes || "(max-width: 768px) 100vw, 33vw"}
      onLoad={handleOnLoad}
    />
  </>
);

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
}) => (
  <>
    <Image
      src={src}
      blurDataURL={placeholder ? "/assets/pngs/placeholder.png" : undefined}
      alt={alt}
      fill
      style={{ objectFit: "contain", objectPosition: position }}
      priority
      className={cn(`${className}`, mobileImage && "md:hidden")}
      sizes={sizes || "(max-width: 768px) 100vw, 33vw"}
    />
    <Image
      src={mobileImage ?? src}
      blurDataURL={placeholder ? "/assets/pngs/placeholder.png" : undefined}
      alt={alt}
      fill
      style={{ objectFit: "contain", objectPosition: position }}
      priority
      className={cn(`${className}`, mobileImage && "hidden md:inline-block")}
      sizes={sizes || "(max-width: 768px) 100vw, 33vw"}
    />
  </>
);
