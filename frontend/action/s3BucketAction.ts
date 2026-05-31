"use server";

import { s3Client } from "@/lib/s3Client";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function s3UploadAction(data: FormData) {
  const file: File | null = data.get("file") as File;
  if (!file) throw new Error("no file");

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const uniqueName = `${Date.now}_${file.name}`;

  const params = {
    Body: buffer,
    Bucket: process.env.PARSPACK_BUCKET_NAME,
    Key: uniqueName,
    ContentType: file.type,
  };

  try {
    await s3Client.send(new PutObjectCommand(params));

    const imageUrl = `${process.env.PARSPACK_ENDPOINT}/${process.env.PARSPACK_BUCKET_NAME}/${uniqueName}`;

    return { success: true as const, imagePath: imageUrl };
  } catch (error) {
    return {
      success: false as const,
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
}
