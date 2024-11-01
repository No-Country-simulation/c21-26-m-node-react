import { useState } from "react";
import { FaUserCircle, FaTrash, FaDownload } from "react-icons/fa"; // Import icons
import { Button } from "../../components/ui/button";
import { Patient } from "../../lib/interfaces/users/Patient";
import patientData from "../../lib/data/patients.json"; // Import mock patient data

export default function PatientProfilePage() {
  const [patient] = useState<Patient>(patientData[0]);

  // Function to handle logout
  const handleLogout = () => {
    // Implement your logout logic here
    // For example, clear authentication tokens and redirect to login page
    alert("Logged out successfully");
  };

  // Function to handle data export
  const handleExportData = () => {
    // Simulate data export by creating a JSON blob
    const dataStr = JSON.stringify(patient, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // Create a temporary link to trigger download
    const link = document.createElement("a");
    link.href = url;
    link.download = `${patient.name.replace(" ", "_")}_data.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Function to handle account deletion
  const handleDeleteAccount = () => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (confirmDeletion) {
      // Implement your account deletion logic here
      // For example, make an API call to delete the account
      alert("Your account has been deleted successfully.");
      // Redirect to the homepage or login page after deletion
    }
  };

  return (
    <main className="p-4 md:px-8 lg:px-12 min-h-screen gap-10 flex flex-col mt-10">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg p-6">
        {/* Patient's Photo */}
        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          {patient.profilePicture ? (
            <img
              src={patient.profilePicture}
              alt={`Photo of ${patient.name}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-500">
              <FaUserCircle size={64} />
            </div>
          )}
        </div>

        {/* Patient's Information */}
        <div className="flex-1 ml-0 md:ml-6 mt-6 md:mt-0">
          <h1 className="text-2xl font-bold">{patient.name}</h1>

          {/* Additional Information */}
          <div className="mt-4">
            <p className="text-gray-800">
              <span className="font-semibold">Email:</span> {patient.email}
            </p>
            <p className="text-gray-800 mt-2">
              <span className="font-semibold">Phone:</span> {patient.phone}
            </p>
            <p className="text-gray-800 mt-2">
              <span className="font-semibold">Address:</span> {patient.address}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col md:flex-row gap-4">
            {/* Logout Button */}
            <Button
              className="w-full md:w-auto flex items-center justify-center"
              onClick={handleLogout}
              aria-label="Logout"
            >
              Logout
            </Button>

            {/* Export Data Button */}
            <Button
              className="w-full md:w-auto flex items-center justify-center bg-blue-500 hover:bg-blue-600"
              onClick={handleExportData}
              aria-label="Export Data"
            >
              <FaDownload className="mr-2" /> Export Data
            </Button>

            {/* Delete Account Button */}
            <Button
              className="w-full md:w-auto flex items-center justify-center bg-red-500 hover:bg-red-600"
              onClick={handleDeleteAccount}
              aria-label="Delete Account"
            >
              <FaTrash className="mr-2" /> Delete Account
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
