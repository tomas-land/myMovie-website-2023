import prisma from "../prisma";

export async function getAllFromWatchlistPrisma(user_id: string | null) {
    try {
        const watchlist = await prisma.watchlist.findMany({
            where: {
                userId: user_id as string,
            },
        });
        return watchlist;
    } catch (error) {
        console.error('Error getting watchlist', error);
        throw new Error('Failed to get watchlist');
    }
}
