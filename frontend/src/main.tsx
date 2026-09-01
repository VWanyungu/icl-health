import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './context/AuthContext.tsx'
import Protected from './components/Protected.tsx'
import Layout from './components/Layout.tsx'
import Login from './pages/auth/Login.tsx'
import SignUp from './pages/auth/SignUp.tsx'
import PatientRegistration from './pages/PatientRegistration.tsx'
import Vitals from './pages/Vitals.tsx'
import GeneralAssessment from './pages/GeneralAssessment.tsx'
import OverweightAssessment from './pages/OverweightAssessment.tsx'
import Patients from './pages/Patients.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route
            element={
              <Protected>
                <Layout />
              </Protected>
            }
          >
            <Route path="/" element={<Patients />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/patient-registration" element={<PatientRegistration />} />
            <Route path="/vitals/:id" element={<Vitals />} />
            <Route path="/general-assessment/:id" element={<GeneralAssessment />} />
            <Route path="/overweight-assessment/:id" element={<OverweightAssessment />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)


