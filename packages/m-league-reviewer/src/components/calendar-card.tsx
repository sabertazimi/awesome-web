import type { Review } from '@/api/reviews'
import { PlusIcon } from 'lucide-react'
import { ReviewCard } from '@/components/review-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { formatDate, getDateDisplay, getWeekdayText } from '@/lib/date-utils'
import { cn } from '@/lib/utils'

interface CalendarCardProps {
  day: Date
  reviews: Review[]
  isToday: boolean
  isAddingReview: boolean
  newReviewTitle: string
  availableTitles: string[]
  onReviewClick: (reviewId: string) => void
  onReviewDelete: (e: React.MouseEvent, reviewId: string) => void
  onStartAddReview: () => void
  onCancelAddReview: () => void
  onSaveReview: (title: string) => void
  onTitleChange: (title: string) => void
  className?: string
}

/**
 * 日历日期卡片组件
 * 显示单个日期的复盘列表和添加复盘功能
 */
export function CalendarCard({
  day,
  reviews,
  isToday,
  isAddingReview,
  newReviewTitle,
  availableTitles,
  onReviewClick,
  onReviewDelete,
  onStartAddReview,
  onCancelAddReview,
  onSaveReview,
  onTitleChange,
  className,
}: CalendarCardProps) {
  const dateStr = formatDate(day)

  return (
    <Card key={dateStr} className={cn('min-h-96', isToday && 'ring-primary ring-2 ring-inset', className)}>
      <CardHeader className="pb-3">
        <div className="text-center">
          <div className="text-muted-foreground text-sm">{getWeekdayText(day)}</div>
          <div className={cn('text-2xl font-bold', isToday && 'text-primary')}>{getDateDisplay(day)}</div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {reviews.map(review => (
          <ReviewCard
            key={review.id}
            review={review}
            onClick={() => onReviewClick(review.id)}
            onDelete={e => onReviewDelete(e, review.id)}
          />
        ))}
        {isAddingReview ? (
          <div className="border-border bg-accent flex flex-col items-center justify-center gap-2 space-y-2 border p-3">
            <Select value={newReviewTitle} onValueChange={onTitleChange}>
              <SelectTrigger>
                <SelectValue placeholder="选择复盘类型..." />
              </SelectTrigger>
              <SelectContent>
                {availableTitles.map(title => (
                  <SelectItem key={title} value={title}>
                    {title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button size="sm" className="flex-1" onClick={() => onSaveReview(newReviewTitle)}>
                保存
              </Button>
              <Button size="sm" variant="outline" className="flex-1" onClick={onCancelAddReview}>
                取消
              </Button>
            </div>
          </div>
        ) : (
          <Button className="w-full" onClick={onStartAddReview} disabled={availableTitles.length === 0}>
            <PlusIcon className="size-4" />
            {availableTitles.length === 0 ? '已达上限' : '添加复盘'}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
