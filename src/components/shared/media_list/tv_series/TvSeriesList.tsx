'use client'
import MovieCard from '@/components/shared/movie_card/MovieCard'
import s from './tv_series_list.module.scss'
import { iMovie } from '@/lib/interfaces/movie';
import { iTvSeries } from '@/lib/interfaces/tv_series';
import LoadingSpinner from '@/components/shared/loading_spinner/LoadingSpinner';
import { useState, useEffect } from 'react';

interface iProps {
  movies: iMovie[] | iTvSeries[] | undefined;
  headerTitle?: string;
  text: string;
}

const TvSeriesList = ({ movies, headerTitle, text }: iProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resultText, setResultText] = useState<string | undefined>(text);


  useEffect(() => {
    setIsLoading(movies === undefined);
  }, [movies]);

  return (
    <div className={s.list}>
      <h1 className={s.headerTitle}>{headerTitle}</h1>
      {!isLoading && (
        <div className={s.wrapper}>
          {movies?.length === 0 && (
            <div className={s.no_results}>
              <h1>{resultText}</h1>
            </div>
          )}

          {movies && movies?.length > 0 ? (
            movies?.map((movie: iMovie | iTvSeries) => (
              <MovieCard
                key={movie.id}
                tvSeries={movie}
                isQuickView={false}
                mediaType='tv_series'
                cardWidth='100%'
              />
            ))
          ) : null}
        </div>
      )}

      {isLoading && (
        <div className={s.loading_spinner}>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}

export default TvSeriesList
