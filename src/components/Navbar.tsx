import { useState } from "react";
import { Link } from "react-router-dom";
import useUserStore from "../context/userStore"; // Ajusta la ruta según sea necesario
import { Button } from "./ui/button";
import { FaBars, FaTimes } from "react-icons/fa"; // Importa los íconos de hamburguesa y cerrar

export default function Navbar() {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);

  // Estado para manejar la apertura del menú móvil
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Función para alternar el menú móvil
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="flex justify-between items-center p-4 md:px-8 lg:px-12 bg-gray-900 text-white relative">
      <div className="flex items-center">
        <Link to="/" className="text-white text-xl font-bold">
          MEDIXX
        </Link>
      </div>
      <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center space-x-4">
        <Link to="/pricing" className="hover:text-gray-300">
          Pricing
        </Link>
        <Link
          to={isAuthenticated ? `/appointments/${user?.id}` : "/appointments"}
          className="hover:text-gray-300"
        >
          Appointments
        </Link>
        <Link
          to={isAuthenticated ? `/clinic-record/${user?.id}` : "/clinic-record"}
          className="hover:text-gray-300"
        >
          Clinic History
        </Link>
      </nav>
      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <div className="hidden md:flex items-center gap-4">
            <Link to={"profile"}>{user?.name}</Link>
            <Button className="text-white" onClick={logout}>
              Cerrar Sesión
            </Button>
          </div>
        ) : (
          <Link to="/auth/login" className="hidden md:block">
            <Button className="text-white">Login</Button>
          </Link>
        )}
        <Button
          onClick={toggleMobileMenu}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </Button>
      </div>
      {isMobileMenuOpen && (
        <nav className="absolute top-16 left-0 w-full bg-gray-800 text-white md:hidden z-10">
          <ul className="flex flex-col items-center p-4 space-y-4">
            <Link
              to="/pricing"
              className="hover:text-gray-300"
              onClick={toggleMobileMenu}
            >
              Pricing
            </Link>
            <Link
              to={`/appointments${user?.id}`}
              className="hover:text-gray-300"
              onClick={toggleMobileMenu}
            >
              Appointments
            </Link>
            <Link
              to={`/clinic-record/${user?.id}`}
              className="hover:text-gray-300"
              onClick={toggleMobileMenu}
            >
              Clinic History
            </Link>
            {isAuthenticated ? (
              <div className="flex flex-col items-center gap-4 mt-4">
                <Link to={"profile"}>{user?.name}</Link>
                <Button
                  className="text-white"
                  onClick={() => {
                    logout();
                    toggleMobileMenu();
                  }}
                >
                  Cerrar Sesión
                </Button>
              </div>
            ) : (
              <Link to="/auth/login" onClick={toggleMobileMenu}>
                <Button className="text-white">Iniciar Sesión</Button>
              </Link>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}
