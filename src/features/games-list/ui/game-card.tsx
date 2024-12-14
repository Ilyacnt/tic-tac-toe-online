import { GameIdleEntity } from '@/entities/game/domain'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { formatDistanceToNow } from 'date-fns'

export function GameCard({ game }: { game: GameIdleEntity }) {
  return (
    <Card>
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
  )
}
