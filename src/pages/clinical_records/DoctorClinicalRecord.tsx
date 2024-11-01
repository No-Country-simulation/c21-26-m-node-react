// src/components/ClinicalHistory/DoctorClinicalHistory.tsx
import React, { useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
// Importa tu contexto de modales aquí si lo tienes

interface ClinicalRecord {
  id: number;
  date: string;
  diagnosis: string;
  prescriptions: string[];
  notes: string;
  attachments: string[];
}

const mockClinicalRecords: ClinicalRecord[] = [
  {
    id: 1,
    date: "2023-11-20",
    diagnosis: "Hipotiroidismo",
    prescriptions: ["Levotiroxina 50mcg"],
    notes:
      "El paciente presenta niveles elevados de TSH. Se recomienda seguir la dosis prescrita y realizar controles trimestrales.",
    attachments: ["/documents/hypothyroidism-report-2023-11-20.pdf"],
  },
  {
    id: 2,
    date: "2024-02-10",
    diagnosis: "Artritis Reumatoide",
    prescriptions: ["Metotrexato 15mg", "Prednisona 5mg"],
    notes:
      "Iniciar tratamiento con Metotrexato. Monitorizar efectos secundarios y ajustar dosis según respuesta.",
    attachments: [
      "/documents/rheumatoid-arthritis-report-2024-02-10.pdf",
      "/documents/lab-results-2024-02-10.pdf",
    ],
  },
  {
    id: 3,
    date: "2024-05-18",
    diagnosis: "Depresión Mayor",
    prescriptions: ["Sertralina 50mg"],
    notes:
      "Iniciar tratamiento con Sertralina. Recomendar terapia cognitivo-conductual en paralelo.",
    attachments: ["/documents/depression-report-2024-05-18.pdf"],
  },
  {
    id: 4,
    date: "2024-08-25",
    diagnosis: "EPOC (Enfermedad Pulmonar Obstructiva Crónica)",
    prescriptions: ["Tiotropio Inhalador", "Salbutamol Inhalador"],
    notes:
      "Se recomienda dejar de fumar y participar en un programa de rehabilitación pulmonar.",
    attachments: [
      "/documents/copd-report-2024-08-25.pdf",
      "/documents/spirometry-results-2024-08-25.pdf",
    ],
  },
];

export default function DoctorClinicalHistory() {
  const [records, setRecords] = useState<ClinicalRecord[]>(mockClinicalRecords);
  // const { openModal } = useModal(); // Descomenta si usas un contexto de modal

  const handleEdit = (record: ClinicalRecord) => {
    // openModal(<EditClinicalRecordForm record={record} onSave={handleSave} />); // Implementa el formulario de edición con tu contexto
    alert(`Editar registro con ID: ${record.id}`); // Placeholder para la funcionalidad de edición
  };

  const handleSave = (updatedRecord: ClinicalRecord) => {
    setRecords((prevRecords) =>
      prevRecords.map((record) =>
        record.id === updatedRecord.id ? updatedRecord : record
      )
    );
  };

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Patient's Clinical History</h2>
      <div className="flex flex-col gap-4">
        {records.length === 0 ? (
          <p>No clinical records available.</p>
        ) : (
          records.map((record) => (
            <DoctorClinicalRecordCard
              key={record.id}
              record={record}
              onEdit={() => handleEdit(record)}
            />
          ))
        )}
      </div>
    </section>
  );
}

function DoctorClinicalRecordCard({
  record,
  onEdit,
}: {
  record: ClinicalRecord;
  onEdit: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => setIsOpen(!isOpen);

  return (
    <Card className="p-6 shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold">Date: {record.date}</h3>
          <p className="text-gray-600">Diagnosis: {record.diagnosis}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleDetails}
            className="p-2 bg-gray-200 rounded-full"
            aria-label="Toggle Details"
          >
            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          <Button onClick={onEdit} variant="secondary">
            Edit
          </Button>
        </div>
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
