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
  const [blurredImage, setBlurredImage] = useState<string | undefined>(undefined); 

  useEffect(() => {
    const fetchMovieGenres = async () => {
      const response = await axios.get('/api/movies/movie_by_id', { params: { id: movie.id } });
      const genres = response.data.data.genres;
      setGenres(genres);
      return genres;
    };
    fetchMovieGenres();
  }, [movie.id]);

  const toggleQuickView = () => {
    setIsQuickViewOpened((prevState) => !prevState);
  };

  // useEffect(() => {
  //   const fetchBlurredImage = async () => {
  //     const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  //     console.log(imageUrl)
  //     const res = await fetch(`/api/getBase64?url=${imageUrl}`)
  //     const blurDataURL = await res.json()
  //     console.log(blurDataURL)
  //     setBlurredImage(blurDataURL)
  //     console.log(blurredImage)
  //   }
  //   fetchBlurredImage()
  // }
  //   , [movie.poster_path])
  return (
    <>
      <div className={s.movie_card} >
        <div className={`${s.movie_card_wrapper} ${!isQuickView ? s.movie_card_wrapper_full_width : null}`}>
          <div className={s.poster_wrapper} >
            <Link href={`/movie/${movie.id}`}>
              <Image className={`${s.poster} ${!isQuickView ? s.opacity_set : null}`} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} width={'500'} height={'750'} placeholder='blur' blurDataURL={movie.blurDataURL} />
            </Link>
            {isQuickView ?
              (<div className={s.btns}>
                <button className={s.btn} onClick={toggleQuickView}>
                  {isQuickViewOpened ? 'Close' : 'Quick View'}
                </button>
                <Link href={`/movie/${movie.id}`}>
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
    </>
  );
};

export default MovieCard;
