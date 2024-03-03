import prisma from "../prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth/authOptions";

export async function deleteAllWatchlistItemsPrisma() {
    const session = await getServerSession(authOptions);
    const user_id = session.user.id;

    try {
        const deletedItems = await prisma.watchlist.deleteMany({
            where: {
                userId: user_id,
            },
        });
        return deletedItems;
    } catch (error) {
        console.error('Error deleting watchlist items:', error);
        throw new Error('Failed to delete watchlist items');
    }
}
