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
  SidebarSeparator,
} from "@/components/ui/sidebar";
import LogOutButton from "./LogOutButton";

interface MenuItem {
  title: string;
  url: string;
  icon: React.ReactNode;
}

interface SidebarMenuItemsProps {
  role: "admin" | "customer";
}

export function SidebarMenuItems({ role }: SidebarMenuItemsProps) {
  const pathname = usePathname();

  const adminMenu: MenuItem[] = [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: <LayoutDashboard className="size-5" />,
    },
    {
      title: "Pizzas",
      url: "/admin/dashboard/pizzas",
      icon: <Pizza className="size-5" />,
    },
    {
      title: "Cart",
      url: "/admin/dashboard/cart",
      icon: <ShoppingCart className="size-5" />,
    },
    {
      title: "Customers",
      url: "/admin/dashboard/customers",
      icon: <Users className="size-5" />,
    },
    {
      title: "Users",
      url: "/admin/dashboard/users",
      icon: <Users className="size-5" />,
    },
  ];

  const customerMenu: MenuItem[] = [
    {
      title: "Pizzas",
      url: "/customer/pizzas",
      icon: <Pizza className="size-5" />,
    },
    {
      title: "Cart",
      url: "/customer/cart",
      icon: <ShoppingCart className="size-5" />,
    },
    {
      title: "Addresses",
      url: "/customer/addresses",
      icon: <MapPin className="size-5" />,
    },
    { title: "Help", url: "/help", icon: <HelpCircle className="size-5" /> },
    {
      title: "Profile",
      url: "/customer/profile",
      icon: <User className="size-5" />,
    },
  ];

  const menuItems = role === "admin" ? adminMenu : customerMenu;

  const isActive = (url: string) => {
    if (url === "/dashboard" && pathname === "/dashboard") return true;
    if (url !== "/dashboard" && pathname.startsWith(url)) return true;
    return false;
  };

  return (
    <SidebarMenu className="overflow-hidden">
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
      <SidebarSeparator />
      <SidebarMenuItem className="mt-2">
        <SidebarMenuButton asChild>
          <LogOutButton />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
