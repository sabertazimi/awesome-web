import type { JSONContent } from '@tiptap/react'
import { toast } from 'sonner'

// 小局信息
export interface RoundInfo {
  field: 'east' | 'south' // 东场/南场
  round: number // 小局数 (1-4)
  honba: number // 本场数 (0, 1, 2, 3...)
}

// 何切类型
export type HosetsuType
  = | 'hand_sequence' // 手顺
    | 'tile_efficiency' // 牌效
    | 'riichi' // 立直
    | 'dama' // 默听
    | 'call' // 鸣牌
    | 'refuse_tenpai' // 拒听
    | 'retreat' // 退向
    | 'betaori' // 兜牌
    | 'fold' // 下车
    | 'aggressive' // 强攻
    | 'discard' // 放铳
    | 'other' // 其他

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
  in_progress: 'bg-destructive text-destructive-foreground',
  completed: 'bg-primary text-primary-foreground',
}

// 复盘笔记
export interface Note {
  id: string
  content: JSONContent // Tiptap JSON content
  createdAt: string
  updatedAt: string
}

// 存储结构
interface StorageData {
  reviews: Review[]
  notes: Note[]
}

const STORAGE_KEY = 'm-league-data'

// 从 localStorage 获取所有数据
function getStorageData(): StorageData {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) {
      return { reviews: [], notes: [] }
    }
    const parsed = JSON.parse(data) as StorageData
    return {
      reviews: parsed.reviews || [],
      notes: parsed.notes || [],
    }
  } catch (error: unknown) {
    toast.error(`加载存储数据失败: ${error instanceof Error ? error.message : String(error)}`)
    return { reviews: [], notes: [] }
  }
}

// 保存所有数据到 localStorage
function saveStorageData(data: StorageData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error: unknown) {
    toast.error(`保存存储数据失败: ${error instanceof Error ? error.message : String(error)}`)
  }
}

// 保存复盘数据
function saveReviews(reviews: Review[]): void {
  const data = getStorageData()
  data.reviews = reviews
  saveStorageData(data)
}

// 保存笔记数据
function saveNotes(notes: Note[]): void {
  const data = getStorageData()
  data.notes = notes
  saveStorageData(data)
}

// 从 localStorage 获取所有复盘数据
export function getReviews(): Review[] {
  const { reviews } = getStorageData()
  return reviews
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
    id: `review-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
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
  saveReviews(reviews)
  return newReview
}

// 更新复盘
export function updateReview(id: string, updates: Partial<Omit<Review, 'id' | 'createdAt'>>): Review | null {
  const reviews = getReviews()
  const index = reviews.findIndex(review => review.id === id)
  if (index === -1)
    return null

  reviews[index] = { ...reviews[index], ...updates }
  saveReviews(reviews)
  return reviews[index]
}

// 删除复盘
export function deleteReview(id: string): boolean {
  const reviews = getReviews()
  const filtered = reviews.filter(review => review.id !== id)
  if (filtered.length === reviews.length)
    return false

  saveReviews(filtered)
  return true
}

export function getNotes(): Note[] {
  const { notes } = getStorageData()
  return notes
}

export function createNote(content: JSONContent | null = null): Note {
  const note: Note = {
    id: `note-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
    content: content || { type: 'doc', content: [] },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const notes = getNotes()
  notes.push(note)
  saveNotes(notes)

  return note
}

export function updateNote(id: string, content: JSONContent): Note | null {
  const notes = getNotes()
  const index = notes.findIndex(n => n.id === id)

  if (index === -1) {
    return null
  }

  notes[index] = {
    ...notes[index],
    content,
    updatedAt: new Date().toISOString(),
  }

  saveNotes(notes)
  return notes[index]
}

export function deleteNote(id: string): boolean {
  const notes = getNotes()
  const filtered = notes.filter(n => n.id !== id)

  if (filtered.length === notes.length) {
    return false
  }

  saveNotes(filtered)
  return true
}

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

export function formatRound(roundInfo: RoundInfo): string {
  const fieldText = roundInfo.field === 'east' ? '東' : '南'
  const roundText = numberToJapanese(roundInfo.round)
  const honbaText = roundInfo.honba > 0 ? `${numberToJapanese(roundInfo.honba)}本場` : ''
  return `${fieldText}${roundText}${honbaText}`
}

export function createEmptyHosetsuResult(): HosetsuResult {
  return {
    description: '',
    type: 'other',
    isSignificant: false,
  }
}

export function createDefaultRoundInfo(existingRounds: RoundInfo[] = []): RoundInfo {
  // 如果没有已存在的小局,返回东一0本场
  if (existingRounds.length === 0) {
    return {
      field: 'east',
      round: 1,
      honba: 0,
    }
  }

  // 找到最后一个小局,递增到下一个小局
  const lastRound = existingRounds[existingRounds.length - 1]
  return getNextRound(lastRound)
}

// 获取下一个小局
function getNextRound(current: RoundInfo): RoundInfo {
  const MAX_HONBA = 9 // 本场数上限
  const MAX_ROUND = 4 // 小局数上限

  // 如果本场数未达到上限,直接+1
  if (current.honba < MAX_HONBA) {
    return {
      field: current.field,
      round: current.round,
      honba: current.honba + 1,
    }
  }

  // 本场数已达上限,进入下一局
  if (current.round < MAX_ROUND) {
    return {
      field: current.field,
      round: current.round + 1,
      honba: 0,
    }
  }

  // 小局数也达上限,切换场风
  if (current.field === 'east') {
    return {
      field: 'south',
      round: 1,
      honba: 0,
    }
  }

  // 南四已满,回到东一
  return {
    field: 'east',
    round: 1,
    honba: 0,
  }
}

// 导出所有数据
export function exportAllData(): string {
  const data = getStorageData()
  return JSON.stringify(data, null, 2)
}

// 导入所有数据(覆盖模式)
export function importAllData(jsonString: string): { success: boolean, error?: string } {
  try {
    const data = JSON.parse(jsonString) as StorageData

    // 验证数据格式
    if (!data || typeof data !== 'object') {
      return { success: false, error: '数据格式无效' }
    }

    if (!Array.isArray(data.reviews)) {
      return { success: false, error: '复盘数据格式无效' }
    }

    if (!Array.isArray(data.notes)) {
      return { success: false, error: '笔记数据格式无效' }
    }

    // 覆盖保存
    saveStorageData(data)

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '导入失败',
    }
  }
}

// 下载数据为 JSON 文件
export function downloadDataAsJson(): void {
  const jsonString = exportAllData()
  const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0]
  const filename = `m-league-backup-${timestamp}.json`

  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
