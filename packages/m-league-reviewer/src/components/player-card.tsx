import type { Pro } from '@/api/data'
import { motion } from 'motion/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3 },
      }}
    >
      <Card
        className="overflow-hidden pt-0 transition-shadow duration-300 hover:shadow-xl"
        style={{
          backgroundColor: `${teamColor}30`,
        }}
      >
        <CardHeader className="py-4" style={{ backgroundColor: teamColor }}>
          <motion.div
            className="flex flex-col items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            <motion.div
              variants={{
                hidden: { scale: 0, opacity: 0 },
                visible: { scale: 1, opacity: 1 },
              }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
              }}
            >
              <Avatar className="size-24 border-4 border-white/20 shadow-lg">
                <AvatarImage src={`${import.meta.env.BASE_URL}avatars/${player.id}.png`} alt={player.pro_name} />
                <AvatarFallback>{player.pro_name.slice(0, 2)}</AvatarFallback>
              </Avatar>
            </motion.div>
            <motion.h3
              className="text-card mt-3 font-mono text-xl font-bold"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4 }}
            >
              {player.pro_name}
            </motion.h3>
          </motion.div>
        </CardHeader>
        <CardContent className="space-y-2 pt-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            <motion.div
              className="text-sm"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <p className="text-muted-foreground">生年月日</p>
              <p className="font-medium">{player.birth}</p>
            </motion.div>
            <motion.div
              className="text-sm"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <p className="text-muted-foreground">出身地</p>
              <p className="font-medium">{player.birth_place}</p>
            </motion.div>
            <motion.div
              className="text-sm"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <p className="text-muted-foreground">所属団体</p>
              <p className="text-xs font-medium">{player.org}</p>
            </motion.div>
            <motion.div
              className="text-sm"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <p className="text-muted-foreground">プロ入会</p>
              <p className="font-medium">
                {player.pro_year}
                年
              </p>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
