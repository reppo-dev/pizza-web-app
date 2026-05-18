import { Category } from "@/interface";
import axios from "axios";
import { success } from "zod";

const GO_API_URL = process.env.GO_API_URL;

export async function allCategory() {
  try {
    const result = await axios.get(`/${GO_API_URL}/allcategory`);

    return {
      success: true,
      data: result.data,
    };
  } catch {
    return {
      success: false,
      message: "Filed get all category",
    };
  }
}

export async function getCategory(id: number) {
  try {
    const result = await axios.get(`${GO_API_URL}/getcategory/${id}`);

    return {
      success: true,
      data: result.data,
    };
  } catch {
    return {
      success: false,
      message: "Filed to get category",
    };
  }
}

export async function createCategory(payload: Category) {
  try {
    if (!payload.name || !payload.slug) {
      return {
        success: false,
        message: "Filed required data",
      };
    }

    const result = await axios.post(`${GO_API_URL}/createcategory`, payload);

    return {
      data: result.data,
      success: true,
    };
  } catch {
    return {
      success: false,
      message: "Filed create category",
    };
  }
}
