/*
  Warnings:

  - The values [tv] on the enum `Watchlist_mediaType` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `release_date` to the `FavoriteMovie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `release_date` to the `FavoriteTvSeries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `favoritemovie` ADD COLUMN `mediaType` ENUM('movie', 'tv_series') NOT NULL DEFAULT 'movie',
    ADD COLUMN `release_date` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `favoritetvseries` ADD COLUMN `mediaType` ENUM('movie', 'tv_series') NOT NULL DEFAULT 'tv_series',
    ADD COLUMN `release_date` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `watchlist` MODIFY `mediaType` ENUM('movie', 'tv_series') NOT NULL;
