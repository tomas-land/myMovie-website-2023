import requests from '@/lib/requests';
import { API_KEY, TMDB_BASE_URL } from '@/config.js';

export async function getNowPlayingMovies() {
  try {
    // const response = await axios.get(`${URL_TMDB}?api_key=${process.env.API_KEY_TMDB}&language=en-US&page=1`);
    // return response.data.results;
    const response = await fetch(`${TMDB_BASE_URL}/now_playing?api_key=${API_KEY}&language=en-US&page=1`, { next: { revalidate: 120 } });
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
  }
}

export async function getUpcomingMovies() {
  try {
    const response = await fetch(`${TMDB_BASE_URL}/upcoming?api_key=${API_KEY}&language=en-US&page=1`, { next: { revalidate: 120 } });
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
  }
}
export async function getTopRatedMovies() {
  try {
    const response = await fetch(`${TMDB_BASE_URL}/top_rated?api_key=${API_KEY}&language=en-US&page=1`, { next: { revalidate: 120 } });
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
  }
}

export default { getNowPlayingMovies, getUpcomingMovies, getTopRatedMovies };
