import type { GameSchedule } from '@/api/data'
import type { Review } from '@/api/reviews'
import { UsersIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { teams } from '@/api/data'
import { createReview, deleteReview, getReviewsByDate } from '@/api/reviews'
import gameScheduleData from '@/assets/game-schedule.json'
import { CalendarDayCard } from '@/components/calendar-day-card'
import { DefaultLayout } from '@/components/default-layout'
import { ReviewDrawer } from '@/components/review-drawer'
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
import { Button } from '@/components/ui/button'
import { VoidSection } from '@/components/void-section'
import { WeekNavigation } from '@/components/week-navigation'
import { formatDate, getWeekDays } from '@/lib/date-utils'
import { cn } from '@/lib/utils'

const gameSchedules: GameSchedule[] = gameScheduleData

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(() => new Date())
  const [reviews, setReviews] = useState<Record<string, Review[]>>({})
  const [newReviewDate, setNewReviewDate] = useState<string | null>(null)
  const [newReviewTitle, setNewReviewTitle] = useState('')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<{
    date: string
    id: string
  } | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedReview, setSelectedReview] = useState<{
    id: string
    date: string
  } | null>(null)

  const weekDays = getWeekDays(currentDate)

  // 当 currentDate 改变时,重新加载本周的复盘数据
  useEffect(() => {
    const newReviews: Record<string, Review[]> = {}
    const days = getWeekDays(currentDate)
    days.forEach((day) => {
      const dateStr = formatDate(day)
      newReviews[dateStr] = getReviewsByDate(dateStr)
    })
    setReviews(newReviews)
  }, [currentDate])

  // 切换到上一周
  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() - 7)
    setCurrentDate(newDate)
  }

  // 切换到下一周
  const goToNextWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + 7)
    setCurrentDate(newDate)
  }

  // 切换到本周
  const goToCurrentWeek = () => {
    setCurrentDate(new Date())
  }

  // 获取当天可用的默认标题选项
  const getAvailableTitles = (date: string): string[] => {
    const defaultTitles = ['第一半庄', '第二半庄']
    const existingTitles = (reviews[date] || []).map(r => r.title)
    return defaultTitles.filter(title => !existingTitles.includes(title))
  }

  // 开始添加新复盘
  const startAddReview = (date: string) => {
    const availableTitles = getAvailableTitles(date)
    if (availableTitles.length === 0)
      return // 如果没有可用标题,不允许添加

    setNewReviewDate(date)
    setNewReviewTitle(availableTitles[0]) // 默认选择第一个可用标题
  }

  // 取消添加
  const cancelAddReview = () => {
    setNewReviewDate(null)
    setNewReviewTitle('')
  }

  // 保存新复盘
  const saveNewReview = (date: string, title: string) => {
    if (!title.trim())
      return

    // 根据日期自动设置参赛队伍
    const schedule = gameSchedules.find(s => s.date === date)
    const teamNames = schedule ? schedule.teamIds
      .map(teamId => teams.find(t => t.id === teamId)?.team_name)
      .filter((name): name is string => name !== undefined) : []

    const newReview = createReview(date, title.trim(), '', teamNames)
    setReviews(prev => ({
      ...prev,
      [date]: [...(prev[date] || []), newReview],
    }))
    setNewReviewDate(null)
    setNewReviewTitle('')
  }

  // 打开删除确认对话框
  const openDeleteDialog = (date: string, id: string) => {
    setDeleteTarget({ date, id })
    setDeleteDialogOpen(true)
  }

  // 确认删除复盘
  const confirmDeleteReview = () => {
    if (deleteTarget) {
      deleteReview(deleteTarget.id)
      setReviews(prev => ({
        ...prev,
        [deleteTarget.date]: (prev[deleteTarget.date] || []).filter(r => r.id !== deleteTarget.id),
      }))
    }
    setDeleteDialogOpen(false)
    setDeleteTarget(null)
  }

  // 打开复盘抽屉
  const openReviewDrawer = (date: string, id: string) => {
    setSelectedReview({ id, date })
    setDrawerOpen(true)
  }

  // 复盘被删除后的回调
  const handleReviewDeleted = () => {
    if (selectedReview) {
      setReviews(prev => ({
        ...prev,
        [selectedReview.date]: (prev[selectedReview.date] || []).filter(r => r.id !== selectedReview.id),
      }))
    }
  }

  // 复盘被更新后的回调
  const handleReviewUpdated = () => {
    if (!selectedReview) {
      return
    }

    // 重新加载整个当前周的数据，以处理日期变更的情况
    const newReviews: Record<string, Review[]> = {}
    const days = getWeekDays(currentDate)
    days.forEach((day) => {
      const dateStr = formatDate(day)
      newReviews[dateStr] = getReviewsByDate(dateStr)
    })
    setReviews(newReviews)
  }

  return (
    <DefaultLayout number="02" className="flex flex-col">
      <VoidSection number="00" enableFlickeringGrid>
        <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
          <Button asChild variant="outline" className="justify-self-start">
            <Link to={`${import.meta.env.BASE_URL}players`}>
              <UsersIcon className="text-primary size-4" />
              选手图鉴
            </Link>
          </Button>
          <h1 className="text-foreground font-mono text-4xl font-bold">M.League 复盘日历</h1>
          <WeekNavigation
            onPreviousWeek={goToPreviousWeek}
            onCurrentWeek={goToCurrentWeek}
            onNextWeek={goToNextWeek}
            className="md:justify-self-end"
          />
        </div>
      </VoidSection>
      <VoidSection number="01" fileName="calendar.tsx" className="flex flex-1" contentClassName="p-0 sm:pt-0">
        <div className="grid h-full grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2">
          {weekDays
            .filter((_, index) => index !== 2) // 跳过周三
            .map((day, renderedIndex) => {
              const dateStr = formatDate(day)
              const dayReviews = reviews[dateStr] || []
              const isToday = formatDate(new Date()) === dateStr

              return (
                <CalendarDayCard
                  key={dateStr}
                  day={day}
                  reviews={dayReviews}
                  isToday={isToday}
                  isAddingReview={newReviewDate === dateStr}
                  newReviewTitle={newReviewTitle}
                  availableTitles={getAvailableTitles(dateStr)}
                  onReviewClick={id => openReviewDrawer(dateStr, id)}
                  onReviewDelete={(e, id) => {
                    e.stopPropagation()
                    openDeleteDialog(dateStr, id)
                  }}
                  onStartAddReview={() => startAddReview(dateStr)}
                  onCancelAddReview={cancelAddReview}
                  onSaveReview={title => saveNewReview(dateStr, title)}
                  onTitleChange={setNewReviewTitle}
                  className={cn(
                    'border-border',
                    renderedIndex === 0 && 'border-b md:border-r',
                    renderedIndex === 1 && 'border-b',
                    renderedIndex === 2 && 'border-b md:border-r md:border-b-0',
                  )}
                />
              )
            })}
        </div>
      </VoidSection>

      {/* 删除确认对话框 */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>确定要删除这个复盘吗？此操作无法撤销。</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={confirmDeleteReview}>
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 复盘抽屉 */}
      <ReviewDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        reviewId={selectedReview?.id || null}
        date={selectedReview?.date || null}
        onDeleted={handleReviewDeleted}
        onUpdated={handleReviewUpdated}
      />
    </DefaultLayout>
  )
}
