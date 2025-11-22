'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import DashboardLayout  from '@/components/DashboardLayout'
import { Table } from '@/components/Table'
import { Modal } from '@/components/Modal'
import { Button } from '@/components/Button'
import { Loader } from '@/components/Loader'
import { projectsService } from '@/services/projects.service'
import { toast } from '@/lib/toast'
import { Project } from '@/types'
import ProjectForm from './project-form'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setIsLoading(true)
      const data = await projectsService.getAll()
      setProjects(data)
    } catch (error) {
      toast.error('Failed to fetch projects')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = () => {
    setSelectedProject(null)
    setIsModalOpen(true)
  }

  const handleEdit = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleDelete = async (project: Project) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await projectsService.delete(project._id)
        setProjects(projects.filter((p) => p._id !== project._id))
        toast.success('Project deleted successfully')
      } catch (error) {
        toast.error('Failed to delete project')
      }
    }
  }

  const handleSave = async () => {
    await fetchProjects()
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white">Projects</h1>
            <p className="text-gray-400">Manage your portfolio projects</p>
          </div>
          <Button onClick={handleCreate}>+ New Project</Button>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <Table
              columns={[
                { key: 'title', label: 'Title' },
                {
                  key: 'description',
                  label: 'Description',
                  render: (value) => <span className="truncate">{value}</span>,
                },
                {
                  key: 'image',
                  label: 'Image',
                  render: (value) => (
                    <img src={value || "/placeholder.svg"} alt="Project" className="h-10 w-10 rounded-lg object-cover" />
                  ),
                },
                {
                  key: 'createdAt',
                  label: 'Created',
                  render: (value) => new Date(value).toLocaleDateString(),
                },
              ]}
              data={projects}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={selectedProject ? 'Edit Project' : 'Create Project'}
        >
          <ProjectForm project={selectedProject || undefined} onSave={handleSave} />
        </Modal>
      </motion.div>
    </DashboardLayout>
  )
}
