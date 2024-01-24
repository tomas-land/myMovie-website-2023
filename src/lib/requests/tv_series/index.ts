import { TMDB_API_KEY, TMDB_BASE_URL } from '@/lib/config.js';
import { currentDate, TwoMonthsBeforeDate } from '@/lib/dayJS';
import filterOutMoviesWithPosters from '@/lib/helpers/filterOutMoviesWithPosters';

export async function getLatestTvSeries() {
    const response = await fetch(`${TMDB_BASE_URL}/discover/tv/?api_key=${TMDB_API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&air_date.gte=${TwoMonthsBeforeDate}&air_date.lte=${currentDate}`);
    const data = await response.json();
    const results = filterOutMoviesWithPosters(data.results);

    if (!response.ok) {
        throw new Error('Fetching failed');
    }
    return results;
}

export async function getUpcomingTvSeries() {
    const response = await fetch(`${TMDB_BASE_URL}/discover/tv/?api_key=${TMDB_API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&first_air_date.gte=${currentDate}`);
    const data = await response.json();
    const results = filterOutMoviesWithPosters(data.results);

    if (!response.ok) {
        throw new Error('Fetching failed');
    }
    return results;
}

export async function getTvSeriesById(id: string) {
    const response = await fetch(`${TMDB_BASE_URL}/tv/${id}?api_key=${TMDB_API_KEY}&language=en-US`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error('Fetching failed');
    }
    return data;
}