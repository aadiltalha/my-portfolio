'use client'

import { motion } from 'framer-motion'
import { Button } from './Button'
import { authService } from '@/services/auth.service'
import { useRouter } from 'next/navigation'

export function Topbar({ sidebarOpen }: { sidebarOpen?: boolean }) {
  const router = useRouter()

  const handleLogout = () => {
    authService.logout()
    router.push('/login')
  }

  return (
    <motion.div
      className={`fixed top-0 right-0 h-20 bg-gradient-to-r from-slate-800/80 to-slate-900/80 border-b border-slate-700/50 backdrop-blur-md flex items-center justify-between px-8 z-30 transition-all ${
        sidebarOpen ? 'left-64' : 'left-20'
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-4 flex-1">
        <h1 className="text-xl font-semibold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
      </div>

      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Button variant="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </motion.div>
    </motion.div>
  )
}
