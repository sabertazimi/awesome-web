import type { HosetsuResult, HosetsuType } from '@/api/reviews'
import { AlertCircleIcon, CheckIcon, ClipboardCopyIcon, ClipboardPasteIcon, ScissorsIcon, XIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Kbd, KbdGroup } from '@/components/ui/kbd'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface HosetsuResultInputProps {
  value: HosetsuResult
  onChange: (value: HosetsuResult) => void
  onClose?: () => void
  onKeyDown?: (e: React.KeyboardEvent) => void
  autoFocus?: boolean
}

/** 何切类型配置 */
const typeConfig: Record<HosetsuType, { label: string, color: string }> = {
  hand_sequence: { label: '手顺', color: 'bg-team-1' },
  tile_efficiency: { label: '牌效', color: 'bg-team-2' },
  riichi: { label: '立直', color: 'bg-team-3' },
  dama: { label: '默听', color: 'bg-team-4' },
  call: { label: '鸣牌', color: 'bg-team-5' },
  refuse_tenpai: { label: '拒听', color: 'bg-team-6' },
  retreat: { label: '退向', color: 'bg-team-7' },
  betaori: { label: '兜牌', color: 'bg-team-8' },
  fold: { label: '下车', color: 'bg-team-9' },
  aggressive: { label: '强攻', color: 'bg-team-10' },
  discard: { label: '放铳', color: 'bg-destructive' },
  other: { label: '其他', color: 'bg-ring' },
}

function isHosetsuType(value: string): value is HosetsuType {
  return Object.keys(typeConfig).includes(value)
}

/** 默认何切结果值 */
const DEFAULT_HOSETSU_RESULT = {
  description: '',
  type: 'other',
  isSignificant: false,
} as const

/**
 * 复制 HosetsuResult 到剪贴板
 */
function copyHosetsuResultToClipboard(value: HosetsuResult) {
  const data = JSON.stringify(value)
  navigator.clipboard
    .writeText(data)
    .catch((err: unknown) => toast.error(`复制失败: ${err instanceof Error ? err.message : String(err)}`))
}

/**
 * 从文本解析并验证 HosetsuResult
 * @returns 解析成功返回 HosetsuResult，失败返回 null
 */
function parseHosetsuResult(text: string): HosetsuResult | null {
  try {
    const parsed = JSON.parse(text) as HosetsuResult

    if (
      typeof parsed === 'object'
      && parsed !== null
      && 'description' in parsed
      && (parsed.type === undefined || isHosetsuType(parsed.type))
    ) {
      return {
        description: parsed.description || '',
        type: parsed.type || 'other',
        isSignificant: parsed.isSignificant || false,
      }
    }
  } catch {}

  return null
}

/**
 * 何切结果输入组件
 * 支持右键菜单和工具栏
 */
export function HosetsuResultInput({ value, onChange, onClose, onKeyDown, autoFocus }: HosetsuResultInputProps) {
  const normalizedValue: HosetsuResult = {
    ...value,
    type: value.type || 'other',
  }
  const [localValue, setLocalValue] = useState<HosetsuResult>(normalizedValue)
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

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setLocalValue(DEFAULT_HOSETSU_RESULT)
    onChange(DEFAULT_HOSETSU_RESULT)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const handleCopyButton = () => {
    copyHosetsuResultToClipboard(localValue)
    inputRef.current?.focus()
  }

  const handleCutButton = () => {
    copyHosetsuResultToClipboard(localValue)
    setLocalValue(DEFAULT_HOSETSU_RESULT)
    onChange(DEFAULT_HOSETSU_RESULT)
    inputRef.current?.focus()
  }

  const handlePasteButton = () => {
    navigator.clipboard
      .readText()
      .then((text) => {
        const parsed = parseHosetsuResult(text)
        if (parsed) {
          setLocalValue(parsed)
          onChange(parsed)
        } else {
          toast.warning('无法解析剪贴板内容为何切结果')
        }
        inputRef.current?.focus()
      })
      .catch((err: unknown) => {
        toast.error(`读取剪贴板失败: ${err instanceof Error ? err.message : String(err)}`)
        inputRef.current?.focus()
      })
  }

  const handleCopyShortcut = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const selection = window.getSelection()
    if (selection && selection.toString()) {
      return
    }

    e.preventDefault()
    copyHosetsuResultToClipboard(localValue)
  }

  const handleCutShortcut = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const selection = window.getSelection()
    if (selection && selection.toString()) {
      return
    }

    e.preventDefault()
    copyHosetsuResultToClipboard(localValue)
    setLocalValue(DEFAULT_HOSETSU_RESULT)
    onChange(DEFAULT_HOSETSU_RESULT)
  }

  const handlePasteShortcut = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData('text')
    const parsed = parseHosetsuResult(text)

    if (parsed) {
      e.preventDefault()
      setLocalValue(parsed)
      onChange(parsed)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onClose?.()
      onKeyDown?.(e)
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onClose?.()
    } else if (e.key === 'b' && e.ctrlKey) {
      e.preventDefault()
      handleSignificantToggle()
    } else if (e.key === 's' && e.ctrlKey) {
      e.preventDefault()
      onClose?.()
    }
  }

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        value={localValue.description}
        onChange={e => handleDescriptionChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onCopy={handleCopyShortcut}
        onCut={handleCutShortcut}
        onPaste={handlePasteShortcut}
        onBlur={(e) => {
          // 如果没有 relatedTarget，说明点击了真正的空白区域
          const relatedTarget = e.relatedTarget
          if (!relatedTarget) {
            onClose?.()
            return
          }

          // 点击了清空按钮，不关闭
          const clearButton = e.currentTarget.parentElement?.querySelector('[title="清空输入"]')
          if (clearButton && clearButton.contains(relatedTarget)) {
            return
          }

          // 切换焦点到工具栏内的元素时，不关闭
          const toolbar = document.querySelector('.hosetsu-toolbar')
          if (toolbar && toolbar.contains(relatedTarget)) {
            return
          }

          // 点击了下拉菜单，不关闭
          const isSelectContent
            = relatedTarget.closest('[role="listbox"]') || relatedTarget.closest('[data-radix-popper-content-wrapper]')
          if (isSelectContent) {
            return
          }

          // 其他情况，关闭工具栏
          onClose?.()
        }}
        autoFocus={autoFocus}
        className={cn('h-8 pr-8', localValue.isSignificant && 'text-primary font-bold')}
        placeholder="何切描述..."
      />
      {localValue.description && (
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onMouseDown={handleClear}
          className="absolute top-1/2 right-1 size-6 -translate-y-1/2"
          title="清空输入"
          aria-label="清空输入"
          tabIndex={-1}
        >
          <XIcon className="size-4" />
        </Button>
      )}

      <div className="hosetsu-toolbar border-border bg-popover absolute top-full left-0 z-50 mt-1 flex flex-col gap-2 border p-2 shadow-md">
        <div className="flex items-center gap-2">
          <Select
            value={localValue.type}
            onValueChange={(v) => {
              if (isHosetsuType(v)) {
                handleTypeChange(v)
              }
            }}
            onOpenChange={(open) => {
              // 当 Select 关闭时,在 Radix UI 焦点管理完成后恢复焦点
              if (!open) {
                // 使用双重 requestAnimationFrame 确保在 Radix UI 的焦点恢复之后执行
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                    inputRef.current?.focus()
                  })
                })
              }
            }}
          >
            <SelectTrigger className="h-7 w-32 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(typeConfig).map(([key, config]) => (
                <SelectItem key={key} value={key} className="text-xs">
                  <Badge className={cn(config.color, 'border-transparent text-white')}>{config.label}</Badge>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            size="sm"
            variant={localValue.isSignificant ? 'default' : 'outline'}
            onClick={() => {
              handleSignificantToggle()
              inputRef.current?.focus()
            }}
            className="h-7 gap-1 text-xs"
            title="Ctrl+B"
          >
            <AlertCircleIcon className="size-3" />
            严重
          </Button>
          <Button size="sm" variant="outline" onClick={handleCopyButton} className="h-7 gap-1 text-xs" title="Ctrl+C">
            <ClipboardCopyIcon className="size-3" />
            复制
          </Button>
          <Button size="sm" variant="outline" onClick={handleCutButton} className="h-7 gap-1 text-xs" title="Ctrl+X">
            <ScissorsIcon className="size-3" />
            剪切
          </Button>
          <Button size="sm" variant="outline" onClick={handlePasteButton} className="h-7 gap-1 text-xs" title="Ctrl+V">
            <ClipboardPasteIcon className="size-3" />
            粘贴
          </Button>
        </div>
        <div className="text-muted-foreground flex flex-wrap gap-x-3 gap-y-1 text-xs">
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>B</Kbd>
            <span>严重</span>
          </KbdGroup>
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>C</Kbd>
            <span>复制</span>
          </KbdGroup>
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>X</Kbd>
            <span>剪切</span>
          </KbdGroup>
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>V</Kbd>
            <span>粘贴</span>
          </KbdGroup>
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>S</Kbd>
            <span>确认</span>
          </KbdGroup>
        </div>
      </div>
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
          {type !== 'other' && config && (
            <Badge className={cn(config.color, 'border-transparent text-white')}>{config.label}</Badge>
          )}
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

  const handleTypeChange = (type: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (isHosetsuType(type)) {
      onChange({ ...value, type })
    }
    setOpen(false)
  }

  const handleSignificantToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange({ ...value, isSignificant: !value.isSignificant })
    setOpen(false)
  }

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    copyHosetsuResultToClipboard(value)
    setOpen(false)
  }

  const handleCut = (e: React.MouseEvent) => {
    e.stopPropagation()
    copyHosetsuResultToClipboard(value)
    onChange(DEFAULT_HOSETSU_RESULT)
    setOpen(false)
  }

  const handlePaste = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard
      .readText()
      .then((text) => {
        const parsed = parseHosetsuResult(text)
        if (parsed) {
          onChange(parsed)
        } else {
          toast.warning('无法解析剪贴板内容为何切结果')
        }
        setOpen(false)
      })
      .catch((err: unknown) => {
        toast.error(`读取剪贴板失败: ${err instanceof Error ? err.message : String(err)}`)
        setOpen(false)
      })
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(DEFAULT_HOSETSU_RESULT)
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
      <PopoverContent className="w-48 p-2" align="start" onClick={e => e.stopPropagation()}>
        <div className="space-y-1">
          <div className="text-muted-foreground mb-2 text-xs font-medium">何切类型</div>
          {Object.entries(typeConfig).map(([key, config]) => (
            <Button
              key={key}
              variant="ghost"
              size="sm"
              onClick={e => handleTypeChange(key, e)}
              className={cn(
                'h-auto w-full justify-start gap-2 px-2 py-1.5 text-xs font-normal',
                (value.type || 'other') === key && 'bg-accent',
              )}
            >
              <Badge className={cn(config.color, 'border-transparent text-white')}>{config.label}</Badge>
              {(value.type || 'other') === key && <CheckIcon className="ml-auto size-3" />}
            </Button>
          ))}
          <Separator />
          <Button
            variant="ghost"
            size="sm"
            onClick={e => handleSignificantToggle(e)}
            className={cn(
              'h-auto w-full justify-start gap-2 px-2 py-1.5 text-xs font-normal',
              value.isSignificant && 'bg-primary text-primary-foreground',
            )}
          >
            <AlertCircleIcon className="size-3" />
            <span>标记为严重</span>
            {value.isSignificant && <CheckIcon className="ml-auto size-3" />}
          </Button>
          <Separator />
          <Button
            variant="ghost"
            size="sm"
            onClick={e => handleCopy(e)}
            className="h-auto w-full justify-start gap-2 px-2 py-1.5 text-xs font-normal"
          >
            <ClipboardCopyIcon className="size-3" />
            <span>复制</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={e => handleCut(e)}
            className="h-auto w-full justify-start gap-2 px-2 py-1.5 text-xs font-normal"
          >
            <ScissorsIcon className="size-3" />
            <span>剪切</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={e => handlePaste(e)}
            className="h-auto w-full justify-start gap-2 px-2 py-1.5 text-xs font-normal"
          >
            <ClipboardPasteIcon className="size-3" />
            <span>粘贴</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={e => handleClear(e)}
            className="h-auto w-full justify-start gap-2 px-2 py-1.5 text-xs font-normal"
          >
            <XIcon className="size-3" />
            <span>清空</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
