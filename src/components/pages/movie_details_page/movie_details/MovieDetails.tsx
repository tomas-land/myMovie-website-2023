'use client';
import MovieActionButtons from '@/components/shared/action_buttons/ActionButtons';
import s from './movie_details.module.scss';
import { iMovie, iMovieImage, iMovieVideo } from '@/lib/interfaces/movie';
import ScenesGrid from '../scenes_grid/ScenesGrid';
import { formatNumber } from '@/lib/helpers/formatNumber';
import TrailerModal from '../trailer_modal/TrailerModal';
import { useModalContext } from '@/context/ModalContext';
import SecondaryButton from '@/components/shared/buttons/secondaty_button/SecondaryButton';
import { FiPlay } from 'react-icons/fi';
import { FaFilm } from 'react-icons/fa';
import ImageFrame from '@/components/shared/image_frame/ImageFrame';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useGlobalContext } from '@/context/GlobalContext';

interface iProps {
  movie: iMovie;
  movieImages: iMovieImage[];
  movieVideos: iMovieVideo[];
}

const MovieDetails = ({ movie, movieImages, movieVideos }: iProps) => {
  const pathname = usePathname();
  const { openModal, isModalOpened } = useModalContext();
  const { setIsSearchOpen } = useGlobalContext();
  const mediaType = 'movies';

  useEffect(() => {
    if (pathname !== '/') setIsSearchOpen(false);
  }, [pathname]);

  return (
    <div className={s.movie_details}>
      <div className={s.backdrop}></div>
      <div className={s.header}>
        <div className={s.info_wrapper}>
          <div className={s.movie_action_buttons_wrapper}>
            <MovieActionButtons movie={movie} mediaType={mediaType} />
          </div>
          <h1 className={s.title}>{movie.title}</h1>
          <div className={s.genres}>
            {movie.genres?.map((genre) => (
              <div className={s.genre} key={genre.id}>
                {genre.name}
              </div>
            ))}
          </div>
          {movieVideos.length > 0 ? (
            <div className={s.play_trailer}>
              <SecondaryButton label="Play Trailer" icon={<FiPlay />} handleClick={openModal} />
            </div>
          ) : null}
          {isModalOpened ? <TrailerModal movieVideos={movieVideos} /> : ''}
          <div className={s.extended_info}>
            <div>
              <span>Runtime:</span> {movie.runtime} min
            </div>
            <div>
              <span>Released:</span> {movie.release_date}
            </div>
            {movie.budget != null && movie.budget !== 0 && (
              <div>
                <span>Budget: </span>
                {formatNumber(movie.budget)} $
              </div>
            )}
            {movie.revenue != null && movie.revenue !== 0 && (
              <div>
                <span>Revenue: </span>
                {formatNumber(movie.revenue)} $
              </div>
            )}
          </div>
        </div>
        <div className={s.poster_wrapper}>
          <ImageFrame imagePath={movie.poster_path} alt={movie.title} icon={<FaFilm />} width={256} height={384} />
        </div>
      </div>
      <div className={s.overview}>
        <h2 className={s.overview_title}>Overview</h2>
        <p className={s.overview_text}>{movie.overview}</p>
      </div>
      <ScenesGrid movieImages={movieImages} movie={movie} />
    </div>
  );
};

export default MovieDetails;
