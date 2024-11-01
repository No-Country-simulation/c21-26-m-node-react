import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import useUserStore from "../../context/userStore"; // Estado global con zustand
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Link } from "react-router-dom";
import { db } from "../../lib/data/database";

// Definir la estructura de los datos del formulario
interface LoginFormInputs {
  emailOrPhone: string;
  password: string;
}

export default function Login() {
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  // Manejar el envío del formulario
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const user = await db.loginUser(data.emailOrPhone, data.password); // Usar la función de login
      setUser(user); // Configura el usuario en el estado global
      navigate("/"); // Redirigir al dashboard después del login
    } catch (error) {
      console.error("Login failed:", error);
      alert(error.message); // Mostrar error al usuario
    }
  };

  return (
    <main className="p-4 min-h-screen gap-10 flex flex-col items-center mt-10">
      <h1 className="text-2xl">Iniciar Sesión</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-1/2 flex flex-col gap-6"
      >
        <div>
          <Label htmlFor="emailOrPhone">Email</Label>
          <Input
            id="emailOrPhone"
            type="text"
            {...register("emailOrPhone", {
              required: "Este campo es requerido",
            })}
            className="w-full"
          />
          {errors.emailOrPhone && (
            <p className="text-red-500 text-sm">
              {errors.emailOrPhone.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            {...register("password", {
              required: "La contraseña es requerida",
            })}
            className="w-full"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full">
          Iniciar Sesión
        </Button>
      </form>
      <div className="flex gap-3 w-1/2">
        <p>Do not have an account</p>
        <Link to={"/auth/register"} className="text-blue-600">
          Register
        </Link>
      </div>
    </main>
  );
}
