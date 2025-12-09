import { describe, expect, it } from 'vitest'
import { getTeamColorClass, getTeamColorClassByFullName, getTeamColorClassByName, teams } from './data'

describe('getTeamColorClass', () => {
  it('应该返回队伍1的颜色类名', () => {
    const result = getTeamColorClass(1)
    expect(result).toContain('bg-team-1')
    expect(result).toContain('border-team-1')
    expect(result).toContain('text-white')
  })

  it('应该返回队伍10的颜色类名', () => {
    const result = getTeamColorClass(10)
    expect(result).toContain('bg-team-10')
    expect(result).toContain('border-team-10')
    expect(result).toContain('text-white')
  })

  it('应该包含 hover 状态的样式', () => {
    const result = getTeamColorClass(1)
    expect(result).toContain('data-highlighted:bg-team-1/80')
    expect(result).toContain('data-highlighted:border-team-1/80')
    expect(result).toContain('data-highlighted:text-white')
    expect(result).toContain('data-highlighted:ring-primary')
  })

  it('应该包含选中状态的样式', () => {
    const result = getTeamColorClass(1)
    expect(result).toContain('data-[selected=true]:bg-team-1/80')
    expect(result).toContain('data-[selected=true]:border-team-1/80')
    expect(result).toContain('data-[selected=true]:text-white')
    expect(result).toContain('data-[selected=true]:ring-primary')
  })

  it('应该对所有队伍ID(1-10)返回正确的类名', () => {
    for (let i = 1; i <= 10; i++) {
      const result = getTeamColorClass(i)
      expect(result).toContain(`bg-team-${i}`)
      expect(result).toContain(`border-team-${i}`)
      expect(result).not.toContain('bg-muted')
    }
  })

  it('应该对无效的队伍ID返回默认类名', () => {
    const result = getTeamColorClass(0)
    expect(result).toBe('bg-muted border-muted text-muted-foreground')
  })

  it('应该对超出范围的队伍ID返回默认类名', () => {
    const result = getTeamColorClass(11)
    expect(result).toBe('bg-muted border-muted text-muted-foreground')
  })

  it('应该对负数队伍ID返回默认类名', () => {
    const result = getTeamColorClass(-1)
    expect(result).toBe('bg-muted border-muted text-muted-foreground')
  })
})

describe('getTeamColorClassByName', () => {
  it('应该通过队伍名称返回正确的颜色类名', () => {
    const result = getTeamColorClassByName('JETS')
    expect(result).toContain('bg-team-1')
    expect(result).toContain('border-team-1')
  })

  it('应该对所有队伍名称返回正确的类名', () => {
    teams.forEach((team) => {
      const result = getTeamColorClassByName(team.team_name)
      expect(result).toContain(`bg-team-${team.id}`)
      expect(result).toContain(`border-team-${team.id}`)
    })
  })

  it('应该对不存在的队伍名称返回默认类名', () => {
    const result = getTeamColorClassByName('不存在的队伍')
    expect(result).toBe('bg-muted border-muted text-muted-foreground')
  })

  it('应该对空字符串返回默认类名', () => {
    const result = getTeamColorClassByName('')
    expect(result).toBe('bg-muted border-muted text-muted-foreground')
  })

  it('应该区分大小写', () => {
    const result = getTeamColorClassByName('jets')
    expect(result).toBe('bg-muted border-muted text-muted-foreground')
  })
})

describe('getTeamColorClassByFullName', () => {
  it('应该通过队伍全称返回正确的颜色类名', () => {
    const result = getTeamColorClassByFullName('EARTH JETS')
    expect(result).toContain('bg-team-1')
    expect(result).toContain('border-team-1')
  })

  it('应该对所有队伍全称返回正确的类名', () => {
    teams.forEach((team) => {
      const result = getTeamColorClassByFullName(team.team_full_name)
      expect(result).toContain(`bg-team-${team.id}`)
      expect(result).toContain(`border-team-${team.id}`)
    })
  })

  it('应该对不存在的队伍全称返回默认类名', () => {
    const result = getTeamColorClassByFullName('不存在的队伍全称')
    expect(result).toBe('bg-muted border-muted text-muted-foreground')
  })

  it('应该对空字符串返回默认类名', () => {
    const result = getTeamColorClassByFullName('')
    expect(result).toBe('bg-muted border-muted text-muted-foreground')
  })
})

describe('颜色类名一致性', () => {
  it('通过ID、名称和全称获取的类名应该一致', () => {
    teams.forEach((team) => {
      const byId = getTeamColorClass(team.id)
      const byName = getTeamColorClassByName(team.team_name)
      const byFullName = getTeamColorClassByFullName(team.team_full_name)

      expect(byId).toBe(byName)
      expect(byId).toBe(byFullName)
    })
  })
})
