export interface AuthResponse {
  role: string;
  isAuthenticated: boolean;
  user: {
    id: number;
    name: string;
    email: string;
    age: number;
    phone: string;
    address: string;
    profilePicture?: string;
  };
}
