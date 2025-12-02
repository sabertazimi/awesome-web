import type { GameSchedule } from './get-game-schedule.js'
import { writeFile } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { parse } from 'node-html-parser'
import config from './config.js'
import getGameSchedule from './get-game-schedule.js'
import { req, sleep } from './utils.js'

/**
 * Generate month parameters for fetching game schedules
 * From 2025/09 to 2026/05
 */
function generateMonthParams(): Array<{ mly: number, mlm: number }> {
  const params: Array<{ mly: number, mlm: number }> = []

  // 2025: September to December (9-12)
  for (let month = 9; month <= 12; month++) {
    params.push({ mly: 2025, mlm: month })
  }

  // 2026: January to May (1-5)
  for (let month = 1; month <= 5; month++) {
    params.push({ mly: 2026, mlm: month })
  }

  return params
}

/**
 * Fetch game schedules for the current season
 */
async function fetchGameSchedule() {
  // Get the last season from seasonList
  const currentSeason = config.seasonList[config.seasonList.length - 1]
  console.log(`Fetching game schedule for season: ${currentSeason}`)

  const allSchedules: GameSchedule[] = []
  const monthParams = generateMonthParams()

  for (const { mly, mlm } of monthParams) {
    try {
      console.log(`Fetching schedule for ${mly}-${mlm.toString().padStart(2, '0')}...`)

      const url = `${config.baseUrl}/${currentSeason}/?mly=${mly}&mlm=${mlm}`
      const response = await req.get<string>(url)

      const seasonPage = parse(response.data)
      const schedules = getGameSchedule(seasonPage, mly, mlm)

      if (schedules.length > 0) {
        allSchedules.push(...schedules)
        console.log(`  Found ${schedules.length} game(s) in ${mly}-${mlm.toString().padStart(2, '0')}`)
      } else {
        console.log(`  No games found in ${mly}-${mlm.toString().padStart(2, '0')}`)
      }

      // Wait before next request
      await sleep()
    } catch (error) {
      console.error(`Error fetching schedule for ${mly}-${mlm.toString().padStart(2, '0')}:`, error)
    }
  }

  // Save all schedules to a JSON file
  const outputPath = path.resolve('./data', 'game-schedule.json')
  writeFile(outputPath, JSON.stringify(allSchedules, null, 2), { encoding: 'utf-8' }, (err) => {
    if (err) {
      console.error('Error writing game schedule file:', err)
    } else {
      console.log(`\nGame schedule saved to ${outputPath}`)
      console.log(`Total games: ${allSchedules.length}`)
    }
  })
}

// Run the fetch
fetchGameSchedule().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
