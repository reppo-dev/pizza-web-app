import { searchPizza } from "@/action/search";
import CardPizza from "@/components/card-pizza";
import CardSearchPizza from "@/components/card-searchpizza-user";
import { Pizza } from "@/interface";

interface PizzaPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

const PizzaPage = async ({ searchParams }: PizzaPageProps) => {
  const { q = "" } = await searchParams;

  const pizzaData = await searchPizza(q);
  const p: Pizza[] = pizzaData.data;
  return (
    <div>
      <div className="ml-4 my-4">
        <CardSearchPizza />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 mx-4">
        {p.map((pizza) => (
          <CardPizza key={pizza.ID} pizza={pizza} />
        ))}
      </div>
    </div>
  );
};

export default PizzaPage;
