"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getInfoUser } from "@/action/user";
import { User } from "@/interface";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const UserDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getInfoUser(Number(id));
      if (res.success) {
        setUser(res.data);
      }
      setLoading(false);
    };
    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Skeleton className="h-48 rounded-xl" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center p-6">
        <p className="text-muted-foreground">User not found.</p>
      </div>
    );
  }

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.image || undefined} alt={user.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Role</p>
              <Badge
                variant={
                  user.role.name === "admin" ? "destructive" : "secondary"
                }
              >
                {user.role.name}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Permission</p>
              <p className="font-medium">{user.role.permission}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">User ID</p>
              <p className="font-medium">{user.ID}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetailPage;
