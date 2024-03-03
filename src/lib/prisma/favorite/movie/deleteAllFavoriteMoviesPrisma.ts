import prisma from "../../prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth/authOptions";

export async function deleteAllFavoriteMoviesPrisma() {
    const session = await getServerSession(authOptions);
    const user_id = session.user.id;
    try {
        await prisma.favoriteMovie.updateMany({
            where: {
                userId: user_id as string,
            },
            data: {
                isFavorite: false,
            },
        });
    }
    catch (error) {
        console.error('Error deleting all favorite movies:', error);
        throw new Error('Failed to delete all favorite movies');
    }
}
