import { allUser } from "@/action/user";
import UserCardId from "@/components/UserCartId";
import { User } from "@/interface";
import Link from "next/link";

const UsersPage = async () => {
  const res = await allUser();
  const users: User[] = res.data;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user: User) => (
          <div key={user.ID}>
            <UserCardId user={user} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
