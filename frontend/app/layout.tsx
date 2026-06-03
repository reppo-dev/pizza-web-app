import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { getToken } from "@/action/token";
import { AutoCloseSidebar } from "@/components/AutoCloseSidebar";
import { GlobalSpinner } from "./globalSpinner";
import { Toaster } from "@/components/ui/sonner";
import { getUserId } from "@/action/user";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next Pitza Delivery",
  description: "Next.js Pizza Delivery App build",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider defaultOpen={false}>
          <AutoCloseSidebar />
          <AppSidebar />
          <main className="w-full">
            <GlobalSpinner /> {children}
            <Toaster />
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
