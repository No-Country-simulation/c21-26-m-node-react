import { useState } from "react";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import { Doctor } from "../lib/interfaces/users/Doctor";
import { Link } from "react-router-dom";
import { db } from "../lib/data/database";
import { useLiveQuery } from "dexie-react-hooks";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";
import { FaStar, FaRegStar } from "react-icons/fa"; // Import icons for stars

export default function Home() {
  const [specialty, setSpecialty] = useState("");
  // const [dateTime, setDateTime] = useState("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [services, setServices] = useState(null);

  const specialties = useLiveQuery(() => db.specialties.toArray(), []);

  const handleChange = async (value: string) => {
    setSpecialty(value);
    setServices(null);
    const doctorsDetails = await db.getDoctorsBySpecialty(value);
    const services = await db.getServicesBySpecialty(value);
    setDoctors(doctorsDetails);
    console.log(doctorsDetails);

    setServices(services);
  };

  const handleServiceChange = async (value: string) => {
    console.log("categorieID", value);
  };

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

  return (
    <main className="p-4 md:px-8 lg:px-12 min-h-screen gap-10 flex flex-col mt-10">
      <h1 className="text-2xl font-bold mb-4">Find Available Doctors</h1>
      <section className="flex space-x-10">
        <div className="space-y-4">
          <Label htmlFor="specialty" className="block font-medium">
            Specialty
          </Label>
          {specialties && (
            <Select
              onValueChange={handleChange}
              defaultValue={specialties[0].name}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a specialty" />
              </SelectTrigger>
              <SelectContent>
                {specialties?.map((special) => (
                  <SelectItem key={special.id} value={special.id}>
                    {special.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        {services && (
          <div className="space-y-4">
            <Label htmlFor="Services" className="block font-medium">
              Services
            </Label>
            <Select
              onValueChange={handleServiceChange}
              defaultValue={services[0].name}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a specialty" />
              </SelectTrigger>
              <SelectContent>
                {services?.map((special) => (
                  <SelectItem key={special.id} value={special.id}>
                    {special.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </section>
      {/* Input para la fecha y hora */}
      {/* <div className="mb-4">
        <label htmlFor="dateTime" className="block font-medium">
          Date & Time
        </label>
        <Input
          id="dateTime"
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
        />
        
      </div> */}
      <section className="grid grid-cols-3">
        {doctors.map(({ doctor, schedule, servicesWithCategory }) => (
          <Card key={doctor.id} className="p-4 flex flex-col gap-4">
            <div className="bg-red-500 rounded-lg h-14 w-14">
              {doctor.profilePicture || "👨‍⚕️"}
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                {doctor.lastName} {doctor.firstName}
              </h3>
              {specialty ? <></> : <p>Specialty: {doctor.specialty}</p>}
              {/* Calificación del Médico */}
              <div className="flex items-center mt-4">
                {renderStars(Math.round(doctor.rating))}{" "}
                {/* Renderizar estrellas */}
                <span className="ml-2 text-gray-600">
                  ({doctor.reviewsCount} reviews)
                </span>
              </div>
            </div>
            <ul className="mb-3 flex flex-col">
              Available Times:
              {schedule.map((time) => (
                <li key={time.id} className="flex flex-wrap gap-2">
                  <span>{dayOfWeek(time.dayOfWeek)}</span>
                  <span>
                    {time.startTime} - {time.endTime}
                  </span>
                </li>
              ))}
            </ul>
            <ul className="mb-3 flex flex-col">
              Services:
              {servicesWithCategory.map((service) => (
                <li key={service.id} className="flex flex-wrap gap-2">
                  <span>
                    {service.categoryName} ${service.price}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex gap-4">
              <Button className="w-full">
                Book Consultation {doctor.name}
              </Button>
              <Button className="w-full" asChild>
                <Link to={`/profile/medics/${doctor.id}`}>
                  Profile {doctor.name}
                </Link>
              </Button>
            </div>
          </Card>
        ))}
      </section>
    </main>
  );
}
