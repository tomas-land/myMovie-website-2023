'use client';
import axios from 'axios';
import React, { useState, useRef, useEffect, use } from 'react';
import { iMovie } from '@/lib/interfaces/movie';
import { iTvSeries } from '@/lib/interfaces/tv_series';
import MovieCard from '@/components/shared/movie_card/MovieCard';
import s from './slider.module.scss';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/core';
import LoadingSpinner from '@/components/shared/loading_spinner/LoadingSpinner';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import path from 'path';


interface iProps {
  movies?: iMovie[];
  endpoint?: string;
  profile?: boolean;
  tvSeries?: iTvSeries[];
  mediaType: string;
  isQuickView?: boolean;
}

const Slider = ({ movies, endpoint, profile, tvSeries, mediaType, isQuickView }: iProps) => {
  const [initialSlides, setInitialSlides] = useState<iMovie[] | iTvSeries[] | undefined>([]);
  const [pageToShow, setPageToShow] = useState<number>(2);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pathname = usePathname();

  const handleShowMoreSlides = async () => {
    try {
      setIsLoading(true);
      const moreSlides = await axios.get(`/api/${mediaType}/${endpoint}`, { params: { page: pageToShow } });
      setInitialSlides([...(initialSlides as (iMovie[] | iTvSeries[])), ...moreSlides.data]);
      setPageToShow(pageToShow + 1);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching more movies:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (mediaType === 'movies') {
      setInitialSlides(movies);
    } else if (mediaType === 'tv_series') {
      setInitialSlides(tvSeries);
    }
  }, [mediaType]);



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
      {initialSlides?.length === 0 ? <div className={s.no_content}>No recent activity</div> : null}
      {initialSlides?.map((item) => (
        <SplideSlide key={item.id} className={s.slide}>
          {mediaType === 'movies' ? (
            <MovieCard movie={item as iMovie} mediaType={mediaType} isQuickView={isQuickView} />
          ) : (
            <MovieCard tvSeries={item as iTvSeries} mediaType={mediaType} isQuickView={isQuickView} />
          )}
        </SplideSlide>
      ))}
      {/* // Last slide */}
      {endpoint !== 'top_rated' && initialSlides ? (  // top_rated movies will not have a show more button on the last slide
        <SplideSlide className={s.slide}>
          <div className={s.last_slide}>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              profile ? (
                <Link href={`${pathname}/favorites/${mediaType}`} className={s.link}>Show all</Link>
              ) : (
                <button className={s.btn_more} onClick={handleShowMoreSlides}>
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
