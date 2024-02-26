import prisma from "../prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth/authOptions";
import { currentDate } from "@/lib/dayJS";

export async function getUpcomingMoviesFromWatchlistPrisma() {
    const session = await getServerSession(authOptions);
    const user_id = session.user.id;

    try {
        const watchlist = await prisma.watchlist.findMany({
            where: {
                userId: user_id as string,
                mediaType: 'movies',
                release_date: {
                    gte: currentDate
                }
               
            },
            orderBy: {
                release_date: 'asc',
            },
        });
        return watchlist;
    } catch (error) {
        console.error('Error getting upcoming movies from watchlist', error);
        throw new Error('Failed to get upcoming movies from watchlist');
    }
}
