'use client'

import { motion } from 'framer-motion'
import { Card } from './Card'

interface StatCardProps {
  icon: string
  label: string
  value: number
  trend?: number
}

export function StatCard({ icon, label, value, trend }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="!bg-gradient-to-br from-slate-800/50 to-slate-900/50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm mb-2">{label}</p>
            <p className="text-3xl font-bold text-white">{value}</p>
            {trend !== undefined && (
              <p className={`text-xs mt-2 ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {trend >= 0 ? '+' : ''}{trend}% from last month
              </p>
            )}
          </div>
          <div className="text-5xl opacity-20">{icon}</div>
        </div>
      </Card>
    </motion.div>
  )
}
