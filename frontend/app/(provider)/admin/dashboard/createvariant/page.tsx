"use client";

import { getAllPizzas } from "@/action/pizza";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Pizza } from "@/interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { toast } from "sonner";
import Image from "next/image";
import { createVarient } from "@/action/variants";

const variantSchama = z.object({
  type: z.string().min(1, "It cannot be empty"),
  price: z.number().min(1, "It cannot be empty"),
  pizza_id: z.number().min(1, "Please select one pizza"),
});

type FormVariantSchama = z.infer<typeof variantSchama>;

const CreateVariant = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pizzas, setPizzas] = useState<Pizza[]>([]);

  useEffect(() => {
    const fetchPizza = async () => {
      const result = await getAllPizzas();
      setPizzas(Array.isArray(result.data) ? result.data : []);
    };
    fetchPizza();
  }, []);

  const form = useForm<FormVariantSchama>({
    resolver: zodResolver(variantSchama),
    defaultValues: {
      type: "",
      price: 0,
      pizza_id: 0,
    },
  });

  const onSubmit = async (data: FormVariantSchama) => {
    try {
      setIsLoading(true);
      const result = await createVarient(data);

      toast("Variant created successfully");
    } catch {
      toast("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <Card className="w-2xl">
              <CardHeader>Create Variant</CardHeader>
              <CardContent className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <Input
                          className="h-11"
                          {...field}
                          placeholder="e.g. Large, Small, Medium"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="price"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          className="h-11"
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value) || 0)
                          }
                          placeholder="Price in Toman"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* انتخاب پیتزا - فقط یک عدد */}
            <Card className="w-2xl">
              <CardHeader>Select Pizza</CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="pizza_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Choose one pizza</FormLabel>
                      <FormControl>
                        <div className="flex flex-wrap gap-3">
                          {pizzas.map((pizza) => (
                            <label
                              key={pizza.ID}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <Input
                                type="radio"
                                name="pizza_id"
                                value={pizza.ID}
                                checked={field.value === pizza.ID}
                                onChange={() => field.onChange(pizza.ID)}
                                className="w-4 h-4"
                              />
                              <Image
                                src={pizza.image}
                                alt={pizza.name}
                                width={32}
                                height={32}
                              />
                              {pizza.name}
                            </label>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isLoading ? "Creating..." : "Create Variant"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateVariant;
