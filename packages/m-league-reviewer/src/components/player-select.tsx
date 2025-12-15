import { Trash2Icon } from 'lucide-react'
import { getTeamColorClass, pros, teams } from '@/api/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export interface PlayerOption {
  label: string
  value: string
  teamId: number
  avatarUrl: string
}

export function getPlayerOptions(filterByTeams?: string[]): PlayerOption[] {
  let filteredPros = pros

  if (filterByTeams && filterByTeams.length > 0) {
    const teamIds = filterByTeams
      .map(teamName => teams.find(t => t.teamName === teamName)?.id)
      .filter((id): id is number => id !== undefined)

    filteredPros = pros.filter(pro => teamIds.includes(pro.teamId))
  }

  return filteredPros.map((pro) => {
    return {
      label: pro.proName,
      value: pro.proName,
      teamId: pro.teamId,
      avatarUrl: `${import.meta.env.BASE_URL}avatars/${pro.id}.png`,
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
  filterByTeams?: string[]
}

export function PlayerSelect({
  value,
  onChange,
  onOpenChange,
  open,
  placeholder = 'プロ',
  showClearOption = true,
  filterByTeams,
}: PlayerSelectProps) {
  const playerOptions = getPlayerOptions(filterByTeams)

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
        {playerOptions.map((opt) => {
          const teamColors = getTeamColorClass(opt.teamId)
          return (
            <SelectItem key={opt.value} value={opt.value} className={teamColors}>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={opt.avatarUrl} alt={opt.label} />
                  <AvatarFallback>{opt.label.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <span>{opt.label}</span>
              </div>
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}

interface PlayerDisplayProps {
  playerName: string
  playerOptions: PlayerOption[]
  placeholder?: string
}

export function PlayerDisplay({ playerName, playerOptions, placeholder = 'プロ' }: PlayerDisplayProps) {
  const player = playerOptions.find(p => p.value === playerName)

  return (
    <div className="flex min-h-[32px] items-center gap-2">
      {playerName && player ? (
        <>
          <Avatar>
            <AvatarImage src={player.avatarUrl} alt={playerName} />
            <AvatarFallback>{playerName.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{playerName}</span>
        </>
      ) : (
        <span className="text-muted-foreground text-sm">{placeholder}</span>
      )}
    </div>
  )
}
