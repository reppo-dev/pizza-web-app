"use client";

import { useEffect, useState } from "react";
import ProfileCard from "@/components/functional/profile-card";
import { validateJwtTokenAndGetUser } from "@/action/token";
import { User } from "@/interface";
import { Skeleton } from "@/components/ui/skeleton"; // optional, for loading

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const result = await validateJwtTokenAndGetUser();

        if (result.success && result.user) {
          setUser(result.user);
        } else {
          setError(result.message || "Failed to fetch user data");
        }
      } catch (err) {
        console.error(err);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  // Optional: redirect if not authorized (check role)
  // useEffect(() => {
  //   if (user && user.role.name !== "admin") {
  //     // redirect to /customer or /login
  //   }
  // }, [user]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-primary mb-6">Admin Dashboard</h1>

      {loading && (
        <div className="space-y-4">
          <Skeleton className="h-48 w-full max-w-sm" />
        </div>
      )}

      {error && (
        <div className="rounded-md bg-red-50 p-4 text-red-700 font-medium">
          {error}
        </div>
      )}

      {!loading && !error && <ProfileCard user={user} />}
    </div>
  );
}
