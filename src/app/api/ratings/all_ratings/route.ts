import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import authOptions from '@/lib/auth/authOptions';
import { getAllRatingsPrisma } from "@/lib/prisma/rating/getAllRatingsPrisma";


export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: 'No session found' }, { status: 401 });
    const user_id = session?.user?.id;
    try {
        const ratings = await getAllRatingsPrisma(user_id);
        return NextResponse.json({ ratings }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Error getting favorites' }, { status: 500 });
    }
}