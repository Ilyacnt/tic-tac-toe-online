import { GameIdleEntity } from './../domain'
import cuid from 'cuid'
import { GameStatus, PlayerEntity } from '../domain'
import { gameRepository } from '../repositories/game-repository'
import { left, right } from '@/shared/lib/either'

export async function createGame(
  game: Omit<GameIdleEntity, 'id' | 'createdAt' | 'status'>,
  player: PlayerEntity
) {
  const playerGames = await gameRepository.gamesList({
    players: { some: { id: player.id } },
    status: { equals: GameStatus.IDLE },
  })

  const isGameInIdleStatusExists = playerGames.some(
    (game) => game.status === GameStatus.IDLE && game.creator.id === player.id
  )

  if (isGameInIdleStatusExists) {
    return left('can-create-only-one-game' as const)
  }

  const createdGame = await gameRepository.createGame({
    id: cuid(),
    creator: player,
    status: GameStatus.IDLE,
    name: game.name,
  })

  return right(createdGame)
}
