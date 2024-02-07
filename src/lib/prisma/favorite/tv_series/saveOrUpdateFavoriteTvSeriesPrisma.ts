import prisma from "../../prisma";

export async function saveOrUpdateFavoriteTvSeriesPrisma(userId: string, tvSeriesId: string, title: string, posterPath: string, voteAverage: number, releaseDate: string) {
    try {
        const updatedFavoriteMovie = await prisma.favoriteTvSeries.upsert({
            where: {
                userId_seriesId: {
                    userId: userId,
                    seriesId: tvSeriesId,
                },
            },
            update: {
                isFavorite: true,
            },
            create: {
                seriesId: tvSeriesId,
                title: title,
                poster_path: posterPath,
                vote_average: voteAverage,
                release_date: releaseDate,
                userId: userId,
            },
        });

        return updatedFavoriteMovie;
    } catch (error) {
        console.error('Error adding or updating favorite item:', error);
        throw new Error('Failed to update or add favorite item');
    }
}
