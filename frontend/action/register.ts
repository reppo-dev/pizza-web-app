"use server";

import { IUser } from "@/interface";
import axios from "axios";

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
    const response = await axios.post(`${GO_API_URL}/register`, body, {
      withCredentials: true,
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
