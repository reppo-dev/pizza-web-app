"use server";

import { AddToCart } from "@/interface";
import axios from "axios";

const GO_API_URL = process.env.GO_API_URL;

export async function getCart() {
  try {
    const cart = await axios.get(`${GO_API_URL}/cart`);

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

export async function addToCart(paylod: AddToCart) {
  try {
    if (
      !paylod.cart_id ||
      !paylod.pizza_id ||
      !paylod.price ||
      !paylod.quantity ||
      !paylod.variant_name
    ) {
      return { success: false, message: "Valid not required" };
    }

    const response = await axios.post(`${GO_API_URL}/addtocart`, paylod);
    console.log(response);

    return {
      success: true,
      message: "success add pizza to cart item",
    };
  } catch {
    return { success: false, message: "Failed added pizza to cart item" };
  }
}
