'use client'

import { useForm } from 'react-hook-form'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Input from '@/components/Input'
import Textarea from '@/components/Textarea'
import { Button } from '@/components/Button'
import { testimonialsService } from '@/services/testimonials.service'
import { toast } from '@/lib/toast'
import { Testimonial } from '@/types'

interface TestimonialFormProps {
  testimonial?: Testimonial
  onSave: () => void
}

interface FormData {
  name: string
  position: string
  company: string
  message: string
  rating?: number
}

export default function TestimonialForm({ testimonial, onSave }: TestimonialFormProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    defaultValues: testimonial ? {
      name: testimonial.name,
      position: testimonial.position,
      company: testimonial.company,
      message: testimonial.message,
      rating: testimonial.rating,
    } : {},
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imagePreview, setImagePreview] = useState<string>(testimonial?.image || '')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('position', data.position)
      formData.append('company', data.company)
      formData.append('message', data.message)
      if (data.rating) formData.append('rating', data.rating.toString())

      const file = fileInputRef.current?.files?.[0]
      if (file) {
        formData.append('image', file)
      }

      if (testimonial) {
        await testimonialsService.update(testimonial._id, formData)
        toast.success('Testimonial updated successfully')
      } else {
        await testimonialsService.create(formData)
        toast.success('Testimonial created successfully')
      }
      onSave()
    } catch (error) {
      toast.error('Failed to save testimonial')
    }
  }

  return (
    <motion.form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-h-96 overflow-y-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Input
        {...register('name', { required: 'Name is required' })}
        label="Name"
        placeholder="Full name"
        error={errors.name?.message}
      />

      <Input
        {...register('position', { required: 'Position is required' })}
        label="Position"
        placeholder="Job position"
        error={errors.position?.message}
      />

      <Input
        {...register('company', { required: 'Company is required' })}
        label="Company"
        placeholder="Company name"
        error={errors.company?.message}
      />

      <Textarea
        {...register('message', { required: 'Message is required' })}
        label="Testimonial Message"
        placeholder="Write the testimonial message"
        rows={4}
        error={errors.message?.message}
      />

      <Input
        {...register('rating', { min: 0, max: 5 })}
        label="Rating (0-5)"
        type="number"
        min="0"
        max="5"
      />

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Profile Image</label>
        {imagePreview && (
          <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="h-32 w-32 rounded-full object-cover mb-4" />
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
        />
      </div>

      <div className="flex gap-4 justify-end">
        <Button variant="secondary" type="button" onClick={() => window.history.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Testimonial'}
        </Button>
      </div>
    </motion.form>
  )
}
