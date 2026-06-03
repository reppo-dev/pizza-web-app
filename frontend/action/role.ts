"use server";

import axios from "axios";

const GO_API_URL = process.env.GO_API_URL;

export async function allRoles() {
  try {
    const roles = await axios.get(`${GO_API_URL}/allroles`);

    return {
      success: true,
      data: roles.data,
    };
  } catch {
    return {
      success: false,
      message: "Failed get all roles",
    };
  }
}
