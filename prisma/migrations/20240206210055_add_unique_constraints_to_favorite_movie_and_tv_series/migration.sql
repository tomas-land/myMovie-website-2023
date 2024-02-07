/*
  Warnings:

  - A unique constraint covering the columns `[userId,movieId]` on the table `FavoriteMovie` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,seriesId]` on the table `FavoriteTvSeries` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `FavoriteMovie_userId_movieId_key` ON `FavoriteMovie`(`userId`, `movieId`);

-- CreateIndex
CREATE UNIQUE INDEX `FavoriteTvSeries_userId_seriesId_key` ON `FavoriteTvSeries`(`userId`, `seriesId`);
