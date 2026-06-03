"use client";

import { s3UploadAction } from "@/action/s3BucketAction";
import { getUser, updateUser } from "@/action/user";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InfoUser } from "@/interface";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const userSchema = z.object({
  name: z.string(),
  image: z.string(),
  email: z.string(),
  role_id: z.number(),
});

type FormUserSchema = z.infer<typeof userSchema>;

const EditProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isImagePath, setIsImagePath] = useState(``);
  const route = useRouter();

  const form = useForm<FormUserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      image: "",
      name: "",
      role_id: 1,
    },
  });

  const uploadImage: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const data = new FormData();
    data.set("file", file);
    const result = await s3UploadAction(data);
    const fullUrl = result.imagePath as string;

    if (result.success) {
      setIsImagePath(result.imagePath);
      form.setValue("image", fullUrl);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUser();

      console.log("response", response);

      if (!response.success) {
        console.log("request failed");
        return;
      }
      const user: InfoUser = response.data;
      console.log(user);
      form.reset({
        email: user.email,
        image: user.image || "",
        name: user.name,
        role_id: user.role_id,
      });
    };

    fetchUser();
  }, []);

  const submit = async (data: FormUserSchema) => {
    setIsLoading(true);
    try {
      const response = await updateUser(data);

      console.log(response);
      toast.success("Success update user");
      route.push("/customer/profile");
    } catch {
      toast.error("Failed update usere");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="min-w-xl">
        <CardHeader>Edite profile</CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)}>
              <FieldGroup>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold text-primary">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="email"
                          {...field}
                          className="w-full h-11"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold text-primary">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="name"
                          {...field}
                          className="w-full h-11"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Upload new image
                  </label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={uploadImage}
                    disabled={isLoading}
                  />
                  {isImagePath && (
                    <div className="mt-2">
                      <p className="text-sm text-green-600">
                        Image uploaded successfully!
                      </p>
                      <Image
                        src={isImagePath}
                        alt="New"
                        width={32}
                        height={32}
                        className="w-32 h-32 object-cover mt-1 rounded border"
                      />
                    </div>
                  )}
                </div>
                <Button disabled={isLoading}>
                  {isLoading ? "Updating ..." : "update"}
                </Button>
              </FieldGroup>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProfile;
