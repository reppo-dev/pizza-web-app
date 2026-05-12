"use server";

import { LoginUser } from "@/interface";
import axios from "axios";
import { cookies } from "next/headers";

const GO_API_URL = process.env.GO_API_URL;

export const loginAction = async (paylod: Partial<LoginUser>) => {
  try {
    if (!paylod.email || !paylod.password) {
      return {
        success: false,
        message: "Missing required fields: email, and password are mandatory.",
      };
    }
    const body: Record<string, unknown> = {
      email: paylod.email,
      password: paylod.password,
    };

    const response = await axios.post(`${GO_API_URL}/login`, body);

    let token = response.data?.token;
    if (!token) {
      const setCookie = response.headers["set-cookie"];
      if (setCookie && Array.isArray(setCookie)) {
        const jwtCookie = setCookie.find((c) => c.startsWith("jwt="));
        if (jwtCookie) {
          token = jwtCookie.split(";")[0].split("=")[1];
        }
      }
    }

    if (!token) {
      return { success: false, message: "No token received from server." };
    }

    // 3. تنظیم کوکی در مرورگر (از طریق پاسخ Server Action)
    const cookieStore = await cookies();
    cookieStore.set("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 روز
    });

    return { success: true, message: "Login successful." };
  } catch (error: unknown) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
};
