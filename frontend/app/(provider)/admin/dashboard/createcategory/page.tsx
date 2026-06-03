"use client";

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createCategory } from "@/action/category";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const categorySchama = z.object({
  name: z.string().min(1, "It cannot be empty"),
  slug: z.string().min(1, "It cannot be empty"),
});

type FormCategorySchama = z.infer<typeof categorySchama>;

const CreateCategory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormCategorySchama>({
    resolver: zodResolver(categorySchama),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  async function onSubmit(data: FormCategorySchama) {
    try {
      setIsLoading(true);
      const result = await createCategory(data);
      if (result.success) {
        toast("Create category success");
        router.push("/admin/dashboard/pizzas");
      } else {
        toast("Failed create category");
        console.log(result.message);
      }
    } catch {
      toast("Somthing wrong");
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
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input className="h-11" {...field} placeholder="name" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="slug"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
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
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isLoading ? "Creating category..." : "Create Categroty"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateCategory;
