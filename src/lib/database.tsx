export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role?: string
  emailPreferences?: boolean
  createdAt?: string
}

const STORAGE_USERS_KEY = 'icl_health_users'
const STORAGE_CURRENT_USER_KEY = 'icl_health_current_user'

const DEFAULT_USERS: User[] = [
  {
    id: 'u-1',
    email: 'doctor@iclhealth.com',
    name: 'Dr. Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=256',
    role: 'Lead Physician',
    emailPreferences: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'u-2',
    email: 'admin@iclhealth.com',
    name: 'Admin Officer',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=256',
    role: 'Administrator',
    emailPreferences: false,
    createdAt: new Date().toISOString(),
  },
]

export class Patients {
  async getAllPatients() {

  }
}

export class Auth {
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
    // Simulate brief network latency
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

    // For ease of demoing, if user doesn't exist, register them automatically on login or validate
    if (!user) {
      const derivedName = cleanEmail.split('@')[0].replace(/[._-]/g, ' ')
      const formattedName = derivedName.charAt(0).toUpperCase() + derivedName.slice(1)
      user = {
        id: `u-${Date.now()}`,
        email: cleanEmail,
        name: formattedName || 'Clinician',
        role: 'Practitioner',
        emailPreferences: true,
        createdAt: new Date().toISOString(),
      }
      users.push(user)
      this.saveUsers(users)
    }

    localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(user))
    return user
  }

  async loginWithGoogle(): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    const googleUser: User = {
      id: `u-google-${Date.now()}`,
      email: 'alex.morgan@gmail.com',
      name: 'Dr. Alex Morgan',
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=256',
      role: 'Clinical Specialist',
      emailPreferences: true,
      createdAt: new Date().toISOString(),
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

    const derivedName = options?.name?.trim() ||
      (cleanEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()))

    const newUser: User = {
      id: `u-${Date.now()}`,
      email: cleanEmail,
      name: derivedName || 'Clinician',
      role: 'Practitioner',
      emailPreferences: options?.emailPreferences ?? false,
      createdAt: new Date().toISOString(),
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

export class Vitals {

}

export class GeneralAssessment {

}

export class OverweightAssessment {

}