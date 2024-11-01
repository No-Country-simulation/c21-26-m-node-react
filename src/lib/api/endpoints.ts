export const GET_PATIENT_BY_ID = (id: number) => `/patients/${id}`;
export const GET_DOCTOR_BY_ID = (id: number) => `/doctors/${id}`;
export const GET_APPOINTMENTS_BY_PATIENT_ID = (patientId: number) =>
  `/appointments?patientId=${patientId}`;
export const GET_CLINICAL_RECORDS_BY_PATIENT_ID = (patientId: number) =>
  `/clinical-records?patientId=${patientId}`;
export const GET_CLINICAL_RECORDS_BY_APPOINTMENT_ID = (appointmentId: number) =>
  `/clinical-records?appointmentId=${appointmentId}`;
