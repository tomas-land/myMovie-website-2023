import { string } from "zod";
import prisma from "../prisma";
import { $Enums } from "@prisma/client"; // Import the $Enums namespace


type MediaType = {
    movies: 'movies';
    tv_series: 'tv_series';
}

export async function saveOrUpdateRatingPrisma(userId: string, current_slide_id: string, rating: string, title: string, posterPath: string, voteAverage: number, releaseDate: string, mediaType: string) {
    try {
        const newRating = await prisma.ratedItem.upsert({
            where: {
                userId_media_id: {
                    userId: userId,
                    media_id: current_slide_id,
                },
            },
            update: {
                rating: rating,
            },
            create: {
                userId: userId,
                media_id: current_slide_id,
                rating: rating,
                title: title,
                poster_path: posterPath,
                vote_average: voteAverage,
                release_date: releaseDate,
                mediaType: mediaType as $Enums.MediaType
            },
        });
        return newRating;
    } catch (error) {
        console.error('Error saving rating score:', error);
        throw new Error('Failed to save rating score');
    }
}