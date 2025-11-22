'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { Card } from './Card'
import { motion } from 'framer-motion'

const data = [
  { month: 'Jan', value: 400 },
  { month: 'Feb', value: 500 },
  { month: 'Mar', value: 450 },
  { month: 'Apr', value: 600 },
  { month: 'May', value: 750 },
  { month: 'Jun', value: 900 },
]

export function AnalyticsChart() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <Card>
        <h2 className="text-xl font-semibold text-white mb-6">Analytics Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.2)" />
            <XAxis stroke="rgba(100,116,139,0.5)" />
            <YAxis stroke="rgba(100,116,139,0.5)" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
              labelStyle={{ color: '#94a3b8' }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ fill: '#6366f1', r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </motion.div>
  )
}
