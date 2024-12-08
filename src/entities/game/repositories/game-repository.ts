import { prisma } from '@/shared/lib/db'
import {
  GameEntity,
  GameIdleEntity,
  GameInProgressEntity,
  GameOverDrawEntity,
  GameOverEntity,
  GameStatus,
} from '../domain'
import { Game, User } from '@prisma/client'
import { z } from 'zod'

async function gamesList(): Promise<GameEntity[]> {
  const games = await prisma.game.findMany({
    include: {
      winner: true,
      players: true,
    },
  })

  return games.map(mapDbGameToGameEntity)
}

/* Public export */
export const gameRepository = {
  gamesList,
}

const fieldSchema = z.array(z.union([z.string(), z.null()]))

function mapDbGameToGameEntity(
  dbGame: Game & { players: User[]; winner: User | null }
): GameEntity {
  switch (dbGame.status) {
    case GameStatus.IDLE:
      return {
        id: dbGame.id,
        players: dbGame.players,
        status: dbGame.status as GameStatus.IDLE,
      } satisfies GameIdleEntity

    case GameStatus.IN_PROGRESS:
      return {
        id: dbGame.id,
        players: dbGame.players,
        status: dbGame.status as GameStatus.IN_PROGRESS,
        field: fieldSchema.parse(dbGame.field),
      } satisfies GameInProgressEntity

    case GameStatus.GAME_OVER:
      if (!dbGame.winner) {
        throw new Error('Field "winner" should be in GAME_OVER')
      }

      return {
        id: dbGame.id,
        players: dbGame.players,
        status: dbGame.status as GameStatus.GAME_OVER,
        field: fieldSchema.parse(dbGame.field),
        winner: dbGame.winner,
      } satisfies GameOverEntity

    case GameStatus.GAME_OVER_DRAW:
      return {
        id: dbGame.id,
        players: dbGame.players,
        status: dbGame.status as GameStatus.GAME_OVER_DRAW,
        field: fieldSchema.parse(dbGame.field),
      } satisfies GameOverDrawEntity

    default:
      throw new Error('Something wrong with GameEntity from database')
  }
}
