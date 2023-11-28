
import { getUserByEmailPrisma } from '@/lib/prisma/user/getUserByEmailPrisma';
import { TMDB_API_KEY, TMDB_BASE_URL } from '@/lib/config';
import { getFavoritesPrisma } from '@/lib/prisma/user/getFavoritesPrisma';
import { revalidatePath } from 'next/cache';


export async function getUserByEmail(email: string) {
    try {
        const user = await getUserByEmailPrisma(email);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        console.log(error)
        throw new Error(String(error));
    }
}

export async function getFavoriteMovies() {
    try {
        const favorites = await getFavoritesPrisma();

        const promises = favorites.map(async favorite => {
            const response = await fetch(`${TMDB_BASE_URL}/movie/${favorite.contentId}?api_key=${TMDB_API_KEY}`);
            return response.json();
        });
        return Promise.all(promises);

    } catch (error) {
        console.error(error);
        throw error;
    }
}
