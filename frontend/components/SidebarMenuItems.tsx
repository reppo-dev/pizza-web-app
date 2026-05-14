"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Pizza,
  ShoppingCart,
  Users,
  User,
  MapPin,
  HelpCircle,
} from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// تایپ برای آیتم‌های منو
interface MenuItem {
  title: string;
  url: string;
  icon: React.ElementType;
}

// پراپ‌های کامپوننت
interface SidebarMenuItemsProps {
  role: "admin" | "customer";
}

export function SidebarMenuItems({ role }: SidebarMenuItemsProps) {
  const pathname = usePathname();

  // منوی ادمین
  const adminMenu: MenuItem[] = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Pizzas",
      url: "/dashboard/pizzas",
      icon: Pizza,
    },
    {
      title: "Orders",
      url: "/dashboard/orders",
      icon: ShoppingCart,
    },
    {
      title: "Customers",
      url: "/dashboard/customers",
      icon: Users,
    },
    {
      title: "Users",
      url: "/dashboard/users",
      icon: Users,
    },
    {
      title: "Profile",
      url: "/dashboard/profile",
      icon: User,
    },
  ];

  // منوی مشتری
  const customerMenu: MenuItem[] = [
    {
      title: "Pizzas",
      url: "/pizzas",
      icon: Pizza,
    },
    {
      title: "Orders",
      url: "/orders",
      icon: ShoppingCart,
    },
    {
      title: "Addresses",
      url: "/addresses",
      icon: MapPin,
    },
    {
      title: "Help",
      url: "/help",
      icon: HelpCircle,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: User,
    },
  ];

  // انتخاب منو بر اساس نقش کاربر
  const menuItems = role === "admin" ? adminMenu : customerMenu;

  // چک کردن فعال بودن آیتم
  const isActive = (url: string) => {
    if (url === "/dashboard" && pathname === "/dashboard") return true;
    if (url !== "/dashboard" && pathname.startsWith(url)) return true;
    return false;
  };

  return (
    <SidebarMenu>
      {menuItems.map((item) => {
        const Icon = item.icon;
        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild isActive={isActive(item.url)}>
              <Link href={item.url}>
                <Icon className="size-4" />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
