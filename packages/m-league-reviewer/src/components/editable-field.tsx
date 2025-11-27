import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface EditableFieldProps {
  isEditing: boolean
  onEdit: () => void
  onBlur?: () => void
  editComponent: ReactNode
  displayComponent: ReactNode
  className?: string
  cursorType?: 'text' | 'pointer'
}

/**
 * 可编辑字段组件
 * 统一处理字段的编辑/显示状态切换和样式
 */
export function EditableField({
  isEditing,
  onEdit,
  onBlur,
  editComponent,
  displayComponent,
  className,
  cursorType = 'text',
}: EditableFieldProps) {
  return (
    <div
      className={cn(
        'rounded px-3 py-2 transition-all',
        cursorType === 'text' && 'cursor-text',
        cursorType === 'pointer' && 'cursor-pointer',
        !isEditing && 'hover:bg-accent hover:shadow-md',
        className,
      )}
      onClick={() => !isEditing && onEdit()}
      onBlur={onBlur}
    >
      {isEditing ? editComponent : displayComponent}
    </div>
  )
}
