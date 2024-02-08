import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import authOptions from '@/lib/auth/authOptions';
import { getAllFromWatchlistPrisma } from "@/lib/prisma/watchlist/getAllFromWatchlistPrisma";


export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: 'No session found' }, { status: 401 });
    const user_id = session?.user?.id;
    
    try {
        const watchlist = await getAllFromWatchlistPrisma();
        return NextResponse.json({ watchlist }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Error getting favorites' }, { status: 500 });
    }
}