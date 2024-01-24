
import { getUserByEmailPrisma } from '@/lib/prisma/user/getUserByEmailPrisma';
import { getRecentFavoriteMoviesPrisma } from '@/lib/prisma/user/getRecentFavoriteMoviesPrisma';
import { getRecentFavoriteTvSeriesPrisma } from '@/lib/prisma/user/getRecentFavoriteTvSeriesPrisma';
import { getFavoriteMoviesPrisma } from '@/lib/prisma/user/getFavoriteMoviesPrisma';


//// user credentials -------------------------------------------------------------------
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
//// user movies -------------------------------------------------------------------
export async function getRecentFavoriteMovies() {
    try {
        const recentFavoriteMovies = await getRecentFavoriteMoviesPrisma();
        if (!recentFavoriteMovies) throw new Error('Recent favorite movies not found')
        return recentFavoriteMovies;
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

// user tv-series -------------------------------------------------------------------
export async function getRecentFavoriteTvSeries() {
    try {
        const recentFavoriteRvSeries = await getRecentFavoriteTvSeriesPrisma();
        if (!recentFavoriteRvSeries) throw new Error('Recent favorite tv-series not found')
        return recentFavoriteRvSeries;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
