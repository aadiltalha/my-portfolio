'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import DashboardLayout from '@/components/DashboardLayout'
import { Table } from '@/components/Table'
import { Modal } from '@/components/Modal'
import { Button } from '@/components/Button'
import { Loader } from '@/components/Loader'
import { testimonialsService } from '@/services/testimonials.service'
import { toast } from '@/lib/toast'
import { Testimonial } from '@/types'
import TestimonialForm from './testimonial-form'

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      setIsLoading(true)
      const data = await testimonialsService.getAll()
      setTestimonials(data)
    } catch (error) {
      toast.error('Failed to fetch testimonials')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = () => {
    setSelectedTestimonial(null)
    setIsModalOpen(true)
  }

  const handleEdit = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial)
    setIsModalOpen(true)
  }

  const handleDelete = async (testimonial: Testimonial) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await testimonialsService.delete(testimonial._id)
        setTestimonials(testimonials.filter((t) => t._id !== testimonial._id))
        toast.success('Testimonial deleted successfully')
      } catch (error) {
        toast.error('Failed to delete testimonial')
      }
    }
  }

  const handleSave = async () => {
    await fetchTestimonials()
    setIsModalOpen(false)
    setSelectedTestimonial(null)
  }

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white">Testimonials</h1>
            <p className="text-gray-400">Manage customer testimonials</p>
          </div>
          <Button onClick={handleCreate}>+ New Testimonial</Button>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <Table
              columns={[
                { key: 'name', label: 'Name' },
                { key: 'position', label: 'Position' },
                { key: 'company', label: 'Company' },
                {
                  key: 'message',
                  label: 'Message',
                  render: (value) => <span className="truncate max-w-xs">{value}</span>,
                },
                {
                  key: 'image',
                  label: 'Image',
                  render: (value) => (
                    <img src={value || "/placeholder.svg"} alt="Testimonial" className="h-10 w-10 rounded-full object-cover" />
                  ),
                },
              ]}
              data={testimonials}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={selectedTestimonial ? 'Edit Testimonial' : 'Create Testimonial'}
        >
          <TestimonialForm testimonial={selectedTestimonial || undefined} onSave={handleSave} />
        </Modal>
      </motion.div>
    </DashboardLayout>
  )
}
