import { getAllPizzas } from "@/action/pizza";
import CardPizza from "@/components/card-pizza";
import { Button } from "@/components/ui/button";
import { Pizza } from "@/interface";
import Link from "next/link";

const PizzaPage = async () => {
  const pizzaData = await getAllPizzas();
  const pizza: Pizza = pizzaData.data;
  return (
    <div>
      <CardPizza pizza={pizza} />
      <Link href={"/admin/dashboard/createpizza"}>
        <Button className="fixed bottom-10 right-10">Add Pizza</Button>
      </Link>
    </div>
  );
};

export default PizzaPage;
