import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";

// Definir la estructura de los datos del formulario
interface NotesFormInputs {
  notes: string;
}

const Records: React.FC = () => {
  // Usar react-hook-form para manejar el formulario
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NotesFormInputs>();

  // Nombre del paciente que viene desde el backend
  const patientName = "Juan Pérez"; // Simulación de nombre obtenido del backend

  // Manejar el envío del formulario
  const onSubmit: SubmitHandler<NotesFormInputs> = (data) => {
    console.log("Notas guardadas:", data); // Aquí puedes manejar la lógica de envío
    alert(`Notas guardadas para ${patientName}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Nombre del paciente */}
      <h1 className="text-2xl mb-4">Paciente: {patientName}</h1>

      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-3/4 space-y-4">
        {/* Área para las notas */}
        <div>
          <Label htmlFor="notes" className="mb-1">
            Notas
          </Label>
          <Textarea
            id="notes"
            {...register("notes", { required: "Las notas son requeridas" })}
            rows={10}
            className="w-full"
          />
          {errors.notes && (
            <p className="text-red-500 text-sm">{errors.notes.message}</p>
          )}
        </div>

        {/* Botón de envío */}
        <Button type="submit" className="w-full text-white">
          Save Notes
        </Button>
      </form>
    </div>
  );
};

export default Records;
