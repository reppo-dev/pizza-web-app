import { getAllPizzas } from "@/action/pizza";
import CardPizza from "@/components/card-pizza";
import { Button } from "@/components/ui/button";
import { Pizza } from "@/interface";
import Link from "next/link";

const PizzaPage = async () => {
  const pizzaData = await getAllPizzas();
  const p: Pizza[] = pizzaData.data;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {p.map((pizza) => (
        <CardPizza key={pizza.ID} pizza={pizza} />
      ))}
      <div className="fixed flex flex-col gap-2 items-center justify-center bottom-10 right-10">
        <Link href={"/admin/dashboard/createpizza"}>
          <Button>Add Pizza</Button>
        </Link>
        <Link href={"/admin/dashboard/createcategory"}>
          <Button>Add Category</Button>
        </Link>
      </div>
    </div>
  );
};

export default PizzaPage;
