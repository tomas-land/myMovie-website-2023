import { NextResponse } from 'next/server';
import { TMDB_BASE_URL, TMDB_API_KEY } from '@/lib/config';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page');
  const endpoint = searchParams.get('endpoint');

  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`, { cache: 'no-cache' });
    const data = await response.json();
    return NextResponse.json({ data: data.results });
  } catch (error) {
    console.error(error);
  }
}
