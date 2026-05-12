// app/(provider)/customer/pizzas/page.tsx
import { validateJwtTokenAndGetUser } from "@/action/token";
import ProfileCard from "@/components/functional/profile-card";

export default async function PizzasPage() {
  const result = await validateJwtTokenAndGetUser();

  if (!result.success) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600 font-semibold">{result.message}</p>
        <a href="/login" className="text-primary underline mt-4 inline-block">
          Go to login
        </a>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-primary mb-6">Your Pizzas</h1>
      <ProfileCard user={result.user} />
      {/* rest of your page */}
    </div>
  );
}
