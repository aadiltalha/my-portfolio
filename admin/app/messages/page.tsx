'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import DashboardLayout from '@/components/DashboardLayout'
import { Card } from '@/components/Card'
import { Loader } from '@/components/Loader'
import { messagesService } from '@/services/messages.service'
import { toast } from '@/lib/toast'
import { Message } from '@/types'

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      setIsLoading(true)
      const data = await messagesService.getAll()
      setMessages(data)
    } catch {
      toast.error('Failed to fetch messages')
    } finally {
      setIsLoading(false)
    }
  }

  // ✅ DELETE MESSAGE HANDLER
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return

    try {
      setDeletingId(id)
      await messagesService.delete(id)
      toast.success("Message deleted")

      // Refresh list
      setMessages((prev) => prev.filter((m) => m._id !== id))
    } catch {
      toast.error("Failed to delete message")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        
        <div>
          <h1 className="text-4xl font-bold text-white">Messages</h1>
          <p className="text-gray-400">View and manage contact submissions</p>
        </div>

        {isLoading ? (
          <Loader />
        ) : messages.length === 0 ? (
          <Card className="text-center py-12">
            <p className="text-gray-400">No messages yet</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {messages.map((message, idx) => (
              <motion.div
                key={message._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="hover:border-indigo-500/50 transition-all">
                  <div className="flex justify-between items-start gap-4">
                    
                    {/* Message Content */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {message.name}
                      </h3>
                      <p className="text-sm text-indigo-400 mb-3">{message.email}</p>
                      <p className="text-gray-300 mb-3">{message.message}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(message.createdAt).toLocaleString()}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      {/* Reply Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-medium"
                        onClick={() => {
                          const subject = `Re: ${message.name}`
                          const body = `Thank you for reaching out!`
                          window.location.href =
                            `mailto:${message.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
                        }}
                      >
                        Reply
                      </motion.button>

                      {/* Delete Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={deletingId === message._id}
                        onClick={() => handleDelete(message._id)}
                        className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-medium disabled:opacity-50"
                      >
                        {deletingId === message._id ? "Deleting..." : "Delete"}
                      </motion.button>
                    </div>

                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  )
}
