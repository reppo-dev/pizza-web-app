import * as React from "react";
import { GalleryVerticalEnd, HelpCircle, Pizza } from "lucide-react";

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
import { getToken, validateJwtTokenAndGetUser } from "@/action/token";
import Link from "next/link";

async function getUserRole(): Promise<"admin" | "customer"> {
  try {
    const user = await validateJwtTokenAndGetUser();
    const roleId = user.user.role_id;

    if (roleId === 2) return "admin";
    return "customer";
  } catch {
    return "customer";
  }
}

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const role = await getUserRole();
  const token = await getToken();

  const menuItem = [
    { title: "Pizzas", url: "/pizzas", icon: <Pizza className="size-5" /> },
    { title: "Help", url: "/help", icon: <HelpCircle className="size-5" /> },
  ];

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
                {token && (
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-medium">Pizza Store</span>
                    <span className="text-xs text-muted-foreground">
                      {role === "admin" ? "admin panel" : "customer"}
                    </span>
                  </div>
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="ml-2">
        {token ? (
          <SidebarMenuItems role={role} />
        ) : (
          menuItem.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild size="lg">
                <Link href={item.url} className="flex items-center gap-3">
                  {item.icon}
                  <span className="text-base">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))
        )}
      </SidebarContent>

      <SidebarFooter>
        <div className="p-4 text-xs text-muted-foreground">
          <p>
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
