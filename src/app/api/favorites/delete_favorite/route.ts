import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server'

import { deleteFavoritePrisma } from '@/lib/prisma/favorite/deleteFavoritePrisma';
import { getServerSession } from "next-auth";
import authOptions from '@/lib/auth/authOptions';

export async function DELETE(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: 'No session found' }, { status: 401 });
    const searchParams = request.nextUrl.searchParams
    const favoriteID = searchParams.get('id')

    try {
        await deleteFavoritePrisma(favoriteID);
        return NextResponse.json({ message: 'success' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error saving favorite' }, { status: 500 });
    }
}