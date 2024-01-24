import { NextResponse } from 'next/server';
import { TMDB_BASE_URL, TMDB_API_KEY } from '@/lib/config';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get('query');

  try {
    const response = await fetch(`${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${searchQuery}&include_adult=false&language=en-US&page=1`);
    const data = await response.json();
    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);
  }
}

