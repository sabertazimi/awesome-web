import type { JSONContent } from '@tiptap/react'
import { cva } from 'class-variance-authority'

export interface Team {
  id: number
  teamName: string
  teamFullName: string
  teamCode: string
}

export interface Pro {
  id: number
  proName: string
  teamId: number
  birth: string
  birthPlace: string
  org: string
  proYear: number
}

export interface GameSchedule {
  date: string // Format: YYYY-MM-DD (ISO 8601)
  dayOfWeek: string // 月, 火, 木, 金
  teamIds: number[] // Team IDs sorted by id
}

export type ReviewStatus = 'not_started' | 'in_progress' | 'completed'

export const statusConfig: Record<
  ReviewStatus,
  { label: string, variant: 'secondary' | 'default' | 'outline', className: string }
> = {
  not_started: {
    label: '未开始',
    variant: 'secondary',
    className: 'bg-muted text-muted-foreground',
  },
  in_progress: {
    label: '进行中',
    variant: 'default',
    className: 'bg-destructive text-destructive-foreground',
  },
  completed: {
    label: '已完成',
    variant: 'outline',
    className: 'bg-primary text-primary-foreground',
  },
}

export const teams: Team[] = [
  { id: 1, teamName: 'JETS', teamFullName: 'EARTH JETS', teamCode: 'T011' },
  { id: 2, teamName: 'ドリブンズ', teamFullName: '赤坂ドリブンズ', teamCode: 'T001' },
  { id: 3, teamName: '風林火山', teamFullName: 'EX風林火山', teamCode: 'T002' },
  { id: 4, teamName: 'サクラナイツ', teamFullName: 'KADOKAWAサクラナイツ', teamCode: 'T008' },
  { id: 5, teamName: '麻雀格闘倶楽部', teamFullName: 'KONAMI麻雀格闘倶楽部', teamCode: 'T003' },
  { id: 6, teamName: 'ABEMAS', teamFullName: '渋谷ABEMAS', teamCode: 'T004' },
  { id: 7, teamName: 'フェニックス', teamFullName: 'セガサミーフェニックス', teamCode: 'T005' },
  { id: 8, teamName: '雷電', teamFullName: 'TEAM RAIDEN / 雷電', teamCode: 'T006' },
  { id: 9, teamName: 'BEAST', teamFullName: 'BEAST X', teamCode: 'T010' },
  { id: 10, teamName: 'Pirates', teamFullName: 'U-NEXT Pirates', teamCode: 'T007' },
]

const teamColorVariants = cva(
  'text-white data-highlighted:text-white data-highlighted:ring-primary data-highlighted:ring-2 data-highlighted:ring-inset data-[selected=true]:text-white data-[selected=true]:ring-primary data-[selected=true]:ring-2 data-[selected=true]:ring-inset',
  {
    variants: {
      team: {
        1: 'bg-team-1 border-team-1 data-highlighted:bg-team-1/80 data-highlighted:border-team-1/80 data-[selected=true]:bg-team-1/80 data-[selected=true]:border-team-1/80',
        2: 'bg-team-2 border-team-2 data-highlighted:bg-team-2/80 data-highlighted:border-team-2/80 data-[selected=true]:bg-team-2/80 data-[selected=true]:border-team-2/80',
        3: 'bg-team-3 border-team-3 data-highlighted:bg-team-3/80 data-highlighted:border-team-3/80 data-[selected=true]:bg-team-3/80 data-[selected=true]:border-team-3/80',
        4: 'bg-team-4 border-team-4 data-highlighted:bg-team-4/80 data-highlighted:border-team-4/80 data-[selected=true]:bg-team-4/80 data-[selected=true]:border-team-4/80',
        5: 'bg-team-5 border-team-5 data-highlighted:bg-team-5/80 data-highlighted:border-team-5/80 data-[selected=true]:bg-team-5/80 data-[selected=true]:border-team-5/80',
        6: 'bg-team-6 border-team-6 data-highlighted:bg-team-6/80 data-highlighted:border-team-6/80 data-[selected=true]:bg-team-6/80 data-[selected=true]:border-team-6/80',
        7: 'bg-team-7 border-team-7 data-highlighted:bg-team-7/80 data-highlighted:border-team-7/80 data-[selected=true]:bg-team-7/80 data-[selected=true]:border-team-7/80',
        8: 'bg-team-8 border-team-8 data-highlighted:bg-team-8/80 data-highlighted:border-team-8/80 data-[selected=true]:bg-team-8/80 data-[selected=true]:border-team-8/80',
        9: 'bg-team-9 border-team-9 data-highlighted:bg-team-9/80 data-highlighted:border-team-9/80 data-[selected=true]:bg-team-9/80 data-[selected=true]:border-team-9/80',
        10: 'bg-team-10 border-team-10 data-highlighted:bg-team-10/80 data-highlighted:border-team-10/80 data-[selected=true]:bg-team-10/80 data-[selected=true]:border-team-10/80',
      },
    },
  },
)

export function getTeamColorClass(teamId: number): string {
  if (teamId >= 1 && teamId <= 10) {
    return teamColorVariants({ team: teamId as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 })
  }
  return 'bg-muted border-muted text-muted-foreground'
}

export function getTeamColorClassByName(teamName: string): string {
  const team = teams.find(t => t.teamName === teamName)
  if (!team) {
    return 'bg-muted border-muted text-muted-foreground'
  }
  return getTeamColorClass(team.id)
}

export function getTeamColorClassByFullName(teamFullName: string): string {
  const team = teams.find(t => t.teamFullName === teamFullName)
  if (!team) {
    return 'bg-muted border-muted text-muted-foreground'
  }
  return getTeamColorClass(team.id)
}

export const pros: Pro[] = [
  {
    id: 1,
    proName: '石井一馬',
    teamId: 1,
    birth: '1986-02-21',
    birthPlace: '東京都',
    org: '最高位戦日本プロ麻雀協会',
    proYear: 2006,
  },
  {
    id: 2,
    proName: '三浦智博',
    teamId: 1,
    birth: '1987-04-26',
    birthPlace: '愛知県',
    org: '日本プロ麻雀連盟',
    proYear: 2012,
  },
  {
    id: 3,
    proName: '逢川恵夢',
    teamId: 1,
    birth: '1987-08-28',
    birthPlace: '大阪府',
    org: '日本プロ麻雀協会',
    proYear: 2011,
  },
  {
    id: 4,
    proName: '柴田弘幸',
    teamId: 1,
    birth: '1976-02-16',
    birthPlace: '神奈川県',
    org: '日本プロ麻雀連盟',
    proYear: 2001,
  },
  {
    id: 5,
    proName: '園田賢',
    teamId: 2,
    birth: '1980-11-25',
    birthPlace: '兵庫県',
    org: '最高位戦日本プロ麻雀協会',
    proYear: 2003,
  },
  {
    id: 6,
    proName: '鈴木たろう',
    teamId: 2,
    birth: '1973-10-04',
    birthPlace: '茨城県',
    org: '最高位戦日本プロ麻雀協会',
    proYear: 1997,
  },
  {
    id: 7,
    proName: '浅見真紀',
    teamId: 2,
    birth: '1985-08-30',
    birthPlace: '埼玉県',
    org: '最高位戦日本プロ麻雀協会',
    proYear: 2010,
  },
  {
    id: 8,
    proName: '渡辺太',
    teamId: 2,
    birth: '1988-07-25',
    birthPlace: '埼玉県',
    org: '最高位戦日本プロ麻雀協会',
    proYear: 2023,
  },
  {
    id: 9,
    proName: '二階堂亜樹',
    teamId: 3,
    birth: '1981-11-15',
    birthPlace: '神奈川県',
    org: '日本プロ麻雀連盟',
    proYear: 1999,
  },
  {
    id: 10,
    proName: '勝又健志',
    teamId: 3,
    birth: '1981-03-15',
    birthPlace: '東京都',
    org: '日本プロ麻雀連盟',
    proYear: 1999,
  },
  {
    id: 11,
    proName: '永井孝典',
    teamId: 3,
    birth: '1986-08-10',
    birthPlace: '愛知県',
    org: '最高位戦日本プロ麻雀協会',
    proYear: 2019,
  },
  {
    id: 12,
    proName: '内川幸太郎',
    teamId: 3,
    birth: '1981-05-06',
    birthPlace: '長野県',
    org: '日本プロ麻雀連盟',
    proYear: 2006,
  },
  {
    id: 13,
    proName: '岡田紗佳',
    teamId: 4,
    birth: '1994-02-19',
    birthPlace: '東京都',
    org: '日本プロ麻雀連盟',
    proYear: 2017,
  },
  {
    id: 14,
    proName: '堀慎吾',
    teamId: 4,
    birth: '1984-03-23',
    birthPlace: '新潟県',
    org: '日本プロ麻雀協会',
    proYear: 2010,
  },
  {
    id: 15,
    proName: '渋川難波',
    teamId: 4,
    birth: '1986-05-19',
    birthPlace: '広島県',
    org: '日本プロ麻雀協会',
    proYear: 2011,
  },
  {
    id: 16,
    proName: '阿久津翔太',
    teamId: 4,
    birth: '1996-04-23',
    birthPlace: '茨城県',
    org: '日本プロ麻雀連盟',
    proYear: 2018,
  },
  {
    id: 17,
    proName: '佐々木寿人',
    teamId: 5,
    birth: '1977-01-12',
    birthPlace: '宮城県',
    org: '日本プロ麻雀連盟',
    proYear: 2006,
  },
  {
    id: 18,
    proName: '高宮まり',
    teamId: 5,
    birth: '1988-11-08',
    birthPlace: '茨城県',
    org: '日本プロ麻雀連盟',
    proYear: 2010,
  },
  {
    id: 19,
    proName: '伊達朱里紗',
    teamId: 5,
    birth: '1991-05-10',
    birthPlace: '兵庫県',
    org: '日本プロ麻雀連盟',
    proYear: 2019,
  },
  {
    id: 20,
    proName: '滝沢和典',
    teamId: 5,
    birth: '1979-12-06',
    birthPlace: '新潟県',
    org: '日本プロ麻雀連盟',
    proYear: 1999,
  },
  {
    id: 21,
    proName: '多井隆晴',
    teamId: 6,
    birth: '1972-03-17',
    birthPlace: '東京都',
    org: 'RMU',
    proYear: 1995,
  },
  {
    id: 22,
    proName: '白鳥翔',
    teamId: 6,
    birth: '1986-08-27',
    birthPlace: '東京都',
    org: '日本プロ麻雀連盟',
    proYear: 2006,
  },
  {
    id: 23,
    proName: '松本吉弘',
    teamId: 6,
    birth: '1992-05-03',
    birthPlace: '神奈川県',
    org: '日本プロ麻雀協会',
    proYear: 2013,
  },
  {
    id: 24,
    proName: '日向藍子',
    teamId: 6,
    birth: '1988-09-24',
    birthPlace: '長野県',
    org: '最高位戦日本プロ麻雀協会',
    proYear: 2011,
  },
  {
    id: 25,
    proName: '茅森早香',
    teamId: 7,
    birth: '1982-05-04',
    birthPlace: '北海道',
    org: '最高位戦日本プロ麻雀協会',
    proYear: 2001,
  },
  {
    id: 26,
    proName: '醍醐大',
    teamId: 7,
    birth: '1976-04-21',
    birthPlace: '千葉県',
    org: '最高位戦日本プロ麻雀協会',
    proYear: 2005,
  },
  {
    id: 27,
    proName: '竹内元太',
    teamId: 7,
    birth: '1986-03-12',
    birthPlace: '長野県',
    org: '最高位戦日本プロ麻雀協会',
    proYear: 2013,
  },
  {
    id: 28,
    proName: '浅井堂岐',
    teamId: 7,
    birth: '1985-12-24',
    birthPlace: '埼玉県',
    org: '日本プロ麻雀協会',
    proYear: 2010,
  },
  {
    id: 29,
    proName: '萩原聖人',
    teamId: 8,
    birth: '1971-08-21',
    birthPlace: '神奈川県',
    org: '日本プロ麻雀連盟',
    proYear: 2017,
  },
  {
    id: 30,
    proName: '瀬戸熊直樹',
    teamId: 8,
    birth: '1970-08-27',
    birthPlace: '千葉県',
    org: '日本プロ麻雀連盟',
    proYear: 1998,
  },
  {
    id: 31,
    proName: '黒沢咲',
    teamId: 8,
    birth: '10-06',
    birthPlace: '東京都',
    org: '日本プロ麻雀連盟',
    proYear: 2005,
  },
  {
    id: 32,
    proName: '本田朋広',
    teamId: 8,
    birth: '1983-10-03',
    birthPlace: '富山県',
    org: '日本プロ麻雀連盟',
    proYear: 2012,
  },
  {
    id: 33,
    proName: '鈴木大介',
    teamId: 9,
    birth: '1974-07-11',
    birthPlace: '東京都',
    org: '日本プロ麻雀連盟',
    proYear: 2023,
  },
  {
    id: 34,
    proName: '中田花奈',
    teamId: 9,
    birth: '1994-08-06',
    birthPlace: '埼玉県',
    org: '日本プロ麻雀連盟',
    proYear: 2021,
  },
  {
    id: 35,
    proName: '下石戟',
    teamId: 9,
    birth: '1987-03-20',
    birthPlace: '滋賀県',
    org: '日本プロ麻雀協会',
    proYear: 2009,
  },
  {
    id: 36,
    proName: '東城りお',
    teamId: 9,
    birth: '1990-09-18',
    birthPlace: '秋田県',
    org: '日本プロ麻雀連盟',
    proYear: 2013,
  },
  {
    id: 37,
    proName: '小林剛',
    teamId: 10,
    birth: '1976-02-12',
    birthPlace: '東京都',
    org: '麻将連合-μ-',
    proYear: 1996,
  },
  {
    id: 38,
    proName: '瑞原明奈',
    teamId: 10,
    birth: '1986-11-19',
    birthPlace: '長崎県',
    org: '最高位戦日本プロ麻雀協会',
    proYear: 2014,
  },
  {
    id: 39,
    proName: '鈴木優',
    teamId: 10,
    birth: '1981-09-13',
    birthPlace: '愛知県',
    org: '最高位戦日本プロ麻雀協会',
    proYear: 2002,
  },
  {
    id: 40,
    proName: '仲林圭',
    teamId: 10,
    birth: '1985-09-17',
    birthPlace: '東京都',
    org: '日本プロ麻雀協会',
    proYear: 2009,
  },
]

export interface RoundInfo {
  /** 东场/南场 */
  field: 'east' | 'south'
  /** 小局数 (1-4) */
  round: number
  /** 本场数 (0, 1, 2, 3...) */
  honba: number
}

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

export interface HosetsuResult {
  /** 基本的文字复盘描述 */
  description: string
  /** 何切类型 */
  type: HosetsuType
  /** 是否为严重分歧（加粗显示） */
  isSignificant: boolean
}

export interface TableData {
  /** 4个选手名称 */
  players: string[]
  rounds: {
    /** 小局信息 */
    round: RoundInfo
    /** 4个选手的何切结果 */
    results: HosetsuResult[]
  }[]
}

export interface Review {
  id: string
  /** 日期 (格式: YYYY-MM-DD) */
  date: string
  /** 标题 */
  title: string
  /** 牌谱A链接 */
  linkA: string
  /** 牌谱B链接 */
  linkB: string
  /** 参赛队伍 */
  teams: string[]
  /** 状态 */
  status: 'not_started' | 'in_progress' | 'completed'
  /** 社交网址 */
  socialUrl: string
  /** A桌数据 */
  tableA: TableData[]
  /** B桌数据 */
  tableB: TableData[]
  /** 备注内容 */
  content: string
  createdAt: string
}

export interface Note {
  id: string
  /** Tiptap JSON content */
  content: JSONContent
  createdAt: string
  updatedAt: string
}
