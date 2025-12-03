import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface WeekNavigationProps {
  onPreviousWeek: () => void
  onCurrentWeek: () => void
  onNextWeek: () => void
  className?: string
}

/**
 * 周导航组件
 * 提供上一周、本周、下一周的导航按钮
 */
export function WeekNavigation({ onPreviousWeek, onCurrentWeek, onNextWeek, className }: WeekNavigationProps) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <Button variant="outline" onClick={onPreviousWeek}>
        <ChevronLeftIcon className="text-primary size-4" />
        上一周
      </Button>
      <Button onClick={onCurrentWeek}>本周</Button>
      <Button variant="outline" onClick={onNextWeek}>
        下一周
        <ChevronRightIcon className="text-primary size-4" />
      </Button>
    </div>
  )
}
