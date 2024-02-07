/*
  Warnings:

  - You are about to drop the column `contentId` on the `watchlist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `watchlist` DROP COLUMN `contentId`,
    ADD COLUMN `movieId` VARCHAR(191) NULL,
    ADD COLUMN `seriesId` VARCHAR(191) NULL;
