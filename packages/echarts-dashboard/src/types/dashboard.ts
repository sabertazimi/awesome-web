// 访问统计数据类型
export interface VisitStats {
  visits: number
  duration: number
  avgDuration: number
}

// IP统计数据类型
export interface IPStats {
  province: string
  value: number
  coordinates: [number, number]
}

// 网站负载数据类型
export interface LoadStats {
  memory: number
  network: number
  storage: number
}

// 实验室数据类型
export interface LabStats {
  totalVisits: string
  totalSubmissions: string
  environments: Array<{
    name: string
    icon: string
    color: string
  }>
}

// 智能问答数据类型
export interface QAStats {
  totalVisits: string
  totalSubmissions: string
  keywords: Array<{
    name: string
    value: number
  }>
}

// 监测记录类型
export interface Monitor {
  id: string
  userType: string
  time: string
}

// 文件流量统计类型
export interface FileTrafficStats {
  category1: {
    name: string
    value: number
    color: string
  }
  category2: {
    name: string
    value: number
    color: string
  }
  trendData: Array<{
    time: string
    value: number
  }>
}

// 主仪表板数据类型
export interface DashboardData {
  visitStats: VisitStats
  ipStats: IPStats[]
  loadStats: LoadStats
  labStats: LabStats
  qaStats: QAStats
  monitorList: Monitor[]
  fileTrafficStats: FileTrafficStats
  systemStats: MatchSystemData
}

// 竞赛系统数据类型
export interface CompetitionStats {
  totalVisits: string
  totalSubmissions: number
}

export interface HotRankingData {
  name: string
  value: number
}

export interface ProjectItem {
  id: string
  title: string
  organization: string
  deadline: string
  description: string
  image: string
  status?: 'active' | 'ending' | 'normal'
}

export interface MatchSystemData {
  stats: CompetitionStats
  hotRanking: HotRankingData[]
  projects: ProjectItem[]
}
