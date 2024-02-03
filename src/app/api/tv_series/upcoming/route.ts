import { NextResponse } from 'next/server';
import { TMDB_BASE_URL, TMDB_API_KEY } from '@/lib/config';
import { currentDate } from '@/lib/dayJS';
import filterOutMoviesWithPosters from '@/lib/helpers/filterOutMoviesWithPosters';


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page');

  try {
    const response = await fetch(`${TMDB_BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&include_adult=false&include_video=false&language=en-US&page=${page}&first_air_date.gte=${currentDate}&sort_by=popularity.desc`);
    const data = await response.json();
    const results = filterOutMoviesWithPosters(data.results);

    return NextResponse.json(results);
  } catch (error) {
    console.error(error);
  }
}
