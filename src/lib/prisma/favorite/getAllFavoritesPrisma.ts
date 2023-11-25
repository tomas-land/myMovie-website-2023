import prisma from "../prisma";

export async function getAllFavoritesPrisma(user_id: string | null) {
    try {
        const favorites = await prisma.favorite.findMany({
            where: {
                userId: user_id as string,
            },
        });
        return favorites;
    } catch (error) {
        console.error('Error getting all favorites:', error);
        throw new Error('Failed to get all favorites');
    }
}
