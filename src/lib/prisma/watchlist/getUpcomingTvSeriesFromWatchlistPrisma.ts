import prisma from "../prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth/authOptions";
import { currentDate } from "@/lib/dayJS";

export async function getUpcomingTvSeriesFromWatchlistPrisma() {
    const session = await getServerSession(authOptions);
    const user_id = session.user.id;

    try {
        const watchlist = await prisma.watchlist.findMany({
            where: {
                userId: user_id as string,
                mediaType: 'tv_series',
                release_date: {
                    gte: currentDate
                }
            },
            orderBy: {
                createdAt: 'asc',
            },
        });
        return watchlist;
    } catch (error) {
        console.error('Error getting upcoming tv-series from watchlist', error);
        throw new Error('Failed to get upcoming tv-series from watchlist');
    }
}
