"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useSidebar } from "@/components/ui/sidebar";

export function AutoCloseSidebar() {
  const pathname = usePathname();
  const { setOpen } = useSidebar();

  useEffect(() => {
    setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null; // هیچ چیزی رندر نمی‌کنه
}
