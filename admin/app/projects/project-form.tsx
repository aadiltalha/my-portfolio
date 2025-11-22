'use client'

import { useForm } from 'react-hook-form'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Input from '@/components/Input'
import Textarea from '@/components/Textarea'
import { Button } from '@/components/Button'
import { projectsService } from '@/services/projects.service'
import { toast } from '@/lib/toast'
import { Project } from '@/types'

interface ProjectFormProps {
  project?: Project
  onSave: () => void
}

interface FormData {
  title: string
  description: string
  techStack?: string
  liveLink?: string
  githubLink?: string
}

export default function ProjectForm({ project, onSave }: ProjectFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: project
      ? {
          title: project.title,
          description: project.description,
          techStack: Array.isArray(project.techStack)
            ? project.techStack.join(', ')
            : project.techStack || '',
          liveLink: project.liveLink || '',
          githubLink: project.githubLink || '',
        }
      : {},
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imagePreview, setImagePreview] = useState<string>(project?.image || '')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData()
      formData.append('title', data.title.trim())
      formData.append('description', data.description.trim())

      if (data.techStack) {
        formData.append('techStack', data.techStack)
      }
      if (data.liveLink) {
        formData.append('liveLink', data.liveLink.trim())
      }
      if (data.githubLink) {
        formData.append('githubLink', data.githubLink.trim())
      }

      const file = fileInputRef.current?.files?.[0]
      if (file) {
        formData.append('image', file)
      }

      if (project) {
        await projectsService.update(project._id, formData)
        toast.success('Project updated successfully')
      } else {
        await projectsService.create(formData)
        toast.success('Project created successfully')
      }

      onSave()
    } catch (error) {
      console.error(error)
      toast.error('Failed to save project')
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header / context */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-white">
          {project ? 'Edit Project' : 'Add New Project'}
        </h2>
        <p className="text-sm text-gray-400">
          Describe the project like a case study: what it does, who it’s for, and what impact it
          had. This is what clients will judge you on.
        </p>
      </div>

      {/* Basic info */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <Input
            {...register('title', { required: 'Title is required' })}
            label="Project Title"
            placeholder="e.g. School Management Dashboard (MERN)"
            error={errors.title?.message}
          />
          <p className="mt-1 text-xs text-gray-500">
            Use a clear, client-friendly title (niche + tech or result focused).
          </p>
        </div>

        <div>
          <Input
            {...register('liveLink', {
              pattern: {
                value: /^(https?:\/\/.+)?$/i,
                message: 'Please enter a valid URL (starting with http or https)',
              },
            })}
            label="Live URL (optional)"
            placeholder="https://app.yourproject.com"
            error={errors.liveLink?.message}
          />
          <p className="mt-1 text-xs text-gray-500">
            Deployed app or demo URL you’ll share with clients.
          </p>
        </div>

        <div>
          <Input
            {...register('githubLink', {
              pattern: {
                value: /^(https?:\/\/.+)?$/i,
                message: 'Please enter a valid URL (starting with http or https)',
              },
            })}
            label="GitHub Repository (optional)"
            placeholder="https://github.com/username/project-repo"
            error={errors.githubLink?.message}
          />
          <p className="mt-1 text-xs text-gray-500">
            Only include if the code is clean enough to show.
          </p>
        </div>
      </div>

      {/* Description / case study */}
      <div>
        <Textarea
          {...register('description', {
            required: 'Description is required',
            minLength: {
              value: 40,
              message: 'Give at least 2–3 lines of meaningful description',
            },
          })}
          label="Project Summary"
          placeholder={
            'Explain in 3–6 lines:\n' +
            '- What problem this project solves\n' +
            '- What features you built (auth, dashboard, payments, etc.)\n' +
            '- Any results (performance, UX, conversion, etc.)'
          }
          rows={6}
          error={errors.description?.message}
        />
        <p className="mt-1 text-xs text-gray-500">
          Think like a portfolio case study, not just “todo app built with React”.
        </p>
      </div>

      {/* Tech stack */}
      <div>
        <Input
          {...register('techStack')}
          label="Tech Stack"
          placeholder="React, Node.js, Express, MongoDB, Tailwind CSS"
        />
        <p className="mt-1 text-xs text-gray-500">
          Comma-separated list. This is turned into an array on the backend and shown as tags on
          your site.
        </p>
      </div>

      {/* Image upload */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Project Thumbnail
        </label>

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="h-32 w-32 rounded-lg object-cover mb-4 border border-slate-700"
          />
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-400 
            file:mr-4 file:py-2 file:px-4 
            file:rounded-lg file:border-0 
            file:text-sm file:font-medium 
            file:bg-indigo-600 file:text-white 
            hover:file:bg-indigo-700"
        />
        <p className="mt-1 text-xs text-gray-500">
          Use a 16:9 screenshot (around 1200×675). This is the first thing clients will see.
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-4 justify-end pt-2">
        <Button
          variant="secondary"
          type="button"
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
        </Button>
      </div>
    </motion.form>
  )
}
