import prisma from "../prisma";

export async function getAllRatedMoviesPrisma(user_id: string | null) {
    try {
        const ratedMovies = await prisma.ratedItem.findMany({
            where: {
                userId: user_id as string,
            },
        });
        return ratedMovies;
    } catch (error) {
        console.error('Error getting all rated movies', error);
        throw new Error('Failed to get all rated movies');
    }
}
