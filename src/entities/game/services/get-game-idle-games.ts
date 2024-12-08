import { GameIdleEntity, GameStatus } from '../domain'
import { gameRepository } from '../repositories/game-repository'

export async function getIdleGames(): Promise<GameIdleEntity[]> {
  return (await gameRepository.gamesList({ status: GameStatus.IDLE })) as GameIdleEntity[]
}
