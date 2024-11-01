export interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
  phone?: string; // Número de teléfono (opcional)
  address?: string; // Dirección (opcional)
  profilePicture?: string; // URL de la foto de perfil (opcional)
}
