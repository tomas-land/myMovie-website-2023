import { TMDB_API_KEY, TMDB_BASE_URL } from '@/lib/config.js';
import { currentDate, TwoMonthsBeforeDate, periodOFLast6months } from '@/lib/dayJS';
import filterOutMoviesWithPosters from '@/lib/helpers/filterOutMoviesWithPosters';
import filterOutMoviesWithAverageAboveZero from '@/lib/helpers/filterOutMoviesWithAverageAboveZero';
import { iTvSeries } from '@/lib/interfaces/tv_series';

export async function getLatestTvSeries() {
  const response = await fetch(`${TMDB_BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&air_date.gte=${TwoMonthsBeforeDate}&air_date.lte=${currentDate}`);
  const data = await response.json();
  const results = filterOutMoviesWithPosters(data.results);
  if (!response.ok) {
    throw new Error('Fetching failed');
  }
  return results;
}

export async function getUpcomingTvSeries() {
  const response = await fetch(`${TMDB_BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&first_air_date.gte=${currentDate}`);
  const data = await response.json();
  const results = filterOutMoviesWithPosters(data.results);
  if (!response.ok) {
    throw new Error('Fetching failed');
  }
  return results;
}

export async function getTopRatedTvSeries() {
  const allMovies: iTvSeries[] = [];
  for (let i = 1; i <= 3; i++) {
    const response = await fetch(`${TMDB_BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&primary_release_date.gte=${periodOFLast6months}&primary_release_date.lte=${currentDate}&sort_by=popularity.desc&page=${i}&vote_average.gte=4&with_original_language=en`);
    const data = await response.json();
    const results = filterOutMoviesWithPosters(filterOutMoviesWithAverageAboveZero(data.results));
    if (!response.ok) {
      throw new Error('Fetching top rated tv series failed');
    }

    allMovies.push(...results);
  }
  return allMovies;
}

export async function getTvSeriesById(id: string) {
  const response = await fetch(`${TMDB_BASE_URL}/tv/${id}?api_key=${TMDB_API_KEY}&language=en-US`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error('Fetching failed');
  }
  return data;
}

export async function getTvSeriesImagesById(id: string) {
  const response = await fetch(`${TMDB_BASE_URL}/tv/${id}/images?api_key=${TMDB_API_KEY}&language=en-US&include_image_language=en`);
  const data = await response.json();
  const images = data.backdrops;
  if (!response.ok) {
    throw new Error('Fetching movie images failed');
  }
  return images;
}

export async function getTvSeriesVideosById(id: string) {
  const response = await fetch(`${TMDB_BASE_URL}/tv/${id}/external_ids?api_key=${TMDB_API_KEY}&language=en-US&include_image_language=en&limit=1`);
  const data = await response.json();
  const results = data.results;
  if (!response.ok) {
    throw new Error('Fetching tv series videos failed');
  }
  return results;
}

export async function getExternalIds(id: string) {
  const response = await fetch(`${TMDB_BASE_URL}/tv/${id}/external_ids?api_key=${TMDB_API_KEY}&language=en-US`);
  const data = await response.json();
  console.log(data)
  if (!response.ok) {
    throw new Error('Fetching external ids failed');
  }
  return data;
}
