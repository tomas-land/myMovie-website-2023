import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import authOptions from '@/lib/auth/authOptions';
import { getFavoriteActorsPrisma } from "@/lib/prisma/favorite/actor/getFavoriteActorsPrisma";

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: 'No session found' }, { status: 401 });

    try {
        const favoriteActors = await getFavoriteActorsPrisma();
        return NextResponse.json( favoriteActors , { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Error getting favorite actors' }, { status: 500 });
    }
}