import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useNavigate } from "react-router-dom";

interface DoctorFormInputs {
  firstName: string;
  lastName: string;
  dob: string;
  schedule: string;
  specialty: string;
  email: string;
  password: string;
}

const RegisterDoctor: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DoctorFormInputs>();
  const navigate = useNavigate();

  const onSubmit = (data: DoctorFormInputs) => {
    // Aquí podrías enviar los datos al backend
    console.log("Doctor Data:", data);
    // Después de registrarse, podrías redirigir al login o dashboard
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold">Registro de Médico</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* First Name */}
        <div>
          <Label htmlFor="firstName">Nombre</Label>
          <Input
            id="firstName"
            {...register("firstName", { required: "El nombre es obligatorio" })}
          />
          {errors.firstName && (
            <p className="text-red-500">{errors.firstName.message}</p>
          )}
        </div>
        {/* Last Name */}
        <div>
          <Label htmlFor="lastName">Apellido</Label>
          <Input
            id="lastName"
            {...register("lastName", {
              required: "El apellido es obligatorio",
            })}
          />
          {errors.lastName && (
            <p className="text-red-500">{errors.lastName.message}</p>
          )}
        </div>
        {/* Date of Birth */}
        <div>
          <Label htmlFor="dob">Fecha de Nacimiento</Label>
          <Input
            id="dob"
            type="date"
            {...register("dob", {
              required: "La fecha de nacimiento es obligatoria",
            })}
          />
          {errors.dob && <p className="text-red-500">{errors.dob.message}</p>}
        </div>
        {/* Schedule */}
        <div>
          <Label htmlFor="schedule">Horario</Label>
          <Input
            id="schedule"
            {...register("schedule", { required: "El horario es obligatorio" })}
          />
          {errors.schedule && (
            <p className="text-red-500">{errors.schedule.message}</p>
          )}
        </div>
        {/* Specialty */}
        <div>
          <Label htmlFor="specialty">Especialidad</Label>
          <Input
            id="specialty"
            {...register("specialty", {
              required: "La especialidad es obligatoria",
            })}
          />
          {errors.specialty && (
            <p className="text-red-500">{errors.specialty.message}</p>
          )}
        </div>
        {/* Email */}
        <div>
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input
            id="email"
            type="email"
            {...register("email", {
              required: "El correo electrónico es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Formato de correo inválido",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        {/* Password */}
        <div>
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        {/* Submit Button */}
        <Button type="submit" className="w-full text-white">
          Registrarse
        </Button>
      </form>
    </div>
  );
};

export default RegisterDoctor;
