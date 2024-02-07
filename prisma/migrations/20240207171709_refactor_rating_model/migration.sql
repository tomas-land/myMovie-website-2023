/*
  Warnings:

  - You are about to drop the `rating` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `rating`;

-- CreateTable
CREATE TABLE `RatedItem` (
    `id` VARCHAR(191) NOT NULL,
    `media_id` VARCHAR(191) NOT NULL,
    `rating` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `poster_path` VARCHAR(191) NOT NULL,
    `vote_average` DOUBLE NOT NULL,
    `release_date` VARCHAR(191) NOT NULL,
    `mediaType` ENUM('movies', 'tv_series') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `RatedItem_userId_media_id_key`(`userId`, `media_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
