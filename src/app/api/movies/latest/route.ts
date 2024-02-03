import { NextResponse } from 'next/server';
import { TMDB_BASE_URL, TMDB_API_KEY } from '@/lib/config';
import { currentDate, TwoMonthsBeforeDate } from '@/lib/dayJS';
import getBlurredEntitiesUrl from '@/lib/helpers/getBlurredEntitiesUrl';
import filterOutMoviesWithPosters from '@/lib/helpers/filterOutMoviesWithPosters';


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page');

  try {
    const response = await fetch(`${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${TwoMonthsBeforeDate}&release_date.lte=${currentDate}`);
    const data = await response.json();
    const results = filterOutMoviesWithPosters(data.results);

    // const moviesWithBlurData = await getBlurredEntitiesUrl(results);  // need to fix this someday :)
    return NextResponse.json(results);
  } catch (error) {
    console.error(error);
  }
}
