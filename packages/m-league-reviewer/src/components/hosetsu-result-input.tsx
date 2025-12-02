import type { HosetsuResult, HosetsuType } from '@/api/reviews'
import { AlertCircleIcon, CheckIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface HosetsuResultInputProps {
  value: HosetsuResult
  onChange: (value: HosetsuResult) => void
  onClose?: () => void
  onKeyDown?: (e: React.KeyboardEvent) => void
  autoFocus?: boolean
}

// 何切类型配置
const typeConfig: Record<HosetsuType, { label: string, color: string }> = {
  discard: { label: '放铳', color: 'bg-red-500' },
  tile_efficiency: { label: '损牌效', color: 'bg-orange-500' },
  aggressive: { label: '强攻', color: 'bg-yellow-500' },
  riichi_dama: { label: '立直/默听', color: 'bg-blue-500' },
  defense: { label: '防守', color: 'bg-green-500' },
  call: { label: '鸣牌', color: 'bg-purple-500' },
  other: { label: '其他', color: 'bg-gray-500' },
}

/**
 * 何切结果输入组件
 * 支持右键菜单和工具栏
 */
export function HosetsuResultInput({ value, onChange, onClose, onKeyDown, autoFocus }: HosetsuResultInputProps) {
  // 确保 value 有默认的 type 字段
  const normalizedValue: HosetsuResult = {
    ...value,
    type: value.type || 'other',
  }
  const [localValue, setLocalValue] = useState<HosetsuResult>(normalizedValue)
  const [showToolbar, setShowToolbar] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setLocalValue({
      ...value,
      type: value.type || 'other',
    })
  }, [value])

  const handleDescriptionChange = (description: string) => {
    const newValue = { ...localValue, description }
    setLocalValue(newValue)
    onChange(newValue)
  }

  const handleTypeChange = (type: HosetsuType) => {
    const newValue = { ...localValue, type }
    setLocalValue(newValue)
    onChange(newValue)
  }

  const handleSignificantToggle = () => {
    const newValue = { ...localValue, isSignificant: !localValue.isSignificant }
    setLocalValue(newValue)
    onChange(newValue)
  }

  const handleKeyDownInternal = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault()
      onClose?.()
      onKeyDown?.(e)
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onClose?.()
    } else if (e.key === 'b' && e.ctrlKey) {
      // Ctrl+B 切换严重性
      e.preventDefault()
      handleSignificantToggle()
    } else if (e.key === 't' && e.ctrlKey) {
      // Ctrl+T 显示工具栏
      e.preventDefault()
      setShowToolbar(!showToolbar)
    }
  }

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        value={localValue.description}
        onChange={e => handleDescriptionChange(e.target.value)}
        onKeyDown={handleKeyDownInternal}
        onFocus={() => setShowToolbar(true)}
        onBlur={(e) => {
          // 检查焦点是否移动到工具栏或其内部元素
          const relatedTarget = e.relatedTarget as HTMLElement

          // 如果没有 relatedTarget，说明点击了真正的空白区域
          if (!relatedTarget) {
            setTimeout(() => {
              setShowToolbar(false)
              onClose?.()
            }, 150)
            return
          }

          // 检查是否点击了工具栏或其子元素（包括 Select 下拉框）
          const toolbar = document.querySelector('.hosetsu-toolbar')
          if (toolbar && toolbar.contains(relatedTarget)) {
            // 点击了工具栏内的元素，不关闭
            return
          }

          // 检查是否点击了 Select 的下拉菜单（Radix UI Portal）
          const isSelectContent
            = relatedTarget.closest('[role="listbox"]') || relatedTarget.closest('[data-radix-popper-content-wrapper]')
          if (isSelectContent) {
            // 点击了下拉菜单，不关闭
            return
          }

          // 其他情况，关闭工具栏
          setTimeout(() => {
            setShowToolbar(false)
            onClose?.()
          }, 150)
        }}
        autoFocus={autoFocus}
        className="h-8"
        placeholder="何切描述..."
      />

      {/* 工具栏 */}
      {showToolbar && (
        <div className="hosetsu-toolbar border-border bg-popover absolute top-full left-0 z-50 mt-1 flex items-center gap-2 rounded-md border p-2 shadow-md">
          {/* 何切类型选择 */}
          <Select
            value={localValue.type}
            onValueChange={(v) => {
              handleTypeChange(v as HosetsuType)
              inputRef.current?.focus()
            }}
          >
            <SelectTrigger className="h-7 w-32 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(typeConfig).map(([key, config]) => (
                <SelectItem key={key} value={key} className="text-xs">
                  <div className="flex items-center gap-2">
                    <div className={cn('size-2 rounded-full', config.color)} />
                    <span>{config.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* 严重性切换 */}
          <Button
            size="sm"
            variant={localValue.isSignificant ? 'default' : 'outline'}
            onClick={() => {
              handleSignificantToggle()
              inputRef.current?.focus()
            }}
            className="h-7 gap-1 text-xs"
            title="标记为严重分歧 (Ctrl+B)"
          >
            <AlertCircleIcon className="size-3" />
            严重
          </Button>

          <div className="text-muted-foreground text-[10px]">Ctrl+B: 严重 | Enter/Tab: 确认</div>
        </div>
      )}
    </div>
  )
}

interface HosetsuResultDisplayProps {
  value: HosetsuResult
  placeholder?: string
}

/**
 * 何切结果显示组件
 * 根据 isSignificant 显示不同样式
 */
export function HosetsuResultDisplay({ value, placeholder = '' }: HosetsuResultDisplayProps) {
  // 安全获取配置，如果 type 不存在则使用 'other'
  const type = value.type || 'other'
  const config = typeConfig[type]

  return (
    <div className="flex min-h-[32px] items-center gap-2">
      {value.description ? (
        <>
          {/* 何切类型指示器 */}
          {type !== 'other' && config && (
            <div className={cn('size-2 shrink-0 rounded-full', config.color)} title={config.label} />
          )}
          {/* 描述文本 */}
          <span className={cn('text-sm', value.isSignificant && 'text-primary font-bold')}>{value.description}</span>
        </>
      ) : (
        <span className="text-muted-foreground text-sm">{placeholder}</span>
      )}
    </div>
  )
}

interface HosetsuResultContextMenuProps {
  value: HosetsuResult
  onChange: (value: HosetsuResult) => void
  children: React.ReactNode
}

/**
 * 何切结果右键菜单组件
 */
export function HosetsuResultContextMenu({ value, onChange, children }: HosetsuResultContextMenuProps) {
  const [open, setOpen] = useState(false)

  const handleTypeChange = (type: HosetsuType) => {
    onChange({ ...value, type })
    setOpen(false)
  }

  const handleSignificantToggle = () => {
    onChange({ ...value, isSignificant: !value.isSignificant })
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          onContextMenu={(e) => {
            e.preventDefault()
            setOpen(true)
          }}
        >
          {children}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2" align="start">
        <div className="space-y-1">
          <div className="text-muted-foreground mb-2 text-xs font-medium">何切类型</div>
          {Object.entries(typeConfig).map(([key, config]) => (
            <Button
              key={key}
              variant="ghost"
              size="sm"
              onClick={() => handleTypeChange(key as HosetsuType)}
              className={cn(
                'h-auto w-full justify-start gap-2 px-2 py-1.5 text-xs font-normal',
                (value.type || 'other') === key && 'bg-accent',
              )}
            >
              <div className={cn('size-2 rounded-full', config.color)} />
              <span>{config.label}</span>
              {(value.type || 'other') === key && <CheckIcon className="ml-auto size-3" />}
            </Button>
          ))}
          <div className="border-border my-2 border-t" />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignificantToggle}
            className={cn(
              'h-auto w-full justify-start gap-2 px-2 py-1.5 text-xs font-normal',
              value.isSignificant && 'bg-accent',
            )}
          >
            <AlertCircleIcon className="size-3" />
            <span>标记为严重</span>
            {value.isSignificant && <CheckIcon className="ml-auto size-3" />}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
