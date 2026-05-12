"use server";

import { cookies } from "next/headers";
import axios, { AxiosError } from "axios";

export const validateJwtTokenAndGetUser = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt")?.value;

    if (!token) {
      return {
        success: false,
        message: "No authentication token found",
      };
    }

    const response = await axios.get(`http://localhost:8000/getuser`, {
      headers: {
        Cookie: `jwt=${token}`,
      },
    });

    return {
      success: true,
      user: response.data,
    };
  } catch (error) {
    console.error("validateJwtTokenAndGetUser error:", error);

    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        return {
          success: false,
          message: "Invalid or expired token",
        };
      }
      if (error.response?.status === 404) {
        return {
          success: false,
          message: "User not found",
        };
      }
      return {
        success: false,
        message: error.response?.data?.message || "Server error",
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};
