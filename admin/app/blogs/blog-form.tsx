'use client'

import { useForm } from 'react-hook-form'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Input from '@/components/Input'
import Textarea from '@/components/Textarea'
import { Button } from '@/components/Button'
import { blogsService } from '@/services/blogs.service'
import { toast } from '@/lib/toast'
import { Blog } from '@/types'

interface BlogFormProps {
  blog?: Blog
  onSave: () => void
}

interface FormData {
  title: string
  description: string
  content: string
  author: string
}

export default function BlogForm({ blog, onSave }: BlogFormProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    defaultValues: blog ? {
      title: blog.title,
      description: blog.description,
      content: blog.content,
      author: blog.author,
    } : {},
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imagePreview, setImagePreview] = useState<string>(blog?.image || '')

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
      formData.append('title', data.title)
      formData.append('description', data.description)
      formData.append('content', data.content)
      formData.append('author', data.author)

      const file = fileInputRef.current?.files?.[0]
      if (file) {
        formData.append('image', file)
      }

      if (blog) {
        await blogsService.update(blog._id, formData)
        toast.success('Blog updated successfully')
      } else {
        await blogsService.create(formData)
        toast.success('Blog created successfully')
      }
      onSave()
    } catch (error) {
      toast.error('Failed to save blog')
    }
  }

  return (
    <motion.form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-h-96 overflow-y-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Input
        {...register('title', { required: 'Title is required' })}
        label="Title"
        placeholder="Blog title"
        error={errors.title?.message}
      />

      <Input
        {...register('author', { required: 'Author is required' })}
        label="Author"
        placeholder="Author name"
        error={errors.author?.message}
      />

      <Textarea
        {...register('description', { required: 'Description is required' })}
        label="Description"
        placeholder="Short description"
        rows={2}
        error={errors.description?.message}
      />

      <Textarea
        {...register('content', { required: 'Content is required' })}
        label="Content"
        placeholder="Full blog content"
        rows={4}
        error={errors.content?.message}
      />

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Blog Image</label>
        {imagePreview && (
          <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="h-32 w-32 rounded-lg object-cover mb-4" />
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
          {isSubmitting ? 'Saving...' : 'Save Blog'}
        </Button>
      </div>
    </motion.form>
  )
}
