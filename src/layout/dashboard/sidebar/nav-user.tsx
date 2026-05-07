"use client";

import { useState } from "react";

import { Bell, ChevronsUpDown, LogOut, UserCog } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import ProgressLink from "@/components/progress-link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import PERMS from "@/configs/all-permissions";
import { SignOutDialog } from "@/layout/components/sign-out-dialog";
import { useUserStore } from "@/store/use-user-store";

export function NavUser() {
  const { isMobile } = useSidebar();
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations();
  const { user, isPermitted } = useUserStore();

  const isPermittedToViewAccountSettings = isPermitted([PERMS.USER.READ]);

  const getUserInitials = () => {
    if (user?.full_name) {
      const names = user.full_name.split(" ");
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase();
      }
      return user.full_name.substring(0, 2).toUpperCase();
    }
    return "U";
  };

  const userNameClipped =
    user?.full_name?.length && user.full_name.length > 14
      ? `${user.full_name.slice(0, 14)}...`
      : user?.full_name || user?.username || "User";

  const userEmail = user?.email || "user@example.com";
  const userAvatar = "/avatars/01.png";

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu dir={locale === "ar" ? "rtl" : "ltr"}>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={userAvatar} alt={userNameClipped} />
                  <AvatarFallback className="rounded-lg">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-start text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {userNameClipped}
                  </span>
                  <span className="text-muted-foreground truncate text-xs">
                    {userEmail}
                  </span>
                </div>
                <ChevronsUpDown className="text-muted-foreground ms-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-start text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={userAvatar} alt={userNameClipped} />
                    <AvatarFallback className="rounded-lg">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-start text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {userNameClipped}
                    </span>
                    <span className="text-muted-foreground truncate text-xs">
                      {userEmail}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive hover:cursor-pointer"
                onClick={() => setOpen(true)}
                asChild
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start font-normal"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {t("SignOut")}
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <SignOutDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
