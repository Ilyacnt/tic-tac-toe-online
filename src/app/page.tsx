import { GamesList } from '@/features/games-list/server'
import { Button } from '@/shared/ui/button'

export default async function Home() {
  return (
    <div className='flex flex-col gap-4 container mx-auto pt-10'>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>Games</h1>
      <GamesList />
      <Button>Click me!</Button>
    </div>
  )
}
