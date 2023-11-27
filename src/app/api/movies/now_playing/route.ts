import { NextResponse } from 'next/server';
import { TMDB_BASE_URL, TMDB_API_KEY } from '@/lib/config';
import { iMovie } from '@/lib/interfaces/movie';
import getBlurredEntitiesUrl from '@/lib/helpers/getBlurredEntitiesUrl';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page');
  const endpoint = searchParams.get('endpoint');

  try {
    const response = await fetch(`${TMDB_BASE_URL}/movie/${endpoint}?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`, { next: { revalidate: 60 } });
    const data = await response.json();

    const moviesWithBlurredImages = await getBlurredEntitiesUrl<iMovie>(data.results);
    return NextResponse.json({ data: moviesWithBlurredImages });
  } catch (error) {
    console.error(error);
  }
}
