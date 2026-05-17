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
