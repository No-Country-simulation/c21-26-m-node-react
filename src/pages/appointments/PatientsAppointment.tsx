import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import PastAppointmentCard from "./PastAppointmentCard";
import useAppointmentStore from "../../context/appointmentsStore";
import useUserStore from "../../context/userStore";
import { useEffect } from "react";
import { db } from "../../lib/data/database";

export default function PatientAppointments() {
  const user = useUserStore((state) => state.user);
  const appointments = useAppointmentStore((state) => state.appointments);
  const setAppointments = useAppointmentStore((state) => state.setAppointments);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.id) {
      const fetchDoctor = async (id) => {
        const fetchedAppointments = await db.getAppointmentsByUserId(id);
        setAppointments(fetchedAppointments);
      };

      fetchDoctor(user.id);
    }
  }, [user]);

  const handleNext = (appointmentId: number) => {
    navigate(`/meeting/${appointmentId}`);
  };

  const today = new Date();

  return (
    <main className="w-full">
      <section>
        <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
        <div className="flex flex-col gap-4">
          {appointments.length === 0 ? (
            <p>No upcoming appointments.</p>
          ) : (
            appointments.map((appointment) => {
              // Verificar si la cita es hoy
              const isToday =
                new Date(appointment.date).toDateString() ===
                today.toDateString();
              // Verificar si la ubicación es Zoom
              const isZoom = appointment.location
                .toLowerCase()
                .includes("zoom");

              return (
                <Card key={appointment.id} className="p-6 shadow-md">
                  <div className="flex flex-col md:flex-row justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold">
                        Appointment with{" "}
                        <a
                          href={`/doctor-profile/${appointment.doctorId}`}
                          className="text-blue-500 hover:underline"
                        ></a>
                      </h3>
                      <p className="text-gray-600">Specialty:</p>
                      <p className="mt-2">
                        <span className="font-semibold">Date:</span>{" "}
                        {appointment.date}
                      </p>
                      <p>
                        <span className="font-semibold">Time:</span>{" "}
                        {appointment.time}
                      </p>
                      <p>
                        <span className="font-semibold">Reason:</span>{" "}
                        {appointment.reason}
                      </p>
                      <p>
                        <span className="font-semibold">Location:</span>{" "}
                        {appointment.location}
                      </p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0">
                      {isToday && isZoom && (
                        <Button onClick={() => handleNext(appointment.id)}>
                          Next (Go to Meeting)
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </section>
      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Past Appointments</h2>
        <div className="flex flex-col gap-4">
          {appointments.length === 0 ? (
            <p>No past appointments.</p>
          ) : (
            appointments.map((appointment) => (
              <PastAppointmentCard
                key={appointment.id}
                appointment={appointment}
              />
            ))
          )}
        </div>
      </section>
    </main>
  );
}
