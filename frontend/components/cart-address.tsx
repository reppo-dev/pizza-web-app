"use client";
import { Address } from "@/interface";
import { Card, CardAction, CardContent, CardHeader } from "./ui/card";
import Link from "next/link";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { deleteAddress } from "@/action/address";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CartAddress {
  cartAddress: Address[];
}

const CartAddress = ({ cartAddress }: CartAddress) => {
  const route = useRouter();
  if (!cartAddress) {
    return (
      <Card>
        <CardContent>No address found. Please add an address.</CardContent>
      </Card>
    );
  }

  const removeHandller = async (id: number) => {
    try {
      const response = await deleteAddress(id);

      if (response.success) {
        toast.success("Success remove address");
        route.refresh();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed remive address");
      route.refresh();
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-4">
      <>
        {cartAddress.map((item) => (
          <Card key={item.ID}>
            <CardHeader>
              <CardAction>
                <Button
                  onClick={() => removeHandller(item.ID)}
                  className="rounded-full cursor-pointer"
                  variant={"destructive"}
                >
                  <Trash />
                </Button>
              </CardAction>
            </CardHeader>
            <Link href={`/customer/addresses/${item.ID}`}>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  Name: {item.full_name}
                  <span>Apartment: {item.apartment}</span>
                  <span>City: {item.city}</span>
                  <span>Phone: {item.phone}</span>
                  <span>Postal Code: {item.postal_code}</span>
                  <span>Province: {item.province}</span>
                  <span>Street: {item.street}</span>
                  <span>Delivery Notes: {item.delivery_notes}</span>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </>
    </div>
  );
};

export default CartAddress;
