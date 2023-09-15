'use client';
import axios from 'axios';
import React, { useState } from 'react';
import iMovie from '@/lib/interfaces';
import MovieCard from '@/components/homepage/movie_card/MovieCard';
import s from './slider.module.scss';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/core';

interface iProps {
  movies: iMovie[];
}

const Slider = ({ movies }: iProps) => {
  const [moviesToShow, setMoviesToShow] = useState<iMovie[]>(movies);
  const [pageToShow, setPageToShow] = useState<number>(2);

  const handleShowMoreMovies = async () => {
    setPageToShow(pageToShow + 1);
    try {
      const moreMovies = await axios.get('/api/movies/getNowPlaying', { params: { page: pageToShow } });
      setMoviesToShow(() => [...moviesToShow, ...moreMovies.data.data]);
    } catch (error) {
      console.error('Error fetching more movies:', error);
    }
  };
  return (
    <Splide
      className={s.slider}
      options={{
        rewind: true,
        gap: '1rem',
        pagination: false,
        arrows: false,
        autoWidth: true,
        autoHeight: true,
      }}
    >
      {moviesToShow?.map((movie) => (
        <SplideSlide key={movie.id} className={s.slide}>
          <MovieCard movie={movie} />
        </SplideSlide>
      ))}
      <SplideSlide className={s.slide}>
        <div className={s.last_slide}>
          <button className={s.button_more} onClick={handleShowMoreMovies}>
            Show more..
          </button>
        </div>
      </SplideSlide>
    </Splide>
  );
};

export default Slider;
