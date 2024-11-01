import React from "react";
import Navbar from "./components/Navbar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col">
      <Navbar />
      {children}
      <footer className="bg-gray-900 text-white text-center p-4 md:px-8 lg:px-16">
        &copy; {new Date().getFullYear()} MedicLineX
      </footer>
    </div>
  );
};

export default Layout;
