import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { authDb, type User } from '../lib/database.tsx'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<User>
  loginWithGoogle: () => Promise<User>
  signup: (
    email: string,
    password: string,
    options?: { name?: string; emailPreferences?: boolean }
  ) => Promise<User>
  logout: () => Promise<void>
  forgotPassword: (email: string) => Promise<{ success: boolean; message: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    async function loadUser() {
      try {
        const currentUser = await authDb.getCurrentUser()
        setUser(currentUser)
      } catch (err) {
        console.error('Failed to load session user', err)
      } finally {
        setIsLoading(false)
      }
    }
    loadUser()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const loggedUser = await authDb.login(email, password)
      setUser(loggedUser)
      return loggedUser
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithGoogle = async () => {
    setIsLoading(true)
    try {
      const googleUser = await authDb.loginWithGoogle()
      setUser(googleUser)
      return googleUser
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (
    email: string,
    password: string,
    options?: { name?: string; emailPreferences?: boolean }
  ) => {
    setIsLoading(true)
    try {
      const newUser = await authDb.signup(email, password, options)
      setUser(newUser)
      return newUser
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      await authDb.logout()
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const forgotPassword = async (email: string) => {
    return authDb.forgotPassword(email)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithGoogle,
        signup,
        logout,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
