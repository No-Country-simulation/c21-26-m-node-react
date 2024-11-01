export interface Appointment {
  id: number;
  date: string; // Fecha en formato ISO, ej. "2024-10-10"
  time: string; // Hora en formato "HH:MM AM/PM", ej. "10:00 AM"
  doctorId: number; // Referencia al ID del doctor
  patientId: number; // Referencia al ID del paciente
  reason: string; // Razón de la cita
  location: string; // Ubicación, ej. "Clínica Centro, Sala 204" o "Virtual vía Zoom"
  isPast: boolean; // Indica si la cita ya ocurrió
  appointmentType: string; // Tipo de cita
}
