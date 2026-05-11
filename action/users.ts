// app/actions/register.action.ts
"use server";

import { cookies } from "next/headers";
import { IUser } from "@/interface";

const GO_API_URL = process.env.GO_API_URL || "http://localhost:8080";

export const registerUser = async (payload: Partial<IUser>) => {
  try {
    if (!payload.email || !payload.name || !payload.password) {
      return {
        success: false,
        message:
          "Missing required fields: email, name, and password are mandatory.",
      };
    }

    // 2. Prepare payload (role defaults to "customer" if not provided)
    const body: Record<string, unknown> = {
      email: payload.email,
      name: payload.name,
      password: payload.password,
      role: payload.role || "customer",
    };

    // 3. Call Go backend registration endpoint
    const response = await fetch(`${GO_API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    // 4. Handle backend responses
    if (response.status === 409) {
      return {
        success: false,
        message: "Email already exists.",
      };
    }

    if (response.status === 400) {
      return {
        success: false,
        message: "Invalid request data.",
      };
    }

    if (!response.ok) {
      const errorData = await response.text().catch(() => "Unknown error");
      return {
        success: false,
        message: `Registration failed: ${response.status} ${errorData}`,
      };
    }

    // 5. Extract the JWT token from the Go backend's Set‑Cookie header
    const setCookieHeader = response.headers.get("set-cookie");
    let jwtToken: string | null = null;

    if (setCookieHeader) {
      // Example: "jwt=eyJhbGciOi...; Path=/; Expires=..."
      const match = setCookieHeader.match(/jwt=([^;]+)/);
      if (match) jwtToken = match[1];
    }

    // 6. If no token found, we can't proceed safely – return error
    if (!jwtToken) {
      return {
        success: false,
        message: "Authentication token not received from server.",
      };
    }

    // 7. Set the JWT cookie in the browser via Next.js server utilities
    const cookieStore = await cookies();
    cookieStore.set("jwt", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return {
      success: true,
      message: "Registration successful.",
    };
  } catch (error: unknown) {
    console.error("Registration error:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
};
