import { User } from "./User";

export interface Patient extends User {
  lastAppointment?: string; // Fecha de la última cita (formato ISO)
  sharedData?: boolean; // Indica si el paciente comparte sus datos
}
