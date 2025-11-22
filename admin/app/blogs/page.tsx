'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import DashboardLayout  from '@/components/DashboardLayout'
import { Table } from '@/components/Table'
import { Modal } from '@/components/Modal'
import { Button } from '@/components/Button'
import { Loader } from '@/components/Loader'
import { blogsService } from '@/services/blogs.service'
import { toast } from '@/lib/toast'
import { Blog } from '@/types'
import BlogForm from './blog-form'

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      setIsLoading(true)
      const data = await blogsService.getAll()
      setBlogs(data)
    } catch (error) {
      toast.error('Failed to fetch blogs')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = () => {
    setSelectedBlog(null)
    setIsModalOpen(true)
  }

  const handleEdit = (blog: Blog) => {
    setSelectedBlog(blog)
    setIsModalOpen(true)
  }

  const handleDelete = async (blog: Blog) => {
    if (confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogsService.delete(blog._id)
        setBlogs(blogs.filter((b) => b._id !== blog._id))
        toast.success('Blog deleted successfully')
      } catch (error) {
        toast.error('Failed to delete blog')
      }
    }
  }

  const handleSave = async () => {
    await fetchBlogs()
    setIsModalOpen(false)
    setSelectedBlog(null)
  }

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white">Blogs</h1>
            <p className="text-gray-400">Manage your blog posts</p>
          </div>
          <Button onClick={handleCreate}>+ New Blog</Button>
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
                  render: (value) => <span className="truncate max-w-xs">{value}</span>,
                },
                {
                  key: 'image',
                  label: 'Image',
                  render: (value) => (
                    <img src={value || "/placeholder.svg"} alt="Blog" className="h-10 w-10 rounded-lg object-cover" />
                  ),
                },
                { key: 'author', label: 'Author' },
                {
                  key: 'createdAt',
                  label: 'Created',
                  render: (value) => new Date(value).toLocaleDateString(),
                },
              ]}
              data={blogs}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={selectedBlog ? 'Edit Blog' : 'Create Blog'}
        >
          <BlogForm blog={selectedBlog || undefined} onSave={handleSave} />
        </Modal>
      </motion.div>
    </DashboardLayout>
  )
}
