"use server";

import { AddToCart } from "@/interface";
import axios from "axios";
import { getToken } from "./token";

const GO_API_URL = process.env.GO_API_URL;

const authHeaders = (token: string) => ({
  Cookie: `jwt=${token}`,
  "Content-Type": "application/json",
});

export async function getCart() {
  try {
    const token = await getToken();
    if (!token) return { success: false, message: "Not authenticated" };

    const cart = await axios.get(`${GO_API_URL}/cart`, {
      headers: authHeaders(token),
    });

    return {
      data: cart.data,
      success: true,
    };
  } catch {
    return {
      success: false,
      message: "Failed get cart",
    };
  }
}

export async function addToCart(
  pizzaId: number,
  varientId: number,
  quantity: number = 1,
) {
  try {
    if (!pizzaId || !varientId || !quantity) {
      return { success: false, message: "Valid not required" };
    }
    const token = await getToken();
    if (!token) return { success: false, message: "Not authenticated" };

    const response = await axios.post(
      `${GO_API_URL}/addtocart`,
      JSON.stringify({ variant_id: varientId, pizza_id: pizzaId, quantity }),
      {
        headers: authHeaders(token),
      },
    );
    console.log(response.data);

    return {
      success: true,
      message: "success add pizza to cart item",
    };
  } catch {
    return { success: false, message: "Failed added pizza to cart item" };
  }
}

export async function updateCartItem(id: number, quantity: number) {
  try {
    const token = await getToken();
    if (!token) return { success: false, message: "Not authenticated" };

    const response = await axios.put(
      `${GO_API_URL}/updatecartitem/${id}`,
      JSON.stringify({ quantity }),
      { headers: authHeaders(token) },
    );

    console.log(response.data);

    return {
      success: true,
      message: "success update quantity",
    };
  } catch {
    return {
      success: false,
      message: "falied update quantity",
    };
  }
}

export async function deleteCartItem(itemId: number) {
  try {
    const token = await getToken();
    if (!token) return { success: false, message: "Not authenticated" };

    const response = await axios.delete(
      `${GO_API_URL}/deletecartitem/${itemId}`,
      {
        headers: authHeaders(token),
      },
    );

    console.log(response.data);
    return {
      success: true,
      message: "cart item deleted",
    };
  } catch {
    return {
      success: false,
      message: "failed delete cart item",
    };
  }
}
