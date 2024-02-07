import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import authOptions from '@/lib/auth/authOptions';
import { deleteWatchlistItemPrisma } from '@/lib/prisma/watchlist/deleteWatchlistItemPrisma';

export async function DELETE(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: 'No session found' }, { status: 401 });
    const { searchParams } = new URL(req.url);
    const item_id = searchParams.get('item_id') || '';
    const user_id = session?.user?.id;

    try {
        await deleteWatchlistItemPrisma(user_id, item_id);
        return NextResponse.json({ message: 'success' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error saving favorite' }, { status: 500 });
    }
}