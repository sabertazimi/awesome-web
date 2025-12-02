// 小局信息
export interface RoundInfo {
  field: 'east' | 'south' // 东场/南场
  round: number // 小局数 (1-4)
  honba: number // 本场数 (0, 1, 2, 3...)
}

// 何切类型
export type HosetsuType
  = 'discard' // 放铳
    | 'tile_efficiency' // 损牌效
    | 'aggressive' // 强攻
    | 'riichi_dama' // 立直或默听选择
    | 'defense' // 防守
    | 'call' // 鸣牌选择
    | 'other' // 其他/杂项

// 何切结果
export interface HosetsuResult {
  description: string // 基本的文字复盘描述
  type: HosetsuType // 何切类型
  isSignificant: boolean // 是否为严重分歧（加粗显示）
}

export interface TableData {
  players: string[] // 4个选手名称
  rounds: {
    round: RoundInfo // 小局信息（结构化）
    results: HosetsuResult[] // 4个选手的何切结果
  }[]
}

export interface Review {
  id: string
  date: string // YYYY-MM-DD
  title: string
  linkA: string // 牌谱A链接
  linkB: string // 牌谱B链接
  teams: string[] // 参赛队伍
  status: 'not_started' | 'in_progress' | 'completed' // 状态
  socialUrl: string // 社交网址
  tableA: TableData[] // A桌数据
  tableB: TableData[] // B桌数据
  content: string // 备注内容
  createdAt: string
}

// 状态颜色配置
export const statusColors = {
  not_started: 'bg-muted text-muted-foreground',
  in_progress: 'bg-destructive text-primary-foreground',
  completed: 'bg-primary text-primary-foreground',
}

const STORAGE_KEY = 'm-league-reviews'

// 数字转日语汉字
function numberToJapanese(num: number): string {
  const map: Record<number, string> = {
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
    7: '七',
    8: '八',
    9: '九',
  }
  return map[num] || num.toString()
}

// 格式化小局显示
export function formatRound(roundInfo: RoundInfo): string {
  const fieldText = roundInfo.field === 'east' ? '東' : '南'
  const roundText = numberToJapanese(roundInfo.round)
  const honbaText = roundInfo.honba > 0 ? `${numberToJapanese(roundInfo.honba)}本場` : ''
  return `${fieldText}${roundText}${honbaText}`
}

// 创建空的何切结果
export function createEmptyHosetsuResult(): HosetsuResult {
  return {
    description: '',
    type: 'other',
    isSignificant: false,
  }
}

// 创建默认的小局信息
export function createDefaultRoundInfo(existingRounds: RoundInfo[] = []): RoundInfo {
  // 尝试按顺序找到第一个不存在的小局
  const fields: Array<'east' | 'south'> = ['east', 'south']

  for (const field of fields) {
    for (let round = 1; round <= 4; round++) {
      for (let honba = 0; honba <= 9; honba++) {
        const candidate: RoundInfo = { field, round, honba }
        const exists = existingRounds.some(
          existing =>
            existing.field === candidate.field
            && existing.round === candidate.round
            && existing.honba === candidate.honba,
        )
        if (!exists) {
          return candidate
        }
      }
    }
  }

  // 如果所有小局都存在（不太可能），返回东一0本场
  return {
    field: 'east',
    round: 1,
    honba: 0,
  }
}

// 从 localStorage 获取所有复盘数据
export function getReviews(): Review[] {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? (JSON.parse(data) as Review[]) : []
}

// 根据日期获取复盘列表
export function getReviewsByDate(date: string): Review[] {
  const reviews = getReviews()
  return reviews.filter(review => review.date === date)
}

// 根据 ID 获取单个复盘
export function getReviewById(id: string): Review | undefined {
  const reviews = getReviews()
  return reviews.find(review => review.id === id)
}

// 创建新复盘
export function createReview(date: string, title: string, content: string = '', teams: string[] = []): Review {
  const reviews = getReviews()
  const newReview: Review = {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    date,
    title,
    linkA: 'https://docs.qq.com/sheet/DZGJMY2JHelBXSlp6?tab=BB08J2',
    linkB: '',
    teams,
    status: 'in_progress',
    socialUrl: 'https://m-league.jp/games',
    tableA: [],
    tableB: [],
    content,
    createdAt: new Date().toISOString(),
  }
  reviews.push(newReview)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews))
  return newReview
}

// 更新复盘
export function updateReview(id: string, updates: Partial<Omit<Review, 'id' | 'createdAt'>>): Review | null {
  const reviews = getReviews()
  const index = reviews.findIndex(review => review.id === id)
  if (index === -1)
    return null

  reviews[index] = { ...reviews[index], ...updates }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews))
  return reviews[index]
}

// 删除复盘
export function deleteReview(id: string): boolean {
  const reviews = getReviews()
  const filtered = reviews.filter(review => review.id !== id)
  if (filtered.length === reviews.length)
    return false

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  return true
}
