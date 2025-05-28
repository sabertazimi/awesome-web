import type { DashboardData } from '@/types/dashboard'

export const mockDashboardData: DashboardData = {
  visitStats: {
    visits: 234680,
    duration: 78349,
    avgDuration: 3.2,
  },

  ipStats: [
    { province: '北京', value: 852, coordinates: [116.46, 39.92] },
    { province: '上海', value: 593, coordinates: [121.48, 31.22] },
    { province: '广东', value: 8000, coordinates: [113.23, 23.16] },
    { province: '山东', value: 789, coordinates: [117.0, 36.65] },
    { province: '四川', value: 3921, coordinates: [104.06, 30.67] },
    { province: '湖北', value: 578, coordinates: [114.31, 30.52] },
    { province: '黑龙江', value: 9571, coordinates: [126.53, 45.8] },
  ],

  loadStats: {
    memory: 99,
    network: 80,
    storage: 84,
  },

  labStats: {
    totalVisits: '296.6w',
    totalSubmissions: '232968',
    environments: [
      { name: '速度', icon: '⚡', color: '#00ff88' },
      { name: '可见光', icon: '💡', color: '#00aaff' },
      { name: '超声波', icon: '🔊', color: '#0066ff' },
      { name: '智能可视', icon: '👁️', color: '#ffaa00' },
    ],
  },

  qaStats: {
    totalVisits: '296.6w',
    totalSubmissions: '232968',
    keywords: [
      { name: '智能', value: 230 },
      { name: '工业', value: 230 },
      { name: '检测', value: 230 },
      { name: '图像', value: 230 },
      { name: '自动化', value: 160 },
      { name: '光学', value: 160 },
      { name: '算法', value: 140 },
      { name: '技术', value: 140 },
      { name: '数据', value: 120 },
      { name: '分析', value: 100 },
      { name: '机器学习', value: 80 },
      { name: '深度学习', value: 70 },
      { name: '人工智能', value: 60 },
      { name: '导航', value: 60 },
      { name: '感知', value: 60 },
      { name: '人工', value: 50 },
      { name: '定位', value: 50 },
      { name: '特征', value: 50 },
      { name: '采集', value: 50 },
      { name: '工厂', value: 50 },
    ],
  },

  monitorList: [
    {
      id: '南门2号门南门2号门南门2号门南门',
      userType: '内部人员',
      time: '09:12:45:59',
    },
    {
      id: '南门2号门南门2号门南门2号门南门',
      userType: '内部人员',
      time: '09:12:45:59',
    },
    {
      id: '南门2号门南门2号门南门2号门南门',
      userType: '内部人员',
      time: '09:12:45:59',
    },
    {
      id: '南门2号门南门2号门南门2号门南门',
      userType: '内部人员',
      time: '09:12:45:59',
    },
    {
      id: '南门2号门南门2号门南门2号门南门',
      userType: '内部人员',
      time: '09:12:45:59',
    },
    {
      id: '南门2号门南门2号门南门2号门南门',
      userType: '内部人员',
      time: '09:12:45:59',
    },
  ],
  fileTrafficStats: {
    category1: {
      name: '安装',
      value: 75,
      color: '#00ff88',
    },
    category2: {
      name: '类型',
      value: 60,
      color: '#00aaff',
    },
    trendData: [
      { time: '00:00', value: 45 },
      { time: '04:00', value: 32 },
      { time: '08:00', value: 68 },
      { time: '12:00', value: 89 },
      { time: '16:00', value: 75 },
      { time: '20:00', value: 56 },
      { time: '24:00', value: 43 },
    ],
  },
  systemStats: {
    stats: {
      totalVisits: '296.6w',
      totalSubmissions: 232968,
    },
    hotRanking: [
      { name: 'AI应用', value: 1200 },
      { name: '数据分析', value: 980 },
      { name: '前端开发', value: 850 },
      { name: '后端开发', value: 720 },
      { name: '移动开发', value: 650 },
    ],
    projects: [
      {
        id: '1',
        title: '智能天气提醒应用',
        organization: '小樱组织',
        deadline: '2025/03/08 14:12',
        description:
          '开发一款智能天气提醒应用，能够根据用户的地理位置和日......',
        image: `${import.meta.env.BASE_URL}image.png`,
        status: 'normal',
      },
      {
        id: '2',
        title: '智能天气提醒应用',
        organization: '小樱组织',
        deadline: '2025/03/08 14:12',
        description:
          '开发一款智能天气提醒应用，能够根据用户的地理位置和日......',
        image: `${import.meta.env.BASE_URL}image.png`,
        status: 'normal',
      },
      {
        id: '3',
        title: '智能天气提醒应用',
        organization: '小樱组织',
        deadline: '2025/03/08 14:12',
        description: '开发一款智能天气提醒应用，能够根据用户的地理位',
        image: `${import.meta.env.BASE_URL}image.png`,
        status: 'ending',
      },
      {
        id: '4',
        title: '智能天气提醒应用',
        organization: '小樱组织',
        deadline: '2025/03/08 14:12',
        description:
          '开发一款智能天气提醒应用，能够根据用户的地理位置和日......',
        image: `${import.meta.env.BASE_URL}image.png`,
        status: 'normal',
      },
    ],
  },
}
