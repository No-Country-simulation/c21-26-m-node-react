import { useState, useEffect } from "react";
import { FaStar, FaRegStar } from "react-icons/fa"; // Import icons for stars
import { Button } from "../../components/ui/button";
import { Doctor } from "../../lib/interfaces/users/Doctor"; // Asegúrate de que esta interfaz está correctamente definida
import { useParams, useNavigate } from "react-router-dom"; // Import useParams y useNavigate
import { db } from "../../lib/data/database";

export default function DoctorProfilePage() {
  // Extraer el parámetro 'id' de la URL
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<Doctor | null>(null);

  useEffect(() => {
    const fetchDoctor = async (doctorId) => {
      try {
        const doctorDetails = await db.getDoctorById(doctorId);
        setData(doctorDetails);
        console.log("Doctor Details:", doctorDetails);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    if (id) {
      fetchDoctor(parseInt(id));
    }
  }, [id]);

  function dayOfWeek(dayNumber: number) {
    const days = {
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
      7: "Sunday",
    };
    return days[dayNumber] || "Invalid day number";
  }
  // Función para generar estrellas basadas en la calificación
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-yellow-500" />
        ) : (
          <FaRegStar key={i} className="text-gray-400" />
        )
      );
    }
    return stars;
  };

  // Manejar caso cuando el médico no se encuentra
  if (!data) {
    return (
      <main className="p-4 md:px-8 lg:px-12 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Doctor Not Found</h2>
          <p className="text-gray-600 mb-6">
            The doctor you are looking for does not exist.
          </p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="p-4 min-h-screen gap-10 flex flex-col items-center mt-10">
      <div className="flex flex-col items-start justify-between w-1/2 p-6">
        {/* Foto del Médico */}
        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          {data.doctor.profilePicture ? (
            <img
              src={data.profilePicture}
              alt={`Photo of ${data.doctor.firstName} ${data.doctor.lastName}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-500">
              No Photo
            </div>
          )}
        </div>

        {/* Información del Médico */}
        <div className="ml-0 mt-6 flex gap-16">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">
              {data.doctor.firstName} {data.doctor.lastName}
            </h1>
            <p className="text-gray-600">Speacialty: {data.doctor.specialty}</p>

            {/* Calificación del Médico */}
            <div className="flex items-center mt-2">
              {renderStars(Math.round(data.doctor.rating))}{" "}
              {/* Renderizar estrellas */}
              <span className="ml-2 text-gray-600">
                ({data.doctor.reviewsCount} reviews)
              </span>
            </div>
            <p className="text-gray-800">
              <span className="font-semibold">Completed Consultations:</span>{" "}
              {data.doctor.consultations}
            </p>
          </div>
          {/* Información Adicional */}
          <div>
            <ul className="mb-3 flex flex-col">
              <strong>Available Times:</strong>
              {data.schedule.map((time) => (
                <li key={time.id} className="flex flex-wrap gap-2">
                  <span>{dayOfWeek(time.dayOfWeek)}</span>
                  <span>
                    {time.startTime} - {time.endTime}
                  </span>
                </li>
              ))}
            </ul>
            <ul className="mb-3 flex flex-col">
              <strong>Services:</strong>
              {data.services.map((service) => (
                <li key={service.id} className="flex flex-wrap gap-2">
                  <span>
                    {service.categoryName} ${service.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Botones para Enviar Mensaje y Reservar Consulta */}
        <div className="mt-6 flex gap-4 w-full">
          {/* Botón para Enviar Mensaje */}
          <Button
            className="w-full"
            onClick={() => alert("Message sent to the doctor")}
          >
            Send Message
          </Button>

          {/* Botón para Reservar Consulta */}
          <Button
            className="w-full"
            onClick={() => alert("Consultation booked with the doctor")}
          >
            Book Consultation
          </Button>
        </div>
      </div>
    </main>
  );
}
