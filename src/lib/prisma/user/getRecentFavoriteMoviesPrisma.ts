import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth/authOptions";
import prisma from "../prisma";
import { revalidatePath } from 'next/cache'



export async function getRecentFavoriteMoviesPrisma() {
    const session = await getServerSession(authOptions);
    const user_id = session.user.id;

    try {
        const data = await prisma.favoriteMovie.findMany({
            where: {
                userId: user_id,
                
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 8,
        });
        revalidatePath('/')

        return data;
    } catch (error) {
        console.log(error)
        throw new Error(String(error));
    }
}
