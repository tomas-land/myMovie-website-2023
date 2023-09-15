import { NextResponse } from 'next/server';
import { BASE_URL, API_KEY } from '@/config';


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page');
  try {
    const response = await fetch(`${BASE_URL}/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`, { cache: 'no-cache' });
    const data = await response.json();
    return NextResponse.json({ data: data.results });
  } catch (error) {
    console.error(error);
  }
}
