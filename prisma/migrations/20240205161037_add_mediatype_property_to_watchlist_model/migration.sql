/*
  Warnings:

  - Added the required column `mediaType` to the `Watchlist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `watchlist` ADD COLUMN `mediaType` ENUM('movie', 'tv') NOT NULL;
