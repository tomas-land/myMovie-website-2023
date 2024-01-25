import { NextResponse } from 'next/server';
import { deleteRatingPrisma } from '@/lib/prisma/rating/deleteRatingPrisma';
import { getServerSession } from "next-auth";
import authOptions from '@/lib/auth/authOptions';

export async function DELETE(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: 'No session found' }, { status: 401 });
    const { searchParams } = new URL(req.url);
    const current_slide_id = searchParams.get('current_slide_id') || '';
    const user_id = session?.user?.id;

    try {
        await deleteRatingPrisma(user_id, current_slide_id);
        return NextResponse.json({ message: 'success' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error saving favorite' }, { status: 500 });
    }
}