'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

interface TableColumn {
  key: string
  label: string
  render?: (value: any, row: any) => ReactNode
}

interface TableProps {
  columns: TableColumn[]
  data: any[]
  onEdit?: (row: any) => void
  onDelete?: (row: any) => void
}

export function Table({ columns, data, onEdit, onDelete }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-700/50 bg-slate-800/50">
            {columns.map((col) => (
              <th key={col.key} className="px-6 py-4 text-left font-semibold text-gray-300">
                {col.label}
              </th>
            ))}
            {(onEdit || onDelete) && <th className="px-6 py-4 text-left font-semibold text-gray-300">Actions</th>}
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {data.map((row, idx) => (
              <motion.tr
                key={row._id || idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4 text-gray-300">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors"
                        >
                          Edit
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-medium transition-colors"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  )
}
