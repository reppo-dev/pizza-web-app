"use server";

import { LoginUser } from "@/interface";
import axios from "axios";

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
