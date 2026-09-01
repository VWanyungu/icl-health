import { useState } from 'react'

import { INITIAL_PATIENTS } from '../lib/database.js'
import type { DashboardPatient, Patient } from '../lib/database.js'
import { patientsDb } from '../lib/database.js'

export function usePatients() {
  const [patients, setPatients] = useState<DashboardPatient[]>(INITIAL_PATIENTS)

  const getPatientById = (id: string) => {
    return patientsDb.getPatientById(id)
  }

  const addPatient = (patient: Omit<Patient, 'id'>): DashboardPatient => {
    const newPatient: DashboardPatient = {
      ...patient,
      bmi: Math.floor(Math.random() * 40),
      lastAssessmentDate: new Date().toISOString().split('T')[0],
      id: Math.floor(Math.random() * 10000) + 1,
    }
    setPatients((prev) => [newPatient, ...prev])
    return newPatient
  }

  const getAllPatients = () => {
    return patientsDb.getAllPatients()
  }

  return {
    patients,
    getPatientById,
    getAllPatients,
    addPatient,
  }
}
