import prisma from "../prisma";

export async function saveFavoritePrisma(userId: string, contentId: string) {
    try {
        const newFavorite = await prisma.favorite.create({
            data: {
                contentId: contentId,
                user: {
                    connect: { id: userId }
                }
            }
        });
        return newFavorite; 
    } catch (error) {
        console.error('Error saving favorite item:', error);
        throw new Error('Failed to save favorite item'); // Throw a new error to indicate the failure
    }
}