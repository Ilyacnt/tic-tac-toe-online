/*
  Warnings:

  - The `gameCreatedAt` column on the `Game` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `gameOverAt` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "gameCreatedAt",
ADD COLUMN     "gameCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "gameOverAt",
ADD COLUMN     "gameOverAt" TIMESTAMP(3) NOT NULL;
