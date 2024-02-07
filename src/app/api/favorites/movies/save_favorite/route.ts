import { NextResponse } from 'next/server';
import { saveOrUpdateFavoriteMoviePrisma } from '@/lib/prisma/favorite/movie/saveOrUpdateFavoriteMoviePrisma';
import { getServerSession } from "next-auth";
import authOptions from '@/lib/auth/authOptions';


export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: 'No session found' }, { status: 401 });
    const { movie_id, title, poster_path, vote_average, release_date } = await req.json();
    const user_id = session?.user?.id;
    
    try {

        await saveOrUpdateFavoriteMoviePrisma(user_id, movie_id, title, poster_path, vote_average, release_date);
        return NextResponse.json({ message: 'success' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error saving favorite' }, { status: 500 });
    }
}