import { getAllPizzas } from "@/action/pizza";
import CardPizza from "@/components/card-pizza";
import { Pizza } from "@/interface";
import React from "react";

const PizzaPage = async () => {
  const pizzaData = await getAllPizzas();
  const p: Pizza[] = pizzaData.data;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 mx-4">
      {p.map((pizza) => (
        <CardPizza key={pizza.ID} pizza={pizza} />
      ))}
    </div>
  );
};

export default PizzaPage;
