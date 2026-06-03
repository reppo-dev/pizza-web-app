import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

const CardSearch = () => {
  return (
    <div>
      <form action="/admin/dashboard/pizzas">
        <div className="flex items-center justify-center max-w-xl border rounded-lg">
          <Search className="ml-2" />
          <Input
            type="text"
            name="q"
            className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input border-none"
            placeholder="Search..."
          />
          <Button className="rounded-l-none">Search</Button>
        </div>
      </form>
    </div>
  );
};

export default CardSearch;
