import prisma from "../prisma";

export async function getAllRatingsPrisma(user_id: string | null) {
    try {
        const ratings = await prisma.rating.findMany({
            where: {
                userId: user_id as string,
            },
        });
        return ratings;
    } catch (error) {
        console.error('Error getting all ratings:', error);
        throw new Error('Failed to get all ratings');
    }
}
