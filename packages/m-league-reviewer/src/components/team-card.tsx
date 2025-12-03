import type { ReactNode } from 'react'
import type { Team } from '@/api/data'

interface TeamCardProps {
  team: Team
  children: ReactNode
}

/**
 * 队伍卡片组件（组合式）
 * 显示队伍标题和成员列表
 */
export function TeamCard({ team, children }: TeamCardProps) {
  return (
    <div className="bg-background space-y-4 p-8">
      {/* 队伍标题 */}
      <div className="mb-6 flex items-center gap-4">
        <img
          src={`${import.meta.env.BASE_URL}teams/${team.id}.png`}
          alt={team.team_name}
          className="h-16 w-16 object-contain"
        />
        <h2 className="font-mono text-3xl font-bold" style={{ color: team.team_color }}>
          {team.team_name}
        </h2>
      </div>

      {/* 队员卡片网格 */}
      <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
        {children}
      </div>
    </div>
  )
}
