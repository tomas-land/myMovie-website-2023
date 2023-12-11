import prisma from "../prisma";

export async function getAllFavoritesPrisma(user_id: string | null) {
    try {
        const favorites = await prisma.favoriteMovie.findMany({
            where: {
                userId: user_id as string,
                isDeleted: false, // Include only non-deleted favorites

            },
        });
        return favorites;
    } catch (error) {
        console.error('Error getting all favorites:', error);
        throw new Error('Failed to get all favorites');
    }
}
