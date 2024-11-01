// import patientsData from "../data/patients.json";
// import doctorsData from "../data/doctors.json";
// import appointmentsData from "../data/appointments.json";
// import clinicalRecordsData from "../data/clinical_records.json";
import {
  GET_APPOINTMENTS_BY_PATIENT_ID,
  GET_CLINICAL_RECORDS_BY_PATIENT_ID,
  GET_CLINICAL_RECORDS_BY_APPOINTMENT_ID,
  GET_DOCTOR_BY_ID,
  GET_PATIENT_BY_ID,
} from "./endpoints";
import { Patient } from "../interfaces/users/Patient";
import { Doctor } from "../interfaces/users/Doctor";
import { Appointment } from "../interfaces/Appointment";
import { ClinicalRecord } from "../interfaces/ClinicalRecord";

const baseURL = "http://localhost:3000/api";

const simulateApiCall = <T>(data: T, delay: number = 500): Promise<T> => {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay));
};

export const getPatientById = async (id: number): Promise<Patient> => {
  const patient = await fetch(`${baseURL}${GET_PATIENT_BY_ID(id)}`);
  const data = await patient.json();
  if (!data) {
    throw new Error("Patient not found");
  }
  return simulateApiCall(data);

  // const patient = patientsData.find((pat) => pat.id === id);
  // if (!patient) {
  //   throw new Error("Patient not found");
  // }
  // return simulateApiCall(patient);
};

export const getDoctorById = async (id: number): Promise<Doctor> => {
  const doctor = await fetch(`${baseURL}${GET_DOCTOR_BY_ID(id)}`);
  const data = await doctor.json();
  if (!data) {
    throw new Error("Doctor not found");
  }
  return simulateApiCall(data);

  // const doctor = doctorsData.find((doc) => doc.id === id);
  // if (!doctor) {
  //   throw new Error("Doctor not found");
  // }
  // return simulateApiCall(doctor);
};

export const getAppointmentsByPatientId = async (
  patientId: number
): Promise<Appointment[]> => {
  const appointments = await fetch(
    `${baseURL}${GET_APPOINTMENTS_BY_PATIENT_ID(patientId)}`
  );
  const data = await appointments.json();
  if (!data) {
    throw new Error("No appointments found for this patient");
  }
  return "ERROR: No appointments found for this patient";

  // const appointments = appointmentsData.filter(
  //   (appt) => appt.patientId === patientId
  // );
  // if (appointments.length === 0) {
  //   throw new Error("No appointments found for this patient");
  // }
  // return simulateApiCall(appointments);
};

export const getClinicalRecordsByPatientId = async (
  patientId: number
): Promise<ClinicalRecord[]> => {
  const records = await fetch(
    `${baseURL}${GET_CLINICAL_RECORDS_BY_PATIENT_ID(patientId)}`
  );
  const data = await records.json();
  if (!data) {
    throw new Error("No clinical records found for this patient");
  }
  return simulateApiCall(data);

  // const patientAppointments = appointmentsData.filter(
  //   (appt) => appt.patientId === patientId
  // );
  // const appointmentIds = patientAppointments.map((appt) => appt.id);

  // // Filtrar registros clínicos que correspondan a las citas del paciente
  // const records = clinicalRecordsData.filter((record) =>
  //   appointmentIds.includes(record.appointmentId)
  // );

  // if (records.length === 0) {
  //   throw new Error("No clinical records found for this patient");
  // }

  // return simulateApiCall(records);
};

export const getClinicalRecordByAppointmentId = async (
  appointmentId: number
): Promise<ClinicalRecord> => {
  const record = await fetch(
    `${baseURL}${GET_CLINICAL_RECORDS_BY_APPOINTMENT_ID(appointmentId)}`
  );
  const data = await record.json();
  if (!data) {
    throw new Error("Clinical record not found for this appointment");
  }
  return simulateApiCall(data);

  // const record = clinicalRecordsData.find(
  //   (rec) => rec.appointmentId === appointmentId
  // );
  // if (!record) {
  //   throw new Error("Clinical record not found for this appointment");
  // }
  // return simulateApiCall(record);
};

export const getPatientsById = async (): Promise<Patient[]> => {
  const patients = await fetch(`${baseURL}${GET_PATIENT_BY_ID}`);
  const data = await patients.json();
  if (!data) {
    throw new Error("No patients found");
  }
  return simulateApiCall(data);

  // return simulateApiCall(patientsData);
};

export const getDoctorsById = async (): Promise<Doctor[]> => {
  const doctors = await fetch(`${baseURL}${GET_DOCTOR_BY_ID}`);
  const data = await doctors.json();
  if (!data) {
    throw new Error("No doctors found");
  }
  return simulateApiCall(data);

  // return simulateApiCall(doctorsData);
};
