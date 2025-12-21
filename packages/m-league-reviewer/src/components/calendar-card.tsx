import type { Variants } from 'motion/react'
import { PlusIcon } from 'lucide-react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
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

const addReviewVariants: Variants = {
  initial: {
    opacity: 0,
    scaleX: 0,
    scaleY: 0.3,
  },
  animate: {
    opacity: 1,
    scaleX: 1,
    scaleY: 1,
    transition: {
      opacity: { duration: 0.15 },
      scaleX: { duration: 0.15, ease: 'easeOut' },
      scaleY: { duration: 0.2, delay: 0.1, ease: 'easeOut' },
    },
  },
  exit: {
    opacity: 0,
    scaleY: 0.3,
    scaleX: 0,
    transition: {
      opacity: { duration: 0.12 },
      scaleY: { duration: 0.1, ease: 'easeIn' },
      scaleX: { duration: 0.12, delay: 0.08, ease: 'easeIn' },
    },
  },
}

export function CalendarCard({ day, isToday, onReviewClick, className }: CalendarCardProps) {
  const dateStr = formatDate(day)
  const reviews = useReviewsStore(useShallow(state => state.reviews.filter(review => review.date === dateStr)))
  const createReview = useReviewsStore(state => state.createReview)
  const [isAddingReview, setIsAddingReview] = useState(false)
  const [newReviewTitle, setNewReviewTitle] = useState('')

  const availableTitles = useMemo(() => {
    const defaultTitles = ['第一半庄', '第二半庄']
    const existingTitles = reviews.map(r => r.title)
    return defaultTitles.filter(title => !existingTitles.includes(title))
  }, [reviews])

  const startAddReview = () => {
    if (availableTitles.length === 0)
      return

    setIsAddingReview(true)
    setNewReviewTitle(availableTitles[0])
  }

  const cancelAddReview = () => {
    setIsAddingReview(false)
    setNewReviewTitle('')
  }

  const saveNewReview = (title: string) => {
    if (!title.trim()) {
      return
    }

    const gameSchedules = gameScheduleData as Array<{ date: string, teamIds: number[] }>
    const schedule = gameSchedules.find(s => s.date === dateStr)
    const teamNames = schedule ? schedule.teamIds
      .map(teamId => teams.find(t => t.id === teamId)?.teamName)
      .filter((name): name is string => name !== undefined) : []

    createReview(dateStr, title.trim(), '', teamNames)
    setIsAddingReview(false)
    setNewReviewTitle('')
  }

  return (
    <Card key={dateStr} className={cn('min-h-96 rounded-xs', isToday && 'ring-primary ring-2 ring-inset', className)}>
      <CardHeader className="pb-3">
        <div className="text-center">
          <div className="text-muted-foreground text-sm">{getWeekdayText(day)}</div>
          <div className={cn('text-2xl font-bold', isToday && 'text-primary')}>{getDateDisplay(day)}</div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <LayoutGroup>
          <AnimatePresence>
            {reviews.map(review => (
              <ReviewCard key={review.id} review={review} onClick={() => onReviewClick(review.id)} />
            ))}
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {isAddingReview ? (
              <motion.div
                key="add-form"
                layout
                variants={addReviewVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="border-border bg-accent flex origin-top flex-col items-center justify-center gap-2 space-y-2 rounded-md border p-3"
              >
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
              </motion.div>
            ) : (
              <motion.div
                key="add-button"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
              >
                <Button className="w-full" onClick={startAddReview} disabled={availableTitles.length === 0}>
                  <PlusIcon className="size-4" />
                  {availableTitles.length === 0 ? '已达上限' : '添加复盘'}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </CardContent>
    </Card>
  )
}
