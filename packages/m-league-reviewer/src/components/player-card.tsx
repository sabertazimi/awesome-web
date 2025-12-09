import type { Pro } from '@/api/data'
import { getTeamColorClass } from '@/api/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface PlayerCardProps {
  player: Pro
  teamId: number
}

/**
 * 选手卡片组件
 * 显示选手的头像、姓名和详细信息
 */
export function PlayerCard({ player, teamId }: PlayerCardProps) {
  const teamColors = getTeamColorClass(teamId)

  return (
    <Card
      className={cn('overflow-hidden pt-0 transition-all duration-200 hover:-translate-y-2 hover:shadow-xl', teamColors)}
    >
      <CardHeader className={cn('py-4', teamColors)}>
        <div className="flex flex-col items-center">
          <Avatar className="size-24 border-4 border-white/20 shadow-lg">
            <AvatarImage src={`${import.meta.env.BASE_URL}avatars/${player.id}.png`} alt={player.pro_name} />
            <AvatarFallback>{player.pro_name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <h3 className="text-primary-foreground mt-3 font-mono text-xl font-bold">{player.pro_name}</h3>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 pt-4">
        <div className="text-sm">
          <p className="text-muted-foreground">生年月日</p>
          <p className="font-medium">{player.birth}</p>
        </div>
        <div className="text-sm">
          <p className="text-muted-foreground">出身地</p>
          <p className="font-medium">{player.birth_place}</p>
        </div>
        <div className="text-sm">
          <p className="text-muted-foreground">所属団体</p>
          <p className="text-xs font-medium">{player.org}</p>
        </div>
        <div className="text-sm">
          <p className="text-muted-foreground">プロ入会</p>
          <p className="font-medium">
            {player.pro_year}
            年
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
