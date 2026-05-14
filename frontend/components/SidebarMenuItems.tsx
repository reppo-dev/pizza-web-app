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

interface MenuItem {
  title: string;
  url: string;
  icon: React.ReactNode; // اینو عوض کن
}

interface SidebarMenuItemsProps {
  role: "admin" | "customer";
}

export function SidebarMenuItems({ role }: SidebarMenuItemsProps) {
  const pathname = usePathname();

  const adminMenu: MenuItem[] = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboard className="size-5" />,
    },
    {
      title: "Pizzas",
      url: "/dashboard/pizzas",
      icon: <Pizza className="size-5" />,
    },
    {
      title: "Orders",
      url: "/dashboard/orders",
      icon: <ShoppingCart className="size-5" />,
    },
    {
      title: "Customers",
      url: "/dashboard/customers",
      icon: <Users className="size-5" />,
    },
    {
      title: "Users",
      url: "/dashboard/users",
      icon: <Users className="size-5" />,
    },
    {
      title: "Profile",
      url: "/dashboard/profile",
      icon: <User className="size-5" />,
    },
  ];

  const customerMenu: MenuItem[] = [
    { title: "Pizzas", url: "/pizzas", icon: <Pizza className="size-5" /> },
    {
      title: "Orders",
      url: "/orders",
      icon: <ShoppingCart className="size-5" />,
    },
    {
      title: "Addresses",
      url: "/addresses",
      icon: <MapPin className="size-5" />,
    },
    { title: "Help", url: "/help", icon: <HelpCircle className="size-5" /> },
    { title: "Profile", url: "/profile", icon: <User className="size-5" /> },
  ];

  const menuItems = role === "admin" ? adminMenu : customerMenu;

  const isActive = (url: string) => {
    if (url === "/dashboard" && pathname === "/dashboard") return true;
    if (url !== "/dashboard" && pathname.startsWith(url)) return true;
    return false;
  };

  return (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={isActive(item.url)} size="lg">
            <Link href={item.url} className="flex items-center gap-3">
              {item.icon}
              <span className="text-base">{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
