import { ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import ProgressLink from "@/components/progress-link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ValidHref } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/use-user-store";

import { type NavCollapsible, type NavLink } from "../types";
import { NavBadge, checkIsActive, renderIcon } from "./nav-utils";

export function SidebarMenuLink({
  item,
  href,
}: {
  item: NavLink;
  href: string;
}) {
  const { setOpenMobile } = useSidebar();
  const t = useTranslations();

  const isActive = checkIsActive(href, item);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        tooltip={t(item.title)}
        className={isActive ? "bg-primary text-primary-foreground" : ""}
      >
        <ProgressLink
          //@ts-expect-error - it is a valid href
          href={item.url as ValidHref}
          onClick={() => setOpenMobile(false)}
        >
          {renderIcon(item.icon)}
          <span>{t(item.title)}</span>
          {item.badge && <NavBadge>{item.badge}</NavBadge>}
        </ProgressLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function SidebarMenuCollapsible({
  item,
  href,
}: {
  item: NavCollapsible;
  href: string;
}) {
  const { setOpenMobile } = useSidebar();
  const { isPermitted } = useUserStore();
  const locale = useLocale();
  const t = useTranslations();

  const filteredSubItems = item.items.filter((subItem) => {
    if (!subItem.actions) return true;
    return isPermitted(subItem.actions);
  });

  if (filteredSubItems.length === 0) return null;

  return (
    <Collapsible
      asChild
      defaultOpen={checkIsActive(href, item, true)}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={t(item.title)}>
            {renderIcon(item.icon)}
            <span>{t(item.title)}</span>
            {item.badge && <NavBadge>{item.badge}</NavBadge>}
            <ChevronRight className="ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 rtl:rotate-180" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent className="CollapsibleContent">
          <SidebarMenuSub
            className={cn(
              locale === "en" && "border-r-0 border-l",
              locale === "ar" && "border-r border-l-0"
            )}
          >
            {filteredSubItems.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton
                  asChild
                  isActive={checkIsActive(href, subItem)}
                  className={
                    checkIsActive(href, subItem)
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }
                >
                  <ProgressLink
                    //@ts-expect-error - it is a valid href
                    href={subItem.url as ValidHref}
                    onClick={() => setOpenMobile(false)}
                  >
                    {renderIcon(subItem.icon, "!text-inherit")}
                    <span>{t(subItem.title)}</span>
                    {subItem.badge && <NavBadge>{subItem.badge}</NavBadge>}
                  </ProgressLink>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

export function SidebarMenuCollapsedDropdown({
  item,
  href,
}: {
  item: NavCollapsible;
  href: string;
}) {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const { isPermitted } = useUserStore();

  const t = useTranslations();

  const filteredSubItems = item.items.filter((subItem) => {
    if (!subItem.actions) return true;
    return isPermitted(subItem.actions);
  });

  if (filteredSubItems.length === 0) return null;

  return (
    <SidebarMenuItem>
      <DropdownMenu dir={locale === "ar" ? "rtl" : "ltr"}>
        <DropdownMenuTrigger asChild dir={isRtl ? "rtl" : "ltr"}>
          <SidebarMenuButton
            tooltip={t(item.title)}
            isActive={checkIsActive(href, item)}
            className={
              checkIsActive(href, item)
                ? "bg-primary text-primary-foreground"
                : ""
            }
          >
            {renderIcon(item.icon)}
            <span>{t(item.title)}</span>
            {item.badge && <NavBadge>{item.badge}</NavBadge>}
            <ChevronRight className="ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start" sideOffset={4}>
          <DropdownMenuLabel>
            {t(item.title)} {item.badge ? `(${item.badge})` : ""}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {filteredSubItems.map((sub) => (
            <DropdownMenuItem key={`${sub.title}-${sub.url}`} asChild>
              <ProgressLink
                //@ts-expect-error - it is a valid href
                href={sub.url as ValidHref}
                className={cn(
                  `${checkIsActive(href, sub) ? "bg-primary text-primary-foreground" : ""}`,
                  "hover:cursor-pointer"
                )}
              >
                {renderIcon(sub.icon)}
                <span className="max-w-52 text-wrap">{t(sub.title)}</span>
                {sub.badge && (
                  <span className="ms-auto text-xs">{sub.badge}</span>
                )}
              </ProgressLink>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
}
