import { TMDB_API_KEY, TMDB_BASE_URL } from '@/config.js';
import { currentDay, startOFYear } from '@/lib/dayJS';
import iMovie from '@/lib/interfaces';

// const requests = {
//   getNowPlayingMovies: `${TMDB_BASE_URL}/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`,

// }

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
  } catch (error) {
    
  }
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
// export default requests;
export default { getNowPlayingMovies, getUpcomingMovies, getTopRatedMovies };
