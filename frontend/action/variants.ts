import { Variant } from "@/interface";
import axios from "axios";
import { success } from "zod";

const GO_API_URL = process.env.GO_API_URL;

export async function getAllVariants() {
  try {
    const result = await axios.get(`${GO_API_URL}/allvariant`);

    return {
      data: result.data,
      success: true,
    };
  } catch {
    return {
      success: false,
      message: "Failed get add variant",
    };
  }
}

export async function getVarient(payload: Variant) {
  try {
    if (!payload.type || !payload.price || !payload.pizza_id) {
      return {
        success: false,
        message: "failed to required data",
      };
    }

    const result = await axios.post(`${GO_API_URL}/createvariant`, payload);

    return {
      data: result.data,
      success: true,
    };
  } catch {
    return {
      success: false,
      message: "Failed to create variant",
    };
  }
}
