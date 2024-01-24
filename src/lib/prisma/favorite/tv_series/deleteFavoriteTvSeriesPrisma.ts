import prisma from "../../prisma";

export async function deleteFavoriteTvSeriesPrisma(favoriteId: string | null) {
    try {
        await prisma.favoriteTvSeries.update({
            where: {
                id: favoriteId as string,
            },
            data: {
                isDeleted: true,
            },
        });
        return;
    } catch (error) {
        console.error('Error deleting favorite tv series:', error);
        throw new Error('Failed to delete favorite tv series');
    }
}
