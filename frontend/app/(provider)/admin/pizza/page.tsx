import { getAllPizzas } from "@/action/pizza";
import CardPizza from "@/components/card-pizza";
import { Pizza } from "@/interface";

const Pizza = async () => {
  const pizzaData = await getAllPizzas();
  const pizza: Pizza = pizzaData.data;
  return (
    <div>
      <CardPizza pizza={pizza} />
    </div>
  );
};

export default Pizza;
