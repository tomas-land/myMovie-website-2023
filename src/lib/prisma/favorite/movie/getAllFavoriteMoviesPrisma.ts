import prisma from "../../prisma";

export async function getAllFavoriteMoviesPrisma(user_id: string | null) {
    try {
        const favorites = await prisma.favoriteMovie.findMany({
            where: {
                userId: user_id as string,
                isFavorite: true, // Include only favorite items

            },
            orderBy: {
                createdAt: 'desc'
            },
        });
        return favorites;
    } catch (error) {
        console.error('Error getting all favorites:', error);
        throw new Error('Failed to get all favorites');
    }
}
