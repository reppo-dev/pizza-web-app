import { getAllPizzas } from "@/action/pizza";
import CardPizza from "@/components/card-pizza";
import { Pizza } from "@/interface";

const PizzaPage = async () => {
  const pizzaData = await getAllPizzas();
  const pizzas: Pizza[] = Array.isArray(pizzaData.data) ? pizzaData.data : [];

  return (
    <div className="space-y-4 grid grid-cols-4 justify-center items-center">
      {pizzas.length > 0 ? (
        pizzas.map((pizza) => <CardPizza key={pizza.ID} pizza={pizza} />)
      ) : (
        <p className="text-sm text-muted-foreground">No pizzas found.</p>
      )}
    </div>
  );
};

export default PizzaPage;
