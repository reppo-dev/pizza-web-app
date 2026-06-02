"use client";

import { deleteCartItem, updateCartItem } from "@/action/cart";
import { Cart } from "@/interface";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";

interface CartClientProps {
  initialCart: Cart;
}

const CartClient = ({ initialCart }: CartClientProps) => {
  const [cart, setCart] = useState<Cart>(initialCart);
  const [isLoading, setIsLoading] = useState(false);

  const recalcTotal = (item: Cart["items"]) =>
    item.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const removeItem = async (id: number) => {
    try {
      setIsLoading(true);

      const response = await deleteCartItem(id);

      if (response.success) {
        const updatedItems = cart.items.filter((item) => item.ID !== id);
        setCart({
          ...cart,
          items: updatedItems,
          total: recalcTotal(updatedItems),
        });
      }

      toast.success("remove item");
    } catch {
      toast.error("Failed remove item");
    }
    setIsLoading(false);
  };

  const updateQuantity = async (id: number, newQuentity: number) => {
    try {
      if (newQuentity <= 0) return;
      setIsLoading(true);
      const result = await updateCartItem(id, newQuentity);
      const updateQuentity = cart.items.map((item) =>
        item.ID === id ? { ...item, quantity: newQuentity } : item,
      );
      setCart({
        ...cart,
        items: updateQuentity,
        total: recalcTotal(updateQuentity),
      });

      toast.success("Quantity updated");
    } catch {
      toast.error("Update failed");
    }
    setIsLoading(false);
  };

  if (!cart?.items || cart.items.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <Link href="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <Card key={item.ID}>
              <CardContent className="flex flex-col sm:flex-row gap-4 p-4">
                <div className="w-24 h-24 relative bg-gray-100 rounded-md overflow-hidden shrink-0">
                  <Image
                    src={item.pizza.image || "/placeholder.jpg"}
                    alt={item.pizza.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <Link href={`/products/${item.pizza_id}`}>
                    <h2 className="text-lg font-semibold hover:underline">
                      {item.pizza.name}
                    </h2>
                  </Link>
                  <p className="text-sm text-gray-500 line-clamp-1">
                    {item.pizza.description}
                  </p>
                  <p className="text-sm font-medium mt-1">
                    ${item.price.toLocaleString()}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateQuantity(item.ID, item.quantity - 1)
                        }
                        disabled={isLoading}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateQuantity(item.ID, item.quantity + 1)
                        }
                        disabled={isLoading}
                      >
                        +
                      </Button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-semibold">
                        ${(item.price * item.quantity).toLocaleString()}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.ID)}
                        disabled={isLoading}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Order Summary</h2>
              <div className="flex justify-between text-sm">
                <span>Items ({cart.items.length})</span>
                <span>{cart.total?.toLocaleString() ?? 0} T</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-4">
                <span>Total</span>
                <span>{cart.total?.toLocaleString() ?? 0} T</span>
              </div>
              <Button
                className="w-full"
                disabled={isLoading || cart.items.length === 0}
              >
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
