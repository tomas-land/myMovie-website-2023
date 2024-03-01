import { getUserByEmailPrisma } from '@/lib/prisma/user/getUserByEmailPrisma';
import { getRecentFavoriteMoviesPrisma } from '@/lib/prisma/favorite/movie/getRecentFavoriteMoviesPrisma';
import { getRecentFavoriteTvSeriesPrisma } from '@/lib/prisma/favorite/tv_series/getRecentFavoriteTvSeriesPrisma';
import { getAllFavoriteMoviesPrisma } from '@/lib/prisma/favorite/movie/getAllFavoriteMoviesPrisma';
import { getFavoriteTvSeriesPrisma } from '@/lib/prisma/favorite/tv_series/getFavoriteTvSeriesPrisma';
import { getUserRatedTotalPrisma } from '@/lib/prisma/rating/getUserRatedTotalPrisma';
import { getAllFromWatchlistPrisma } from '@/lib/prisma/watchlist/getAllFromWatchlistPrisma';
import { getUpcomingMoviesFromWatchlistPrisma } from '@/lib/prisma/watchlist/getUpcomingMoviesFromWatchlistPrisma';
import { getUpcomingTvSeriesFromWatchlistPrisma } from '@/lib/prisma/watchlist/getUpcomingTvSeriesFromWatchlistPrisma';
import { getFavoriteActorsPrisma } from '@/lib/prisma/favorite/actor/getFavoriteActorsPrisma';
import { revalidatePath } from 'next/cache';

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
    const favoriteMovies = await getAllFavoriteMoviesPrisma();
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

export async function getFavoriteTvSeries() {
    const favoriteTvSeries = await getFavoriteTvSeriesPrisma();
    if (!favoriteTvSeries) throw new Error('Favorite tv-series not found')
    return favoriteTvSeries
}

// user favorite actors -------------------------------------------------------------------
export async function getFavoriteActors() {
    try {
        const favoriteActors = await getFavoriteActorsPrisma();
        if (!favoriteActors) throw new Error('Favorite actors not found')
        return favoriteActors;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// user ratings -------------------------------------------------------------------
export async function getRatedTotal() {
    try {
        const ratings = await getUserRatedTotalPrisma();
        if (!ratings) throw new Error('Ratings not found')
        return ratings;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// user watchlist -------------------------------------------------------------------
export async function getWatchlist() {
    try {
        const watchlist = await getAllFromWatchlistPrisma();
        if (!watchlist) throw new Error('Watchlist not found')
        return watchlist;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getUpcomingMoviesFromWatchlist() {
    try {
        const upcomingMovies = await getUpcomingMoviesFromWatchlistPrisma();
        if (!upcomingMovies) throw new Error('Upcoming movies not found')
        return upcomingMovies;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getUpcomingTvSeriesFromWatchlist() {
    try {
        const upcomingTvSeries = await getUpcomingTvSeriesFromWatchlistPrisma();
        if (!upcomingTvSeries) throw new Error('Upcoming tv-series not found')
        return upcomingTvSeries;
    } catch (error) {
        console.error(error);
        throw error;
    }
}