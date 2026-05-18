import axios from "axios";

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
