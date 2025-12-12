import type { JSONContent } from '@tiptap/react'
import type { Tables } from './data'
import { toast } from 'sonner'
import { getCurrentUser } from './auth'
import { supabase } from './db'

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
const MIGRATION_KEY = 'm-league-migrated'

function getLocalStorageData(): StorageData {
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
function saveLocalStorageData(data: StorageData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error: unknown) {
    toast.error(`保存存储数据失败: ${error instanceof Error ? error.message : String(error)}`)
  }
}

function saveLocalReviews(reviews: Review[]): void {
  const data = getLocalStorageData()
  data.reviews = reviews
  saveLocalStorageData(data)
}

function saveLocalNotes(notes: Note[]): void {
  const data = getLocalStorageData()
  data.notes = notes
  saveLocalStorageData(data)
}

function clearLocalStorageData(): void {
  localStorage.removeItem(STORAGE_KEY)
}

function isMigrated(): boolean {
  return localStorage.getItem(MIGRATION_KEY) === 'true'
}

function markAsMigrated(): void {
  localStorage.setItem(MIGRATION_KEY, 'true')
}

async function getSupabaseReviews(): Promise<Review[]> {
  try {
    const user = await getCurrentUser()
    if (!user)
      return []

    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error)
      throw error

    // 将数据库字段映射到应用层字段
    return (data || []).map((row: Tables<'reviews'>) => ({
      id: row.id,
      date: row.date,
      title: row.title,
      linkA: row.linka || '',
      linkB: row.linkb || '',
      teams: row.teams || [],
      status: (row.status || 'not_started') as 'not_started' | 'in_progress' | 'completed',
      socialUrl: row.socialurl || '',
      tableA: (row.tablea as unknown as TableData[]) || [],
      tableB: (row.tableb as unknown as TableData[]) || [],
      content: row.content || '',
      createdAt: row.created_at || new Date().toISOString(),
    }))
  } catch (error) {
    console.error('从 Supabase 获取复盘失败:', error)
    toast.error('加载云端数据失败')
    return []
  }
}

async function getSupabaseNotes(): Promise<Note[]> {
  try {
    const user = await getCurrentUser()
    if (!user)
      return []

    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error)
      throw error

    // 将数据库字段映射到应用层字段
    return (data || []).map((row: Tables<'notes'>) => ({
      id: row.id,
      content: (row.content as JSONContent) || { type: 'doc', content: [] },
      createdAt: row.created_at || new Date().toISOString(),
      updatedAt: row.updated_at || new Date().toISOString(),
    }))
  } catch (error) {
    console.error('从 Supabase 获取笔记失败:', error)
    toast.error('加载云端笔记失败')
    return []
  }
}

async function saveSupabaseReview(review: Review): Promise<boolean> {
  try {
    const user = await getCurrentUser()
    if (!user)
      return false

    const { error } = await supabase
      .from('reviews')
      .upsert({
        id: review.id,
        user_id: user.id,
        date: review.date,
        title: review.title,
        linka: review.linkA,
        linkb: review.linkB,
        teams: review.teams,
        status: review.status,
        socialurl: review.socialUrl,
        tablea: review.tableA,
        tableb: review.tableB,
        content: review.content,
        created_at: review.createdAt,
      })

    if (error)
      throw error

    return true
  } catch (error) {
    console.error('保存复盘到 Supabase 失败:', error)
    toast.error('保存到云端失败')
    return false
  }
}

async function saveSupabaseNote(note: Note): Promise<boolean> {
  try {
    const user = await getCurrentUser()
    if (!user)
      return false

    const { error } = await supabase
      .from('notes')
      .upsert({
        id: note.id,
        user_id: user.id,
        content: note.content,
        created_at: note.createdAt,
        updated_at: note.updatedAt,
      })

    if (error)
      throw error

    return true
  } catch (error) {
    console.error('保存笔记到 Supabase 失败:', error)
    toast.error('保存笔记到云端失败')
    return false
  }
}

async function deleteSupabaseReview(id: string): Promise<boolean> {
  try {
    const user = await getCurrentUser()
    if (!user)
      return false

    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error)
      throw error

    return true
  } catch (error) {
    console.error('从 Supabase 删除复盘失败:', error)
    toast.error('从云端删除失败')
    return false
  }
}

async function deleteSupabaseNote(id: string): Promise<boolean> {
  try {
    const user = await getCurrentUser()
    if (!user)
      return false

    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error)
      throw error

    return true
  } catch (error) {
    console.error('从 Supabase 删除笔记失败:', error)
    toast.error('从云端删除笔记失败')
    return false
  }
}

export async function migrateLocalDataToSupabase(): Promise<void> {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return
    }

    if (isMigrated()) {
      return
    }

    const localData = getLocalStorageData()
    const { reviews, notes } = localData

    if (reviews.length === 0 && notes.length === 0) {
      markAsMigrated()
      return
    }

    let reviewSuccess = 0
    for (const review of reviews) {
      const success = await saveSupabaseReview(review)
      if (success)
        reviewSuccess++
    }

    let noteSuccess = 0
    for (const note of notes) {
      const success = await saveSupabaseNote(note)
      if (success)
        noteSuccess++
    }

    markAsMigrated()
    clearLocalStorageData()

    toast.success(`数据迁移完成: ${reviewSuccess} 个复盘, ${noteSuccess} 个笔记`)
  } catch (error) {
    console.error('数据迁移失败:', error)
    toast.error('数据迁移失败,请稍后重试')
  }
}

export async function getReviews(): Promise<Review[]> {
  const user = await getCurrentUser()
  if (user) {
    return getSupabaseReviews()
  } else {
    const { reviews } = getLocalStorageData()
    return reviews
  }
}

export async function getReviewsByDate(date: string): Promise<Review[]> {
  const reviews = await getReviews()
  return reviews.filter(review => review.date === date)
}

export async function getReviewById(id: string): Promise<Review | undefined> {
  const reviews = await getReviews()
  return reviews.find(review => review.id === id)
}

export async function createReview(date: string, title: string, content: string = '', teams: string[] = []): Promise<Review> {
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

  const user = await getCurrentUser()
  if (user) {
    await saveSupabaseReview(newReview)
  } else {
    const { reviews } = getLocalStorageData()
    reviews.push(newReview)
    saveLocalReviews(reviews)
  }

  return newReview
}

export async function updateReview(id: string, updates: Partial<Omit<Review, 'id' | 'createdAt'>>): Promise<Review | null> {
  const user = await getCurrentUser()

  if (user) {
    const reviews = await getSupabaseReviews()
    const index = reviews.findIndex(review => review.id === id)
    if (index === -1)
      return null

    const updatedReview = { ...reviews[index], ...updates }
    await saveSupabaseReview(updatedReview)
    return updatedReview
  } else {
    const { reviews } = getLocalStorageData()
    const index = reviews.findIndex(review => review.id === id)
    if (index === -1)
      return null

    reviews[index] = { ...reviews[index], ...updates }
    saveLocalReviews(reviews)
    return reviews[index]
  }
}

export async function deleteReview(id: string): Promise<boolean> {
  const user = await getCurrentUser()

  if (user) {
    return deleteSupabaseReview(id)
  } else {
    const { reviews } = getLocalStorageData()
    const filtered = reviews.filter(review => review.id !== id)
    if (filtered.length === reviews.length)
      return false

    saveLocalReviews(filtered)
    return true
  }
}

export async function getNotes(): Promise<Note[]> {
  const user = await getCurrentUser()
  if (user) {
    return getSupabaseNotes()
  } else {
    const { notes } = getLocalStorageData()
    return notes
  }
}

export async function createNote(content: JSONContent | null = null): Promise<Note> {
  const note: Note = {
    id: `note-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
    content: content || { type: 'doc', content: [] },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const user = await getCurrentUser()
  if (user) {
    await saveSupabaseNote(note)
  } else {
    const { notes } = getLocalStorageData()
    notes.push(note)
    saveLocalNotes(notes)
  }

  return note
}

export async function updateNote(id: string, content: JSONContent): Promise<Note | null> {
  const user = await getCurrentUser()

  if (user) {
    const notes = await getSupabaseNotes()
    const index = notes.findIndex(n => n.id === id)
    if (index === -1)
      return null

    const updatedNote = {
      ...notes[index],
      content,
      updatedAt: new Date().toISOString(),
    }
    await saveSupabaseNote(updatedNote)
    return updatedNote
  } else {
    const { notes } = getLocalStorageData()
    const index = notes.findIndex(n => n.id === id)
    if (index === -1)
      return null

    notes[index] = {
      ...notes[index],
      content,
      updatedAt: new Date().toISOString(),
    }
    saveLocalNotes(notes)
    return notes[index]
  }
}

export async function deleteNote(id: string): Promise<boolean> {
  const user = await getCurrentUser()

  if (user) {
    return deleteSupabaseNote(id)
  } else {
    const { notes } = getLocalStorageData()
    const filtered = notes.filter(n => n.id !== id)
    if (filtered.length === notes.length)
      return false

    saveLocalNotes(filtered)
    return true
  }
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
  const MAX_HONBA = 9
  const MAX_ROUND = 4

  if (current.honba < MAX_HONBA) {
    return {
      field: current.field,
      round: current.round,
      honba: current.honba + 1,
    }
  }

  if (current.round < MAX_ROUND) {
    return {
      field: current.field,
      round: current.round + 1,
      honba: 0,
    }
  }

  if (current.field === 'east') {
    return {
      field: 'south',
      round: 1,
      honba: 0,
    }
  }

  return {
    field: 'east',
    round: 1,
    honba: 0,
  }
}

export async function exportAllData(): Promise<string> {
  const user = await getCurrentUser()
  let data: StorageData

  if (user) {
    const reviews = await getSupabaseReviews()
    const notes = await getSupabaseNotes()
    data = { reviews, notes }
  } else {
    data = getLocalStorageData()
  }

  return JSON.stringify(data, null, 2)
}

export async function importAllData(jsonString: string): Promise<{ success: boolean, error?: string }> {
  try {
    const data = JSON.parse(jsonString) as StorageData

    if (!data || typeof data !== 'object') {
      return { success: false, error: '数据格式无效' }
    }

    if (!Array.isArray(data.reviews)) {
      return { success: false, error: '复盘数据格式无效' }
    }

    if (!Array.isArray(data.notes)) {
      return { success: false, error: '笔记数据格式无效' }
    }

    const user = await getCurrentUser()

    if (user) {
      const existingReviews = await getSupabaseReviews()
      const existingNotes = await getSupabaseNotes()

      for (const review of existingReviews) {
        await deleteSupabaseReview(review.id)
      }

      for (const note of existingNotes) {
        await deleteSupabaseNote(note.id)
      }

      for (const review of data.reviews) {
        await saveSupabaseReview(review)
      }

      for (const note of data.notes) {
        await saveSupabaseNote(note)
      }
    } else {
      saveLocalStorageData(data)
    }

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '导入失败',
    }
  }
}

export async function downloadDataAsJson(): Promise<void> {
  const jsonString = await exportAllData()
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
