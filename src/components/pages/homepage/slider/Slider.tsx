'use client';
import axios from 'axios';
import React, { useState } from 'react';
import { iMovie } from '@/lib/interfaces/movie';
import MovieCard from '@/components/shared/movie_card/MovieCard';
import s from './slider.module.scss';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/core';
import LoadingSpinner from '@/components/shared/loading_spinner/LoadingSpinner';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

interface iProps {
  movies: iMovie[];
  endpoint?: string;
  profile?: boolean;
  path?: string;
}

const Slider = ({ movies, endpoint, profile, path }: iProps) => {
  const [initialMovies, setInitialMovies] = useState<iMovie[]>(movies);
  const [pageToShow, setPageToShow] = useState<number>(2);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pathname = usePathname();

  const handleShowMoreMovies = async () => {
    setPageToShow(pageToShow + 1);
    try {
      setIsLoading(true);
      const moreMovies = await axios.get(`/api/movies/${endpoint}`, { params: { page: 5, endpoint: endpoint } });
      console.log(moreMovies.data.data)
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
          <MovieCard movie={movie} isQuickView={true} />
        </SplideSlide>
      ))}
      {endpoint !== 'top_rated' && movies.length > 0 ? (
        <SplideSlide className={s.slide}>
          <div className={s.last_slide}>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              profile ? (
                <Link href={`${pathname}/favorites/${path}`} className={s.link}>Show all</Link>
              ) : (
                <button className={s.btn_more} onClick={handleShowMoreMovies}>
                  Show more ..
                </button>
              )
            )}
          </div>
        </SplideSlide>
      ) : null}
    </Splide>
  );
};

export default Slider;
