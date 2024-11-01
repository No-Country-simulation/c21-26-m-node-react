import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useNavigate } from "react-router-dom";

interface PatientFormInputs {
  firstName: string;
  lastName: string;
  dob: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientFormInputs>();
  const navigate = useNavigate();

  const onSubmit = (data: PatientFormInputs) => {
    // Aquí podrías enviar los datos al backend
    console.log("Patient Data:", data);
    // Después de registrarse, podrías redirigir al login o dashboard
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold">Registro de Paciente</h2>
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
        {/* Address */}
        <div>
          <Label htmlFor="address">Dirección</Label>
          <Input
            id="address"
            {...register("address", {
              required: "La dirección es obligatoria",
            })}
          />
          {errors.address && (
            <p className="text-red-500">{errors.address.message}</p>
          )}
        </div>
        {/* Phone */}
        <div>
          <Label htmlFor="phone">Teléfono</Label>
          <Input
            id="phone"
            type="tel"
            {...register("phone", { required: "El teléfono es obligatorio" })}
          />
          {errors.phone && (
            <p className="text-red-500">{errors.phone.message}</p>
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

export default Register;
