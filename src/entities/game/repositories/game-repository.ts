import { prisma } from '@/shared/lib/db'
import {
  GameEntity,
  GameIdleEntity,
  GameInProgressEntity,
  GameOverDrawEntity,
  GameOverEntity,
  GameStatus,
} from '../domain'
import { Game, Prisma, User } from '@prisma/client'
import { z } from 'zod'
import { removePassword } from '@/shared/lib/password'

async function gamesList(where?: Prisma.GameWhereInput): Promise<GameEntity[]> {
  const games = await prisma.game.findMany({
    where,
    include: {
      winner: true,
      players: true,
    },
  })

  return games.map(mapDbGameToGameEntity)
}

async function createGame(game: Omit<GameIdleEntity, 'createdAt'>): Promise<GameIdleEntity> {
  const createdGame = await prisma.game.create({
    data: {
      id: game.id,
      name: game.name,
      status: game.status,
      field: Array(9).fill(null),
      players: {
        connect: { id: game.creator.id },
      },
    },
    include: {
      players: true,
      winner: true,
    },
  })

  return mapDbGameToGameEntity(createdGame) as GameIdleEntity
}

/* Public export */
export const gameRepository = {
  gamesList,
  createGame,
}

const fieldSchema = z.array(z.union([z.string(), z.null()]))

function mapDbGameToGameEntity(
  dbGame: Game & { players: User[]; winner: User | null }
): GameEntity {
  const players = dbGame.players.map(removePassword)

  switch (dbGame.status) {
    case GameStatus.IDLE:
      const [creator] = players

      if (!creator) {
        throw new Error('There is no creator in IDLE game')
      }

      return {
        id: dbGame.id,
        name: dbGame.name,
        createdAt: dbGame.gameCreatedAt,
        creator,
        status: dbGame.status as GameStatus.IDLE,
      } satisfies GameIdleEntity

    case GameStatus.IN_PROGRESS:
      return {
        id: dbGame.id,
        name: dbGame.name,
        createdAt: dbGame.gameCreatedAt,
        players: players,
        status: dbGame.status as GameStatus.IN_PROGRESS,
        field: fieldSchema.parse(dbGame.field),
      } satisfies GameInProgressEntity

    case GameStatus.GAME_OVER:
      if (!dbGame.winner) {
        throw new Error('Field "winner" should be in GAME_OVER')
      }

      return {
        id: dbGame.id,
        name: dbGame.name,
        createdAt: dbGame.gameCreatedAt,
        players: players,
        status: dbGame.status as GameStatus.GAME_OVER,
        field: fieldSchema.parse(dbGame.field),
        winner: removePassword(dbGame.winner),
      } satisfies GameOverEntity

    case GameStatus.GAME_OVER_DRAW:
      return {
        id: dbGame.id,
        name: dbGame.name,
        createdAt: dbGame.gameCreatedAt,
        players: players,
        status: dbGame.status as GameStatus.GAME_OVER_DRAW,
        field: fieldSchema.parse(dbGame.field),
      } satisfies GameOverDrawEntity

    default:
      throw new Error('Something wrong with GameEntity from database')
  }
}
