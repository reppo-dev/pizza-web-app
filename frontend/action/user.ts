"use server";

import axios from "axios";

const GO_API_URL = process.env.GO_API_URL;

export async function allUser() {
  try {
    const users = await axios.get(`${GO_API_URL}/users`);

    return {
      success: true,
      data: users.data,
    };
  } catch {
    return {
      success: false,
      message: "Failed get users",
    };
  }
}

export async function getInfoUser(id: number) {
  try {
    const users = await axios.get(`${GO_API_URL}/user/${id}`);

    return {
      success: true,
      data: users.data,
    };
  } catch {
    return {
      success: false,
      message: "Failed get users",
    };
  }
}
