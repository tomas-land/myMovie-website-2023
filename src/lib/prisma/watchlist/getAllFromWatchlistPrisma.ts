import prisma from "../prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth/authOptions";

export async function getAllFromWatchlistPrisma() {
    const session = await getServerSession(authOptions);
    const user_id = session.user.id;

    try {
        const watchlist = await prisma.watchlist.findMany({
            where: {
                userId: user_id as string
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return watchlist;
    } catch (error) {
        console.error('Error getting watchlist', error);
        throw new Error('Failed to get watchlist');
    }
}
