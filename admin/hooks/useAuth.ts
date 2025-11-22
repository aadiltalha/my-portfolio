import { useState, useEffect } from 'react'
import { authStorage } from '@/lib/auth'

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsAuthenticated(authStorage.isAuthenticated())
    setIsLoading(false)
  }, [])

  return { isAuthenticated, isLoading }
}
