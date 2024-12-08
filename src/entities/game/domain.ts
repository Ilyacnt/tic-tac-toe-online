export type GameEntity = GameIdleEntity | GameInProgressEntity | GameOverEntity | GameOverDrawEntity

export type GameIdleEntity = {
  id: string
  players: PlayerEntity[]
  status: GameStatus.IDLE
}

export type GameInProgressEntity = {
  id: string
  players: PlayerEntity[]
  status: GameStatus.IN_PROGRESS
  field: Field
}

export type GameOverEntity = {
  id: string
  players: PlayerEntity[]
  status: GameStatus.GAME_OVER
  field: Field
  winner: PlayerEntity
}

export type GameOverDrawEntity = {
  id: string
  players: PlayerEntity[]
  status: GameStatus.GAME_OVER_DRAW
  field: Field
}

export type PlayerEntity = {
  id: string
  login: string
  rating: number
}

export type Field = Cell[]

export type Cell = GameSymbol | null

export type GameSymbol = string

export enum GameStatus {
  IDLE = 'IDLE',
  IN_PROGRESS = 'IN_PROGRESS',
  GAME_OVER = 'GAME_OVER',
  GAME_OVER_DRAW = 'GAME_OVER_DRAW',
}
