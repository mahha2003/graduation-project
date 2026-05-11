"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Bell, LayoutGrid, LogOut, Settings, UserCog } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PERMS from "@/configs/all-permissions";
import { Link, Locale, usePathname, useRouter } from "@/i18n/routing";
import LoopToggleTheme from "@/layout/components/loop-toggle-theme";
import { SignOutDialog } from "@/layout/components/sign-out-dialog";
import { useUserStore } from "@/store/use-user-store";

export function ProfileDropdown() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { user, isPermitted } = useUserStore();
  const userNameClipped =
    user?.full_name?.length && user.full_name.length > 14
      ? `${user.full_name.slice(0, 14)}...`
      : user?.full_name;
  const searchParams = useSearchParams();
  const params = useParams();
  const [isSignOutDialogOpen, setIsSignOutDialogOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const t = useTranslations();

  const isPermittedToViewAccountSettings = isPermitted([PERMS.USER.READ]);

  function onLocaleChange(nextLocale: Locale) {
    let _pathname = pathname;
    const search = searchParams.entries().toArray();
    if (search.length)
      _pathname += `?${search.map((e) => `${e[0]}=${e[1]}`).join("&")}`;

    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname: _pathname, params },
      { locale: nextLocale }
    );
    setIsPopoverOpen(false);
  }

  // Get user initials for avatar fallback
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

  return (
    <>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <TooltipProvider disableHoverableContent>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={"/avatars/01.png"}
                      alt={user?.full_name || user?.username || "User"}
                    />
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent side="bottom">{t("Profile")}</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <PopoverContent
          className="w-56 p-1"
          align="end"
          dir={locale === "ar" ? "rtl" : "ltr"}
        >
          <div className="flex flex-col space-y-1 px-2 py-1.5">
            <p className="mb-2 text-base leading-none font-medium">
              {user?.email?.split("@")[0] || userNameClipped || user?.username || "User"}
            </p>
            <p className="text-muted-foreground text-sm leading-none">
              {user?.email || user?.username || "user@example.com"}
            </p>
          </div>
          <Separator className="bg-muted -mx-1 my-1 h-px" />

          {/* Mobile Only Controls */}
          <div className="block sm:hidden">
            <div className="flex flex-col gap-1 p-1">
              <Button
                variant="ghost"
                className="w-full justify-between px-2 py-1.5 font-normal"
                onClick={() => setIsPopoverOpen(false)}
              >
                <div className="flex items-center">
                  <Bell className="text-muted-foreground mx-3 h-4 w-4" />
                  {t("Notifications")}
                </div>
                <div className="bg-card px-2 py-1">
                  <Icon
                    icon="mingcute:notification-newdot-line"
                    width="16"
                    height="16"
                    className="font-bold"
                  />
                </div>
              </Button>
              <div className="flex w-full items-center justify-between px-2 py-1.5">
                <div className="flex items-center">
                  <Settings className="text-muted-foreground mx-3 h-4 w-4" />
                  {t("Theme")}
                </div>
                <LoopToggleTheme className="bg-card rounded-lg px-2 py-1" />
              </div>
              <Button
                variant="ghost"
                className="w-full justify-between px-2 py-1.5 font-normal"
                onClick={() => onLocaleChange(locale === "ar" ? "en" : "ar")}
              >
                <div className="flex items-center">
                  <Icon
                    icon="mdi:translate"
                    className="text-muted-foreground mx-3 h-4 w-4"
                  />
                  {t("Language")}
                </div>
                <div className="bg-card px-2 py-1">
                  <p className="font-bold">
                    {locale.toUpperCase() === "AR" ? "AR" : "EN"}
                  </p>
                </div>
              </Button>
            </div>
            <Separator className="bg-muted -mx-1 my-1 h-px" />
          </div>

          <div className="flex flex-col gap-1 p-1">
            <Button
              variant="ghost"
              className="w-full justify-start px-2 py-1.5 font-normal"
              asChild
              onClick={() => setIsPopoverOpen(false)}
            >
              <Link href="/" className="flex items-center">
                <LayoutGrid className="text-muted-foreground mr-3 h-4 w-4" />
                {t("Dashboard")}
              </Link>
            </Button>
          </div>
          <Separator className="bg-muted -mx-1 my-1 h-px" />
          <div className="p-1">
            <Button
              variant="ghost"
              className="text-destructive hover:bg-destructive/10 hover:text-destructive w-full justify-start px-2 py-1.5 font-normal"
              onClick={() => {
                setIsPopoverOpen(false);
                setIsSignOutDialogOpen(true);
              }}
            >
              <LogOut className="mr-3 h-4 w-4" />
              {t("SignOut")}
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <SignOutDialog
        open={isSignOutDialogOpen}
        onOpenChange={setIsSignOutDialogOpen}
      />
    </>
  );
}
