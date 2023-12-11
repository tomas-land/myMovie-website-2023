
import { getUserByEmailPrisma } from '@/lib/prisma/user/getUserByEmailPrisma';
import { TMDB_API_KEY, TMDB_BASE_URL } from '@/lib/config';
import { getRecentFavoriteMoviesPrisma } from '@/lib/prisma/user/getRecentFavoriteMoviesPrisma';
import { getFavoriteMoviesPrisma } from '@/lib/prisma/user/getFavoriteMoviesPrisma';



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

export async function getRecentFavoriteMovies() {
    try {
        const favorites = await getRecentFavoriteMoviesPrisma();

        const promises = favorites.map(async favorite => {
            const response = await fetch(`${TMDB_BASE_URL}/movie/${favorite.movieId}?api_key=${TMDB_API_KEY}`, { cache: 'no-store' });
            return response.json();
        });
        return Promise.all(promises);

    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getFavoriteMovies() {
    const favoriteMovies = await getFavoriteMoviesPrisma();
    if (!favoriteMovies) throw new Error('Favorite movies not found')
    return favoriteMovies
}
