"use client";

import { createAddress } from "@/action/address";
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const addressSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  phone: z.string().min(1, "Phone number is required"),
  province: z.string().min(1, "Province is required"),
  city: z.string().min(1, "City is required"),
  street: z.string().min(1, "Street is required"),
  apartment: z.string().min(1, "Apartment is required"),
  postal_code: z.string().min(1, "Postal code is required"),
  delivery_notes: z.string().min(1, "Delivery notes are required"),
});

type FormAddressSchema = z.infer<typeof addressSchema>;

const AddAddress = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormAddressSchema>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      full_name: "",
      city: "",
      apartment: "",
      delivery_notes: "",
      phone: "",
      postal_code: "",
      province: "",
      street: "",
    },
  });

  const onSubmit = async (data: FormAddressSchema) => {
    setIsLoading(true);
    await createAddress(data);

    toast.success("success create address");
    setIsLoading(false);
    redirect("/customer/addresses");
  };

  return (
    <div className="block md:flex items-center justify-center">
      <Card className="md:min-w-xl ">
        <CardHeader>Add Address</CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold text-primary">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="your name"
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold text-primary">
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="phone number"
                          {...field}
                          className="h-11"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="province"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold text-primary">
                        Province
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="province"
                          {...field}
                          className="h-11"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold text-primary">
                        City
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="city"
                          {...field}
                          className="h-11"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="text-base font-semibold text-primary">
                        Street
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="street"
                          {...field}
                          className="h-11"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="apartment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold text-primary">
                        Apartment
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="apartment"
                          {...field}
                          className="h-11"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="postal_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold text-primary">
                        Postal Code
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="postal code"
                          {...field}
                          className="h-11"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="delivery_notes"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="text-base font-semibold text-primary">
                        Delivery Notes
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="delivery notes"
                          {...field}
                          className="h-11"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="col-span-2"
                >
                  {isLoading ? "Creating ..." : "Create Address"}
                </Button>
              </FieldGroup>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddAddress;
