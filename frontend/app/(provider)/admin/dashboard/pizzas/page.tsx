import { getAllPizzas } from "@/action/pizza";
import CardPizza from "@/components/card-pizza";
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

const PizzaPage = async () => {
  const pizzaData = await getAllPizzas();
  const p: PizzaType[] = pizzaData.data;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 mx-4">
      {p.map((pizza) => (
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
            <DropdownMenuItem>
              <span className="flex items-center gap-2">
                {/* آیکون‌های فرضی برای Team و Subscription */}
                Team
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default PizzaPage;
