/*
  Warnings:

  - You are about to drop the column `isDeleted` on the `favoritemovie` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `favoritetvseries` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `favoritemovie` DROP COLUMN `isDeleted`,
    ADD COLUMN `isFavorite` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `favoritetvseries` DROP COLUMN `isDeleted`,
    ADD COLUMN `isFavorite` BOOLEAN NOT NULL DEFAULT false;
