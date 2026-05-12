import { cookies } from "next/headers";
import axios, { AxiosError } from "axios";

const GO_API_URL = process.env.GO_API_URL;

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

    const response = await axios.get(`${GO_API_URL}/getuser`, {
      headers: {
        Cookie: `jwt=${token}`,
      },
      // اگر بک‌اند شما CORS تنظیم کرده با withCredentials، نیاز نیست چون درخواست سرور به سرور است
    });

    if (response.status === 200 && response.data) {
      return {
        success: true,
        user: response.data, // فرض می‌کنیم بک‌اند اطلاعات کاربر را در data برگرداند
      };
    }

    return {
      success: false,
      message: "Failed to fetch user data",
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
