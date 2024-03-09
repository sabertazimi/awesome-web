import type { Tile } from './data'

const TileUtils = {
  Types: ['m', 'p', 's', 'z'],
  Values: [1, 2, 3, 4, 5, 5.5, 6, 7, 8, 9],
  Yakuhai: ['e', 's', 'w', 'n', 'p', 'f', 'c'],
  Winds: ['E', 'S', 'W', 'N'],
  Positions: ['hero', 'shimo', 'toimen', 'kami'],
  getType(tile: Tile) {
    return tile.slice(-1)
  },
  getValue(tile: Tile) {
    return Number.parseInt(tile.slice(0, -1)) || 5.5 // 5.5 for aka dora
  },
  get(tile: Tile = '') {
    return this.normalize(tile)
  },
  isNormalized(tile: Tile) {
    return (
      tile.length === 2
      && this.Types.includes(this.getType(tile))
      && this.Values.includes(this.getValue(tile))
    )
  },
  normalize(tile: Tile) {
    if (this.isNormalized(tile))
      return tile

    if (tile.length === 1 && this.Yakuhai.includes(tile.toLowerCase()))
      return `${this.Yakuhai.findIndex(t => t === tile.toLowerCase()) + 1}z`

    if (tile.length === 3 && tile.slice(-1).toLowerCase() === 'r')
      return `0${tile.slice(1, 2).toLowerCase()}`

    return tile.toLowerCase()
  },
  sort(tiles: Tile[]) {
    return tiles.sort((a, b) => this.compare(a, b))
  },
  compare(a: Tile = '', b: Tile = '') {
    if (this.getType(a) !== this.getType(b))
      return this.Types.indexOf(this.getType(a)) - this.Types.indexOf(this.getType(b))
    return this.getValue(a) - this.getValue(b)
  },
  consume(tiles: Tile[], toConsumed: Tile[]) {
    let consumedTiles = tiles.map(tile => this.get(tile))
    const toConsumedTiles = toConsumed.map(tile => this.get(tile))

    for (const tile of toConsumedTiles) {
      const index = consumedTiles.findIndex(t => t === tile)

      if (index !== -1)
        consumedTiles = consumedTiles.slice(0, index).concat(consumedTiles.slice(index + 1))
    }

    return consumedTiles
  },
  getRelativePosition(actor: number, target: number) {
    if ((actor + 1) % 4 === target) // Shimo (right)
      return 1
    if ((actor + 2) % 4 === target) // Toimen (opposite)
      return 2
    if ((actor + 3) % 4 === target) // Kami (left)
      return 3

    // Hero
    return 0
  },
}

export { TileUtils }
