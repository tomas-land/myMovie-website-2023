import prisma from "../../prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth/authOptions";


export async function saveFavoriteActorPrisma(id: number, name: string, photo: string, popularity: number) {
    const session = await getServerSession(authOptions);
    const user_id = session.user.id as string;

    try {
        const favoriteActor = await prisma.favoritePerson.create({
            data: {
                personId: id,
                name: name,
                profile_path: photo,
                popularity: popularity,
                userId: user_id
            }
        });
        return favoriteActor;
    } catch (error) {
        console.error('Error adding favorite actor:', error);
        throw new Error('Failed to add favorite actor');
    }
}
