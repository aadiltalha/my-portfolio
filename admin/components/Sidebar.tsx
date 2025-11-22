'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface NavItem {
  href: string
  label: string
  icon: string
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/projects', label: 'Projects', icon: '📁' },
  { href: '/blogs', label: 'Blogs', icon: '📝' },
  { href: '/testimonials', label: 'Testimonials', icon: '💬' },
  { href: '/messages', label: 'Messages', icon: '✉️' },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)

  return (
    <motion.div
      className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-slate-900 to-slate-950 border-r border-slate-700/50 backdrop-blur-sm transition-all z-40 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Logo */}
      <div className="p-6 border-b border-slate-700/50">
        <motion.div
          className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
        >
          {isOpen ? 'Admin' : 'A'}
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                  isActive ? 'bg-indigo-600/20 text-indigo-400 border-l-2 border-indigo-400' : 'text-gray-400 hover:text-white hover:bg-slate-800/50'
                }`}
                whileHover={{ x: 4 }}
              >
                <span className="text-xl">{item.icon}</span>
                {isOpen && <span className="text-sm font-medium">{item.label}</span>}
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute bottom-6 right-4 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-gray-400 hover:text-white transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? '◀' : '▶'}
      </motion.button>
    </motion.div>
  )
}
