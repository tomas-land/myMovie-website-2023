/*
  Warnings:

  - You are about to alter the column `mediaType` on the `favoritemovie` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(2))`.
  - The values [movie] on the enum `Watchlist_mediaType` will be removed. If these variants are still used in the database, this will fail.
  - The values [movie] on the enum `Watchlist_mediaType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `favoritemovie` MODIFY `mediaType` ENUM('movies', 'tv_series') NOT NULL DEFAULT 'movies';

-- AlterTable
ALTER TABLE `favoritetvseries` MODIFY `mediaType` ENUM('movies', 'tv_series') NOT NULL DEFAULT 'tv_series';

-- AlterTable
ALTER TABLE `watchlist` MODIFY `mediaType` ENUM('movies', 'tv_series') NOT NULL;
