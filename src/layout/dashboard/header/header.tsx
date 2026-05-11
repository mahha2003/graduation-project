import { useEffect, useState } from "react";

import { useScroll } from "motion/react";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

type HeaderProps = React.HTMLAttributes<HTMLElement> & {
  fixed?: boolean;
  hideSidebarTrigger?: boolean;
  ref?: React.Ref<HTMLElement>;
};

export function Header({
  className,
  fixed,
  hideSidebarTrigger = false,
  children,
  ...props
}: HeaderProps) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 10);
    });

    return unsubscribe;
  }, [scrollY]);

  return (
    <header
      className={cn(
        "z-50 h-16",
        "flex shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12",
        fixed && "header-fixed peer/header sticky top-0 w-[inherit]",
        isScrolled && fixed ? "shadow" : "shadow-none",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "relative flex h-full w-full items-center gap-3 p-4 sm:gap-4",
          isScrolled &&
            fixed &&
            "after:bg-background/20 after:absolute after:inset-0 after:-z-10 after:backdrop-blur-lg"
        )}
      >
        {!hideSidebarTrigger && (
          <>
            <SidebarTrigger variant="outline" className="max-md:scale-125" />
            <Separator orientation="vertical" className="h-6" />
          </>
        )}
        {children}
      </div>
    </header>
  );
}
