import { cva } from 'class-variance-authority'

export interface Team {
  id: number
  team_name: string
  team_full_name: string
  team_code: string
}

export interface Pro {
  id: number
  pro_name: string
  team_id: number
  birth: string
  birth_place: string
  org: string
  pro_year: number
}

export interface GameSchedule {
  date: string // Format: YYYY-MM-DD (ISO 8601)
  dayOfWeek: string // 月, 火, 木, 金
  teamIds: number[] // Team IDs sorted by id
}

export const statusConfig = {
  not_started: {
    label: '未开始',
    variant: 'secondary' as const,
    className: 'bg-muted text-muted-foreground',
  },
  in_progress: {
    label: '进行中',
    variant: 'default' as const,
    className: 'bg-destructive text-destructive-foreground',
  },
  completed: {
    label: '已完成',
    variant: 'outline' as const,
    className: 'bg-primary text-primary-foreground',
  },
}

export const teams: Team[] = [
  { id: 1, team_name: 'JETS', team_full_name: 'EARTH JETS', team_code: 'T011' },
  { id: 2, team_name: 'ドリブンズ', team_full_name: '赤坂ドリブンズ', team_code: 'T001' },
  { id: 3, team_name: '風林火山', team_full_name: 'EX風林火山', team_code: 'T002' },
  { id: 4, team_name: 'サクラナイツ', team_full_name: 'KADOKAWAサクラナイツ', team_code: 'T008' },
  { id: 5, team_name: '麻雀格闘倶楽部', team_full_name: 'KONAMI麻雀格闘倶楽部', team_code: 'T003' },
  { id: 6, team_name: 'ABEMAS', team_full_name: '渋谷ABEMAS', team_code: 'T004' },
  { id: 7, team_name: 'フェニックス', team_full_name: 'セガサミーフェニックス', team_code: 'T005' },
  { id: 8, team_name: '雷電', team_full_name: 'TEAM RAIDEN / 雷電', team_code: 'T006' },
  { id: 9, team_name: 'BEAST', team_full_name: 'BEAST X', team_code: 'T010' },
  { id: 10, team_name: 'Pirates', team_full_name: 'U-NEXT Pirates', team_code: 'T007' },
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
  const team = teams.find(t => t.team_name === teamName)
  if (!team) {
    return 'bg-muted border-muted text-muted-foreground'
  }
  return getTeamColorClass(team.id)
}

export function getTeamColorClassByFullName(teamFullName: string): string {
  const team = teams.find(t => t.team_full_name === teamFullName)
  if (!team) {
    return 'bg-muted border-muted text-muted-foreground'
  }
  return getTeamColorClass(team.id)
}

export const pros: Pro[] = [
  {
    id: 1,
    pro_name: '石井一馬',
    team_id: 1,
    birth: '1986-02-21',
    birth_place: '東京都',
    org: '最高位戦日本プロ麻雀協会',
    pro_year: 2006,
  },
  {
    id: 2,
    pro_name: '三浦智博',
    team_id: 1,
    birth: '1987-04-26',
    birth_place: '愛知県',
    org: '日本プロ麻雀連盟',
    pro_year: 2012,
  },
  {
    id: 3,
    pro_name: '逢川恵夢',
    team_id: 1,
    birth: '1987-08-28',
    birth_place: '大阪府',
    org: '日本プロ麻雀協会',
    pro_year: 2011,
  },
  {
    id: 4,
    pro_name: '柴田弘幸',
    team_id: 1,
    birth: '1976-02-16',
    birth_place: '神奈川県',
    org: '日本プロ麻雀連盟',
    pro_year: 2001,
  },
  {
    id: 5,
    pro_name: '園田賢',
    team_id: 2,
    birth: '1980-11-25',
    birth_place: '兵庫県',
    org: '最高位戦日本プロ麻雀協会',
    pro_year: 2003,
  },
  {
    id: 6,
    pro_name: '鈴木たろう',
    team_id: 2,
    birth: '1973-10-04',
    birth_place: '茨城県',
    org: '最高位戦日本プロ麻雀協会',
    pro_year: 1997,
  },
  {
    id: 7,
    pro_name: '浅見真紀',
    team_id: 2,
    birth: '1985-08-30',
    birth_place: '埼玉県',
    org: '最高位戦日本プロ麻雀協会',
    pro_year: 2010,
  },
  {
    id: 8,
    pro_name: '渡辺太',
    team_id: 2,
    birth: '1988-07-25',
    birth_place: '埼玉県',
    org: '最高位戦日本プロ麻雀協会',
    pro_year: 2023,
  },
  {
    id: 9,
    pro_name: '二階堂亜樹',
    team_id: 3,
    birth: '1981-11-15',
    birth_place: '神奈川県',
    org: '日本プロ麻雀連盟',
    pro_year: 1999,
  },
  {
    id: 10,
    pro_name: '勝又健志',
    team_id: 3,
    birth: '1981-03-15',
    birth_place: '東京都',
    org: '日本プロ麻雀連盟',
    pro_year: 1999,
  },
  {
    id: 11,
    pro_name: '永井孝典',
    team_id: 3,
    birth: '1986-08-10',
    birth_place: '愛知県',
    org: '最高位戦日本プロ麻雀協会',
    pro_year: 2019,
  },
  {
    id: 12,
    pro_name: '内川幸太郎',
    team_id: 3,
    birth: '1981-05-06',
    birth_place: '長野県',
    org: '日本プロ麻雀連盟',
    pro_year: 2006,
  },
  {
    id: 13,
    pro_name: '岡田紗佳',
    team_id: 4,
    birth: '1994-02-19',
    birth_place: '東京都',
    org: '日本プロ麻雀連盟',
    pro_year: 2017,
  },
  {
    id: 14,
    pro_name: '堀慎吾',
    team_id: 4,
    birth: '1984-03-23',
    birth_place: '新潟県',
    org: '日本プロ麻雀協会',
    pro_year: 2010,
  },
  {
    id: 15,
    pro_name: '渋川難波',
    team_id: 4,
    birth: '1986-05-19',
    birth_place: '広島県',
    org: '日本プロ麻雀協会',
    pro_year: 2011,
  },
  {
    id: 16,
    pro_name: '阿久津翔太',
    team_id: 4,
    birth: '1996-04-23',
    birth_place: '茨城県',
    org: '日本プロ麻雀連盟',
    pro_year: 2018,
  },
  {
    id: 17,
    pro_name: '佐々木寿人',
    team_id: 5,
    birth: '1977-01-12',
    birth_place: '宮城県',
    org: '日本プロ麻雀連盟',
    pro_year: 2006,
  },
  {
    id: 18,
    pro_name: '高宮まり',
    team_id: 5,
    birth: '1988-11-08',
    birth_place: '茨城県',
    org: '日本プロ麻雀連盟',
    pro_year: 2010,
  },
  {
    id: 19,
    pro_name: '伊達朱里紗',
    team_id: 5,
    birth: '1991-05-10',
    birth_place: '兵庫県',
    org: '日本プロ麻雀連盟',
    pro_year: 2019,
  },
  {
    id: 20,
    pro_name: '滝沢和典',
    team_id: 5,
    birth: '1979-12-06',
    birth_place: '新潟県',
    org: '日本プロ麻雀連盟',
    pro_year: 1999,
  },
  {
    id: 21,
    pro_name: '多井隆晴',
    team_id: 6,
    birth: '1972-03-17',
    birth_place: '東京都',
    org: 'RMU',
    pro_year: 1995,
  },
  {
    id: 22,
    pro_name: '白鳥翔',
    team_id: 6,
    birth: '1986-08-27',
    birth_place: '東京都',
    org: '日本プロ麻雀連盟',
    pro_year: 2006,
  },
  {
    id: 23,
    pro_name: '松本吉弘',
    team_id: 6,
    birth: '1992-05-03',
    birth_place: '神奈川県',
    org: '日本プロ麻雀協会',
    pro_year: 2013,
  },
  {
    id: 24,
    pro_name: '日向藍子',
    team_id: 6,
    birth: '1988-09-24',
    birth_place: '長野県',
    org: '最高位戦日本プロ麻雀協会',
    pro_year: 2011,
  },
  {
    id: 25,
    pro_name: '茅森早香',
    team_id: 7,
    birth: '1982-05-04',
    birth_place: '北海道',
    org: '最高位戦日本プロ麻雀協会',
    pro_year: 2001,
  },
  {
    id: 26,
    pro_name: '醍醐大',
    team_id: 7,
    birth: '1976-04-21',
    birth_place: '千葉県',
    org: '最高位戦日本プロ麻雀協会',
    pro_year: 2005,
  },
  {
    id: 27,
    pro_name: '竹内元太',
    team_id: 7,
    birth: '1986-03-12',
    birth_place: '長野県',
    org: '最高位戦日本プロ麻雀協会',
    pro_year: 2013,
  },
  {
    id: 28,
    pro_name: '浅井堂岐',
    team_id: 7,
    birth: '1985-12-24',
    birth_place: '埼玉県',
    org: '日本プロ麻雀協会',
    pro_year: 2010,
  },
  {
    id: 29,
    pro_name: '萩原聖人',
    team_id: 8,
    birth: '1971-08-21',
    birth_place: '神奈川県',
    org: '日本プロ麻雀連盟',
    pro_year: 2017,
  },
  {
    id: 30,
    pro_name: '瀬戸熊直樹',
    team_id: 8,
    birth: '1970-08-27',
    birth_place: '千葉県',
    org: '日本プロ麻雀連盟',
    pro_year: 1998,
  },
  {
    id: 31,
    pro_name: '黒沢咲',
    team_id: 8,
    birth: '10-06',
    birth_place: '東京都',
    org: '日本プロ麻雀連盟',
    pro_year: 2005,
  },
  {
    id: 32,
    pro_name: '本田朋広',
    team_id: 8,
    birth: '1983-10-03',
    birth_place: '富山県',
    org: '日本プロ麻雀連盟',
    pro_year: 2012,
  },
  {
    id: 33,
    pro_name: '鈴木大介',
    team_id: 9,
    birth: '1974-07-11',
    birth_place: '東京都',
    org: '日本プロ麻雀連盟',
    pro_year: 2023,
  },
  {
    id: 34,
    pro_name: '中田花奈',
    team_id: 9,
    birth: '1994-08-06',
    birth_place: '埼玉県',
    org: '日本プロ麻雀連盟',
    pro_year: 2021,
  },
  {
    id: 35,
    pro_name: '下石戟',
    team_id: 9,
    birth: '1987-03-20',
    birth_place: '滋賀県',
    org: '日本プロ麻雀協会',
    pro_year: 2009,
  },
  {
    id: 36,
    pro_name: '東城りお',
    team_id: 9,
    birth: '1990-09-18',
    birth_place: '秋田県',
    org: '日本プロ麻雀連盟',
    pro_year: 2013,
  },
  {
    id: 37,
    pro_name: '小林剛',
    team_id: 10,
    birth: '1976-02-12',
    birth_place: '東京都',
    org: '麻将連合-μ-',
    pro_year: 1996,
  },
  {
    id: 38,
    pro_name: '瑞原明奈',
    team_id: 10,
    birth: '1986-11-19',
    birth_place: '長崎県',
    org: '最高位戦日本プロ麻雀協会',
    pro_year: 2014,
  },
  {
    id: 39,
    pro_name: '鈴木優',
    team_id: 10,
    birth: '1981-09-13',
    birth_place: '愛知県',
    org: '最高位戦日本プロ麻雀協会',
    pro_year: 2002,
  },
  {
    id: 40,
    pro_name: '仲林圭',
    team_id: 10,
    birth: '1985-09-17',
    birth_place: '東京都',
    org: '日本プロ麻雀協会',
    pro_year: 2009,
  },
]
