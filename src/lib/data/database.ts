import Dexie, { Table } from "dexie";
import { populate } from "./populate";

export class HealthCareDB extends Dexie {
  users!: Table;
  doctors!: Table;
  appointments!: Table;
  clinicalRecords!: Table;
  reviews!: Table;
  doctorSchedules!: Table;
  doctorServices!: Table;
  serviceCategories!: Table;
  doctorPromotions!: Table;
  payments!: Table;
  refunds!: Table;
  invoices!: Table;
  specialties!: Table;

  constructor() {
    super("HealthCareDB");

    // Define las tablas y sus esquemas
    this.version(1).stores({
      users:
        "++id,email,password,role,createdAt,lastLogin,isActive,profileCompleted,profilePicture,firstName,lastName,phoneNumber",
      doctors:
        "++id,userId,specialty,rating,reviewsCount,consultations,customCommissionRate",
      appointments:
        "++id,date,time,doctorId,userId,doctorServiceId,reason,location,isPast,appointmentType,consultationFee,reservationFee,commissionFee,canceled",
      clinicalRecords:
        "++id,appointmentId,date,diagnosis,prescriptions,notes,attachments",
      reviews: "++id,appointmentId,userId,doctorId,rating,comment,createdAt",
      doctorSchedules: "++id,doctorId,dayOfWeek,startTime,endTime",
      doctorServices: "++id,doctorId,serviceCategoryId,price",
      serviceCategories: "++id,specialtyId,name,description",
      specialties: "++id,name,description",
      doctorPromotions:
        "++id,doctorId,startDate,endDate,promotionType,cost,status",
      payments:
        "++id,userId,amount,paymentDate,paymentMethod,paymentType,referenceId,status,invoiceId",
      refunds: "++id,paymentId,userId,amount,createdAt,status",
      invoices: "++id,paymentId,amount,issueDate,userId",
    });
  }

  // Función para obtener citas en base a un userId, con datos adicionales del doctor y especialidad
  async getAppointmentsByUserId(userId: number) {
    try {
      // Buscar citas asociadas al userId
      console.log("userId", userId);

      const appointments = await this.appointments
        .where("userId")
        .equals(userId)
        .toArray();

      console.log("aca");

      // Si no se encuentran citas, lanzar un error o devolver un array vacío según convenga
      if (!appointments.length) {
        throw new Error("No appointments found for this user");
      }

      console.log("aca2");

      // Enriquecer los datos de cada cita con información adicional (doctor, servicio, especialidad)
      const appointmentDetails = await Promise.all(
        appointments.map(async (appointment) => {
          console.log("aca3");
          // Obtener información del doctor de la cita
          const doctor = await this.doctors
            .where("id")
            .equals(appointment.doctorId)
            .first();

          console.log("aca4");
          // Obtener información del usuario del doctor (firstName, lastName)
          const doctorUser = doctor
            ? await this.users.where("id").equals(doctor.userId).first()
            : null;

          console.log("aca5");
          console.log("doctor", doctor);

          // Obtener información de la especialidad del doctor
          const specialty = doctor
            ? await this.specialties
                .where("id")
                .equals(doctor.specialty)
                .first()
            : null;

          console.log("aca6");
          console.log("speacialty", specialty);

          // Obtener información del servicio de la cita
          const doctorService = await this.doctorServices
            .where("id")
            .equals(appointment.doctorServiceId)
            .first();

          console.log("aca7");
          console.log("doctorService", doctorService);
          // Obtener la categoría del servicio si está disponible
          const serviceCategory = doctorService
            ? await this.serviceCategories
                .where("id")
                .equals(doctorService.serviceCategoryId)
                .first()
            : null;

          console.log("aca8");
          console.log("serviceCategory", serviceCategory);
          // Devolver un objeto con la información de la cita y los datos adicionales
          return {
            ...appointment,
            doctor: doctor
              ? {
                  ...doctor,
                  firstName: doctorUser?.firstName || "Unknown",
                  lastName: doctorUser?.lastName || "Unknown",
                  specialtyName: specialty ? specialty.name : "Unknown",
                }
              : null,
            service: doctorService
              ? {
                  ...doctorService,
                  categoryName: serviceCategory
                    ? serviceCategory.name
                    : "Unknown",
                }
              : null,
          };
        })
      );
      console.log("appointmentDetails", appointmentDetails);

      return appointmentDetails;
    } catch (error) {
      console.error("Error fetching appointments by userId:", error);
      throw error; // Manejar el error según sea necesario
    }
  }
  // Función para verificar si un usuario existe y validar su contraseña
  async loginUser(email: string, passwordInput: string) {
    try {
      const user = await this.users.where("email").equals(email).first();

      // Si no se encuentra el usuario, lanzar un error
      if (!user) {
        throw new Error("User not found");
      }

      // Validar la contraseña
      if (user.password !== passwordInput) {
        throw new Error("Invalid password");
      }

      // Devolver el usuario sin la contraseña
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error; // Manejar el error según sea necesario
    }
  }
  // Función para obtener los detalles de un doctor específico por su ID
  async getDoctorById(doctorId: number) {
    try {
      console.log("doctorId", doctorId);

      // Obtener el doctor por su ID
      const doctor = await this.doctors.where("id").equals(doctorId).first();

      // Si no se encuentra el doctor, lanzar un error
      if (!doctor) {
        throw new Error("Doctor not found");
      }

      // Obtener el horario del doctor
      const schedule = await this.doctorSchedules
        .where("doctorId")
        .equals(doctor.id)
        .toArray();

      // Obtener los servicios del doctor
      const services = await this.doctorServices
        .where("doctorId")
        .equals(doctor.id)
        .toArray();

      // Obtener el nombre de cada categoría de servicio del doctor
      const servicesWithCategory = await Promise.all(
        services.map(async (service) => {
          const category = await this.serviceCategories
            .where("id")
            .equals(service.serviceCategoryId)
            .first();

          // Devolver el servicio con el nombre de la categoría
          return {
            ...service,
            categoryName: category ? category.name : "Unknown",
          };
        })
      );

      // Obtener los datos de usuario del doctor (firstName, lastName, profilePicture)
      const user = await this.users.where("id").equals(doctor.userId).first();

      // Obtener el nombre de la especialidad del doctor
      const specialty = await this.specialties
        .where("id")
        .equals(doctor.specialty)
        .first();

      // Devolver un objeto con la información del doctor, su horario, servicios y especialidad
      return {
        doctor: {
          ...doctor,
          firstName: user?.firstName || "Unknown",
          lastName: user?.lastName || "Unknown",
          profilePicture: user?.profilePicture || null,
          specialty: specialty ? specialty.name : "Unknown", // Agregar el nombre de la especialidad
        },
        schedule,
        services: servicesWithCategory,
      };
    } catch (error) {
      console.error("Error fetching doctor details by ID:", error);
      throw error; // Manejar el error según sea necesario
    }
  }
  // Función para obtener doctores por ID de especialidad y su horario y servicios
  async getDoctorsBySpecialty(specialtyId: number) {
    try {
      // Obtener doctores que coincidan con el specialtyId
      const doctors = await this.doctors
        .where("specialty")
        .equals(specialtyId)
        .toArray();

      // Si no se encuentran doctores, lanzar un error
      if (!doctors.length) {
        throw new Error("No doctors found for this specialty");
      }

      // Crear un array para almacenar los resultados
      const doctorDetails = await Promise.all(
        doctors.map(async (doctor) => {
          // Obtener el horario del doctor
          const schedule = await this.doctorSchedules
            .where("doctorId")
            .equals(doctor.id)
            .toArray();

          // Obtener los servicios del doctor
          const services = await this.doctorServices
            .where("doctorId")
            .equals(doctor.id)
            .toArray();

          // Obtener el nombre de cada categoría de servicio del doctor
          const servicesWithCategory = await Promise.all(
            services.map(async (service) => {
              const category = await this.serviceCategories
                .where("id")
                .equals(service.serviceCategoryId)
                .first(); // Devolver el servicio con el nombre de la categoría
              return {
                ...service,
                categoryName: category ? category.name : "Unknown",
              };
            })
          );

          // Obtener los datos de usuario del doctor (firstName, lastName, profilePicture)
          const user = await this.users.where("id").equals(doctor.id).first();

          console.log("servicesWithCategory", servicesWithCategory);

          // Devolver un objeto con la información del doctor, su horario y servicios
          return {
            doctor: {
              ...doctor,
              firstName: user?.firstName || "Unknown",
              lastName: user?.lastName || "Unknown",
              profilePicture: user?.profilePicture || null,
            },
            schedule,
            servicesWithCategory,
          };
        })
      );

      return doctorDetails;
    } catch (error) {
      console.error("Error fetching doctors details by specialty:", error);
      throw error; // Manejar el error según sea necesario
    }
  }
  async getServicesBySpecialty(specialtyId: number) {
    try {
      console.log("specialtyId", specialtyId);

      // Obtener doctores que coincidan con el specialtyId
      const services = await this.serviceCategories
        .where("specialtyId")
        .equals(specialtyId)
        .toArray();
      return services;
    } catch (error) {
      console.error("Error fetching doctors details by specialty:", error);
      throw error; // Manejar el error según sea necesario
    }
  }
}

// Exporta la instancia de la base de datos
export const db = new HealthCareDB();
db.on("populate", populate);
