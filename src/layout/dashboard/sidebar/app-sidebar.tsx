"use client";

import { useLocale } from "next-intl";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import PERMS from "@/configs/all-permissions";
import { sidebarData } from "@/layout/data/sidebar-data";
import { sidebarDataCollapsed } from "@/layout/data/sidebar-data-collapsed";
import { useLayout } from "@/layout/store/use-layout";
import { useUserStore } from "@/store/use-user-store";

import { AppTitle } from "./app-title";
import { NavGroup } from "./nav-group";
import { NavUser } from "./nav-user";
import { QuickActions } from "./quick-actions";
import { type QuickActions as QuickActionsType } from "./types";

function filterQuickActions(
  quickActions: QuickActionsType | undefined,
  isPermitted: (actions: PERMS | PERMS[]) => boolean
): QuickActionsType | undefined {
  if (!quickActions) return undefined;

  return {
    ...quickActions,
    items: quickActions.items
      ?.map((action) => {
        if ("items" in action && Array.isArray(action.items)) {
          const filteredItems = action.items.filter((item) => {
            if (!item.actions) return true;
            return isPermitted(item.actions);
          });

          if (filteredItems.length > 0) {
            return {
              ...action,
              items: filteredItems,
            };
          }
          return null;
        }

        if ("url" in action) {
          if (!action.actions) return action;
          return isPermitted(action.actions) ? action : null;
        }
        return action;
      })
      .filter((action) => action !== null),
  };
}

function AppSidebar() {
  const locale = useLocale();
  const { state } = useSidebar();
  const { isPermitted } = useUserStore();
  const { collapsible, variant } = useLayout();

  const isCollapsedIconMode = state === "collapsed" && collapsible === "icon";

  const dataToUse = isCollapsedIconMode ? sidebarDataCollapsed : sidebarData;

  const filteredNavGroups = dataToUse.navGroups.filter((group) => {
    if (!group.actions || group.actions.length === 0) return true;
    return isPermitted(group.actions);
  });

  const filteredQuickActions = filterQuickActions(
    dataToUse.quickActions,
    isPermitted
  );

  return (
    <Sidebar
      side={locale === "ar" ? "right" : "left"}
      collapsible={collapsible}
      variant={variant}
    >
      <SidebarHeader>
        <AppTitle />
      </SidebarHeader>
      <SidebarContent>
        <QuickActions quickActions={filteredQuickActions} />
        {filteredNavGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;
