// app/actions/register.action.ts
"use server";

import { cookies } from "next/headers";
import { IUser } from "@/interface";
import axios, { AxiosError } from "axios";

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

    // 2. Prepare payload (role defaults to "customer" if not provided)
    const body: Record<string, unknown> = {
      email: payload.email,
      name: payload.name,
      password: payload.password,
      role: payload.role || "customer",
    };

    // 3. Call Go backend registration endpoint
    const response = await axios.post(`${GO_API_URL}/register`, body);

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
