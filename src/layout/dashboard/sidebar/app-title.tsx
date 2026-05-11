import { Activity } from "react";

import { useTranslations } from "next-intl";

import ProgressLink from "@/components/progress-link";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import DefaultTheme from "@/configs/theme";
import LogoImage from "@/layout/components/logo-image";
import { cn } from "@/lib/utils";

export function AppTitle() {
  const t = useTranslations();
  const { setOpenMobile, open } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="gap-0 py-0" asChild>
          <div>
            <Activity mode={open ? "visible" : "hidden"}>
              <ProgressLink
                href="/"
                onClick={() => setOpenMobile(false)}
                className="flex flex-1 items-center gap-2 text-sm leading-tight"
              >
                <LogoImage
                  width={20}
                  height={20}
                  className={cn("flex items-center justify-center")}
                  priority
                />
                <div className="flex flex-col items-start gap-1">
                  <span className="truncate font-bold">
                    {DefaultTheme.logo}
                  </span>
                  {/* <span className="truncate text-xs">{t("System Name")}</span> */}
                </div>
              </ProgressLink>
            </Activity>
            <Activity mode={open ? "hidden" : "visible"}>
              <LogoImage
                width={20}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                height={20}
                priority
                href="/"
              />
            </Activity>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
