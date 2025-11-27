import type { Pro } from '@/api/data'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

interface PlayerCardProps {
  player: Pro
  teamColor: string
}

/**
 * 选手卡片组件
 * 显示选手的头像、姓名和详细信息
 */
export function PlayerCard({ player, teamColor }: PlayerCardProps) {
  return (
    <Card
      className="overflow-hidden border-2 pt-0 transition-transform hover:scale-105"
      style={{
        borderColor: teamColor,
        backgroundColor: `${teamColor}10`,
      }}
    >
      <CardHeader className="py-4" style={{ backgroundColor: teamColor }}>
        <div className="flex flex-col items-center">
          <img
            src={`/src/assets/avatars/${player.id}.png`}
            alt={player.pro_name}
            className="border-border h-24 w-24 rounded-full border-4 object-cover shadow-lg"
          />
          <h3 className="text-card mt-3 text-xl font-bold">{player.pro_name}</h3>
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
