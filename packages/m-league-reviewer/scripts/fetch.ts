import { existsSync, mkdirSync, readdirSync, writeFile } from 'node:fs'
import path from 'node:path'
import axios from 'axios'
import { parse } from 'node-html-parser'
import config from './config.js'
import password from './password.js'

const sleep = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const GAME_DATA_REG = /UMP_PLAYER\.init\(true, true, '(.+)', autoplay\);/
const REQUEST_INTERVAL = 500 // The frequency of requests is about REQUEST_GAP/SEASON_LIST.length (ms

// set timeout as 30s for every request
const req = axios.create({
  timeout: 30000,
})

// create directory for data storage
if (!existsSync(config.dataPath)) {
  mkdirSync(config.dataPath)
}

const fetchedGames = readdirSync(config.dataPath)

// multiple seasons in parallel requests, for one season, every match(半荘) is in sequence
for (const season of config.seasonList) {
  console.time(season)
  req
    .get<string>(`${config.baseUrl}/${season}`)
    .then(async (res) => {
      const seasonPage = parse(res.data)
      const gameIdList = seasonPage
        .querySelectorAll('.js-viewer-form')
        .map(item => item.getAttribute('data-game-id'))
      for (const gameId of gameIdList) {
        if (!gameId || fetchedGames.includes(`${gameId}.json`))
          continue
        const formData = new URLSearchParams()
        formData.append('password', password(new Date()))
        const gameInfo = await req.post<string>(
          `${config.gameUrl}?gameid=${gameId}`,
          formData,
          {
            headers: {
              origin: 'https://m-league.jp',
              referer: 'https://m-league.jp/',
            },
          },
        )
        const regMatches = gameInfo.data.match(GAME_DATA_REG)
        if (regMatches) {
          writeFile(
            path.resolve(config.dataPath, `${gameId}.json`),
            regMatches[1],
            { encoding: 'utf-8' },
            () => {
              console.log(`fetch information about ${gameId} finished.`)
            },
          )
        }
        await sleep(REQUEST_INTERVAL)
      }
      console.timeLog(season, `fetch games info successfully.`)
    })
    .catch((e) => {
      console.timeLog(season, `error occurs while fetching games`, e)
    })
}
