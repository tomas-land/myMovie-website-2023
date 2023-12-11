'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { iMovie } from '@/lib/interfaces/movie';
import s from './movie_card.module.scss';
import QuickViewCard from '../quick_view_card/QuickViewCard';
import Link from 'next/link';
import axios from 'axios';
import MovieActionButtons from '@/components/shared/action_buttons/ActionButtons';

interface iProps {
  movie: iMovie;
  isQuickView?: boolean;
}

const MovieCard = ({ movie, isQuickView }: iProps) => {
  const [isQuickViewOpened, setIsQuickViewOpened] = useState<boolean>(false);
  const [genres, setGenres] = useState<[{ id: string; name: string }]>();
  const blurredImage: string | undefined = movie.blurDataURL;
  const movieId = (movie.movieId ?? movie.id)?.toString();  // movie.id comes from external api , movie.movieId comes from db as favorite movie, if no movie.movieId use movie.id by default

  useEffect(() => {
    const fetchMovieGenres = async () => {
      const response = await axios.get('/api/movies/movie_by_id', { params: { id: movieId } });
      const genres = response.data.data.genres;
      setGenres(genres);
    };
    fetchMovieGenres();
  }, []);


  const toggleQuickView = () => {
    setIsQuickViewOpened((prevState) => !prevState);
  };

  return (
    <div className={s.movie_card} >
      <div className={`${s.movie_card_wrapper} ${!isQuickView ? s.movie_card_wrapper_full_width : null}`}>
        <div className={s.poster_wrapper} >
          <Link href={`/movie/${movieId}`}>
            {blurredImage ?
              <Image className={`${s.poster} ${!isQuickView ? s.opacity_set : null}`} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} width={'500'} height={'750'} placeholder='blur' blurDataURL={blurredImage} /> :
              <Image className={`${s.poster} ${!isQuickView ? s.opacity_set : null}`} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} width={'500'} height={'750'} />
            }
          </Link>
          {isQuickView ?
            (<div className={s.btns}>
              <button className={s.btn} onClick={toggleQuickView}>
                {isQuickViewOpened ? 'Close' : 'Quick View'}
              </button>
              <Link href={`/movie/${movieId}`}>
                <button className={s.btn}>Full Review</button>
              </Link>
            </div>) : null}
        </div>
        <div className={s.content}>
          <h3 className={s.title}>{movie.title}</h3>
          <MovieActionButtons movie={movie} />
        </div>
      </div>
      {isQuickView && isQuickViewOpened ? <QuickViewCard movie={movie} setIsQuickViewOpened={setIsQuickViewOpened} genres={genres} /> : null}
    </div>
  );
};

export default MovieCard;
