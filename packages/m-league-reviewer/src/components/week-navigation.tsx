import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface WeekNavigationProps {
  onPreviousWeek: () => void
  onCurrentWeek: () => void
  onNextWeek: () => void
}

/**
 * 周导航组件
 * 提供上一周、本周、下一周的导航按钮
 */
export function WeekNavigation({ onPreviousWeek, onCurrentWeek, onNextWeek }: WeekNavigationProps) {
  return (
    <div className="flex items-center gap-4">
      <Button variant="outline" onClick={onPreviousWeek}>
        <ChevronLeftIcon className="text-primary mr-2 size-4" />
        上一周
      </Button>
      <Button onClick={onCurrentWeek}>本周</Button>
      <Button variant="outline" onClick={onNextWeek}>
        下一周
        <ChevronRightIcon className="text-primary ml-2 size-4" />
      </Button>
    </div>
  )
}
