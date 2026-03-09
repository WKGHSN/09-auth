"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";
import { checkMe, checkSession } from "@/lib/api/clientApi";
interface Props {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    const fetchUser = async () => {
      const session = await checkSession();
      if (session) {
        const user = await checkMe();
        if (user) setAuth(user);
      } else {
        clearAuth();
      }
    };
    fetchUser();
  }, [setAuth, clearAuth]);

  return <>{children}</>;
}
