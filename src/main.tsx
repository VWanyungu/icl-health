import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import Layout from './components/Layout.tsx'
import App from './App.tsx'
import PatientRegistration from './pages/PatientRegistration.tsx'
import Vitals from './pages/Vitals.tsx'
import GeneralAssessment from './pages/GeneralAssessment.tsx'
import OverweightAssessment from './pages/OverweightAssessment.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/patients" element={<App />} />
          <Route path="/patient-registration" element={<PatientRegistration />} />
          <Route path="/vitals/:id" element={<Vitals />} />
          <Route path="/general-assessment/:id" element={<GeneralAssessment />} />
          <Route path="/overweight-assessment/:id" element={<OverweightAssessment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
