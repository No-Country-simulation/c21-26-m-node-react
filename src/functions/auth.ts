import { AuthResponse } from "../lib/interfaces/Auth";

export const verifyAuth = async (): Promise<AuthResponse> => {
  // const response = await fetch("http://localhost:3000/api/verify", {
  //   method: "GET",
  //   credentials: "include", // Envía la cookie con el JWT
  // });

  const response = {
    ok: true,
    json: async () => ({
      role: "patient",
      isAuthenticated: true,
      user: {
        id: 1,
        name: "Juan Pérez",
        email: "juan.perez@example.com",
        age: 35,
        phone: "321-654-0987",
        address: "654 Calle Cuarta, Ciudad, País",
        profilePicture: "https://example.com/profiles/juan_perez.jpg",
      },
    }),
  };

  if (!response.ok) {
    throw new Error("No autenticado");
  }

  const data: AuthResponse = await response.json();
  return data;
};
