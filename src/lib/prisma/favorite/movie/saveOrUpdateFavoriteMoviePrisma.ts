import prisma from "../../prisma";

export async function saveOrUpdateFavoriteMoviePrisma(userId: string, movieId: string, title: string, posterPath: string, voteAverage: number, releaseDate: string) {
    try {
        const updatedFavoriteMovie = await prisma.favoriteMovie.upsert({
            where: {
                userId_movieId: {
                    userId: userId,
                    movieId: movieId,
                },
            },
            update: {
                isFavorite: true,
            },
            create: {
                movieId: movieId,
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
