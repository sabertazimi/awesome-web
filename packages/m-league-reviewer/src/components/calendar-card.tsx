import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { teams } from '@/api/data'
import gameScheduleData from '@/assets/game-schedule.json'
import { ReviewCard } from '@/components/review-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { formatDate, getDateDisplay, getWeekdayText } from '@/lib/date-utils'
import { cn } from '@/lib/utils'
import { useReviewsStore } from '@/stores/reviews'

interface CalendarCardProps {
  day: Date
  isToday: boolean
  onReviewClick: (reviewId: string) => void
  className?: string
}

/**
 * 日历日期卡片组件
 * 显示单个日期的复盘列表和添加复盘功能
 */
export function CalendarCard({
  day,
  isToday,
  onReviewClick,
  className,
}: CalendarCardProps) {
  const dateStr = formatDate(day)
  const { getReviewsByDate, createReview } = useReviewsStore()
  const reviews = getReviewsByDate(dateStr)
  const [isAddingReview, setIsAddingReview] = useState(false)
  const [newReviewTitle, setNewReviewTitle] = useState('')

  // 获取当天可用的默认标题选项
  const getAvailableTitles = (): string[] => {
    const defaultTitles = ['第一半庄', '第二半庄']
    const existingTitles = reviews.map(r => r.title)
    return defaultTitles.filter(title => !existingTitles.includes(title))
  }

  const availableTitles = getAvailableTitles()

  // 开始添加新复盘
  const startAddReview = () => {
    if (availableTitles.length === 0)
      return

    setIsAddingReview(true)
    setNewReviewTitle(availableTitles[0])
  }

  // 取消添加
  const cancelAddReview = () => {
    setIsAddingReview(false)
    setNewReviewTitle('')
  }

  // 保存新复盘
  const saveNewReview = (title: string) => {
    if (!title.trim())
      return

    // 根据日期自动设置参赛队伍
    const gameSchedules = gameScheduleData as Array<{ date: string, teamIds: number[] }>
    const schedule = gameSchedules.find(s => s.date === dateStr)
    const teamNames = schedule ? schedule.teamIds
      .map(teamId => teams.find(t => t.id === teamId)?.team_name)
      .filter((name): name is string => name !== undefined) : []

    createReview(dateStr, title.trim(), '', teamNames)
    setIsAddingReview(false)
    setNewReviewTitle('')
  }

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
          />
        ))}
        {isAddingReview ? (
          <div className="border-border bg-accent flex flex-col items-center justify-center gap-2 space-y-2 border p-3">
            <Select value={newReviewTitle} onValueChange={setNewReviewTitle}>
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
              <Button size="sm" className="flex-1" onClick={() => saveNewReview(newReviewTitle)}>
                保存
              </Button>
              <Button size="sm" variant="outline" className="flex-1" onClick={cancelAddReview}>
                取消
              </Button>
            </div>
          </div>
        ) : (
          <Button className="w-full" onClick={startAddReview} disabled={availableTitles.length === 0}>
            <PlusIcon className="size-4" />
            {availableTitles.length === 0 ? '已达上限' : '添加复盘'}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
