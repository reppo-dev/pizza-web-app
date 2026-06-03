"use server";

import { CreatePizza } from "@/interface";
import axios from "axios";

const GO_API_URL = process.env.GO_API_URL;

export async function getAllPizzas() {
  try {
    const result = await axios.get(`${GO_API_URL}/allpizza`);

    return { data: result.data, success: true };
  } catch {
    return {
      success: false,
      message: "we can't to get all pizzas",
    };
  }
}

export async function createPizza(payload: CreatePizza) {
  try {
    if (
      !payload.name ||
      !payload.description ||
      !payload.image ||
      !payload.status
    ) {
      return {
        success: false,
        message: "failed to required all data!!!",
      };
    }

    const result = await axios.post(`${GO_API_URL}/createpizza`, payload);

    return {
      success: true,
      data: result,
    };
  } catch {
    return {
      success: false,
      message: "failed to create pizza",
    };
  }
}

export async function updatePizza(payload: CreatePizza, id: number) {
  try {
    if (
      !payload.name ||
      !payload.description ||
      !payload.image ||
      !payload.status
    ) {
      return {
        success: false,
        message: "failed to required all data!!!", //my english ha ha ha :/    this project for trayning
      };
    }

    const result = await axios.put(`${GO_API_URL}/updatepizza/${id}`, payload);

    return {
      success: true,
      message: "update pizza success",
    };
  } catch {
    return {
      success: false,
      message: "we cant updating your pizza",
    };
  }
}

export async function deletePizza(id: number) {
  try {
    const result = await axios.delete(`${GO_API_URL}/deletepizza/${id}`);

    return {
      success: true,
      message: "pizza deleted",
    };
  } catch {
    return {
      success: false,
      message: "we can't delete your pizza",
    };
  }
}
