// components/Textarea.tsx
"use client"

import * as React from "react"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-200">
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          {...props}
          className={
            `w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 outline-none 
            focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 ` + (className ?? "")
          }
        />

        {error && (
          <p className="text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = "Textarea"

export default Textarea
