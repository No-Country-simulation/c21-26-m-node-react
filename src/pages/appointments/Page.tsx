import AppointmentLayout from "./Layout";
import PatientAppointments from "./PatientsAppointment";

export default function AppointmentsPage() {
  return (
    <AppointmentLayout>
      <PatientAppointments />
    </AppointmentLayout>
  );
}
