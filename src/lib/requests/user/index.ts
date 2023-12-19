
import { getUserByEmailPrisma } from '@/lib/prisma/user/getUserByEmailPrisma';
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
        const recentFavorites = await getRecentFavoriteMoviesPrisma();

        // const promises = favorites.map(async favorite => {
        //     const response = await fetch(`${TMDB_BASE_URL}/movie/${favorite.movieId}?api_key=${TMDB_API_KEY}`,{next:{revalidate:0}});
        //     return response.json();
        // });
        return recentFavorites;

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
