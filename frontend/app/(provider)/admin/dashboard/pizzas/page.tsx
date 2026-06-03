import { searchPizza } from "@/action/search";
import CardPizza from "@/components/card-pizza";
import CardSearch from "@/components/card-search";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Pizza as PizzaType } from "@/interface";
import { FolderPlus, Layers, Pizza, Plus } from "lucide-react";
import Link from "next/link";

interface PizzaPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

const PizzaPage = async ({ searchParams }: PizzaPageProps) => {
  const { q = "" } = await searchParams;

  const pizzaData = await searchPizza(q);

  const pizzas: PizzaType[] = pizzaData.data || [];

  return (
    <div>
      <div className="ml-4 my-4">
        <CardSearch />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 mx-4">
        {pizzas.map((pizza) => (
          <CardPizza key={pizza.ID} pizza={pizza} />
        ))}

        <DropdownMenu>
          <DropdownMenuTrigger
            className="fixed flex items-center gap-2 bottom-10 right-10 shadow-lg"
            asChild
          >
            <Button variant="default" size="lg">
              <Plus className="h-4 w-4" />
              Create
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-48" align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>

              <DropdownMenuItem asChild>
                <Link
                  href="/admin/dashboard/createpizza"
                  className="flex items-center gap-2"
                >
                  <Pizza className="h-4 w-4" />
                  Add Pizza
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link
                  href="/admin/dashboard/createvariant"
                  className="flex items-center gap-2"
                >
                  <Layers className="h-4 w-4" />
                  Add Variant
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link
                  href="/admin/dashboard/createcategory"
                  className="flex items-center gap-2"
                >
                  <FolderPlus className="h-4 w-4" />
                  Add Category
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default PizzaPage;
