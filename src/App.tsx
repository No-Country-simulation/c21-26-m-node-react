import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import PrivateRoute from "./PrivateRoute";
import Login from "./pages/forms/Login";
import Register from "./pages/forms/Register";
import RegisterDoctor from "./pages/forms/RegisterDoctor";
import DoctorNotes from "./pages/forms/Records";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Pricing from "./pages/Pricing";
import Appointments from "./pages/appointments/DoctorAppointments";
import PatientsAppointments from "./pages/appointments/PatientsAppointment";
import Patients from "./pages/medics/Patients";
import MedicsProfile from "./pages/profiles/ProfileMedics";
import PatientProfilePage from "./pages/profiles/ProfilePatients";
import PatientClinicalHistory from "./pages/clinical_records/PatientClinicalRecord";
import PageAppointments from "./pages/appointments/Page";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<PatientProfilePage />} />
          <Route path="/profile/medics/:id" element={<MedicsProfile />} />

          <Route path="/medics/appointments" element={<Appointments />} />
          <Route path="/appointments" element={<PageAppointments />} />
          <Route path="/appointments/:id" element={<PageAppointments />} />
          {/* <Route
            path="/medics/clinic-history"
            element={<PatientClinicalHistory />}
          /> */}
          <Route
            path="/clinic-record/:id"
            element={<PatientClinicalHistory />}
          />

          <Route path="/medics/patients" element={<Patients />} />
          <Route path="/medics/record" element={<DoctorNotes />} />

          <Route path="/privacy_policy" element={<PrivacyPolicy />} />
          <Route path="/pricing" element={<Pricing />} />

          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/register/doctor" element={<RegisterDoctor />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DoctorNotes />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}
