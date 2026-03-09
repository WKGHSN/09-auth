"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, [router]);

  return <>{children}</>;
}
