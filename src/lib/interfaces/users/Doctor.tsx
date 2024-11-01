import { User } from "./User";

export interface Doctor extends User {
  specialty: string;
  rating: number; // Calificación entre 1-5
  reviewsCount: number; // Número de reseñas
  consultations: number; // Número de consultas realizadas
  pricePer30Min: number; // Costo por 30 minutos de consulta
  availableTimes?: string[]; // Horarios disponibles para el doctor
}
