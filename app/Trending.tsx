// "use client"
import Image from 'next/image';
import React from 'react'
import axios from 'axios';

import s from '@styles/components/trending.module.scss'
import iMovieTrending from '@/lib/interfaces';



async function getTrending() {
  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/movie/now_playing',
    params: { language: 'en-US', page: '1' },
    headers: {
      accept: 'application/json',
      Authorization: process.env.AUTH_TOKEN_TMDB
    }
  };
  try {
    const response = await axios.request(options);
    // console.log(response.data.results[0].backdrop_path);
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
}

const Trending = async () => {
  const trending: iMovieTrending[] = await getTrending();
  return (
    <section className={s.trending}>
      <div className={s.header}>
        <h1 className={s.title}>Trending</h1>
      </div>
      <div className={s.movies_slider}>
        {trending.map((movie) => (
          <div className={s.movie_card} key={movie.id}>
            <Image className={s.image} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}?limit=5`} alt={movie.title} sizes='100vw' width={'0'} height={'0'} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Trending