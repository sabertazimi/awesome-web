import type { HTMLElement } from 'node-html-parser'
import type { GameSchedule } from '../src/api/data.js'
import { teams } from '../src/api/data.js'

/**
 * Extract game schedule from the season page
 * One day generates one schedule record, even if there are multiple matches
 * Monday/Tuesday: 4 teams, Thursday/Friday: 8 teams
 * @param seasonPage - Parsed HTML element of the season page
 * @param year - Year for the schedule (e.g., 2025)
 * @param month - Month for the schedule (1-12)
 * @returns Array of game schedules
 */
export default function getGameSchedule(seasonPage: HTMLElement, year: number, month: number): GameSchedule[] {
  // Use Map to group schedules by date
  const scheduleMap = new Map<string, GameSchedule>()

  // Find all schedule items
  const scheduleItems = seasonPage.querySelectorAll('.p-gamesSchedule2__list')

  for (const item of scheduleItems) {
    // Extract date
    const dateElement = item.querySelector('.p-gamesSchedule2__data')

    if (!dateElement) {
      continue
    }

    // Extract MM/DD from text like "12/1（月）"
    const dateText = dateElement.text.trim()
    const dateMatch = dateText.match(/(\d+)\s*\/\s*(\d+)/)

    if (!dateMatch) {
      continue
    }

    const monthStr = dateMatch[1].padStart(2, '0')
    const dayStr = dateMatch[2].padStart(2, '0')

    // Determine the actual year based on the month
    // If the parsed month is less than the input month, it's the next year
    const parsedMonth = Number.parseInt(dateMatch[1], 10)
    const actualYear = parsedMonth < month ? year + 1 : year

    const date = `${actualYear}-${monthStr}-${dayStr}`

    // Extract day of week
    const dayOfWeekMatch = dateText.match(/（(.+)）/)
    const dayOfWeek = dayOfWeekMatch ? dayOfWeekMatch[1] : ''

    // Extract team names from img alt attributes
    const teamImages = item.querySelectorAll('.p-gamesSchedule2__logos img')
    const teamNames = teamImages.map(img => img.getAttribute('alt') || '').filter(name => name !== '')

    // Map team names to team IDs
    const teamIds: number[] = []

    for (const teamName of teamNames) {
      const team = teams.find(t => t.team_full_name === teamName)

      if (team) {
        teamIds.push(team.id)
      }
    }

    // Check if we already have a schedule for this date
    const existingSchedule = scheduleMap.get(date)

    if (existingSchedule) {
      // Merge team IDs with existing schedule
      for (const id of teamIds) {
        if (!existingSchedule.teamIds.includes(id)) {
          existingSchedule.teamIds.push(id)
        }
      }
      // Re-sort after merging
      existingSchedule.teamIds.sort((a, b) => a - b)
    } else {
      // Create new schedule entry
      teamIds.sort((a, b) => a - b)
      scheduleMap.set(date, {
        date,
        dayOfWeek,
        teamIds,
      })
    }
  }

  // Convert Map to array, preserving insertion order
  return Array.from(scheduleMap.values())
}

export type { GameSchedule }
