"use server";

import { IUser } from "@/interface";
import axios from "axios";
import { cookies } from "next/headers";

const GO_API_URL = process.env.GO_API_URL;

export const registerUser = async (payload: Partial<IUser>) => {
  try {
    if (!payload.email || !payload.name || !payload.password) {
      return {
        success: false,
        message:
          "Missing required fields: email, name, and password are mandatory.",
      };
    }

    const body: Record<string, unknown> = {
      email: payload.email,
      name: payload.name,
      password: payload.password,
    };

    // 3. Call Go backend registration endpoint
    const response = await axios.post(`${GO_API_URL}/register`, body);

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

    const cookieStore = await cookies();
    cookieStore.set("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return { success: true, message: "Login successful." };
  } catch (error: unknown) {
    console.error("Registration error:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
};
