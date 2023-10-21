'use client';
import MovieActionButtons from '@/components/shared/movie_action_buttons/MovieActionButtons';
import s from './movie_details.module.scss';
import { iMovie, iMovieImage, iMovieVideo } from '@/lib/interfaces';
import Image from 'next/image';
import ScenesGrid from '../scenes_grid/ScenesGrid';
import { formatNumber } from '@/lib/helpers/formatNumber';
import TrailerModal from '../trailer_modal/TrailerModal';
import { useModalContext } from '@/lib/context/ModalContext';
import SecondaryButton from '@/components/shared/buttons/secondaty_button/SecondaryButton';
import { FiPlay } from 'react-icons/fi';

interface iProps {
  movie: iMovie;
  movieImages: iMovieImage;
  movieVideo: iMovieVideo[];
}

const MovieDetails = async ({ movie, movieImages, movieVideo }: iProps) => {
  const { openModal, isModalOpened } = useModalContext();
  return (
    <div className={s.movie_details}>
      <div className={s.backdrop}></div>
      <div className={s.header}>
        <div className={s.info_wrapper}>
          <div className={s.movie_action_buttons_wrapper}>
            <MovieActionButtons movie={movie} />
          </div>
          <h1 className={s.title}>{movie.title}</h1>
          <div className={s.genres}>
            {movie.genres?.map((genre) => (
              <div className={s.genre} key={genre.id}>
                {genre.name}
              </div>
            ))}
          </div>
          <div className={s.play_trailer}>
            <SecondaryButton label="Play Trailer" icon={<FiPlay />} handleClick={openModal}/>
          </div>
          {isModalOpened ? <TrailerModal movieVideo={movieVideo} /> : ''}
          <div className={s.extended_info}>
            <div>
              <span>Runtime:</span> {movie.runtime} min
            </div>
            <div>
              <span>Released:</span> {movie.release_date}
            </div>
            <div>
              <span>Budget: </span>
              {formatNumber(movie.budget)} $
            </div>
            <div>
              <span>Revenue: </span>
              {formatNumber(movie.revenue)} ${' '}
            </div>
          </div>
        </div>
        <div className={s.poster_wrapper}>
          <Image className={s.poster} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} width={256} height={384} loading="lazy" />
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
