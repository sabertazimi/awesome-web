import type { Variants } from 'motion/react'
import type { Pro } from '@/api/data'
import { motion } from 'motion/react'
import { getTeamColorClass } from '@/api/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface PlayerCardProps {
  player: Pro
  teamId: number
  index?: number
}

const playerCardVariants: Variants = {
  hidden: {
    opacity: 0,
    scaleY: 0.5,
  },
  visible: (index: number) => ({
    opacity: 1,
    scaleY: 1,
    transition: {
      opacity: { duration: 0.2, delay: index * 0.08 },
      scaleY: { duration: 0.3, ease: 'easeOut', delay: index * 0.08 },
    },
  }),
}

function getTeamCardBackgroundColor(teamId: number): string {
  const bgColorMap: Record<number, string> = {
    1: 'bg-team-1/30',
    2: 'bg-team-2/30',
    3: 'bg-team-3/30',
    4: 'bg-team-4/30',
    5: 'bg-team-5/30',
    6: 'bg-team-6/30',
    7: 'bg-team-7/30',
    8: 'bg-team-8/30',
    9: 'bg-team-9/30',
    10: 'bg-team-10/30',
  }

  return bgColorMap[teamId] || 'bg-muted/30'
}

/**
 * 选手卡片组件
 * 显示选手的头像、姓名和详细信息
 */
export function PlayerCard({ player, teamId, index = 0 }: PlayerCardProps) {
  const teamCardBackgroundColor = getTeamCardBackgroundColor(teamId)
  const teamColors = getTeamColorClass(teamId)

  return (
    <motion.div
      variants={playerCardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      custom={index}
      className="origin-top"
    >
      <Card
        className={cn(
          'overflow-hidden pt-0 transition-all duration-200 hover:-translate-y-2 hover:shadow-xl rounded-xs',
          teamCardBackgroundColor,
        )}
      >
        <CardHeader className={cn('py-4', teamColors)}>
          <div className="flex flex-col items-center">
            <Avatar className="size-24 border-4 border-white/20 shadow-lg">
              <AvatarImage src={`${import.meta.env.BASE_URL}avatars/${player.id}.png`} alt={player.proName} />
              <AvatarFallback>{player.proName.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <h3 className="text-primary-foreground mt-3 font-mono text-xl font-bold">{player.proName}</h3>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-4 sm:space-y-2">
          <div className="text-sm">
            <p className="text-muted-foreground">生年月日</p>
            <p className="font-medium">{player.birth}</p>
          </div>
          <div className="text-sm">
            <p className="text-muted-foreground">出身地</p>
            <p className="font-medium">{player.birthPlace}</p>
          </div>
          <div className="text-sm">
            <p className="text-muted-foreground">所属団体</p>
            <p className="text-xs font-medium">{player.org}</p>
          </div>
          <div className="text-sm">
            <p className="text-muted-foreground">プロ入会</p>
            <p className="font-medium">
              {player.proYear}
              年
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
