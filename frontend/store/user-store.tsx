import { User } from "@/interface";
import { create } from "zustand";

interface UserStoreType {
  user: User | null;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserStoreType>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
}));
