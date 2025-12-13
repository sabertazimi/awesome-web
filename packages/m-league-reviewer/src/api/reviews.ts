import type { JSONContent } from '@tiptap/react'

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

export function numberToKanji(num: number): string {
  const map: Record<number, string> = {
    0: '零',
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
  const roundText = numberToKanji(roundInfo.round)
  const honbaText = roundInfo.honba > 0 ? `${numberToKanji(roundInfo.honba)}本場` : ''
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
