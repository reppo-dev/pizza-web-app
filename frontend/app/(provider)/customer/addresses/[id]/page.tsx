"use client";

import { getAddress, updateAddress } from "@/action/address";
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
import { Address } from "@/interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

const AddressDetailes = () => {
  const params = useParams();
  const addressId = parseInt(params.id as string);
  const router = useRouter();

  console.log(addressId);
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

  useEffect(() => {
    const fetchAddress = async () => {
      const response = await getAddress(addressId);
      const data: Address = response.data;

      form.reset({
        full_name: data.full_name,
        phone: data.phone,
        province: data.province,
        city: data.city,
        street: data.street,
        apartment: data.apartment,
        postal_code: data.postal_code,
        delivery_notes: data.delivery_notes,
      });
    };
    fetchAddress();
  }, [addressId]);

  const Submit = async (data: FormAddressSchema) => {
    try {
      setIsLoading(true);
      const response = await updateAddress(data, addressId);
      if (response.success) {
        toast.success("Update address success");
        router.push("/customer/addresses");
      } else {
        toast.error(response.message);
      }
    } catch {
      toast.error("Failed update address");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="block md:flex items-center justify-center">
      <Card className="md:min-w-xl ">
        <CardHeader>Add Address</CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(Submit)}>
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

export default AddressDetailes;
