import prisma from "../prisma";

export async function saveFavoritePrisma(userId: string, contentId: string) {
    try {
        const newFavorite = await prisma.favorite.create({
            data: {
                contentId: contentId,
                userId: userId // Connect the favorite to the user by userId
            }
        });
        return newFavorite;
    } catch (error) {
        console.error('Error saving favorite item:', error);
        throw new Error('Failed to save favorite item');
    }
}