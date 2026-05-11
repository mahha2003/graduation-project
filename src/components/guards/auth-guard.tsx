"use client";

import { useCallback, useEffect, useState } from "react";

import { Client, auth, getToken } from "@/configs/api";
import { useRouter } from "@/i18n/routing";
import { useUserStore } from "@/store/use-user-store";
import decorateToaster from "@/utils/decorate-toaster";

import ClientLoading from "src/components/guards/client-loading";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { setUser, setPermissions } = useUserStore();

  const me = useCallback(async () => {
    await decorateToaster(Client.admin().get<User>("/users/me"), {
      afterSuccess: (response) => {
        setUser(response.data);
        setPermissions(response.data.permissions.map((perm) => perm.code));
        setIsLoading(false);
      },
      disabled: true,
    });
  }, [setUser, setPermissions]);

  useEffect(() => {
    const token = getToken(auth.admin);
    if (!token) {
      router.push("/auth/login");
    } else me();
  }, [me, router]);

  if (isLoading) {
    return <ClientLoading />;
  }
  return children;
}
