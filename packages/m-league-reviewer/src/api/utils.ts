import type { HosetsuResult, RoundInfo } from '@/api/data'

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
