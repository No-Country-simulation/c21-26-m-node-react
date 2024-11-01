import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Appointment } from "../../lib/interfaces/Appointment";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function PastAppointmentCard({ appointment }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  // const [doctor, setDoctor] = useState<{ name: string; specialty: string }>({
  //   name: "Desconocido",
  //   specialty: "Unknown",
  // });

  // const toggleDetails = () => setIsOpen(!isOpen);

  // useEffect(() => {
  //   const fetchDoctor = async () => {
  //     const fetchedDoctor = await getDoctorById(appointment.doctorId);
  //     setDoctor({
  //       name: fetchedDoctor.name,
  //       specialty: fetchedDoctor.specialty,
  //     });
  //   };
  //   fetchDoctor();
  // }, [appointment.doctorId]);
  console.log("appointment", appointment);

  return (
    <Card className="p-6 shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold">
            Appointment with{" "}
            <a
              href={`/doctor-profile/${appointment.doctorId}`}
              className="text-blue-500 hover:underline"
            >
              {appointment.doctor.lastName}
            </a>
          </h3>
          <p className="text-gray-600">
            Specialty: {appointment.specialty.name}
          </p>
          <p className="mt-2">
            <span className="font-semibold">Date:</span> {appointment.date}
          </p>
          <p>
            <span className="font-semibold">Time:</span> {appointment.time}
          </p>
          <p>
            <span className="font-semibold">Reason:</span> {appointment.reason}
          </p>
        </div>
        Botón para expandir/contraer detalles
        <button
          onClick={() => {
            console.log("Toggle Details");
          }}
          className="ml-4 p-2 bg-gray-200 rounded-full"
          aria-label="Toggle Details"
        >
          {isOpen ? (
            <FaChevronUp className="h-5 w-5" />
          ) : (
            <FaChevronDown className="h-5 w-5" />
          )}
        </button>
      </div>
      {/* Detalles adicionales ocultos */}
      {isOpen && (
        <div className="mt-4 space-y-2">
          {appointment && (
            <div>
              <h4 className="font-semibold">Appointment Details:</h4>
              <p>Date: {appointment.date}</p>
              <p>Time: {appointment.time}</p>
              <p>Reason: {appointment.reason}</p>
              <p>Location: {appointment.location}</p>
            </div>
          )}
          {/* Puedes agregar más detalles aquí si existen */}
          <Button
            variant="secondary"
            onClick={() => navigate(`/appointment-details/${appointment.id}`)}
            className="mt-4"
          >
            View Details
          </Button>
        </div>
      )}
    </Card>
  );
}
