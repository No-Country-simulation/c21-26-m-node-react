import { create } from "zustand";
import { User } from "../lib/interfaces/users/User";
import { verifyAuth } from "../functions/auth";

interface UserState {
  isAuthenticated: boolean;
  role: string;
  loading: boolean;
  user: User | null;
  setUser: (role: string) => void;
  logout: () => void;
  checkAuth: () => Promise<void>; // Función asíncrona para verificar la autenticación
}

const useUserStore = create<UserState>((set) => ({
  isAuthenticated: false,
  role: "patient",
  loading: true,
  user: null,
  setUser: (user) =>
    set({ isAuthenticated: true, user, role: user.role, loading: false }),
  logout: () =>
    set({ isAuthenticated: false, role: "patient", loading: false }),
  checkAuth: async () => {
    set({ loading: true });
    try {
      const data = await verifyAuth();
      set({
        isAuthenticated: data.isAuthenticated,
        role: data.role,
        user: data.user,
        loading: false,
      });
    } catch (error) {
      console.error("Error verificando autenticación:", error);
      set({ isAuthenticated: false, role: "patient", loading: false });
    }
  },
}));

export default useUserStore;
