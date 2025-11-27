import type { ReactNode } from 'react'
import type { Team } from '@/api/data'

interface TeamCardProps {
  team: Team
  children: ReactNode
}

/**
 * 队伍卡片组件（组合式）
 * 显示队伍标题和成员列表
 * 使用 Shadcn 组合式风格，通过 children 渲染队员卡片
 */
export function TeamCard({ team, children }: TeamCardProps) {
  return (
    <div className="space-y-4">
      {/* 队伍标题 */}
      <div className="mb-6 flex items-center gap-4">
        <img
          src={`/src/assets/teams/${team.id}.png`}
          alt={team.team_name}
          className="h-16 w-16 object-contain"
        />
        <h2 className="text-3xl font-bold" style={{ color: team.team_color }}>
          {team.team_name}
        </h2>
      </div>

      {/* 队员卡片网格 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {children}
      </div>
    </div>
  )
}
