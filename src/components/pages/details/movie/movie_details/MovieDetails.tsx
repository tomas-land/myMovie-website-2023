'use client';
import MovieActionButtons from '@/components/shared/action_buttons/ActionButtons';
import s from './movie_details.module.scss';
import { iMovie, iMovieVideo } from '@/lib/interfaces/movie';
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
import { currentDate } from '@/lib/dayJS';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';


interface iProps {
  movie: iMovie;
  movieVideos: iMovieVideo[];
}

const MovieDetails = ({ movie, movieVideos }: iProps) => {
  const pathname = usePathname();
  const { openModal, isModalOpened } = useModalContext();
  const { setIsSearchOpen } = useGlobalContext();
  const [externalIDs, setExternalIDs] = useState<{ imdb_id: string }>()
  const mediaType = 'movies';
  const isNotReleased = movie.release_date && movie.release_date > currentDate ? true : false;

  useEffect(() => {
    if (pathname !== '/') setIsSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const fetchExternalIDs = async () => {
      const { data } = await axios.get(`/api/movies/external_ids?id=${movie.id}`)
      setExternalIDs(data)
    }
    fetchExternalIDs()
  }, [])

  return (
    <div className={s.movie_details}>
      <div className={s.header}>
        <div className={s.info_wrapper}>
          {/* Action buttons */}
          <div className={s.movie_action_buttons_wrapper}>
            <MovieActionButtons movie={movie} mediaType={mediaType} />
          </div>
          {/* Title and genres */}
          <h1 className={s.title}>{movie.title}</h1>
          <div className={s.genres}>
            {movie.genres?.map((genre) => (
              <div className={s.genre} key={genre.id}>
                {genre.name}
              </div>
            ))}
          </div>
          {/* Trailers */}
          {movieVideos.length > 0 ? (
            <div className={s.play_trailer}>
              <SecondaryButton label="Play Trailer" icon={<FiPlay />} handleClick={openModal} />
            </div>
          ) : null}
          {isModalOpened ? <TrailerModal movieVideos={movieVideos} /> : ''}
          {/* External links */}
          <div className={s.external_links}>
            <Link href={`https://www.imdb.com/title/${externalIDs?.imdb_id}`}><Image className={s.icon} src='/imdb.png' alt='image' width={60} height={50}/></Link>
          </div>
          {/* Extended info */}
          <div className={s.extended_info}>
            {isNotReleased || !movie.runtime ? null : (<div><span>Runtime:</span> {movie.runtime} min </div>)}
            <div><span>Release date:</span> {movie.release_date}</div>
            {movie.budget != null && movie.budget !== 0 ? (<div><span>Budget: </span>{formatNumber(movie.budget)} $</div>) : null}
            {movie.revenue != null && movie.revenue !== 0 ? (<div><span>Revenue: </span>{formatNumber(movie.revenue)} $</div>) : null}
          </div>
        </div>
        {/* Poster */}
        <div className={s.poster_wrapper}>
          <ImageFrame imagePath={movie.poster_path} alt={movie.title} icon={<FaFilm />} width={286} height={384} />
        </div>
      </div>
      {/* Overview */}
      <div className={s.overview}>
        <h2 className={s.overview_title}>Overview</h2>
        <p className={s.overview_text}>{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
