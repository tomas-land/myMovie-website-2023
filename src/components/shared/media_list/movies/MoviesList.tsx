'use client'
import MovieCard from '@/components/shared/movie_card/MovieCard'
import s from './movies_list.module.scss'
import LoadingSpinner from '@/components/shared/loading_spinner/LoadingSpinner';
import { iMovie } from '@/lib/interfaces/movie';
import { iTvSeries } from '@/lib/interfaces/tv_series';
import { useState } from 'react';
import { useEffect } from 'react';
import { useGlobalContext } from '@/context/GlobalContext';

interface iProps {
  movies: iMovie[] | iTvSeries[] | undefined;
  headerTitle?: string;
  text?: string;
  query?: string;
}

const MoviesList = ({ movies, headerTitle, text, query }: iProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { selectedGenreId } = useGlobalContext();
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

          {movies ? (
            movies?.map((movie: iMovie | iTvSeries) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isQuickView={false}
                mediaType='movies'
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
};

export default MoviesList
