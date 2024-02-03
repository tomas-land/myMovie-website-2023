import { NextResponse } from 'next/server';
import { TMDB_BASE_URL, TMDB_API_KEY } from '@/lib/config';



export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  try {
    const response = await fetch(`${TMDB_BASE_URL}/tv/${id}/external_ids?api_key=${TMDB_API_KEY}`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
  }
}

