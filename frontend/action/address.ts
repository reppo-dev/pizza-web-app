"use server";

import { InfoAddress } from "@/interface";
import axios from "axios";
import { getToken } from "./token";

const GO_API_URL = process.env.GO_API_URL;

export async function allAddress() {
  try {
    const token = await getToken();

    const result = await axios.get(`${GO_API_URL}/getalladdress`, {
      headers: { Cookie: `jwt=${token}` },
    });

    return {
      success: true,
      data: result.data,
    };
  } catch {
    return {
      success: false,
      message: "Failed get all address",
    };
  }
}

export async function allAddressById(id: number) {
  try {
    const result = await axios.get(`${GO_API_URL}/getaddressbyid/${id}`);
    console.log(result.data);

    return {
      success: true,
      data: result.data,
    };
  } catch {
    return {
      success: false,
      message: "Failed get all address",
    };
  }
}

export async function getAddress(id: number) {
  try {
    const token = await getToken();

    const result = await axios.get(`${GO_API_URL}/getaddress/${id}`, {
      headers: { Cookie: `jwt=${token}` },
    });

    return {
      success: true,
      data: result.data,
    };
  } catch {
    return {
      success: false,
      message: "Failed get address",
    };
  }
}

export async function createAddress(payload: InfoAddress) {
  try {
    const token = await getToken();

    const response = await axios.post(`${GO_API_URL}/createaddress`, payload, {
      headers: { Cookie: `jwt=${token}` },
    });

    console.log(response.data);
    return {
      success: true,
      message: "Success create address",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed create address",
    };
  }
}

export async function updateAddress(payload: InfoAddress, id: number) {
  try {
    const token = await getToken();

    const response = await axios.put(
      `${GO_API_URL}/updateaddress/${id}`,
      payload,
      {
        headers: { Cookie: `jwt=${token}` },
      },
    );

    console.log(response.data);
    return {
      success: true,
      message: "Success update address",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed update address",
    };
  }
}

export async function deleteAddress(id: number) {
  try {
    const token = await getToken();

    await axios.delete(`${GO_API_URL}/deleteaddress/${id}`, {
      headers: { Cookie: `jwt=${token}` },
    });

    return {
      success: true,
      message: "Success delete  address",
    };
  } catch {
    return {
      success: false,
      message: "Failed delete address",
    };
  }
}
