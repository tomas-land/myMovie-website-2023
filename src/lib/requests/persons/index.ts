import { TMDB_API_KEY, TMDB_BASE_URL } from '@/lib/config.js';
import filterOutActorsWithPhoto from '@/lib/helpers/person/filterOutActorsWithPhoto';
import { iPerson } from '@/lib/interfaces/person';

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

export async function getPopularActors(numberOfPages: number) {
  const actors: iPerson[] = [];
  for (let i = 1; i <= numberOfPages; i++) {
    const response = await fetch(`${TMDB_BASE_URL}/person/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${i}`);
    const data = await response.json();
    const results = filterOutActorsWithPhoto(data.results) as iPerson[];
    if (!response.ok) {
      throw new Error('Fetching popular actors failed');
    }
    actors.push(...results);
  }
  return actors;
}

