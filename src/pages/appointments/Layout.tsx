import { ReactNode } from "react";
import useUserStore from "../../context/userStore";
import useAppointmentStore from "../../context/appointmentsStore";
import { exportData, deleteAccount } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { FaDownload, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface AppointmentLayoutProps {
  children: ReactNode;
}

export default function AppointmentLayout({
  children,
}: AppointmentLayoutProps) {
  const appointments = useAppointmentStore((state) => state.appointments);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const navigate = useNavigate();

  return (
    <main className="p-4 min-h-screen gap-10 flex flex-col mt-10">
      <h1 className="text-2xl font-bold mb-4">My Appointments</h1>
      <div className="flex flex-wrap w-1/3 gap-4 mb-8">
        <Button asChild className="max-w-min">
          <Link to="/request-appointment">New Appointment</Link>
        </Button>
        {isAuthenticated && (
          <>
            <Button
              variant="secondary"
              disabled={!isAuthenticated}
              className="max-w-min"
              onClick={() => {
                exportData(appointments);
              }}
            >
              <FaDownload className="mr-2" /> Export Data
            </Button>
            <Button
              variant="destructive"
              disabled={!isAuthenticated}
              className="max-w-min"
              onClick={() => {
                deleteAccount(navigate);
              }}
            >
              <FaTrash className="mr-2" /> Delete Account
            </Button>
          </>
        )}
        {children}
      </div>
    </main>
  );
}
