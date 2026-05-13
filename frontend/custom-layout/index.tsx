"use client";

import { ReactNode } from "react";
import { useUserStore } from "@/store/user-store";
import { useEffect, useRef } from "react";
import { User } from "@/interface";
import Header from "@/components/Header";

interface CustomLayoutProps {
  children: ReactNode;
  initialUser: User | null;
}

export default function CustomLayout({
  children,
  initialUser,
}: CustomLayoutProps) {
  const { setUser } = useUserStore();
  const hasSet = useRef(false);

  useEffect(() => {
    if (!hasSet.current && initialUser) {
      setUser(initialUser);
      hasSet.current = true;
    }
  }, [initialUser, setUser]);

  return (
    <>
      <Header />
      {children}
    </>
  );
}
