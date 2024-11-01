import { create } from "zustand";
import { Appointment } from "../lib/interfaces/Appointment";

interface AppointmentsState {
  appointments: Appointment[];
  setAppointments: (appointments: Appointment[]) => void;
}

const useAppointmentStore = create<AppointmentsState>((set) => ({
  appointments: [],
  setAppointments: (appointments) => set({ appointments }),
  // setUser: (role) => set({ isAuthenticated: true, role, loading: false }),
  // checkAuth: async () => {
  //   set({ loading: true });
  //   try {
  //     const data = await verifyAuth();
  //     set({
  //       isAuthenticated: data.isAuthenticated,
  //       role: data.role,
  //       user: data.user,
  //       loading: false,
  //     });
  //   } catch (error) {
  //     console.error("Error verificando autenticación:", error);
  //     set({ isAuthenticated: false, role: "patient", loading: false });
  //   }
  // },
}));

export default useAppointmentStore;
