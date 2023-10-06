'use client';
import axios from 'axios';
import React, { useState } from 'react';
import iMovie from '@/lib/interfaces';
import MovieCard from '@/components/homepage/movie_card/MovieCard';
import s from './slider.module.scss';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/core';
import LoadingSpinner from '../loading_spinner/LoadingSpinner';

interface iProps {
  movies: iMovie[];
  endpoint: string;
}

const Slider = ({ movies, endpoint }: iProps) => {
  const [initialMovies, setInitialMovies] = useState<iMovie[]>(movies);
  const [pageToShow, setPageToShow] = useState<number>(2);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleShowMoreMovies = async () => {
    setPageToShow(pageToShow + 1);
    try {
      setIsLoading(true);
      const moreMovies = await axios.get(`/api/movies/${endpoint}`, { params: { page: pageToShow, endpoint: endpoint } });
      setInitialMovies(() => [...initialMovies, ...moreMovies.data.data]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching more movies:', error);
      setIsLoading(false);
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
      {initialMovies?.map((movie) => (
        <SplideSlide key={movie.id} className={s.slide}>
          <MovieCard movie={movie} />
        </SplideSlide>
      ))}
      {endpoint === 'top_rated' || !movies ? null : (
        <SplideSlide className={s.slide}>
          <div className={s.last_slide}>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <button className={s.button_more} onClick={handleShowMoreMovies}>
                Show more ..
              </button>
            )}
          </div>
        </SplideSlide>
      )}
    </Splide>
  );
};

export default Slider;
