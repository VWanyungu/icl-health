export interface Patient {
  id: number,
  unique: string
  firstname: string
  middlename?: string
  lastname: string
  dob: string
  gender: string
  reg_date: string
  created_at: string
  updated_at: string
}

export interface DashboardPatient extends Patient {
  bmi: number
  lastAssessmentDate: string
}

export const INITIAL_PATIENTS: DashboardPatient[] = [
  {
    id: 1,
    unique: '521',
    firstname: 'Kristin',
    lastname: 'Watson',
    dob: '1992-05-14',
    gender: 'Female',
    reg_date: '2024-01-15',
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2024-05-27T10:30:00Z',
    bmi: 22.4,
    lastAssessmentDate: '2024-05-27',
  },
  {
    id: 2,
    unique: '522',
    firstname: 'Arlene',
    lastname: 'McCoy',
    dob: '1979-08-21',
    gender: 'Female',
    reg_date: '2024-02-03',
    created_at: '2024-02-03T09:15:00Z',
    updated_at: '2024-05-19T11:00:00Z',
    bmi: 28.1,
    lastAssessmentDate: '2024-05-19',
  },
  {
    id: 3,
    unique: '523',
    firstname: 'Darrell',
    lastname: 'Steward',
    dob: '1995-03-12',
    gender: 'Male',
    reg_date: '2024-02-18',
    created_at: '2024-02-18T07:45:00Z',
    updated_at: '2024-06-21T14:20:00Z',
    bmi: 24.0,
    lastAssessmentDate: '2024-06-21',
  },
  {
    id: 4,
    unique: '524',
    firstname: 'Jerome',
    lastname: 'Bell',
    dob: '1966-11-05',
    gender: 'Male',
    reg_date: '2024-01-22',
    created_at: '2024-01-22T10:00:00Z',
    updated_at: '2024-05-27T09:45:00Z',
    bmi: 31.6,
    lastAssessmentDate: '2024-05-27',
  },
  {
    id: 5,
    unique: '525',
    firstname: 'Courtney',
    lastname: 'Henry',
    dob: '1985-07-19',
    gender: 'Female',
    reg_date: '2024-03-11',
    created_at: '2024-03-11T08:30:00Z',
    updated_at: '2024-10-28T13:15:00Z',
    bmi: 26.8,
    lastAssessmentDate: '2024-10-28',
  },
  {
    id: 6,
    unique: '526',
    firstname: 'Bessie',
    lastname: 'Cooper',
    dob: '1957-02-28',
    gender: 'Female',
    reg_date: '2024-01-08',
    created_at: '2024-01-08T09:00:00Z',
    updated_at: '2024-04-12T10:10:00Z',
    bmi: 23.5,
    lastAssessmentDate: '2024-04-12',
  },
  {
    id: 7,
    unique: '527',
    firstname: 'Eleanor',
    lastname: 'Pena',
    dob: '1973-09-14',
    gender: 'Female',
    reg_date: '2024-02-12',
    created_at: '2024-02-12T08:45:00Z',
    updated_at: '2024-05-30T12:00:00Z',
    bmi: 29.4,
    lastAssessmentDate: '2024-05-30',
  },
  {
    id: 8,
    unique: '528',
    firstname: 'Annette',
    lastname: 'Black',
    dob: '2000-06-03',
    gender: 'Female',
    reg_date: '2024-01-30',
    created_at: '2024-01-30T07:30:00Z',
    updated_at: '2024-02-11T09:20:00Z',
    bmi: 21.2,
    lastAssessmentDate: '2024-02-11',
  },
  {
    id: 9,
    unique: '529',
    firstname: 'Darlene',
    lastname: 'Robertson',
    dob: '1982-04-17',
    gender: 'Female',
    reg_date: '2024-03-05',
    created_at: '2024-03-05T10:15:00Z',
    updated_at: '2024-07-11T11:30:00Z',
    bmi: 27.9,
    lastAssessmentDate: '2024-07-11',
  },
  {
    id: 10,
    unique: '530',
    firstname: 'Devon',
    lastname: 'Lane',
    dob: '1988-12-09',
    gender: 'Male',
    reg_date: '2024-02-25',
    created_at: '2024-02-25T08:00:00Z',
    updated_at: '2024-05-27T15:00:00Z',
    bmi: 25.3,
    lastAssessmentDate: '2024-05-27',
  },
  {
    id: 11,
    unique: '531',
    firstname: 'Floyd',
    lastname: 'Miles',
    dob: '1976-01-22',
    gender: 'Male',
    reg_date: '2024-03-18',
    created_at: '2024-03-18T09:30:00Z',
    updated_at: '2024-08-14T10:45:00Z',
    bmi: 33.2,
    lastAssessmentDate: '2024-08-14',
  },
  {
    id: 12,
    unique: '532',
    firstname: 'Theresa',
    lastname: 'Webb',
    dob: '1971-05-11',
    gender: 'Female',
    reg_date: '2024-02-08',
    created_at: '2024-02-08T07:45:00Z',
    updated_at: '2024-08-22T13:00:00Z',
    bmi: 24.7,
    lastAssessmentDate: '2024-08-22',
  },
  {
    id: 13,
    unique: '533',
    firstname: 'Cody',
    lastname: 'Fisher',
    dob: '1993-10-26',
    gender: 'Male',
    reg_date: '2024-04-01',
    created_at: '2024-04-01T08:15:00Z',
    updated_at: '2024-09-05T11:10:00Z',
    bmi: 20.9,
    lastAssessmentDate: '2024-09-05',
  },
  {
    id: 14,
    unique: '534',
    firstname: 'Esther',
    lastname: 'Howard',
    dob: '1962-07-08',
    gender: 'Female',
    reg_date: '2024-01-17',
    created_at: '2024-01-17T10:30:00Z',
    updated_at: '2024-07-19T09:00:00Z',
    bmi: 30.1,
    lastAssessmentDate: '2024-07-19',
  },
  {
    id: 15,
    unique: '535',
    firstname: 'Guy',
    lastname: 'Hawkins',
    dob: '1980-03-29',
    gender: 'Male',
    reg_date: '2024-02-20',
    created_at: '2024-02-20T08:45:00Z',
    updated_at: '2024-08-01T14:00:00Z',
    bmi: 26.3,
    lastAssessmentDate: '2024-08-01',
  },
  {
    id: 16,
    unique: '536',
    firstname: 'Savannah',
    lastname: 'Nguyen',
    dob: '1997-11-16',
    gender: 'Female',
    reg_date: '2024-03-22',
    created_at: '2024-03-22T09:15:00Z',
    updated_at: '2024-08-18T10:30:00Z',
    bmi: 22.8,
    lastAssessmentDate: '2024-08-18',
  },
  {
    id: 17,
    unique: '537',
    firstname: 'Leslie',
    lastname: 'Alexander',
    dob: '1969-06-24',
    gender: 'Female',
    reg_date: '2024-01-12',
    created_at: '2024-01-12T07:30:00Z',
    updated_at: '2024-06-10T12:15:00Z',
    bmi: 28.5,
    lastAssessmentDate: '2024-06-10',
  },
  {
    id: 18,
    unique: '538',
    firstname: 'Jane',
    lastname: 'Cooper',
    dob: '1986-09-02',
    gender: 'Female',
    reg_date: '2024-02-28',
    created_at: '2024-02-28T08:00:00Z',
    updated_at: '2024-07-29T11:45:00Z',
    bmi: 23.9,
    lastAssessmentDate: '2024-07-29',
  },
  {
    id: 19,
    unique: '539',
    firstname: 'Robert',
    lastname: 'Fox',
    dob: '1964-12-13',
    gender: 'Male',
    reg_date: '2024-03-14',
    created_at: '2024-03-14T09:45:00Z',
    updated_at: '2024-08-11T13:30:00Z',
    bmi: 29.8,
    lastAssessmentDate: '2024-08-11',
  },
  {
    id: 20,
    unique: '540',
    firstname: 'Albert',
    lastname: 'Flores',
    dob: '1990-08-07',
    gender: 'Male',
    reg_date: '2024-01-25',
    created_at: '2024-01-25T10:00:00Z',
    updated_at: '2024-05-15T09:30:00Z',
    bmi: 25.0,
    lastAssessmentDate: '2024-05-15',
  },
]

export class Patients {
  async getAllPatients() {
    return INITIAL_PATIENTS
  }

  async getPatientById(id) {
    return INITIAL_PATIENTS.find((p) => String(p.id) === id)
  }

  addPatient(patient: Omit<Patient, 'id'>) {

  }
}

export const patientsDb = new Patients()

export interface User {
  id: string
  email: string
  firstname: string
  lastname: string
  password?: string
  role?: string
}

const STORAGE_USERS_KEY = 'icl_health_users'
const STORAGE_CURRENT_USER_KEY = 'icl_health_current_user'
const DEFAULT_USERS: User[] = [
  {
    id: 'u-1',
    email: 'doctor@iclhealth.com',
    firstname: "Doctor",
    lastname: "Doe",
    password: "password123",
    role: 'Lead Physician',
  },
  {
    id: 'u-2',
    email: 'admin@iclhealth.com',
    firstname: "Admin",
    lastname: "Officer",
    password: "password123",
    role: 'Administrator',
  },
]

export class Auth {
  // For demo: won't be part fo final application
  private getUsers(): User[] {
    try {
      const stored = localStorage.getItem(STORAGE_USERS_KEY)
      if (!stored) {
        localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(DEFAULT_USERS))
        return DEFAULT_USERS
      }
      return JSON.parse(stored)
    } catch {
      return DEFAULT_USERS
    }
  }

  private saveUsers(users: User[]): void {
    try {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users))
    } catch (e) {
      console.error('Failed to save users to localStorage', e)
    }
  }

  // Backend API
  async getUserById() {

  }

  async getUserByEmail() {

  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const stored = localStorage.getItem(STORAGE_CURRENT_USER_KEY)
      if (!stored) return null
      return JSON.parse(stored)
    } catch {
      return null
    }
  }

  async login(email: string, password: string): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 350))

    const cleanEmail = email.trim().toLowerCase()
    if (!cleanEmail) {
      throw new Error('Email is required')
    }
    if (!password) {
      throw new Error('Password is required')
    }

    const users = this.getUsers()
    let user = users.find((u) => u.email.toLowerCase() === cleanEmail)

    localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(user))
    return user
  }

  async loginWithGoogle(): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    const googleUser: User = {
      id: String(Math.floor(Math.random() * 10000) + 1),
      email: 'alex.morgan@gmail.com',
      firstname: "Alex",
      lastname: "MOrgan",
      role: 'Clinical Specialist',
    }

    const users = this.getUsers()
    const existingIndex = users.findIndex((u) => u.email === googleUser.email)
    if (existingIndex >= 0) {
      users[existingIndex] = googleUser
    } else {
      users.push(googleUser)
    }
    this.saveUsers(users)

    localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(googleUser))
    return googleUser
  }

  async signup(
    email: string,
    firstname: string,
    lastname: string,
    password: string,
    options?: { name?: string; emailPreferences?: boolean }
  ): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    const cleanEmail = email.trim().toLowerCase()
    if (!cleanEmail) {
      throw new Error('Email address is required')
    }
    if (!password || password.length < 8) {
      throw new Error('Password must be at least 8 characters long')
    }

    const users = this.getUsers()
    const existing = users.find((u) => u.email.toLowerCase() === cleanEmail)
    if (existing) {
      // If already exists, log them in
      localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(existing))
      return existing
    }

    const newUser: User = {
      id: String(Math.floor(Math.random() * 10000) + 1),
      email: cleanEmail,
      firstname: firstname,
      lastname: lastname,
      password: password,
      role: 'Administrator',
    }

    users.push(newUser)
    this.saveUsers(users)
    localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(newUser))
    return newUser
  }

  async logout(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 150))
    localStorage.removeItem(STORAGE_CURRENT_USER_KEY)
  }

  async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    if (!email) {
      throw new Error('Email is required')
    }
    return {
      success: true,
      message: `Password reset link has been sent to ${email}`,
    }
  }
}

export const authDb = new Auth()

// LocalStorage keys
export const STORAGE_VITALS_KEY = 'vitals_submissions'
export const STORAGE_GENERAL_ASSESSMENT_KEY = 'general_assessment_submissions'
export const STORAGE_OVERWEIGHT_ASSESSMENT_KEY = 'overweight_assessment_submissions'
export const STORAGE_VITAL_ID_KEY = 'vital_id'

export interface VitalsSubmissionRecord {
  id: number
  patient_id: string
  visit_date: string
  weight: string
  height: string
  bmi: number
  created_at: string
}

export interface VitalsResponse {
  message: string
  success: boolean
  code: number
  data: {
    id: number
    patient_id: string
    slug: number
    message: string
  }
}

export class Vitals {
  // Local storage
  getSubmissions(): VitalsSubmissionRecord[] {
    try {
      const stored = localStorage.getItem(STORAGE_VITALS_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  private saveSubmissions(list: VitalsSubmissionRecord[]): void {
    try {
      localStorage.setItem(STORAGE_VITALS_KEY, JSON.stringify(list))
    } catch (e) {
      console.error('Failed to save vitals submissions', e)
    }
  }

  hasSubmissionToday(patientId: string, visitDate?: string): boolean {
    const targetDate = visitDate || new Date().toISOString().split('T')[0]
    const submissions = this.getSubmissions()
    return submissions.some(
      (s) => String(s.patient_id) === String(patientId) && s.visit_date === targetDate
    )
  }

  // Backend API
  async saveVitals(data: {
    patient_id: string
    visit_date: string
    weight: string
    height: string
    bmi: number
  }): Promise<VitalsResponse> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    const submissions = this.getSubmissions()

    const newId = submissions.length > 0 ? Math.max(...submissions.map((s) => s.id)) + 1 : 5
    const record: VitalsSubmissionRecord = {
      id: newId,
      patient_id: String(data.patient_id),
      visit_date: data.visit_date || new Date().toISOString().split('T')[0],
      weight: data.weight,
      height: data.height,
      bmi: data.bmi,
      created_at: new Date().toISOString(),
    }

    submissions.push(record)
    this.saveSubmissions(submissions)

    // Save vital_id to localStorage as requested
    localStorage.setItem(STORAGE_VITAL_ID_KEY, String(newId))

    return {
      message: 'success',
      success: true,
      code: 200,
      data: {
        id: newId,
        patient_id: String(data.patient_id),
        slug: 1,
        message: 'Vital Added Successfully',
      },
    }
  }

  async getPatientVitals(patientId: number) {

  }
}

export const vitalsDb = new Vitals()

export interface GeneralAssessmentSubmissionRecord {
  id: number
  patient_id: string
  vital_id: string
  visit_date: string
  general_health: string
  on_diet: string
  on_drugs: string
  comments: string
  created_at: string
}

export class GeneralAssessment {
  // Local storage
  getSubmissions(): GeneralAssessmentSubmissionRecord[] {
    try {
      const stored = localStorage.getItem(STORAGE_GENERAL_ASSESSMENT_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  private saveSubmissions(list: GeneralAssessmentSubmissionRecord[]): void {
    try {
      localStorage.setItem(STORAGE_GENERAL_ASSESSMENT_KEY, JSON.stringify(list))
    } catch (e) {
      console.error('Failed to save general assessment submissions', e)
    }
  }

  hasSubmissionToday(patientId: string, visitDate?: string): boolean {
    const targetDate = visitDate || new Date().toISOString().split('T')[0]
    const submissions = this.getSubmissions()
    return submissions.some(
      (s) => String(s.patient_id) === String(patientId) && s.visit_date === targetDate
    )
  }

  // Backend
  async saveAssessment(data: {
    patient_id: string
    vital_id: string
    visit_date: string
    general_health: string
    on_diet: string
    on_drugs: string
    comments: string
  }): Promise<{ message: string; success: boolean; id: number }> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    const submissions = this.getSubmissions()

    const newId = submissions.length > 0 ? Math.max(...submissions.map((s) => s.id)) + 1 : 1
    const record: GeneralAssessmentSubmissionRecord = {
      id: newId,
      patient_id: String(data.patient_id),
      vital_id: String(data.vital_id),
      visit_date: data.visit_date || new Date().toISOString().split('T')[0],
      general_health: data.general_health,
      on_diet: data.on_diet,
      on_drugs: data.on_drugs,
      comments: data.comments,
      created_at: new Date().toISOString(),
    }

    submissions.push(record)
    this.saveSubmissions(submissions)

    return {
      message: 'success',
      success: true,
      id: newId,
    }
  }

  async getPatientGeneralAssessments(patientId: number) {

  }


}

export const generalAssessmentDb = new GeneralAssessment()

export interface OverweightAssessmentSubmissionRecord {
  id: number
  patient_id: string
  vital_id: string
  visit_date: string
  general_health: string
  on_drugs: string
  comments: string
  created_at: string
}

export class OverweightAssessment {
  // Local Storage
  getSubmissions(): OverweightAssessmentSubmissionRecord[] {
    try {
      const stored = localStorage.getItem(STORAGE_OVERWEIGHT_ASSESSMENT_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  private saveSubmissions(list: OverweightAssessmentSubmissionRecord[]): void {
    try {
      localStorage.setItem(STORAGE_OVERWEIGHT_ASSESSMENT_KEY, JSON.stringify(list))
    } catch (e) {
      console.error('Failed to save overweight assessment submissions', e)
    }
  }

  hasSubmissionToday(patientId: string, visitDate?: string): boolean {
    const targetDate = visitDate || new Date().toISOString().split('T')[0]
    const submissions = this.getSubmissions()
    return submissions.some(
      (s) => String(s.patient_id) === String(patientId) && s.visit_date === targetDate
    )
  }

  // Backend API
  async saveAssessment(data: {
    patient_id: string
    vital_id: string
    visit_date: string
    general_health: string
    on_drugs: string
    comments: string
  }): Promise<{ message: string; success: boolean; id: number }> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    const submissions = this.getSubmissions()

    const newId = submissions.length > 0 ? Math.max(...submissions.map((s) => s.id)) + 1 : 1
    const record: OverweightAssessmentSubmissionRecord = {
      id: newId,
      patient_id: String(data.patient_id),
      vital_id: String(data.vital_id),
      visit_date: data.visit_date || new Date().toISOString().split('T')[0],
      general_health: data.general_health,
      on_drugs: data.on_drugs,
      comments: data.comments,
      created_at: new Date().toISOString(),
    }

    submissions.push(record)
    this.saveSubmissions(submissions)

    return {
      message: 'success',
      success: true,
      id: newId,
    }
  }

  async getPatientOverweightAssessments(patientId: number) {

  }
}

export const overweightAssessmentDb = new OverweightAssessment()