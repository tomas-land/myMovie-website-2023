import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server'

import { deleteFavoriteTvSeriesPrisma } from '@/lib/prisma/favorite/tv_series/deleteFavoriteTvSeriesPrisma';
import { getServerSession } from "next-auth";
import authOptions from '@/lib/auth/authOptions';

export async function DELETE(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: 'No session found' }, { status: 401 });
    const searchParams = request.nextUrl.searchParams
    const favoriteId = searchParams.get('id')

    try {
        await deleteFavoriteTvSeriesPrisma(favoriteId);
        return NextResponse.json({ message: 'success' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error saving favorite' }, { status: 500 });
    }
}