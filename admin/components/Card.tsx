import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm ${className}`}>
      {children}
    </div>
  )
}
