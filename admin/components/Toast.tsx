'use client'

import { useToast } from '@/hooks/useToast'
import { motion, AnimatePresence } from 'framer-motion'

const getToastStyles = (type: string) => {
  const styles: Record<string, string> = {
    success: 'bg-green-900/20 border-green-500/30 text-green-300',
    error: 'bg-red-900/20 border-red-500/30 text-red-300',
    info: 'bg-blue-900/20 border-blue-500/30 text-blue-300',
    warning: 'bg-yellow-900/20 border-yellow-500/30 text-yellow-300',
  }
  return styles[type] || styles.info
}

export function Toast() {
  const { toasts } = useToast()

  return (
    <div className="fixed top-4 right-4 z-50">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`mb-3 px-4 py-3 rounded-lg border ${getToastStyles(toast.type)}`}
          >
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
