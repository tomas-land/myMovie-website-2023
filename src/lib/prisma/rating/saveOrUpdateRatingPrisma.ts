import prisma from "../prisma";

export async function saveOrUpdateRatingPrisma(userId: string, contentId: string, rating: string) {
    try {
        const newRating = await prisma.rating.upsert({
            where: {
                userId_contentId: {
                    userId: userId,
                    contentId: contentId,
                },
            },
            update: {
                rating: rating,
            },
            create: {
                userId: userId,
                contentId: contentId,
                rating: rating,
            },
        });
        return newRating;
    } catch (error) {
        console.error('Error saving rating score:', error);
        throw new Error('Failed to save rating score');
    }
}