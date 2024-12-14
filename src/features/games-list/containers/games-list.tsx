import { getIdleGames } from '@/entities/game/server'

import { RootLayot } from '../ui/root-layout'
import { GameCard } from '../ui/game-card'
import { CreateGameButton } from './create-game-button'

export async function GamesList() {
  const games = await getIdleGames()

  console.log(games)

  return (
    <RootLayot actions={<CreateGameButton />}>
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </RootLayot>
  )
}
