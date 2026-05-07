"use client";

import { useState } from "react";

import { useTranslations } from "next-intl";

import { BaseDialog } from "@/components/dialog/base/base-dialog";
import { Button } from "@/components/ui/button";
import { Client, auth } from "@/configs/api";
import { useRouter } from "@/i18n/routing";
import { useUserStore } from "@/store/use-user-store";
import decorateToaster from "@/utils/decorate-toaster";

interface SignOutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SignOutDialog({ open, onOpenChange }: SignOutDialogProps) {
  const t = useTranslations();
  const router = useRouter();
  const { clearUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);

    const action = Client.admin().post("/logout");

    await decorateToaster(action, {
      afterSuccess: () => {
        clearUser();
        if (typeof window !== "undefined") {
          sessionStorage.removeItem(auth.user);
        }
        const currentPath = location.href;
        router.push({
          pathname: "/auth/login",
          query: { redirect: currentPath },
        });
      },
      successMessage: t("Signed out successfully"),
      errorMessage: t("Failed to sign out Please try again"),
      afterFinally: () => {
        setIsLoading(false);
        onOpenChange(false);
      },
    });
  };

  const handleClose = () => {
    if (!isLoading) {
      onOpenChange(false);
    }
  };

  return (
    <BaseDialog
      title={t("Sign out")}
      isOpen={open}
      onClose={handleClose}
      size="sm"
      preventCloseOnOutsideClick={isLoading}
      actionButtons={
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            {t("Cancel")}
          </Button>
          <Button
            variant="destructive"
            onClick={handleSignOut}
            disabled={isLoading}
          >
            {isLoading ? `${t("Signing out")}...` : t("Sign out")}
          </Button>
        </div>
      }
    >
      <p className="text-muted-foreground py-2 text-sm">
        {t(
          "Are you sure you want to sign out? You will need to sign in again to access your account"
        )}
        .
      </p>
    </BaseDialog>
  );
}
