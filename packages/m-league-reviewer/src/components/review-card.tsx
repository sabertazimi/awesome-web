import type { Review } from '@/api/reviews'
import { ExternalLinkIcon, XIcon } from 'lucide-react'
import { getTeamColorClassByName, teams } from '@/api/data'
import { statusColors } from '@/api/reviews'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ReviewCardProps {
  review: Review
  onClick: () => void
  onDelete: (e: React.MouseEvent) => void
}

/**
 * 复盘卡片组件
 * 用于在日历视图中显示单个复盘项
 */
export function ReviewCard({ review, onClick, onDelete }: ReviewCardProps) {
  const statusColor = statusColors[review.status || 'not_started']

  // 获取队伍信息
  const reviewTeams = review.teams?.map(teamName => teams.find(t => t.team_name === teamName)).filter(Boolean)

  return (
    <div
      className={cn('group relative cursor-pointer space-y-4 border-none p-3 transition-colors', statusColor)}
      onClick={onClick}
    >
      {/* 标题 */}
      <p className="font-mono text-sm font-medium">{review.title}</p>

      {/* 链接 */}
      {(review.linkA || review.linkB) && (
        <div className="flex flex-col gap-1 text-xs">
          {review.linkA && (
            <a
              href={review.linkA}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 opacity-70 transition-opacity hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation()
              }}
              title={review.linkA}
            >
              <ExternalLinkIcon className="size-3 shrink-0" />
              <span className="truncate">{review.linkA}</span>
            </a>
          )}
          {review.linkB && (
            <a
              href={review.linkB}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 opacity-70 transition-opacity hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation()
              }}
              title={review.linkB}
            >
              <ExternalLinkIcon className="size-3 shrink-0" />
              <span className="truncate">{review.linkB}</span>
            </a>
          )}
        </div>
      )}

      {/* 参赛队伍 */}
      {reviewTeams && reviewTeams.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {reviewTeams.map((team) => {
            const teamColors = getTeamColorClassByName(team!.team_name)
            return (
              <Badge
                key={team!.id}
                variant="outline"
                className={cn('h-5 px-1.5 text-[10px] font-medium', teamColors)}
              >
                {team!.team_name}
              </Badge>
            )
          })}
        </div>
      )}
      <Button
        variant="ghost"
        className="absolute top-1 right-1 size-6 opacity-0 transition-all duration-200 group-hover:opacity-100"
        onClick={onDelete}
        title="删除"
        aria-label="删除"
      >
        <XIcon className="size-4" />
      </Button>
    </div>
  )
}
