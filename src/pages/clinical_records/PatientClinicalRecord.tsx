// src/pages/PatientClinicalHistory.tsx

import React, { useState, useEffect } from "react";
import { Card } from "../../components/ui/card";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { ClinicalRecord } from "../../lib/interfaces/ClinicalRecord";
import { useParams } from "react-router-dom";
import clinicalRecordsData from "../../lib/data/clinical_records.json"; // Importar datos de registros clínicos
import appointmentsData from "../../lib/data/appointments.json"; // Importar datos de citas
import patientsData from "../../lib/data/patients.json"; // Importar datos de pacientes

export default function PatientClinicalHistory() {
  // Extraer el parámetro 'id' de la URL, que asumimos es el patientId
  const { id } = useParams<{ id: string }>();
  const [records, setRecords] = useState<ClinicalRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const patientId = parseInt(id, 10);
      // Verificar si el paciente existe
      const patientExists = patientsData.some((pat) => pat.id === patientId);
      if (!patientExists) {
        setError("Patient not found.");
        setLoading(false);
        return;
      }

      // Encontrar todas las citas del paciente
      const patientAppointments = appointmentsData.filter(
        (appt) => appt.patientId === patientId
      );

      if (patientAppointments.length === 0) {
        setError("No appointments found for this patient.");
        setLoading(false);
        return;
      }

      // Extraer los appointmentIds
      const appointmentIds = patientAppointments.map((appt) => appt.id);

      // Filtrar los registros clínicos que coincidan con los appointmentIds
      const patientClinicalRecords = clinicalRecordsData.filter((record) =>
        appointmentIds.includes(record.appointmentId)
      );

      setRecords(patientClinicalRecords);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <main className="p-4 md:px-8 lg:px-12 min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-4 md:px-8 lg:px-12 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <a href="/home">
            <button className="px-4 py-2 bg-blue-500 text-white rounded">
              Volver al Inicio
            </button>
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="p-4 md:px-8 lg:px-12 min-h-screen gap-10 flex flex-col mt-10">
      <h2 className="text-xl font-semibold mb-4">Your Clinical History</h2>
      <div className="flex flex-col gap-4">
        {records.length === 0 ? (
          <p>No clinical records available.</p>
        ) : (
          records.map((record) => (
            <ClinicalRecordCard key={record.id} record={record} />
          ))
        )}
      </div>
    </main>
  );
}

function ClinicalRecordCard({ record }: { record: ClinicalRecord }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => setIsOpen(!isOpen);

  return (
    <Card className="p-6 shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold">Date: {record.date}</h3>
          <p className="text-gray-600">Diagnosis: {record.diagnosis}</p>
        </div>
        <button
          onClick={toggleDetails}
          className="ml-4 p-2 bg-gray-200 rounded-full"
          aria-label="Toggle Details"
        >
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
      {isOpen && (
        <div className="mt-4 space-y-2">
          <div>
            <h4 className="font-semibold">Prescriptions:</h4>
            <ul className="list-disc list-inside">
              {record.prescriptions.map((prescription, index) => (
                <li key={index}>{prescription}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Notes:</h4>
            <p>{record.notes}</p>
          </div>
          {record.attachments.length > 0 && (
            <div>
              <h4 className="font-semibold">Attachments:</h4>
              <ul className="list-disc list-inside">
                {record.attachments.map((attachment, index) => (
                  <li key={index}>
                    <a
                      href={attachment}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Document {index + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
