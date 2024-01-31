'use client';
import MovieActionButtons from '@/components/shared/action_buttons/ActionButtons';
import s from './tv_series_details.module.scss'
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
import { iTvSeries, iTvSeriesImage, iTvSeriesVideo } from '@/lib/interfaces/tv_series';
import Image from 'next/image';

interface iProps {
  tvSeries: iTvSeries
  tvSeriesImages: iTvSeriesImage[]
  tvSeriesVideos: iTvSeriesVideo[]
}

const TvSeriesDetails = ({ tvSeries, tvSeriesImages, tvSeriesVideos }: iProps) => {
  const pathname = usePathname();
  const { openModal, isModalOpened } = useModalContext();
  const { setIsSearchOpen } = useGlobalContext();
  const mediaType = 'tv_series';

  useEffect(() => {
    if (pathname !== '/') setIsSearchOpen(false);
  }, [pathname]);

  return (
    <div className={s.movie_details}>
      <div className={s.backdrop}></div>
      <div className={s.header}>
        <div className={s.info_wrapper}>
          <div className={s.movie_action_buttons_wrapper}>
            <MovieActionButtons tvSeries={tvSeries} mediaType={mediaType} />
          </div>
          <h1 className={s.title}>{tvSeries.name}</h1>
          <div className={s.genres}>
            {tvSeries.genres?.map((genre) => (
              <div className={s.genre} key={genre.id}>
                {genre.name}
              </div>
            ))}
          </div>
          {/* Trailer Modal */}
          {tvSeriesVideos.length > 0 ? (
            <div className={s.play_trailer}>
              <SecondaryButton label="Play Trailer" icon={<FiPlay />} handleClick={openModal} />
            </div>
          ) : null}
          {isModalOpened ? <TrailerModal movieVideos={tvSeriesVideos} /> : ''}
          {/* Info */}
          <div className={s.extended_info}>
            <div>
              <span>Created by:</span> {tvSeries.created_by[0]?.name} 
            </div>
            <div>
              <span>Runtime:</span> {tvSeries.episode_run_time[0]} min
            </div>
            <div>
              <span>Last air date:</span> {tvSeries.last_air_date}
            </div>
            <div>
              <span>First air date:</span> {tvSeries.first_air_date}
            </div>
            <div>
              <span>Number of seasons:</span> {tvSeries.number_of_seasons}
            </div>
            <div>
              <span>Origin country:</span> {tvSeries.origin_country}
            </div>
            {/* {tvSeries.budget != null && tvSeries.budget !== 0 && (
              <div>
                <span>Budget: </span>
                {formatNumber(tvSeries.budget)} $
              </div>
            )}
            {tvSeries.revenue != null && tvSeries.revenue !== 0 && (
              <div>
                <span>Revenue: </span>
                {formatNumber(tvSeries.revenue)} $
              </div>
            )} */}
          </div>
        </div>
        <div className={s.poster_wrapper}>
          <ImageFrame imagePath={tvSeries.poster_path} alt={tvSeries.title || 'image'} icon={<FaFilm />} width={256} height={384} />
        </div>
      </div>
      <div>
        {/* {tvSeries.production_companies?.map((company) => (
          <Image src={`https://image.tmdb.org/t/p/original/${company.logo_path}`} alt={company.name} width={150} height={50} />
        ))} */}
        
      </div>
      <div className={s.overview}>
        <h2 className={s.overview_title}>Overview</h2>
        <p className={s.overview_text}>{tvSeries.overview}</p>
      </div>
      {/* <ScenesGrid movieImages={movieImages} tvSeries={tvSeries} /> */}
    </div>
  );
};

export default TvSeriesDetails;
