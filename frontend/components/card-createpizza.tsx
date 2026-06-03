"use client";

import z from "zod";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChangeEventHandler, useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import { createPizza } from "@/action/pizza";
import { toast } from "sonner";
import { Label } from "./ui/label";
import { allCategory } from "@/action/category";
import { s3UploadAction } from "@/action/s3BucketAction";
import Image from "next/image";
import { FieldGroup } from "./ui/field";
import { useRouter } from "next/navigation";

const pizzaSchama = z.object({
  name: z.string().min(2, ""),
  description: z.string().min(10, ""),
  image: z.string(),
  status: z.string(),
  category_id: z.array(z.number()).min(1, "Select at least one category"),
});

type FromPizzaSchama = z.infer<typeof pizzaSchama>;

const CartCreatePizza = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategories, setSelectedCategory] = useState<number[]>([]);
  const [categories, setCategories] = useState<{ ID: number; name: string }[]>(
    [],
  );
  const [isImagePath, setIsImagePath] = useState(``);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await allCategory();
      setCategories(Array.isArray(data) ? data : []);
    };
    fetchCategories();
  }, []);

  const form = useForm<FromPizzaSchama>({
    resolver: zodResolver(pizzaSchama),
    defaultValues: {
      name: "",
      description: "",
      image: "",
      category_id: [],
      status: "",
    },
  });

  const handleCategoryToggle = (id: number) => {
    setSelectedCategory((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  useEffect(() => {
    form.setValue("category_id", selectedCategories, { shouldDirty: true });
  }, [selectedCategories]);

  const uploadImage: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.set("file", file);
    const result = await s3UploadAction(data);
    const fullUrl = result.imagePath as string;

    if (result.success) {
      setIsImagePath(result.imagePath!);
      form.setValue("image", fullUrl);
    }
  };

  async function onSubmit(data: FromPizzaSchama) {
    try {
      setIsLoading(true);
      const result = await createPizza(data);

      toast("Create Pizza success");
      form.reset();
      setSelectedCategory([]);
      setIsImagePath("");
      router.push("/admin/dashboard/pizzas");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center">
      <Card className=" w-2xl">
        <CardHeader>Create Pizza</CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <div className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            className="h-11"
                            {...field}
                            placeholder="name"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="description"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            className="h-11"
                            {...field}
                            placeholder="description"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="status"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <Input
                            className="h-11"
                            {...field}
                            placeholder="description"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Categories
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {categories.map((cat) => (
                        <label key={cat.ID} className="flex items-center gap-1">
                          <Input
                            type="checkbox"
                            value={cat.ID}
                            checked={selectedCategories.includes(cat.ID)}
                            onChange={() => handleCategoryToggle(cat.ID)}
                          />
                          {cat.name}
                        </label>
                      ))}
                    </div>
                    {selectedCategories.length === 0 && (
                      <p className="text-sm text-red-500 mt-1">
                        Select at least one category
                      </p>
                    )}
                  </div>
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
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isLoading ? "Creating pizza..." : "Create Pizza"}
                  </Button>
                </div>
              </FieldGroup>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CartCreatePizza;
