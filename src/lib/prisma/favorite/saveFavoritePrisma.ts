import prisma from "../prisma";

export async function saveFavoritePrisma(user_id: string, movie_id: string, title: string, poster_path: string, vote_average: number) {
    try {
        const newFavorite = await prisma.favoriteMovie.create({
            data: {
                movieId: movie_id,
                title: title,
                poster_path: poster_path,
                vote_average: vote_average,
                userId: user_id // Connect the favorite movie to the user by userId
            }
        });
        return newFavorite;
    } catch (error) {
        console.error('Error saving favorite item:', error);
        throw new Error('Failed to save favorite item');
    }
}