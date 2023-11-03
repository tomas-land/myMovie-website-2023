import { NextResponse } from 'next/server';
import { last30days, currentDay } from '@/lib/dayJS';
import { TMDB_API_KEY } from '@/lib/config';


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page');

  try {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&primary_release_date.gte=${last30days}&primary_release_date.lte=${currentDay}&sort_by=vote_average.desc&page=${page}`, { cache: 'no-cache' });
    const data = await response.json();
    return NextResponse.json({ data: data.results });
  } catch (error) {
    console.error(error);
  }
}
