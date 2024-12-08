/*
  Warnings:

  - Added the required column `status` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('IDLE', 'IN_PROGRESS', 'GAME_OVER', 'GAME_OVER_DRAW');

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "gameCreatedAt" TEXT,
ADD COLUMN     "gameOverAt" TEXT,
ADD COLUMN     "status" "GameStatus" NOT NULL,
ADD COLUMN     "userId" TEXT,
ADD COLUMN     "winnerId" TEXT;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Games" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_Games_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_Games_B_index" ON "_Games"("B");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Games" ADD CONSTRAINT "_Games_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Games" ADD CONSTRAINT "_Games_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
