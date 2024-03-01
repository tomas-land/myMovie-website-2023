import prisma from "../../prisma";

export async function deleteFavoriteActorPrisma(id: string) {

    try {
        const favoriteActors = await prisma.favoritePerson.delete({
            where: {
                id: id,
            }
        });
        return favoriteActors;
    } catch (error) {
        console.error('Error deleting favorite actor:', error);
        throw new Error('Failed to delete favorite actor');
    }
}
