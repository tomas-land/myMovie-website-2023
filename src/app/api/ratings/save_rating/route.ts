import { NextResponse } from 'next/server';
import { saveOrUpdateRatingPrisma } from '@/lib/prisma/rating/saveOrUpdateRatingPrisma';
import { getServerSession } from "next-auth";
import authOptions from '@/lib/auth/authOptions';

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: 'No session found' }, { status: 401 });
    const { current_slide_id, rating } = await req.json()
    const user_id = session?.user?.id;

    try {
        await saveOrUpdateRatingPrisma(user_id, current_slide_id, rating);
        return NextResponse.json({ message: 'success' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error saving favorite' }, { status: 500 });
    }
}