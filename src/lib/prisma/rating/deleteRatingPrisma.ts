import prisma from "../prisma";

export async function deleteRatingPrisma(userId: string, contentId: string) {
    try {
        const deletedRating = await prisma.rating.delete({
            where: {
                userId_contentId: {
                    userId: userId,
                    contentId: contentId
                }
            }
        });
        return deletedRating;
    }
    catch (error) {
        console.error('Error deleting rating score:', error);
        throw new Error('Failed to delete rating score');
    }
}