"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import type { Pizza } from "@/interface";
import { addToCart } from "@/action/cart";
import { toast } from "sonner";

const CardPizza = ({ pizza }: { pizza: Pizza }) => {
  const variants = pizza.variants ?? [];
  const [activeVariant, setActiveVariant] = useState(
    variants.length > 0 ? variants[0] : null,
  );

  useEffect(() => {
    if (variants.length > 0) {
      setActiveVariant(variants[0]);
    }
  }, [variants]);
  const handleAddToCart = async (id: number, variantId: number) => {
    console.log("pizza id:", id, "variant id:", variantId, 1);
    const result = await addToCart(id, variantId, 1);
    if (result.success) {
      toast.success("Added!");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <Card>
      <CardHeader className="justify-center">
        <Image
          src={pizza.image}
          className="rounded-sm"
          alt={pizza.name}
          width={300}
          height={200}
        />
      </CardHeader>
      <CardContent className="space-y-3">
        <h3 className="font-semibold text-lg">{pizza.name}</h3>
        <p className="text-sm text-muted-foreground">{pizza.description}</p>
        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
          {pizza.status}
        </span>

        {variants.length > 0 ? (
          <>
            <div className="flex gap-2 mt-2">
              {variants.map((variant) => (
                <Button
                  key={variant.ID}
                  variant={
                    activeVariant?.ID === variant.ID ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setActiveVariant(variant)}
                >
                  {variant.type}
                </Button>
              ))}
            </div>

            <div className="text-lg font-bold">
              ${activeVariant?.price.toLocaleString() ?? "0"}
            </div>
          </>
        ) : (
          <div className="text-sm text-muted-foreground mt-2">
            No variants available.
          </div>
        )}
        <Button
          onClick={() => {
            console.log("clicked");
            if (activeVariant?.ID) {
              handleAddToCart(pizza.ID, activeVariant.ID);
            } else {
              toast.error("لطفاً یک واریانت انتخاب کنید");
            }
          }}
          disabled={!activeVariant}
        >
          Add To Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default CardPizza;
