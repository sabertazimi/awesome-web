import axios from 'axios'

/** The frequency of requests is about RequestInterval/seasonList.length (ms). */
const RequestInterval = 500

// set timeout as 30s for every request
export const req = axios.create({
  timeout: 30000,
})

export async function sleep(ms: number = RequestInterval) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
