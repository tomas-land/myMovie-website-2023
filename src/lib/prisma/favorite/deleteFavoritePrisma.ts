import prisma from "../prisma";

export async function deleteFavoritePrisma(favoriteId: string | null) {
    try {
        await prisma.favoriteMovie.update({
            where: {
                id: favoriteId as string,
            },
            data: {
                isDeleted: true,
            },
        });
        return;
    } catch (error) {
        console.error('Error deleting favorite item:', error);
        throw new Error('Failed to delete favorite item');
    }
}
