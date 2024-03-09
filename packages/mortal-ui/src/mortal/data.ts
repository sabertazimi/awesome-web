type Tile = string

interface Log {
  engine: string
  game_length: string
  loading_time: string
  review_time: string
  show_rating: boolean
  version: string
  review: ReviewLog
  player_id: number
  split_logs: SplitLog[]
  mjai_log: Event[]
  lang: string
}

interface ReviewLog {
  total_reviewed: number
  total_matches: number
  rating: number
  temperature: number
  kyokus: Kyokus[]
  relative_phi_matrix: number[][][]
  model_tag: string
}

interface Kyokus {
  kyoku: number
  honba: number
  end_status: Endstatus[]
  relative_scores: number[]
  entries: Review[]
}

interface Review {
  junme: number
  tiles_left: number
  last_actor: number
  tile: string
  state: State
  at_self_chi_pon: boolean
  at_self_riichi: boolean
  at_opponent_kakan: boolean
  expected: Event
  actual: Event
  is_equal: boolean
  details: Detail[]
  shanten: number
  at_furiten: boolean
  actual_index: number
}

interface Detail {
  action: Event
  q_value: number
  prob: number
}

interface State {
  tehai: string[]
  fuuros: Fuuro[][]
}

interface Fuuro {
  type: string
  target: number
  pai: string
  consumed: string[]
}

interface Endstatus {
  type: string
  actor?: number
  target?: number
  deltas: number[]
  ura_markers?: string[]
}

interface SplitLog {
  name: string[]
  rule: Rule
  ratingc: string
  lobby: number
  dan: string[]
  rate: number[]
  sx: string[]
  log: ((number | string)[] | number[] | number | string)[][][][]
}

interface Rule {
  disp: string
  aka: number
  aka51: number
  aka52: number
  aka53: number
}

type Event =
  | None
  | StartGame
  | StartKyoku
  | Tsumo
  | Dahai
  | Chi
  | Pon
  | Daiminkan
  | Kakan
  | Ankan
  | Dora
  | Reach
  | ReachAccepted
  | Hora
  | Ryukyoku
  | EndKyoku
  | EndGame

interface None {
  type: 'none'
}

interface StartGame {
  type: 'start_game'
  names: [string, string, string, string]
  kyoku_first: number
  aka_flag: boolean
}

interface StartKyoku {
  type: 'start_kyoku'
  bakaze: 'E' | 'S'
  dora_marker: Tile
  kyoku: number
  honba: number
  kyotaku: number
  oya: number
  heroId: number
  scores: [number, number, number, number]
  tehais: [Tile[], Tile[], Tile[], Tile[]]
}

interface Tsumo {
  type: 'tsumo'
  actor: number
  pai: Tile
}

interface Dahai {
  type: 'dahai'
  actor: number
  pai: Tile
  tsumogiri: boolean
}

type ClaimEvent = Chi | Pon | Daiminkan | Kakan | Ankan

interface Chi {
  type: 'chi'
  actor: number
  target: number
  pai: Tile
  consumed: [Tile, Tile]
}

interface Pon {
  type: 'pon'
  actor: number
  target: number
  pai: Tile
  consumed: [Tile, Tile]
}

interface Daiminkan {
  type: 'daiminkan'
  actor: number
  target: number
  pai: Tile
  consumed: [Tile, Tile, Tile]
}

interface Kakan {
  type: 'kakan'
  actor: number
  target: number
  pai: Tile
  consumed: [Tile, Tile, Tile]
}

interface Ankan {
  type: 'ankan'
  actor: number
  pai: Tile
  consumed: [Tile, Tile, Tile, Tile]
}

interface Dora {
  type: 'dora'
  dora_marker: Tile
}

interface Reach {
  type: 'reach'
  actor: number
}

interface ReachAccepted {
  type: 'reach_accepted'
  actor: number
}

interface Hora {
  type: 'hora'
  actor: number
  target: number
  deltas: [number, number, number, number]
  ura_markers: Tile[]
}

interface Ryukyoku {
  type: 'ryukyoku'
  deltas: [number, number, number, number]
}

interface EndKyoku {
  type: 'end_kyoku'
}

interface EndGame {
  type: 'end_game'
}

export type { ClaimEvent, Detail, Event, Log, Review, ReviewLog, StartKyoku, Tile }
