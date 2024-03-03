import prisma from "../../prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth/authOptions";


export async function getAllFavoriteMoviesPrisma() {
    const session = await getServerSession(authOptions);
    const user_id = session.user.id;
    try {
        const favorites = await prisma.favoriteMovie.findMany({
            where: {
                userId: user_id as string,
                isFavorite: true, // Include only favorite items

            },
            orderBy: {
                createdAt: 'desc'
            },
        });
        return favorites;
    } catch (error) {
        console.error('Error getting all favorites:', error);
        throw new Error('Failed to get all favorites');
    }
}
