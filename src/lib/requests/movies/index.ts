import { TMDB_API_KEY, TMDB_BASE_URL } from '@/lib/config.js';
import { currentDay, startOFYear } from '@/lib/dayJS';
import { iMovie } from '@/lib/interfaces/movie';
import getBlurredEntitiesUrl from '@/lib/helpers/getBlurredEntitiesUrl';


export async function getNowPlayingMovies() {
  const response = await fetch(`${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error('Fetching failed');
  }
  const slicedData = data.results.slice(0, 10);
  // add blurdataUrl to each movie
  const movies = await getBlurredEntitiesUrl<iMovie>(slicedData);
  return movies





}

export async function getUpcomingMovies() {
  const response = await fetch(`${TMDB_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=1`);
  const data = await response.json();
  const slicedData = data.results.slice(0, 10);
  if (!response.ok) {
    throw new Error('Fetching failed');
  }
  return slicedData;
}

export async function getTopRatedMovies() {
  const allMovies: iMovie[] = [];
  for (let i = 1; i <= 3; i++) {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&primary_release_date.gte=${startOFYear}&primary_release_date.lte=${currentDay}&sort_by=popularity.desc&page=${i}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error('Fetching failed');
    }
    allMovies.push(...data.results);
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

export default { getNowPlayingMovies, getUpcomingMovies, getTopRatedMovies, getMovieById, getMovieImagesById, getMovieVideosById };
