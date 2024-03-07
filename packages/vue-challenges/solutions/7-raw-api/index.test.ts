import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import App from './App.vue'

describe('raw API', () => {
  it('should work', async () => {
    const result: string[] = []
    console.log = vi.fn((log: string) => {
      result.push(log)
    })
    mount(App)
    expect(JSON.stringify(result)).toBe(JSON.stringify([true, false]))
  })
})
