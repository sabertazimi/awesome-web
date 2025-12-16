import type { ReactNode, RefObject } from 'react'
import { cn } from '@/lib/utils'

interface EditableFieldProps {
  ref?: RefObject<HTMLDivElement | null>
  isEditing: boolean
  onEdit: () => void
  editComponent: ReactNode
  displayComponent: ReactNode
  className?: string
  cursorType?: 'text' | 'pointer'
}

export function EditableField({
  ref,
  isEditing,
  onEdit,
  editComponent,
  displayComponent,
  className,
  cursorType = 'text',
}: EditableFieldProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isEditing && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      onEdit()
    }
  }

  return (
    <div
      ref={ref}
      tabIndex={isEditing ? -1 : 0}
      role="button"
      className={cn(
        'px-3 py-2 transition-all',
        cursorType === 'text' && 'cursor-text',
        cursorType === 'pointer' && 'cursor-pointer',
        !isEditing && 'hover:bg-accent',
        className,
      )}
      onClick={() => !isEditing && onEdit()}
      onKeyDown={handleKeyDown}
    >
      {isEditing ? editComponent : displayComponent}
    </div>
  )
}
