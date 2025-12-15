import type { HosetsuResult, HosetsuType, RoundInfo } from '@/api/data'
import { toast } from 'sonner'

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

function getNextRound(current: RoundInfo): RoundInfo {
  const MaxHonba = 9
  const MaxRound = 4

  if (current.honba < MaxHonba) {
    return {
      field: current.field,
      round: current.round,
      honba: current.honba + 1,
    }
  }

  if (current.round < MaxRound) {
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

export function createDefaultRoundInfo(existingRounds: RoundInfo[] = []): RoundInfo {
  if (existingRounds.length === 0) {
    return {
      field: 'east',
      round: 1,
      honba: 0,
    }
  }

  const lastRound = existingRounds[existingRounds.length - 1]
  return getNextRound(lastRound)
}

export const DefaultHosetsuResult: HosetsuResult = {
  description: '',
  type: 'other',
  isSignificant: false,
}

export const HosetsuTypes: Record<HosetsuType, { label: string, color: string }> = {
  hand_sequence: { label: '手顺', color: 'bg-team-1' },
  tile_efficiency: { label: '牌效', color: 'bg-team-2' },
  riichi: { label: '立直', color: 'bg-team-3' },
  dama: { label: '默听', color: 'bg-team-4' },
  call: { label: '鸣牌', color: 'bg-team-5' },
  refuse_tenpai: { label: '拒听', color: 'bg-team-6' },
  retreat: { label: '退向', color: 'bg-team-7' },
  betaori: { label: '兜牌', color: 'bg-team-8' },
  fold: { label: '下车', color: 'bg-team-9' },
  aggressive: { label: '强攻', color: 'bg-team-10' },
  discard: { label: '放铳', color: 'bg-destructive' },
  other: { label: '其他', color: 'bg-ring' },
}

export function createEmptyHosetsuResult(): HosetsuResult {
  return { ...DefaultHosetsuResult }
}

export function isHosetsuType(value: string): value is HosetsuType {
  return Object.keys(HosetsuTypes).includes(value)
}

export function copyHosetsuResultToClipboard(value: HosetsuResult) {
  const data = JSON.stringify(value)
  navigator.clipboard
    .writeText(data)
    .catch((err: unknown) => toast.error(`复制失败: ${err instanceof Error ? err.message : String(err)}`))
}

export function normalizeHosetsuResult(value: unknown): HosetsuResult | null {
  if (typeof value !== 'object' || value === null || !('description' in value)) {
    return null
  }

  const candidate = value as HosetsuResult
  const type = candidate.type

  if (type !== undefined && !isHosetsuType(type)) {
    return null
  }

  return {
    description: candidate.description || '',
    type: type || 'other',
    isSignificant: candidate.isSignificant || false,
  }
}

export function parseHosetsuResult(text: string): HosetsuResult | null {
  try {
    const parsed = JSON.parse(text) as unknown
    return normalizeHosetsuResult(parsed)
  } catch {}

  return null
}
