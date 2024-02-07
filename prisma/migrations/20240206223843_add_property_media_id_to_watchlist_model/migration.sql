/*
  Warnings:

  - You are about to drop the column `movieId` on the `watchlist` table. All the data in the column will be lost.
  - You are about to drop the column `seriesId` on the `watchlist` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[media_id]` on the table `Watchlist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `media_id` to the `Watchlist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `watchlist` DROP COLUMN `movieId`,
    DROP COLUMN `seriesId`,
    ADD COLUMN `media_id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Watchlist_media_id_key` ON `Watchlist`(`media_id`);
