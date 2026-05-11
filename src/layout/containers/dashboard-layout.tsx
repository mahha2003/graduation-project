"use client";

import {
  SIDEBAR_COOKIE_NAME,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { getCookie } from "@/lib/cookies";

import BreadcrumbNavigation from "../components/breadcrumb-navigation";
import { CommandMenu } from "../components/command-menu";
import LoopToggleTheme from "../components/loop-toggle-theme";
import { ConfigDrawer } from "../dashboard/header/config-drawer";
import { Header } from "../dashboard/header/header";
import LanguageButton from "../dashboard/header/language-button";
import { ProfileDropdown } from "../dashboard/header/profile-dropdown";
import { Search } from "../dashboard/header/search";
import AppSidebar from "../dashboard/sidebar/app-sidebar";
import { useLayout } from "../store/use-layout";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { fixed } = useLayout();
  const defaultOpen = getCookie(SIDEBAR_COOKIE_NAME) !== "false";

  return (
    <SidebarProvider defaultOpen={defaultOpen} className="w-full max-w-full">
      <AppSidebar />
      <SidebarInset className="flex min-h-0 min-w-0 flex-col">
        <Header fixed={fixed}>
          <BreadcrumbNavigation />
          <div className="ms-auto flex items-center space-x-4">
            <Search />
            <LoopToggleTheme className="hidden md:block" />
            <ConfigDrawer />
            <LanguageButton />
            <ProfileDropdown />
          </div>
        </Header>

        <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto">
          <div className="box-border w-full max-w-full px-4 py-6">
            {children}
          </div>
        </div>
      </SidebarInset>
      <CommandMenu />
    </SidebarProvider>
  );
}

export default DashboardLayout;
