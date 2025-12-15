import type { Review } from '@/api/data'
import { ExternalLinkIcon, XIcon } from 'lucide-react'
import { useState } from 'react'
import { getTeamColorClassByName, statusConfig, teams } from '@/api/data'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useReviewsStore } from '@/stores/reviews'

interface ReviewCardProps {
  review: Review
  onClick: () => void
}

export function ReviewCard({ review, onClick }: ReviewCardProps) {
  const deleteReview = useReviewsStore(state => state.deleteReview)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const statusColor = statusConfig[review.status || 'not_started'].className
  const reviewTeams = review.teams
    ?.map(teamName => teams.find(t => t.teamName === teamName))
    .filter(team => team !== undefined)

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    deleteReview(review.id)
    setDeleteDialogOpen(false)
  }

  return (
    <>
      <div
        className={cn('group relative cursor-pointer space-y-4 border-none p-3 transition-colors', statusColor)}
        onClick={onClick}
      >
        <p className="font-mono text-sm font-medium">{review.title}</p>
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
        {reviewTeams && reviewTeams.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {reviewTeams.map((team) => {
              const teamColors = getTeamColorClassByName(team.teamName)
              return (
                <Badge key={team.id} variant="outline" className={cn('h-5 px-1.5 text-[10px] font-medium', teamColors)}>
                  {team.teamName}
                </Badge>
              )
            })}
          </div>
        )}
        <Button
          variant="ghost"
          className="absolute top-1 right-1 size-6 opacity-0 transition-all duration-200 group-hover:opacity-100"
          onClick={handleDelete}
          title="删除"
          aria-label="删除"
        >
          <XIcon className="size-4" />
        </Button>
      </div>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>确定要删除这个复盘吗？此操作无法撤销。</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={confirmDelete}>
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
