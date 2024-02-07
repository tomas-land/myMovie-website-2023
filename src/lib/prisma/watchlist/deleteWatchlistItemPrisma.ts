import prisma from "../prisma";

export async function deleteWatchlistItemPrisma(userId: string, item_id: string) {

    try {
        const deletedItem = await prisma.watchlist.deleteMany({
            where: {
                id: item_id,
            },
        });
        return deletedItem;
    } catch (error) {
        console.error('Error deleting watchlist item:', error);
        throw new Error('Failed to delete watchlist item');
    }
}
