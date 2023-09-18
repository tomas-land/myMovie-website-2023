import { TMDB_API_KEY, TMDB_BASE_URL } from '@/config.js';
import { currentDay, startOFYear } from '@/lib/dayJS';
import iMovie from '@/lib/interfaces';

export async function getNowPlayingMovies(): Promise<iMovie[]> {
  try {
    // const response = await axios.get(`${URL_TMDB}?api_key=${process.env.API_KEY_TMDB}&language=en-US&page=1`);
    // return response.data.results;
    const response = await fetch(`${TMDB_BASE_URL}/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`, { next: { revalidate: 120 } });
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getUpcomingMovies(): Promise<iMovie[]> {
  try {
    const response = await fetch(`${TMDB_BASE_URL}/upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=1`, { next: { revalidate: 120 } });
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
}
export async function getTopRatedMovies(): Promise<iMovie[]> {
  try {
    const allMovies: iMovie[] = [];
    for (let i = 1; i <= 3; i++) {
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&primary_release_date.gte=${startOFYear}&primary_release_date.lte=${currentDay}&sort_by=popularity.desc&page=${i}`);
      const data = await response.json();
      allMovies.push(...data.results);
    }
    return allMovies;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default { getNowPlayingMovies, getUpcomingMovies, getTopRatedMovies };
