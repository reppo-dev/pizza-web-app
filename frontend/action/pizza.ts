import { CreatePizza } from "@/interface";
import axios from "axios";
import { success } from "zod";

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
        message: "failed to required all data!!!", //my english ha ha ha :/    this project for trayning
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
