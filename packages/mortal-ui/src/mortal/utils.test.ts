import { describe, expect, it } from 'vitest'
import { TileUtils } from './'

describe('tileUtils', () => {
  describe('getType', () => {
    it('should return the type of the tile', () => {
      expect(TileUtils.getType('3m')).toBe('m')
      expect(TileUtils.getType('7p')).toBe('p')
      expect(TileUtils.getType('5s')).toBe('s')
      expect(TileUtils.getType('0s')).toBe('s')
      expect(TileUtils.getType('2z')).toBe('z')
    })
  })

  describe('getValue', () => {
    it('should return the value of the tile', () => {
      expect(TileUtils.getValue('3m')).toBe(3)
      expect(TileUtils.getValue('7p')).toBe(7)
      expect(TileUtils.getValue('5s')).toBe(5)
      expect(TileUtils.getValue('0s')).toBe(5.5)
      expect(TileUtils.getValue('2z')).toBe(2)
    })
  })

  describe('get', () => {
    it('should return the tile', () => {
      expect(TileUtils.get('3m')).toBe('3m')
      expect(TileUtils.normalize('5pr')).toBe('0p')
      expect(TileUtils.normalize('E')).toBe('1z')
      expect(TileUtils.normalize('p')).toBe('5z')
    })
  })

  describe('isNormalized', () => {
    it('should return true if the tile is normalized', () => {
      expect(TileUtils.isNormalized('3m')).toBe(true)
      expect(TileUtils.isNormalized('7p')).toBe(true)
      expect(TileUtils.isNormalized('5s')).toBe(true)
      expect(TileUtils.isNormalized('0s')).toBe(true)
      expect(TileUtils.isNormalized('2z')).toBe(true)
    })

    it('should return false if the tile is not normalized', () => {
      expect(TileUtils.isNormalized('3M')).toBe(false)
      expect(TileUtils.isNormalized('7P')).toBe(false)
      expect(TileUtils.isNormalized('5S')).toBe(false)
      expect(TileUtils.isNormalized('-2m')).toBe(false)
      expect(TileUtils.isNormalized('10p')).toBe(false)
      expect(TileUtils.isNormalized('99s')).toBe(false)
      expect(TileUtils.isNormalized('5mr')).toBe(false)
      expect(TileUtils.isNormalized('5pr')).toBe(false)
      expect(TileUtils.isNormalized('5sr')).toBe(false)
      expect(TileUtils.isNormalized('5MR')).toBe(false)
      expect(TileUtils.isNormalized('5pP')).toBe(false)
      expect(TileUtils.isNormalized('5Sr')).toBe(false)
      expect(TileUtils.isNormalized('E')).toBe(false)
      expect(TileUtils.isNormalized('S')).toBe(false)
      expect(TileUtils.isNormalized('W')).toBe(false)
      expect(TileUtils.isNormalized('N')).toBe(false)
      expect(TileUtils.isNormalized('P')).toBe(false)
      expect(TileUtils.isNormalized('F')).toBe(false)
      expect(TileUtils.isNormalized('C')).toBe(false)
      expect(TileUtils.isNormalized('e')).toBe(false)
      expect(TileUtils.isNormalized('s')).toBe(false)
      expect(TileUtils.isNormalized('w')).toBe(false)
      expect(TileUtils.isNormalized('n')).toBe(false)
      expect(TileUtils.isNormalized('p')).toBe(false)
      expect(TileUtils.isNormalized('f')).toBe(false)
      expect(TileUtils.isNormalized('c')).toBe(false)
      expect(TileUtils.isNormalized('3')).toBe(false)
    })
  })

  describe('normalize', () => {
    it('should return the tile if it is already normalized', () => {
      expect(TileUtils.normalize('3m')).toBe('3m')
      expect(TileUtils.normalize('7p')).toBe('7p')
      expect(TileUtils.normalize('5s')).toBe('5s')
      expect(TileUtils.normalize('0s')).toBe('0s')
      expect(TileUtils.normalize('2z')).toBe('2z')
    })

    it('should normalize the tile if it is not already normalized', () => {
      expect(TileUtils.normalize('3M')).toBe('3m')
      expect(TileUtils.normalize('7P')).toBe('7p')
      expect(TileUtils.normalize('5S')).toBe('5s')
      expect(TileUtils.normalize('5pr')).toBe('0p')
      expect(TileUtils.normalize('5sr')).toBe('0s')
      expect(TileUtils.normalize('5MR')).toBe('0m')
      expect(TileUtils.normalize('5pR')).toBe('0p')
      expect(TileUtils.normalize('5Sr')).toBe('0s')
      expect(TileUtils.normalize('E')).toBe('1z')
      expect(TileUtils.normalize('S')).toBe('2z')
      expect(TileUtils.normalize('W')).toBe('3z')
      expect(TileUtils.normalize('N')).toBe('4z')
      expect(TileUtils.normalize('P')).toBe('5z')
      expect(TileUtils.normalize('F')).toBe('6z')
      expect(TileUtils.normalize('C')).toBe('7z')
      expect(TileUtils.normalize('e')).toBe('1z')
      expect(TileUtils.normalize('s')).toBe('2z')
      expect(TileUtils.normalize('w')).toBe('3z')
      expect(TileUtils.normalize('n')).toBe('4z')
      expect(TileUtils.normalize('p')).toBe('5z')
      expect(TileUtils.normalize('f')).toBe('6z')
      expect(TileUtils.normalize('c')).toBe('7z')
    })
  })

  describe('sort', () => {
    it('should sort the tiles based on type and value', () => {
      const tiles = ['3m', '7p', '5s', '0s', '2z']
      const sortedTiles = TileUtils.sort(tiles)
      expect(sortedTiles).toEqual(['3m', '7p', '5s', '0s', '2z'])
    })

    it('should handle tiles with the same type', () => {
      const tiles = ['3m', '2m', '1m']
      const sortedTiles = TileUtils.sort(tiles)
      expect(sortedTiles).toEqual(['1m', '2m', '3m'])
    })

    it('should handle tiles with the same value', () => {
      const tiles = ['3m', '3p', '3s']
      const sortedTiles = TileUtils.sort(tiles)
      expect(sortedTiles).toEqual(['3m', '3p', '3s'])
    })

    it('should handle tiles with different types and values', () => {
      const tiles = ['3m', '7p', '5s', '0s', '2z', '1m', '3p', '3s']
      const sortedTiles = TileUtils.sort(tiles)
      expect(sortedTiles).toEqual(['1m', '3m', '3p', '7p', '3s', '5s', '0s', '2z'])
    })
  })
})
