import { db } from "./database";

export async function populate() {
  try {
    // Agregar usuarios
    const user1 = await db.users.add({
      email: "jorge@x.com",
      password: "123456",
      role: "doctor",
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      isActive: true,
      profileCompleted: true,
      profilePicture: "path/to/profile/picture1.jpg",
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "1234567890",
    });

    const user2 = await db.users.add({
      email: "jane@x.com",
      password: "123456",
      role: "patient",
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      isActive: true,
      profileCompleted: true,
      profilePicture: "path/to/profile/picture2.jpg",
      firstName: "Jane",
      lastName: "Smith",
      phoneNumber: "0987654321",
    });

    const user3 = await db.users.add({
      email: "michael.jones@example.com",
      password: "password789",
      role: "doctor",
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      isActive: true,
      profileCompleted: false,
      profilePicture: "path/to/profile/picture3.jpg",
      firstName: "Michael",
      lastName: "Jones",
      phoneNumber: "5556667777",
    });

    const user4 = await db.users.add({
      email: "laura.brown@example.com",
      password: "password101",
      role: "patient",
      createdAt: new Date().toISOString(),
      lastLogin: null,
      isActive: false,
      profileCompleted: true,
      profilePicture: "path/to/profile/picture4.jpg",
      firstName: "Laura",
      lastName: "Brown",
      phoneNumber: "5647382910",
    });

    const user5 = await db.users.add({
      email: "chris.evans@example.com",
      password: "password202",
      role: "admin",
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      isActive: true,
      profileCompleted: true,
      profilePicture: "path/to/profile/picture5.jpg",
      firstName: "Chris",
      lastName: "Evans",
      phoneNumber: "6738492011",
    });

    const user6 = await db.users.add({
      email: "nina.kelly@example.com",
      password: "password303",
      role: "doctor",
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      isActive: true,
      profileCompleted: true,
      profilePicture: "path/to/profile/picture6.jpg",
      firstName: "Nina",
      lastName: "Kelly",
      phoneNumber: "7849302830",
    });

    const user7 = await db.users.add({
      email: "oliver.lee@example.com",
      password: "password404",
      role: "patient",
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      isActive: true,
      profileCompleted: false,
      profilePicture: "path/to/profile/picture7.jpg",
      firstName: "Oliver",
      lastName: "Lee",
      phoneNumber: "6758492032",
    });

    const user8 = await db.users.add({
      email: "lucy.morgan@example.com",
      password: "password505",
      role: "doctor",
      createdAt: new Date().toISOString(),
      lastLogin: null,
      isActive: true,
      profileCompleted: false,
      profilePicture: "path/to/profile/picture8.jpg",
      firstName: "Lucy",
      lastName: "Morgan",
      phoneNumber: "7842039485",
    });

    const cardiologyId = await db.specialties.add({
      name: "Cardiología",
      description:
        "Especialidad médica que se ocupa del corazón y el sistema circulatorio.",
    });

    const dermatologyId = await db.specialties.add({
      name: "Dermatología",
      description: "Especialidad que se enfoca en la piel, cabello y uñas.",
    });

    const pediatricsId = await db.specialties.add({
      name: "Pediatría",
      description: "Rama de la medicina que trata a los niños y adolescentes.",
    });

    const psychiatryId = await db.specialties.add({
      name: "Psiquiatría",
      description:
        "Especialidad médica que se enfoca en el diagnóstico y tratamiento de trastornos mentales.",
    });

    // Agregar doctores
    const doctor1 = await db.doctors.add({
      userId: user1,
      specialtyId: cardiologyId,
      rating: 2.8,
      reviewsCount: 120,
      consultations: 50,
      customCommissionRate: 0.15,
    });

    const doctor2 = await db.doctors.add({
      userId: user3,
      specialty: dermatologyId,
      rating: 3.5,
      reviewsCount: 80,
      consultations: 30,
      customCommissionRate: 0.1,
    });

    const doctor3 = await db.doctors.add({
      userId: user6,
      specialty: pediatricsId,
      rating: 4.9,
      reviewsCount: 60,
      consultations: 25,
      profilePicture: "path/to/profile/picture6.jpg",
      customCommissionRate: 0.12,
    });

    const doctor4 = await db.doctors.add({
      userId: user8,
      specialty: psychiatryId,
      rating: 1.7,
      reviewsCount: 40,
      consultations: 15,
      profilePicture: "path/to/profile/picture8.jpg",
      customCommissionRate: 0.13,
    });

    const generalHealthServiceCategory = await db.serviceCategories.add({
      specialtyId: null, // General, no está vinculado a una especialidad específica
      name: "Servicios Generales de Salud",
      description:
        "Servicios generales relacionados con la salud y el bienestar.",
    });

    const preventiveCareServiceCategory = await db.serviceCategories.add({
      specialtyId: null, // General, no está vinculado a una especialidad específica
      name: "Cuidados Preventivos",
      description:
        "Servicios enfocados en la prevención de enfermedades y promoción de la salud.",
    });

    // Agregar categorías de servicios para Cardiología
    const cardiologyService1 = await db.serviceCategories.add({
      specialtyId: cardiologyId,
      name: "Electrocardiogramas",
      description: "Prueba que mide la actividad eléctrica del corazón.",
    });

    const cardiologyService2 = await db.serviceCategories.add({
      specialtyId: cardiologyId,
      name: "Ecosonogramas Cardiológicos",
      description:
        "Ultrasonido del corazón para evaluar su estructura y función.",
    });

    // Agregar categorías de servicios para Dermatología
    const dermatologyService1 = await db.serviceCategories.add({
      specialtyId: dermatologyId,
      name: "Tratamientos para Psoriasis",
      description: "Servicios relacionados con el tratamiento de la psoriasis.",
    });

    const dermatologyService2 = await db.serviceCategories.add({
      specialtyId: dermatologyId,
      name: "Biopsias de Piel",
      description:
        "Procedimiento para examinar muestras de piel en laboratorio.",
    });

    // Agregar categorías de servicios para Pediatría
    const pediatricsService1 = await db.serviceCategories.add({
      specialtyId: pediatricsId,
      name: "Control de Crecimiento",
      description:
        "Evaluaciones regulares para monitorear el crecimiento infantil.",
    });

    const pediatricsService2 = await db.serviceCategories.add({
      specialtyId: pediatricsId,
      name: "Tratamientos de Asma",
      description:
        "Servicios relacionados con el diagnóstico y tratamiento del asma.",
    });

    // Agregar categorías de servicios para Psiquiatría
    const psychiatryService1 = await db.serviceCategories.add({
      specialtyId: psychiatryId,
      name: "Terapia Cognitivo-Conductual",
      description: "Terapia psicológica para abordar trastornos mentales.",
    });

    const psychiatryService2 = await db.serviceCategories.add({
      specialtyId: psychiatryId,
      name: "Evaluaciones Psicológicas",
      description: "Evaluaciones para determinar condiciones de salud mental.",
    });

    await db.doctorServices.add({
      doctorId: doctor1,
      serviceCategoryId: generalHealthServiceCategory, // ID de Servicios Generales de Salud
      price: 50, // Precio en la moneda correspondiente
    });

    await db.doctorServices.add({
      doctorId: doctor2,
      serviceCategoryId: preventiveCareServiceCategory, // ID de Cuidados Preventivos
      price: 40, // Precio en la moneda correspondiente
    });

    // Servicios de Cardiología
    await db.doctorServices.add({
      doctorId: doctor1,
      serviceCategoryId: cardiologyService1, // ID de Electrocardiogramas
      price: 70, // Precio en la moneda correspondiente
    });

    await db.doctorServices.add({
      doctorId: doctor1,
      serviceCategoryId: cardiologyService2, // ID de Ecosonogramas Cardiológicos
      price: 120, // Precio en la moneda correspondiente
    });

    // Servicios de Dermatología
    await db.doctorServices.add({
      doctorId: doctor2,
      serviceCategoryId: dermatologyService1, // ID de Tratamientos para Psoriasis
      price: 80, // Precio en la moneda correspondiente
    });

    await db.doctorServices.add({
      doctorId: doctor2,
      serviceCategoryId: dermatologyService2, // ID de Biopsias de Piel
      price: 100, // Precio en la moneda correspondiente
    });

    // Servicios de Pediatría
    await db.doctorServices.add({
      doctorId: doctor3,
      serviceCategoryId: pediatricsService1, // ID de Control de Crecimiento
      price: 60, // Precio en la moneda correspondiente
    });

    await db.doctorServices.add({
      doctorId: doctor3,
      serviceCategoryId: pediatricsService2, // ID de Tratamientos de Asma
      price: 90, // Precio en la moneda correspondiente
    });

    // Servicios de Psiquiatría
    await db.doctorServices.add({
      doctorId: doctor4,
      serviceCategoryId: psychiatryService1, // ID de Terapia Cognitivo-Conductual
      price: 110, // Precio en la moneda correspondiente
    });

    await db.doctorServices.add({
      doctorId: doctor4,
      serviceCategoryId: psychiatryService2, // ID de Evaluaciones Psicológicas
      price: 130, // Precio en la moneda correspondiente
    });

    // Agregar citas
    const appointment1 = await db.appointments.add({
      date: "2024-10-30",
      time: "10:00",
      doctorId: doctor1,
      userId: user1,
      doctorServiceId: 1,
      reason: "Regular check-up",
      location: "Health Center A",
      isPast: false,
      appointmentType: "in-person",
      consultationFee: 100,
      reservationFee: 10,
      commissionFee: 5,
      canceled: false,
    });

    const appointment2 = await db.appointments.add({
      date: "2024-11-15",
      time: "14:00",
      doctorId: doctor2,
      userId: user2,
      doctorServiceId: 2,
      reason: "Skin check",
      location: "Health Center B",
      isPast: false,
      appointmentType: "online",
      consultationFee: 80,
      reservationFee: 8,
      commissionFee: 4,
      canceled: false,
    });

    const appointment3 = await db.appointments.add({
      date: "2024-09-20",
      time: "12:00",
      doctorId: doctor1,
      userId: user2,
      doctorServiceId: 1,
      reason: "Follow-up",
      location: "Health Center A",
      isPast: true,
      appointmentType: "in-person",
      consultationFee: 90,
      reservationFee: 9,
      commissionFee: 4.5,
      canceled: true,
    });

    // Agregar citas adicionales
    const appointment4 = await db.appointments.add({
      date: "2024-12-01",
      time: "09:00",
      doctorId: doctor3,
      userId: user3,
      doctorServiceId: 3,
      reason: "Pediatric consultation",
      location: "Health Center C",
      isPast: false,
      appointmentType: "in-person",
      consultationFee: 120,
      reservationFee: 12,
      commissionFee: 6,
      canceled: false,
    });

    const appointment5 = await db.appointments.add({
      date: "2024-11-25",
      time: "16:00",
      doctorId: doctor4,
      userId: user4,
      doctorServiceId: 4,
      reason: "Psychiatric evaluation",
      location: "Health Center D",
      isPast: false,
      appointmentType: "online",
      consultationFee: 150,
      reservationFee: 15,
      commissionFee: 7.5,
      canceled: false,
    });

    const appointment6 = await db.appointments.add({
      date: "2024-12-05",
      time: "11:00",
      doctorId: doctor2,
      userId: user5,
      doctorServiceId: 2,
      reason: "Dermatology consultation",
      location: "Health Center B",
      isPast: false,
      appointmentType: "in-person",
      consultationFee: 85,
      reservationFee: 8.5,
      commissionFee: 4.25,
      canceled: false,
    });

    const appointment7 = await db.appointments.add({
      date: "2024-12-20",
      time: "15:00",
      doctorId: doctor3,
      userId: user7,
      doctorServiceId: 3,
      reason: "Routine child check-up",
      location: "Health Center C",
      isPast: false,
      appointmentType: "in-person",
      consultationFee: 100,
      reservationFee: 10,
      commissionFee: 5,
      canceled: false,
    });

    const appointment8 = await db.appointments.add({
      date: "2024-11-10",
      time: "10:30",
      doctorId: doctor4,
      userId: user6,
      doctorServiceId: 4,
      reason: "Initial psychiatric assessment",
      location: "Health Center D",
      isPast: false,
      appointmentType: "online",
      consultationFee: 140,
      reservationFee: 14,
      commissionFee: 7,
      canceled: false,
    });

    // Agregar registros clínicos
    await db.clinicalRecords.bulkAdd([
      {
        appointmentId: appointment1,
        date: new Date().toISOString(),
        diagnosis: "Healthy",
        prescriptions: "Vitamin D",
        notes: "Patient is in good health.",
        attachments: null,
      },
      {
        appointmentId: appointment2,
        date: new Date().toISOString(),
        diagnosis: "Mild eczema",
        prescriptions: "Topical cream",
        notes: "Recommended follow-up in 2 months.",
        attachments: null,
      },
      {
        appointmentId: appointment3,
        date: new Date().toISOString(),
        diagnosis: "Check-up post-treatment",
        prescriptions: "Continue topical cream",
        notes: "Improvement noted.",
        attachments: "path/to/attachment1.jpg",
      },
      {
        appointmentId: appointment4,
        date: new Date().toISOString(),
        diagnosis: "Mild respiratory infection",
        prescriptions: "Amoxicillin, rest",
        notes: "Monitor if symptoms worsen in 3 days.",
        attachments: null,
      },
      {
        appointmentId: appointment5,
        date: new Date().toISOString(),
        diagnosis: "Anxiety management",
        prescriptions: "Therapy sessions, mindfulness exercises",
        notes: "Patient is responsive to therapy.",
        attachments: null,
      },
      {
        appointmentId: appointment6,
        date: new Date().toISOString(),
        diagnosis: "Eczema flare-up",
        prescriptions: "Hydrocortisone cream",
        notes: "Recommend monthly check-ups.",
        attachments: "path/to/attachment2.jpg",
      },
      {
        appointmentId: appointment7,
        date: new Date().toISOString(),
        diagnosis: "Routine wellness check",
        prescriptions: "Multivitamin for children",
        notes: "Patient is in good health.",
        attachments: null,
      },
      {
        appointmentId: appointment8,
        date: new Date().toISOString(),
        diagnosis: "Generalized anxiety disorder",
        prescriptions: "Therapy sessions, SSRIs",
        notes: "Patient shows improvement in mood.",
        attachments: null,
      },
    ]);

    // Agregar reseñas
    await db.reviews.bulkAdd([
      {
        appointmentId: appointment1,
        userId: user1,
        doctorId: doctor1,
        rating: 5,
        comment: "Excellent doctor, very attentive!",
        createdAt: new Date().toISOString(),
      },
      {
        appointmentId: appointment2,
        userId: user2,
        doctorId: doctor2,
        rating: 4,
        comment: "Good consultation, helped with my skin issue.",
        createdAt: new Date().toISOString(),
      },
      {
        appointmentId: appointment3,
        userId: user2,
        doctorId: doctor1,
        rating: 3,
        comment: "Doctor was helpful, but the wait time was long.",
        createdAt: new Date().toISOString(),
      },
      {
        appointmentId: appointment4,
        userId: user3,
        doctorId: doctor3,
        rating: 5,
        comment: "Great doctor, very caring and attentive.",
        createdAt: new Date().toISOString(),
      },
      {
        appointmentId: appointment5,
        userId: user4,
        doctorId: doctor4,
        rating: 4,
        comment: "Helpful consultation, felt understood.",
        createdAt: new Date().toISOString(),
      },
      {
        appointmentId: appointment6,
        userId: user5,
        doctorId: doctor2,
        rating: 5,
        comment: "Very knowledgeable, addressed all my concerns.",
        createdAt: new Date().toISOString(),
      },
      {
        appointmentId: appointment7,
        userId: user7,
        doctorId: doctor3,
        rating: 4,
        comment: "Good experience, friendly doctor.",
        createdAt: new Date().toISOString(),
      },
      {
        appointmentId: appointment8,
        userId: user6,
        doctorId: doctor4,
        rating: 5,
        comment: "Exceptional service, made me feel comfortable.",
        createdAt: new Date().toISOString(),
      },
    ]);

    // Agregar horarios de doctores
    await db.doctorSchedules.bulkAdd([
      // Horarios para el Doctor 1 (Cardiología)
      { doctorId: doctor1, dayOfWeek: 1, startTime: "09:00", endTime: "17:00" }, // Lunes
      { doctorId: doctor1, dayOfWeek: 3, startTime: "09:00", endTime: "17:00" }, // Miércoles
      { doctorId: doctor1, dayOfWeek: 5, startTime: "10:00", endTime: "14:00" }, // Viernes
      { doctorId: doctor1, dayOfWeek: 6, startTime: "09:00", endTime: "13:00" }, // Sábado

      // Horarios para el Doctor 2 (Dermatología)
      { doctorId: doctor2, dayOfWeek: 2, startTime: "10:00", endTime: "18:00" }, // Martes
      { doctorId: doctor2, dayOfWeek: 4, startTime: "12:00", endTime: "19:00" }, // Jueves
      { doctorId: doctor2, dayOfWeek: 6, startTime: "09:00", endTime: "12:00" }, // Sábado

      // Horarios para el Doctor 3 (Pediatría)
      { doctorId: doctor3, dayOfWeek: 1, startTime: "08:00", endTime: "16:00" }, // Lunes
      { doctorId: doctor3, dayOfWeek: 3, startTime: "10:00", endTime: "18:00" }, // Miércoles
      { doctorId: doctor3, dayOfWeek: 4, startTime: "09:00", endTime: "17:00" }, // Jueves
      { doctorId: doctor3, dayOfWeek: 6, startTime: "08:00", endTime: "12:00" }, // Sábado

      // Horarios para el Doctor 4 (Psiquiatría)
      { doctorId: doctor4, dayOfWeek: 1, startTime: "11:00", endTime: "15:00" }, // Lunes
      { doctorId: doctor4, dayOfWeek: 2, startTime: "10:00", endTime: "16:00" }, // Martes
      { doctorId: doctor4, dayOfWeek: 5, startTime: "10:00", endTime: "16:00" }, // Viernes
      { doctorId: doctor4, dayOfWeek: 7, startTime: "10:00", endTime: "14:00" }, // Domingo
    ]);

    console.log("Database populated with additional data.");
  } catch (error) {
    console.error("Error populating database:", error);
  }
}
