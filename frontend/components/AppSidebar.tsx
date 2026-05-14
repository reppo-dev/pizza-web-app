import * as React from "react";
import { GalleryVerticalEnd } from "lucide-react";
import { cookies } from "next/headers";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SidebarMenuItems } from "./SidebarMenuItems";
import Link from "next/link";

// تابع برای خوندن نقش کاربر از توکن JWT
async function getUserRole(): Promise<"admin" | "customer"> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt")?.value;

    if (!token) return "customer";

    //decode کردن دستی بخش payload توکن
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString(),
    );

    return payload.role === "admin" ? "admin" : "customer";
  } catch {
    return "customer";
  }
}

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const role = await getUserRole();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={"/"}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Pizza Store</span>
                  <span className="text-xs text-muted-foreground">
                    {role === "admin" ? "admin panel" : "customer"}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* محتوای اصلی سایدبار - آیتم‌های منو */}
      <SidebarContent>
        <SidebarMenuItems role={role} />
      </SidebarContent>

      {/* فوتر سایدبار - نشون دادن نقش کاربر */}
      <SidebarFooter>
        <div className="p-4 text-xs text-muted-foreground">
          <p>
            ورود به عنوان{" "}
            <span className="font-medium">
              {role === "admin" ? "admin" : "customer"}
            </span>
          </p>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
