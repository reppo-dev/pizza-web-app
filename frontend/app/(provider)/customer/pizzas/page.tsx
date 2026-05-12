import { validateJwtTokenAndGetUser } from "@/action/token";
import ProfileCard from "@/components/functional/profile-card";
import React from "react";

const PizzasPage = async () => {
  const response = await validateJwtTokenAndGetUser();
  return (
    <div>
      <h1>Pizzas Page</h1>
      <ProfileCard user={response.user} />
    </div>
  );
};

export default PizzasPage;
