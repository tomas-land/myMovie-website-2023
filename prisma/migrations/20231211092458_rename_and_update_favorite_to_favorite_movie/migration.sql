/*
  Warnings:

  - You are about to drop the `favorite` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `favorite`;

-- CreateTable
CREATE TABLE `FavoriteMovie` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `poster_path` VARCHAR(191) NOT NULL,
    `vote_average` DOUBLE NOT NULL,
    `movieId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
