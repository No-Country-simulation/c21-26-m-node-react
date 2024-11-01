import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const deleteAccount = (navigate) => {
  // Confirmar la acción con el usuario
  const confirmed = window.confirm(
    "Are you sure you want to delete your account? This action cannot be undone."
  );
  if (confirmed) {
    // Implementa tu lógica de eliminación de cuenta aquí
    // Por ejemplo, enviar una solicitud al backend para eliminar la cuenta
    alert("Your account has been deleted successfully.");
    navigate("/signup"); // Redirige a la página de registro o despedida
  }
};

export const exportData = (appointments) => {
  if (!appointments) return;
  // Crear un archivo JSON de las citas y descargarlo
  const dataStr = JSON.stringify(appointments, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `patient_appointments_${new Date().toISOString()}.json`;
  a.click();
  URL.revokeObjectURL(url);
};
