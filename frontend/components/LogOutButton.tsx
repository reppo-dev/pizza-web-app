"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const GO_API_URL = process.env.NEXT_PUBLIC_GO_API_URL || process.env.GO_API_URL;

const LogOutButton = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(`http://localhost:3000/logout`);

      if (response.status === 200) {
        toast.success("Logged out successfully!");

        router.push("/login");
        router.refresh();
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleLogout} disabled={isLoading} variant="outline">
      {isLoading ? "Logging out..." : "Log out"}
    </Button>
  );
};

export default LogOutButton;
