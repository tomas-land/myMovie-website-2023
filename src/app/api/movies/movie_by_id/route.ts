import { NextResponse } from 'next/server';
import { TMDB_BASE_URL, TMDB_API_KEY } from '@/lib/config';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const movie_id = searchParams.get('id');

  try {
    const response = await fetch(`${TMDB_BASE_URL}/movie/${movie_id}?api_key=${TMDB_API_KEY}&language=en-US`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
  }
}
