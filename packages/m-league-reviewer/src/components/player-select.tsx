import { Trash2Icon } from 'lucide-react'
import { pros, teams } from '@/api/data'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export interface PlayerOption {
  label: string
  value: string
  teamColor: string
  avatarUrl: string
}

// 生成选手选项列表
export function getPlayerOptions(): PlayerOption[] {
  return pros.map((pro) => {
    const team = teams.find(t => t.id === pro.team_id)
    return {
      label: pro.pro_name,
      value: pro.pro_name,
      teamColor: team?.team_color || '#999',
      avatarUrl: `/src/assets/avatars/${pro.id}.png`,
    }
  })
}

interface PlayerSelectProps {
  value: string
  onChange: (value: string) => void
  onOpenChange?: (open: boolean) => void
  open?: boolean
  placeholder?: string
  showClearOption?: boolean
}

/**
 * 选手选择器组件
 * 带头像和队伍颜色的选手选择下拉框
 */
export function PlayerSelect({
  value,
  onChange,
  onOpenChange,
  open,
  placeholder = 'プロ',
  showClearOption = true,
}: PlayerSelectProps) {
  const playerOptions = getPlayerOptions()

  return (
    <Select
      value={value}
      onValueChange={(val) => {
        const actualValue = val === '__clear__' ? '' : val
        onChange(actualValue)
      }}
      open={open}
      onOpenChange={onOpenChange}
    >
      <SelectTrigger className="h-8" iconClassName="text-background">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {showClearOption && value && (
          <SelectItem
            value="__clear__"
            className="data-highlighted:ring-primary data-highlighted:ring-2 data-highlighted:ring-inset"
          >
            <div className="ml-1 flex items-center gap-3">
              <Trash2Icon className="text-destructive size-4" />
              <span>清除选手</span>
            </div>
          </SelectItem>
        )}
        {playerOptions.map(opt => (
          <SelectItem
            key={opt.value}
            value={opt.value}
            className="focus:text-background data-highlighted:text-background data-highlighted:ring-primary rounded-none data-highlighted:ring-2 data-highlighted:ring-inset"
            iconClassName="text-background"
            style={{
              backgroundColor: opt.teamColor,
              color: '#fff',
            }}
          >
            <div className="flex items-center gap-2">
              <img src={opt.avatarUrl} alt={opt.label} className="size-6 rounded-full object-cover" />
              <span>{opt.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

interface PlayerDisplayProps {
  playerName: string
  playerOptions: PlayerOption[]
  placeholder?: string
}

/**
 * 选手显示组件
 * 显示选手头像和名称
 */
export function PlayerDisplay({ playerName, playerOptions, placeholder = 'プロ' }: PlayerDisplayProps) {
  const player = playerOptions.find(p => p.value === playerName)

  return (
    <div className="flex min-h-[32px] items-center gap-2">
      {playerName && player ? (
        <>
          <img src={player.avatarUrl} alt={playerName} className="size-6 rounded-full object-cover" />
          <span className="font-medium">{playerName}</span>
        </>
      ) : (
        <span className="text-muted-foreground text-sm">{placeholder}</span>
      )}
    </div>
  )
}
