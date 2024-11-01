import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import patientsData from "../../lib/data/patients.json"; // Import mock patient data

export default function Patients() {
  const [patients] = useState(patientsData);

  return (
    <main className="p-4 md:px-8 lg:px-12 min-h-screen gap-10 flex flex-col mt-10">
      <h1 className="text-2xl font-bold mb-6">Mis Pacientes</h1>
      {/* Listado de pacientes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((patient) => (
          <div key={patient.id} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold">{patient.name}</h2>
            <p>Edad: {patient.age}</p>
            <p>Última Consulta: {patient.lastAppointment}</p>

            {/* Acciones rápidas */}
            <div className="mt-4 flex flex-col gap-2">
              <Button
                className="w-1/2"
                onClick={() => alert("Sugerir nueva consulta")}
              >
                <Link to={`/clinic-history/${patient.id}`}>Historial</Link>
              </Button>
              <Button
                className="w-1/2"
                onClick={() => alert("Sugerir nueva consulta")}
              >
                Nueva Consulta
              </Button>
              <Button
                className="w-1/2"
                onClick={() => alert("Enviar mensaje al paciente")}
              >
                Enviar Mensaje
              </Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
