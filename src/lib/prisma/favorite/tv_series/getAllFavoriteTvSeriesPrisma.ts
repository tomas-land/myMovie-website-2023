import prisma from "../../prisma";

export async function getAllFavoriteTvSeriesPrisma(user_id: string | null) {
    try {
        const favorites = await prisma.favoriteTvSeries.findMany({
            where: {
                userId: user_id as string,
                isFavorite: true, // Include only non-deleted favorites

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
