interface FetcherConfig {
  // mleague official site, where to get all games url
  baseUrl: string
  // where to get haifu information
  gameUrl: string
  seasonList: string[]
  // where to store haifu data
  dataPath: string
  // sqlite database path
  dbPath: string
}

const defineFetcherConfig = (config: FetcherConfig) => config

export default defineFetcherConfig({
  baseUrl: 'https://m-league.jp',
  gameUrl: 'https://viewer.ml-log.jp/web/viewer',
  seasonList: [
    'games/2018-season',
    'games/2019-season',
    'games/2020-season',
    'games/2021-season',
    'games/2022-season',
    'games/2023-season',
    'games/2024-season',
    'games',
  ],
  dataPath: './data',
  dbPath: './sql/mleague.db',
})
