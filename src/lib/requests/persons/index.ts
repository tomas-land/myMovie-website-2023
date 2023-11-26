import { TMDB_API_KEY, TMDB_BASE_URL } from '@/lib/config.js';

export async function getPersonById(id: string) {
  const response = await fetch(`${TMDB_BASE_URL}/person/${id}?api_key=${TMDB_API_KEY}&language=en-US`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error('Fetching person failed');
  }
  return data;
}

export async function getPersonMovieCreditsById(id: string) {
  const response = await fetch(`${TMDB_BASE_URL}/person/${id}/movie_credits?api_key=${TMDB_API_KEY}&sort_by=release_date.desc`);
  const data = await response.json();
  const cast = data.cast;
  if (!response.ok) {
    throw new Error('Fetching person movie credits failed');
  }
  return cast;
}

export default { getPersonById };
