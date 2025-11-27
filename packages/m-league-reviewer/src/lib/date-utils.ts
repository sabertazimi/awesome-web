/**
 * 日期工具函数
 */

/**
 * 获取某一周的工作日(周一到周五)
 */
export function getWeekDays(date: Date): Date[] {
  const current = new Date(date)
  const day = current.getDay()
  const diff = current.getDate() - day + (day === 0 ? -6 : 1) // 调整到周一

  const monday = new Date(current.setDate(diff))
  const weekDays: Date[] = []

  for (let i = 0; i < 5; i++) {
    const weekDay = new Date(monday)
    weekDay.setDate(monday.getDate() + i)
    weekDays.push(weekDay)
  }

  return weekDays
}

/**
 * 格式化日期为 YYYY-MM-DD
 */
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

/**
 * 获取日期显示文本 (M/D 格式)
 */
export function getDateDisplay(date: Date): string {
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${month}/${day}`
}

/**
 * 获取星期文本
 */
export function getWeekdayText(date: Date): string {
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  return weekdays[date.getDay()]
}
