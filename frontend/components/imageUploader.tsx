"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { uploadImage } from "@/action/image";
import Image from "next/image";

interface ImageUploaderProps {
  onUploadComplete: (url: string) => void; // ← این پراپ جدید را اضافه کن
  currentImage?: string; // اگر فرم ویرایش داشت، تصویر قبلی را می‌توانی نمایش دهی
}

export function ImageUploader({
  onUploadComplete,
  currentImage,
}: ImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string>(currentImage || "");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("فقط فایل‌های تصویری مجاز هستند");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("حجم فایل نباید بیشتر از ۵ مگابایت باشد");
      return;
    }

    setIsUploading(true);

    const result = await uploadImage(file);
    setIsUploading(false);

    if (result.success && result.urls) {
      const uploadedUrl = result.urls[0];
      setPreviewUrl(uploadedUrl); // پیش‌نمایش را بروز کن
      onUploadComplete(uploadedUrl); // ← والد را خبر کن
    } else {
      alert(result.error || "خطا در آپلود فایل");
    }
  };

  return (
    <div className="space-y-4">
      <Input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={isUploading}
      />
      {isUploading && (
        <p className="text-sm text-muted-foreground">در حال آپلود...</p>
      )}
      {previewUrl && (
        <div>
          <p className="text-sm mb-2">پیش‌نمایش:</p>
          <Image
            src={previewUrl}
            alt="Uploaded"
            className="w-48 h-48 object-cover rounded-lg border"
          />
          <p className="text-xs text-muted-foreground mt-1 break-all">
            {previewUrl}
          </p>
        </div>
      )}
    </div>
  );
}
