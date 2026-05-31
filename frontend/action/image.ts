"use server";

import axios from "axios";

const GO_API_URL = process.env.GO_API_URL;

interface UploadResponse {
  success: boolean;
  urls?: string[];
  error?: string;
}

export async function uploadImage(file: File): Promise<UploadResponse> {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const result = await axios.post(`${GO_API_URL}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return result.data;
  } catch {
    return {
      success: false,
      error: "Failed to upload image",
    };
  }
}
