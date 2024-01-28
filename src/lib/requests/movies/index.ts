import { TMDB_API_KEY, TMDB_BASE_URL } from '@/lib/config.js';
import { currentDate, startOFYear, TwoMonthsBeforeDate } from '@/lib/dayJS';
import { iMovie } from '@/lib/interfaces/movie';
import filterOutMoviesWithPosters from '@/lib/helpers/filterOutMoviesWithPosters';
import filterOutMoviesWithAverageAboveZero from '@/lib/helpers/filterOutMoviesWithAverageAboveZero';


export async function getLatestMovies() {
  const response = await fetch(`${TMDB_BASE_URL}/discover/movie/?api_key=${TMDB_API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${TwoMonthsBeforeDate}&release_date.lte=${currentDate}`);
  const data = await response.json();
  const results = filterOutMoviesWithPosters(data.results);

  if (!response.ok) {
    throw new Error('Fetching failed');
  }
  return results;
}

export async function getUpcomingMovies() {
  const response = await fetch(`${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=${currentDate}&sort_by=popularity.desc`);
  const data = await response.json();
  const results = filterOutMoviesWithPosters(data.results);

  if (!response.ok) {
    throw new Error('Fetching failed');
  }
  return results;
}

export async function getTopRatedMovies() {
  const allMovies: iMovie[] = [];
  for (let i = 1; i <= 3; i++) {
    const response = await fetch(`${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&primary_release_date.gte=${startOFYear}&primary_release_date.lte=${currentDate}&sort_by=popularity.desc&page=${i}`);
    const data = await response.json();
    const results = filterOutMoviesWithPosters(filterOutMoviesWithAverageAboveZero(data.results));
    if (!response.ok) {
      throw new Error('Fetching failed');
    }

    allMovies.push(...results);
  }
  return allMovies;
}

export async function getMovieById(id: string) {
  const response = await fetch(`${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error('Fetching movie failed');
  }
  return data;
}

export async function getMovieImagesById(id: string) {
  const response = await fetch(`${TMDB_BASE_URL}/movie/${id}/images?api_key=${TMDB_API_KEY}&language=en-US&include_image_language=en`);
  const data = await response.json();
  const images = data.backdrops;
  if (!response.ok) {
    throw new Error('Fetching movie images failed');
  }
  return images;
}

export async function getMovieVideosById(id: string) {
  const response = await fetch(`${TMDB_BASE_URL}/movie/${id}/videos?api_key=${TMDB_API_KEY}&language=en-US&include_image_language=en&limit=1`);
  const data = await response.json();
  const results = data.results;
  if (!response.ok) {
    throw new Error('Fetching movie videos failed');
  }
  return results;
}
