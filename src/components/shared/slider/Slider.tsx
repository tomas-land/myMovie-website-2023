"use client"

import iMovie from '@/lib/interfaces';
import MovieCard from '@/components/homepage/movie_card/MovieCard';
import s from './slider.module.scss'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/core';

interface iProps {
  movies: iMovie[]
}

const Slider = ({ movies }: iProps) => {
  return (
    <Splide className={s.slider} options={{
      type: 'loop',
      gap: '1rem',
      pagination: false,
      arrows: false,
      autoWidth: true,
      autoHeight: true,
    }
    } >
      {
        movies?.map((movie) => (
          <SplideSlide key={movie.id} className={s.slide}>
            <MovieCard movie={movie} />
          </SplideSlide>
        ))
      }
    </Splide >
  )
}

export default Slider