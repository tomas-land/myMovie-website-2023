import { TMDB_API_KEY, TMDB_BASE_URL } from '@/lib/config.js';
import { currentDay, startOFYear } from '@/lib/dayJS';
import {iMovie} from '@/lib/interfaces';

export async function getNowPlayingMovies() {
  const response = await fetch(`${TMDB_BASE_URL}/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error('Fetching failed');
  }
  return data.results;
}

export async function getUpcomingMovies() {
  try {
    const response = await fetch(`${TMDB_BASE_URL}/upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=1`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error('Fetching failed');
    }
    return data.results;
  } catch (error) {}
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
  const response = await fetch(`${TMDB_BASE_URL}/${id}?api_key=${TMDB_API_KEY}&language=en-US`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error('Fetching movie failed');
  }
  return data;
}

export async function getMovieImagesById(id: string) {
  const response = await fetch(`${TMDB_BASE_URL}/${id}/images?api_key=${TMDB_API_KEY}&language=en-US&include_image_language=en,null`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error('Fetching movie images failed');
  }
  return data;
}

export async function getMovieVideosById(id: string) {
  const response = await fetch(`${TMDB_BASE_URL}/${id}/videos?api_key=${TMDB_API_KEY}&language=en-US`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error('Fetching movie videos failed');
  }
  return data;
}
export default { getNowPlayingMovies, getUpcomingMovies, getTopRatedMovies, getMovieById, getMovieImagesById };
