"use server";

import axios from "axios";
import { cookies } from "next/headers";

const GO_API_URL = process.env.GO_API_URL;

export async function logout() {
  try {
    const response = await axios.post(
      `${GO_API_URL}/logout`,
      {},
      {
        withCredentials: true,
      },
    );
    const cookieStore = await cookies();
    cookieStore.delete("jwt");
    console.log("Logout response:", response.data);

    return { success: true, message: "Logout success" };
  } catch {
    return {
      success: false,
      message: "Somthing want wrong, you can't logout",
    };
  }
}
