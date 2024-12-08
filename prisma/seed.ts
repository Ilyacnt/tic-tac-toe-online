import { GameStatus } from '@/entities/game/domain'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      login: 'Ilya',
      passwordHash: '123',
      rating: 1000,
    },
  })

  const user2 = await prisma.user.create({
    data: {
      login: 'John',
      passwordHash: '123',
      rating: 500,
    },
  })

  await prisma.game.create({
    data: {
      name: 'game-1',
      status: GameStatus.IDLE,
      players: { connect: { id: user.id } },
      field: Array(9).fill(null),
    },
  })

  const tenMinutesAgo = new Date()
  tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10)

  await prisma.game.create({
    data: {
      name: 'game-2',
      gameCreatedAt: tenMinutesAgo,
      status: GameStatus.IDLE,
      players: { connect: { id: user2.id } },
      field: Array(9).fill(null),
    },
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
