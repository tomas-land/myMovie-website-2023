import { NextResponse } from 'next/server';
// import { saveFavoriteMoviePrisma } from '@/lib/prisma/favorite/movie/saveFavoriteMoviePrisma';
import { getServerSession } from "next-auth";
import authOptions from '@/lib/auth/authOptions';
import { saveToWatchlistPrisma } from '@/lib/prisma/watchlist/saveToWatchlistPrisma';


export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: 'No session found' }, { status: 401 });
    const { media_id, title, poster_path, vote_average, media_type, release_date } = await req.json();
    const user_id = session?.user?.id;

    try {
        await saveToWatchlistPrisma(user_id, media_id, title, poster_path, vote_average, media_type, release_date);
        return NextResponse.json({ message: 'success' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error saving to watchlist' }, { status: 500 });
    }
}

// contentId: media_id,
// title: title,
// poster_path: poster_path,
// vote_average: vote_average,
// mediaType: MediaType[media_type as keyof typeof MediaType],
// release_date: release_date,
// userId: user_id,