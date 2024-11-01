export interface ClinicalRecord {
  id: number;
  appointmentId: number; // Referencia al ID de la cita
  date: string; // Fecha del registro clínico
  diagnosis: string; // Diagnóstico médico
  prescriptions: string[]; // Lista de prescripciones
  notes: string; // Notas del médico
  attachments: string[]; // URLs o rutas a documentos relacionados
}
