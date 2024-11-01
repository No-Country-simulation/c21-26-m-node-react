import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para la navegación
import { FaTrash, FaDownload } from "react-icons/fa"; // Importar iconos
import { Button } from "../../components/ui/button"; // Componente Button de Shadcn
import { Card } from "../../components/ui/card"; // Componente Card de Shadcn
import { Appointment } from "../../lib/interfaces/Appointment"; // Importar interfaz de citas
import appointmentsData from "../../lib/data/appointments.json"; // Importar datos de citas
import doctorsData from "../../lib/data/doctors.json"; // Importar datos de doctores
import patientsData from "../../lib/data/patients.json"; // Importar datos de pacientes

// Definir el rol del usuario (simulado)
const mockUserRole = "doctor"; // Puede ser "patient" o "doctor"

export default function DoctorAppointments() {
  // Tipar el estado como un array de Appointment
  const [appointments] = useState<Appointment[]>(appointmentsData);
  const [userRole] = useState<string>(mockUserRole);

  const navigate = useNavigate(); // Para la navegación

  // Obtener la fecha actual como objeto Date
  const today = new Date();

  // Función para manejar la redirección a la página de detalles de la cita
  const handleViewDetails = (appointmentId: number) => {
    navigate(`/appointment-details/${appointmentId}`); // Navega a la página de detalles con el ID de la cita
  };

  // Función para exportar datos
  const handleExportData = () => {
    // Crear un archivo JSON de las citas y descargarlo
    const dataStr = JSON.stringify(appointments, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `doctor_appointments_${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Función para manejar la eliminación de cuenta
  const handleDeleteAccount = () => {
    // Confirmar la acción con el usuario
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmed) {
      // Implementa tu lógica de eliminación de cuenta aquí
      // Por ejemplo, enviar una solicitud al backend para eliminar la cuenta
      alert("Your account has been deleted successfully.");
      navigate("/signup"); // Redirige a la página de registro o despedida
    }
  };

  // Filtrar las citas futuras y pasadas
  const upcomingAppointments = appointments.filter(
    (appt) => new Date(appt.date) >= today
  );
  const pastAppointments = appointments.filter(
    (appt) => new Date(appt.date) < today
  );

  // Funciones para obtener nombres de doctores y pacientes por ID
  const getDoctorName = (doctorId: number) => {
    const doctor = doctorsData.find((doc) => doc.id === doctorId);
    return doctor ? doctor.name : "Desconocido";
  };

  const getPatientName = (patientId: number) => {
    const patient = patientsData.find((pat) => pat.id === patientId);
    return patient ? patient.name : "Desconocido";
  };

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-2xl font-bold mb-4">My Patients</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Button variant="secondary" onClick={handleExportData}>
          <FaDownload className="mr-2" /> Export Data
        </Button>
        <Button
          variant="destructive"
          onClick={handleDeleteAccount}
          className="bg-red-600 hover:bg-red-700"
        >
          <FaTrash className="mr-2" /> Delete Account
        </Button>
      </div>
      <section>
        <h2 className="text-xl font-semibold mb-4">
          Upcoming Patient Appointments
        </h2>
        <div className="flex flex-col gap-4">
          {upcomingAppointments.length === 0 ? (
            <p>No upcoming patient appointments.</p>
          ) : (
            upcomingAppointments.map((appt) => (
              <Card key={appt.id} className="p-6 shadow-md">
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-lg font-bold">
                      Patient: {getPatientName(appt.patientId)}
                    </h3>
                    <p className="mt-2">
                      <span className="font-semibold">Date:</span> {appt.date}
                    </p>
                    <p>
                      <span className="font-semibold">Reason:</span>{" "}
                      {appt.reason}
                    </p>
                  </div>
                  {/* Botón para ver detalles o agregar notas */}
                  <div className="mt-4">
                    <Button
                      onClick={() => handleViewDetails(appt.id)}
                      className="w-full"
                    >
                      View Details / Add Notes
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </section>

      {/* Sección de Citas Pasadas */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Past Appointments</h2>
        <div className="flex flex-col gap-4">
          {pastAppointments.length === 0 ? (
            <p>No past appointments.</p>
          ) : (
            pastAppointments.map((appt) => (
              <Card key={appt.id} className="p-6 shadow-md">
                <div>
                  <h3 className="text-lg font-bold">
                    Appointment with {getPatientName(appt.patientId)}
                  </h3>
                  <p className="mt-2">
                    <span className="font-semibold">Date:</span> {appt.date}
                  </p>
                  <p>
                    <span className="font-semibold">Reason:</span> {appt.reason}
                  </p>
                  {/* Notas del médico */}
                  {appt && (
                    <div className="mt-4">
                      <h4 className="font-semibold">Doctor's Notes:</h4>
                      <p>LOREM IPSUM</p>
                    </div>
                  )}
                  {/* Botón para ver detalles o agregar notas */}
                  <Button
                    variant="secondary"
                    onClick={() => handleViewDetails(appt.id)}
                    className="mt-4"
                  >
                    View Details / Add Notes
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
