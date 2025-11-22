import { useState, useEffect } from 'react'
import { toast as toastLib } from '@/lib/toast'

interface Toast {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    const unsubscribe = toastLib.subscribe(setToasts)
    return unsubscribe
  }, [])

  return { toasts }
}
