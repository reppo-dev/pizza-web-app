import { User } from "@/interface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProfileCard = ({ user }: { user: User }) => {
  return (
    <Card className="w-full max-w-sm shadow-md">
      <CardHeader>
        <CardTitle className="text-primary text-xl font-bold">
          {user.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div>
          <span className="text-gray-500">Email:</span>{" "}
          <span className="font-medium">{user.email}</span>
        </div>
        <div>
          <span className="text-gray-500">Role:</span>{" "}
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary capitalize">
            {user.role.name}
          </span>
        </div>
        <div>
          <span className="text-gray-500">ID:</span>{" "}
          <span className="font-mono text-xs text-gray-600">#{user.ID}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
