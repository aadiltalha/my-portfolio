'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import DashboardLayout  from '@/components/DashboardLayout'
import { StatCard } from '@/components/StatCard'
import { AnalyticsChart } from '@/components/AnalyticsChart'
import { analyticsService } from '@/services/analytics.service'
import { Analytics } from '@/types'
import { Loader } from '@/components/Loader'

export default function DashboardPage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await analyticsService.getSummary()
        setAnalytics(data)
      } catch (error) {
        console.error('Failed to fetch analytics:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  if (isLoading) {
    return (
      <DashboardLayout>
        <Loader />
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-8"
      >
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Welcome to your admin panel</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon="📁" label="Total Projects" value={analytics?.totalProjects || 0} trend={12} />
          <StatCard icon="📝" label="Total Blogs" value={analytics?.totalBlogs || 0} trend={8} />
          <StatCard icon="💬" label="Total Testimonials" value={analytics?.totalTestimonials || 0} trend={15} />
          <StatCard icon="✉️" label="Total Messages" value={analytics?.totalMessages || 0} trend={-5} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnalyticsChart />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {['New project created', 'Blog post published', 'New testimonial added'].map((activity, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors"
                  whileHover={{ x: 4 }}
                >
                  <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                  <span className="text-sm text-gray-300">{activity}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  )
}
