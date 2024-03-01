import prisma from "../../prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth/authOptions";

export async function getFavoriteActorsPrisma() {
    const session = await getServerSession(authOptions);
    const user_id = session.user.id;
    try {
        const favoriteActors = await prisma.favoritePerson.findMany({
            where: {
                userId: user_id as string,
            },
            orderBy: {
                createdAt: 'desc'
            },
        });
        return favoriteActors;
    } catch (error) {
        console.error('Error getting favorite actors:', error);
        throw new Error('Failed to get favorite actors');
    }
}
