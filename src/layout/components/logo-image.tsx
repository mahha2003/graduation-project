import Image from "next/image";

import ProgressLink from "@/components/progress-link";
import { ValidHref } from "@/i18n/routing";
import { cn } from "@/lib/utils";

function LogoImage({
  src = "/logo.png",
  alt = "Website Logo",
  width = 100,
  height = 100,
  className = "",
  priority = false,
  objectFit = "contain",
  href,
}: {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  objectFit?: string;
  href?: ValidHref;
}) {
  if (href) {
    return (
      //@ts-expect-error - it is a valid href
      <ProgressLink href={href}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={cn(`object-${objectFit}`, className)}
          priority={priority}
        />
      </ProgressLink>
    );
  } else {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(`object-${objectFit}`, className)}
        priority={priority}
      />
    );
  }
}

export default LogoImage;
