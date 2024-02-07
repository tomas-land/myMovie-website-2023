/*
  Warnings:

  - You are about to alter the column `release_date` on the `favoritemovie` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `release_date` on the `favoritetvseries` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `favoritemovie` MODIFY `release_date` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `favoritetvseries` MODIFY `release_date` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `watchlist` MODIFY `release_date` VARCHAR(191) NOT NULL;
