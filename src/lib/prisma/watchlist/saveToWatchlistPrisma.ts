import prisma from "../prisma"
import { $Enums } from "@prisma/client"; // Import the $Enums namespace

type MediaType = {
    movies: 'movies';
    tv_series: 'tv_series';
}

export async function saveToWatchlistPrisma(user_id: string, media_id: string, title: string, poster_path: string, vote_average: number, media_type: string, release_date: string) {
    try {
        const newWatchlistMovie = await prisma.watchlist.create({
            data: {
                media_id: media_id,
                title: title,
                poster_path: poster_path,
                vote_average: vote_average,
                mediaType: media_type as $Enums.MediaType, 
                release_date: release_date,
                userId: user_id,
            }
        });
        return newWatchlistMovie;
    } catch (error) {
        console.error('Error saving media to watchlist:', error);
        throw new Error('Failed to save media to watchlist');
    }
}