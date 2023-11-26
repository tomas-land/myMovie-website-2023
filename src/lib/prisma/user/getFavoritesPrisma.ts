import authOptions from "@/lib/auth/authOptions";
import prisma from "../prisma";
import { getServerSession } from "next-auth";

export async function getFavoritesPrisma() {
    const session = await getServerSession(authOptions);
    const user_id = session.user.id;

    try {
        const data = await prisma.favorite.findMany({
            where: {
                userId: user_id
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return data;
    } catch (error) {
        console.log(error)
        throw new Error(String(error));
    }
}
