import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth/authOptions";
import prisma from "../prisma";

export async function getFavoriteMoviesPrisma() {
    const session = await getServerSession(authOptions);
    const user_id = session.user.id;

    try {
        const data = await prisma.favoriteMovie.findMany({
            where: {
                userId: user_id,
                isFavorite: true
            },
        });
        return data;
    } catch (error) {
        console.log(error)
        throw new Error(String(error));
    }
}
