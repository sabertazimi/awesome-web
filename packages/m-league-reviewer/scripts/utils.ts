import axios from 'axios'

/** The frequency of requests is about REQUEST_GAP/SEASON_LIST.length (ms) */
const REQUEST_INTERVAL = 500

// set timeout as 30s for every request
export const req = axios.create({
  timeout: 30000,
})

export async function sleep(ms: number = REQUEST_INTERVAL) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
