import { BookTextIcon, DatabaseIcon, UsersIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { CalendarCard } from '@/components/calendar-card'
import { DataManagementDialog } from '@/components/data-management-dialog'
import { DefaultLayout } from '@/components/default-layout'
import { NoteDialog } from '@/components/note-dialog'
import { ReviewDialog } from '@/components/review-dialog'
import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'
import { VoidSection } from '@/components/void-section'
import { WeekNavigation } from '@/components/week-navigation'
import { formatDate, getWeekDays } from '@/lib/date-utils'
import { cn } from '@/lib/utils'

const THURSDAY = 2

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(() => new Date())
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false)
  const [selectedReview, setSelectedReview] = useState<string | null>(null)
  const [noteDialogOpen, setNoteDialogOpen] = useState(false)
  const [dataManagementDialogOpen, setDataManagementDialogOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const weekDays = getWeekDays(currentDate)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() - 7)
    setCurrentDate(newDate)
  }

  const goToNextWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + 7)
    setCurrentDate(newDate)
  }

  const goToCurrentWeek = () => {
    setCurrentDate(new Date())
  }

  const openReviewDialog = (reviewId: string) => {
    setSelectedReview(reviewId)
    setReviewDialogOpen(true)
  }

  return (
    <DefaultLayout number="02" className="flex flex-col">
      <SiteHeader
        title="复盘日历"
        link={(
          <div className="flex items-center gap-4">
            <Button asChild variant="outline">
              <Link to="/players">
                <UsersIcon className="text-primary size-4" />
                选手图鉴
              </Link>
            </Button>
            <Button variant="ghost" onClick={() => setNoteDialogOpen(true)}>
              <BookTextIcon className="text-primary size-4" />
              复盘笔记
            </Button>
            <Button variant="ghost" onClick={() => setDataManagementDialogOpen(true)}>
              <DatabaseIcon className="text-primary size-4" />
              数据管理
            </Button>
          </div>
        )}
      >
        <WeekNavigation onPreviousWeek={goToPreviousWeek} onCurrentWeek={goToCurrentWeek} onNextWeek={goToNextWeek} />
      </SiteHeader>
      <VoidSection number="01" fileName="calendar.tsx" className="flex flex-1" contentClassName="p-0 sm:pt-0">
        <div className="grid h-full grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2">
          {weekDays
            .filter((_, index) => index !== THURSDAY)
            .map((day, renderedIndex) => {
              const dateStr = formatDate(day)
              const isToday = formatDate(new Date()) === dateStr

              return (
                <CalendarCard
                  key={dateStr}
                  day={day}
                  isToday={isMounted && isToday}
                  onReviewClick={openReviewDialog}
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
      <ReviewDialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen} reviewId={selectedReview} />
      <NoteDialog open={noteDialogOpen} onOpenChange={setNoteDialogOpen} />
      <DataManagementDialog open={dataManagementDialogOpen} onOpenChange={setDataManagementDialogOpen} />
    </DefaultLayout>
  )
}
