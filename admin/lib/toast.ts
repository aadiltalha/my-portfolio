type ToastType = 'success' | 'error' | 'info' | 'warning'

interface Toast {
  id: string
  type: ToastType
  message: string
}

let toasts: Toast[] = []
let listeners: ((toasts: Toast[]) => void)[] = []

export const toast = {
  subscribe: (listener: (toasts: Toast[]) => void) => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  },

  show: (message: string, type: ToastType = 'info', duration = 3000) => {
    const id = Date.now().toString()
    const newToast = { id, type, message }
    toasts = [...toasts, newToast]
    listeners.forEach((listener) => listener(toasts))

    setTimeout(() => {
      toasts = toasts.filter((t) => t.id !== id)
      listeners.forEach((listener) => listener(toasts))
    }, duration)
  },

  success: (message: string) => toast.show(message, 'success'),
  error: (message: string) => toast.show(message, 'error'),
  info: (message: string) => toast.show(message, 'info'),
  warning: (message: string) => toast.show(message, 'warning'),
}
