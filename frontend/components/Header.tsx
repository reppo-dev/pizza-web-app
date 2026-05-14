import { useUserStore } from "@/store/user-store";
import { SidebarTrigger } from "./ui/sidebar";

const Header = () => {
  const { user } = useUserStore();
  return (
    <div className="px-10 py-6 bg-primary flex justify-between items-center">
      <SidebarTrigger />
      <h1 className="text-xl font-bold text-white">Next Pizza</h1>
      <div className="flex gap-5">
        <h1 className="text-sm text-white">{user?.email}</h1>
      </div>
    </div>
  );
};

export default Header;
