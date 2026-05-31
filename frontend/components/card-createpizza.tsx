"use client";

import z from "zod";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import { createPizza } from "@/action/pizza";
import { toast } from "sonner";
import { Label } from "./ui/label";
import { allCategory } from "@/action/category";

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
  const [selectedCategory, setSelectedCategory] = useState<number[]>([]);
  const [category, setCategory] = useState<{ ID: number; name: string }[]>();

  useEffect(() => {
    const fetchData = async () => {
      const resut = await allCategory();
      setCategory(Array.isArray(resut.data) ? resut.data : []);
    };
    fetchData();
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
    form.setValue("category_id", selectedCategory);
  }, [selectedCategory, form]);

  async function onSubmit(data: FromPizzaSchama) {
    try {
      setIsLoading(true);
      const result = await createPizza(data);
      if (result.success) {
        toast("Create Pizza success");
      } else {
        toast("Failed create pizza");
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
                  <Label>Catrgories</Label>
                  <div className="flex flex-wrap gap-3">
                    {category?.map((cat) => (
                      <Label key={cat.ID}>
                        <Input
                          type="checkbox"
                          value={cat.ID}
                          checked={selectedCategory.includes(cat.ID)}
                          onChange={() => handleCategoryToggle(cat.ID)}
                        />
                      </Label>
                    ))}
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isLoading ? "Creating account..." : "Sign Up"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CartCreatePizza;
