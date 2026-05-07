import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslations } from "next-intl";

import ProgressLink from "@/components/progress-link";
import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

import {
  type QuickAction,
  type QuickActionItem,
  type QuickActions,
} from "./types";

function renderIcon(icon?: React.ElementType | string, className?: string) {
  if (!icon) return null;
  if (typeof icon === "string") {
    return (
      <Icon icon={icon} className={cn("h-4 w-4 text-inherit", className)} />
    );
  }
  const IconComponent = icon;
  return <IconComponent />;
}

function isQuickActionGroup(
  action: QuickAction
): action is { items: QuickActionItem[] } {
  return "items" in action && Array.isArray(action.items);
}

function QuickActionItemRenderer({
  item,
  index,
}: {
  item: QuickActionItem;
  index: number;
}) {
  const t = useTranslations();

  if (item.variant === "outline") {
    return (
      //@ts-expect-error - it is a valid href
      <ProgressLink key={index} href={item.url}>
        <Button
          size="icon"
          className="size-8 group-data-[collapsible=icon]:opacity-0"
        >
          {renderIcon(item.icon)}
          <span className="sr-only">{t(item.title)}</span>
        </Button>
      </ProgressLink>
    );
  }

  return (
    //@ts-expect-error - it is a valid href
    <ProgressLink key={index} href={item.url} className="w-full">
      <SidebarMenuButton
        tooltip={t(item.title)}
        variant={item.variant ?? "default"}
        className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground w-full min-w-8 duration-200 ease-linear"
      >
        {renderIcon(item.icon)}
        <span>{t(item.title)}</span>
      </SidebarMenuButton>
    </ProgressLink>
  );
}

export function QuickActions({
  quickActions,
}: {
  quickActions?: QuickActions;
}) {
  if (!quickActions?.items || quickActions?.items.length === 0) {
    return null;
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {quickActions.items.map((action, index) => {
            if (isQuickActionGroup(action)) {
              return (
                <SidebarMenuItem
                  key={index}
                  className="flex items-center gap-2"
                >
                  {action.items.map((item, itemIndex) => (
                    <QuickActionItemRenderer
                      key={itemIndex}
                      item={item}
                      index={itemIndex}
                    />
                  ))}
                </SidebarMenuItem>
              );
            }

            return (
              <SidebarMenuItem key={index}>
                <QuickActionItemRenderer item={action} index={index} />
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
