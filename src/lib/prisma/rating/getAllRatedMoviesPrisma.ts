import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth/authOptions";
import prisma from "../prisma";

export async function getAllRatedMoviesPrisma() {
    const session = await getServerSession(authOptions);
    const user_id = session.user.id;

    try {
        const ratedMovies = await prisma.ratedItem.findMany({
            where: {
                userId: user_id as string,
            },
            orderBy: {
                release_date: 'desc'
            },
        });
        return ratedMovies;
    } catch (error) {
        console.error('Error getting all rated movies', error);
        throw new Error('Failed to get all rated movies');
    }
}
