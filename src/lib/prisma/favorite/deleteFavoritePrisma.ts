import prisma from "../prisma";

export async function deleteFavoritePrisma(favoriteId: string | null) {
    try {
        await prisma.favorite.delete({
            where: {
                id: favoriteId as string,
            }
        })
        return;
    } catch (error) {
        console.error('Error deleting favorite item:', error);
        throw new Error('Failed to delete favorite item'); // Throw a new error to indicate the failure
    }
}