import { useTranslations } from "next-intl";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  useSidebar,
} from "@/components/ui/sidebar";
import { usePathname } from "@/i18n/routing";
import { useUserStore } from "@/store/use-user-store";

import {
  SidebarMenuCollapsedDropdown,
  SidebarMenuCollapsible,
  SidebarMenuLink,
} from "./components/nav-item-components";
import { type NavGroup as NavGroupProps } from "./types";

export function NavGroup({ title, items }: NavGroupProps) {
  const href = usePathname();
  const t = useTranslations();

  const { isPermitted } = useUserStore();
  const { state, isMobile } = useSidebar();

  const filteredItems = items.filter((item) => {
    if (!item.actions) return true;
    return isPermitted(item.actions);
  });

  if (filteredItems.length === 0) return null;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{t(title)}</SidebarGroupLabel>
      <SidebarMenu>
        {filteredItems.map((item) => {
          const key = `${item.title}-${item.url || "collapsible"}`;

          if (!item.items)
            return <SidebarMenuLink key={key} item={item} href={href} />;

          if (state === "collapsed" && !isMobile)
            return (
              <SidebarMenuCollapsedDropdown key={key} item={item} href={href} />
            );

          return <SidebarMenuCollapsible key={key} item={item} href={href} />;
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
