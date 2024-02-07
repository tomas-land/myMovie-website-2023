import prisma from "../prisma";

export async function deleteRatingPrisma(userId: string, current_slide_id: string) {
    try {
        const deletedRating = await prisma.ratedItem.delete({
            where: {
                userId_media_id: {
                    userId: userId,
                    media_id: current_slide_id
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