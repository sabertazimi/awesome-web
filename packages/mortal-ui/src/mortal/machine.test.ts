import { describe, it } from 'vitest'
import log from '../../e2e/report.json'
import { createMachine } from './machine'
import type { Log } from './data'

describe('machine', () => {
  describe('run', () => {
    it('should handle events', () => {
      const machine = createMachine(log as Log)
      machine.run()
    })
  })
})
