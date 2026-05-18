import { Variant } from "@/interface";
import axios from "axios";

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

export async function createVarient(payload: Variant) {
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

export async function getVariant(id: number) {
  try {
    const result = await axios.get(`${GO_API_URL}//getvariant/${id}`);

    return {
      data: result.data,
      success: true,
    };
  } catch {
    return {
      success: false,
      message: "Failed to get variant",
    };
  }
}

export async function updateVariant(payload: Variant, id: number) {
  try {
    if (!payload.type || !payload.price || !payload.pizza_id) {
      return {
        success: false,
        message: "failed to required data",
      };
    }
    const result = await axios.put(
      `${GO_API_URL}/updatevariant/${id}`,
      payload,
    );

    return {
      data: result.data,
      success: true,
    };
  } catch {
    return {
      success: false,
      message: "Failed to update variant",
    };
  }
}

export async function deleteVariant(id: number) {
  try {
    const result = await axios.delete(`${GO_API_URL}/deletevariant/${id}`);

    return {
      success: true,
      message: "delete variant success",
    };
  } catch {
    return {
      success: false,
      message: "Filed to delete variant",
    };
  }
}
