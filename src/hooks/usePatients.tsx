import { useState } from 'react'

export interface Patient {
  id: string
  name: string
  firstName?: string
  middleName?: string
  lastName?: string
  gender?: 'Male' | 'Female'
  age: number
  bmi: number
  lastAssessmentDate: string // YYYY-MM-DD format
  dob?: string
  mrn?: string
  registrationDate?: string
}

export const INITIAL_PATIENTS: Patient[] = [
  { id: 'p-1', name: 'Kristin Watson', age: 32, bmi: 22.4, lastAssessmentDate: '2024-05-27', mrn: '521' },
  { id: 'p-2', name: 'Arlene McCoy', age: 45, bmi: 28.1, lastAssessmentDate: '2024-05-19', mrn: '521' },
  { id: 'p-3', name: 'Darrell Steward', age: 29, bmi: 24.0, lastAssessmentDate: '2024-06-21', mrn: '521' },
  { id: 'p-4', name: 'Jerome Bell', age: 58, bmi: 31.6, lastAssessmentDate: '2024-05-27', mrn: '521' },
  { id: 'p-5', name: 'Courtney Henry', age: 39, bmi: 26.8, lastAssessmentDate: '2024-10-28', mrn: '521' },
  { id: 'p-6', name: 'Bessie Cooper', age: 67, bmi: 23.5, lastAssessmentDate: '2024-04-12', mrn: '521' },
  { id: 'p-7', name: 'Eleanor Pena', age: 51, bmi: 29.4, lastAssessmentDate: '2024-05-30', mrn: '521' },
  { id: 'p-8', name: 'Annette Black', age: 24, bmi: 21.2, lastAssessmentDate: '2024-02-11', mrn: '521' },
  { id: 'p-9', name: 'Darlene Robertson', age: 42, bmi: 27.9, lastAssessmentDate: '2024-07-11', mrn: '521' },
  { id: 'p-10', name: 'Devon Lane', age: 36, bmi: 25.3, lastAssessmentDate: '2024-05-27', mrn: '521' },
  { id: 'p-11', name: 'Floyd Miles', age: 48, bmi: 33.2, lastAssessmentDate: '2024-08-14', mrn: '521' },
  { id: 'p-12', name: 'Theresa Webb', age: 53, bmi: 24.7, lastAssessmentDate: '2024-08-22', mrn: '521' },
  { id: 'p-13', name: 'Cody Fisher', age: 31, bmi: 20.9, lastAssessmentDate: '2024-09-05', mrn: '521' },
  { id: 'p-14', name: 'Esther Howard', age: 62, bmi: 30.1, lastAssessmentDate: '2024-07-19', mrn: '521' },
  { id: 'p-15', name: 'Guy Hawkins', age: 44, bmi: 26.3, lastAssessmentDate: '2024-08-01', mrn: '521' },
  { id: 'p-16', name: 'Savannah Nguyen', age: 27, bmi: 22.8, lastAssessmentDate: '2024-08-18', mrn: '521' },
  { id: 'p-17', name: 'Leslie Alexander', age: 55, bmi: 28.5, lastAssessmentDate: '2024-06-10', mrn: '521' },
  { id: 'p-18', name: 'Jane Cooper', age: 38, bmi: 23.9, lastAssessmentDate: '2024-07-29', mrn: '521' },
  { id: 'p-19', name: 'Robert Fox', age: 60, bmi: 29.8, lastAssessmentDate: '2024-08-11', mrn: '521' },
  { id: 'p-20', name: 'Albert Flores', age: 34, bmi: 25.0, lastAssessmentDate: '2024-05-15', mrn: '521' },
]

export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS)

  const addPatient = (patient: Omit<Patient, 'id'>): Patient => {
    const newPatient: Patient = {
      ...patient,
      id: `p-${Date.now()}`,
    }
    setPatients((prev) => [newPatient, ...prev])
    return newPatient
  }

  return {
    patients,
    setPatients,
    addPatient,
  }
}
