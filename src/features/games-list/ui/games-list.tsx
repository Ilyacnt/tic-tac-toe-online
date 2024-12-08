import { getIdleGames } from '@/entities/game/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { formatDistanceToNow } from 'date-fns'

export async function GamesList() {
  const games = await getIdleGames()

  return (
    <div className='grid grid-cols-2 gap-4'>
      {games.map((game) => (
        <Card key={game.id}>
          <CardHeader>
            <CardTitle>Game: {game.name}.</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription> Created by: {game.creator.login}</CardDescription>
            <CardDescription>Rating: {game.creator.rating}</CardDescription>
            <CardDescription>
              Created {formatDistanceToNow(game.createdAt, { addSuffix: true })}
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
