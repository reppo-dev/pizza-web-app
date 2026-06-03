"use server";

import axios from "axios";
import { getToken } from "./token";
import { InfoUser } from "@/interface";

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
export async function getUser() {
  try {
    const token = await getToken();

    const users = await axios.get(`${GO_API_URL}/getuser`, {
      headers: { Cookie: `jwt=${token}` },
    });

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

export async function updateUser(payload: InfoUser) {
  try {
    const token = await getToken();

    const response = await axios.put(`${GO_API_URL}/updateuser`, payload, {
      headers: { Cookie: `jwt=${token}` },
    });

    return {
      success: true,
      message: "Success update user",
    };
  } catch {
    return {
      success: false,
      message: "Failed update user",
    };
  }
}

export async function getUserId() {
  try {
    const token = await getToken();

    const users = await axios.get(`${GO_API_URL}/getuser`, {
      headers: { Cookie: `jwt=${token}` },
    });

    return users.data.ID;
  } catch {
    return {
      success: false,
      message: "Failed get users",
    };
  }
}

export async function updateUserById(payload: InfoUser, id: number) {
  try {
    const response = await axios.put(
      `${GO_API_URL}/updateuseryid/${id}`,
      payload,
    );

    return {
      success: true,
      message: "Success update user",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed update user",
    };
  }
}
