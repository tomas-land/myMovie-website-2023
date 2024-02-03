'use client';
import MovieActionButtons from '@/components/shared/action_buttons/ActionButtons';
import s from './tv_series_details.module.scss'
import TrailerModal from '../trailer_modal/TrailerModal';
import { useModalContext } from '@/context/ModalContext';
import SecondaryButton from '@/components/shared/buttons/secondaty_button/SecondaryButton';
import { FiPlay } from 'react-icons/fi';
import { FaFilm } from 'react-icons/fa';
import ImageFrame from '@/components/shared/image_frame/ImageFrame';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useGlobalContext } from '@/context/GlobalContext';
import { iTvSeries, iTvSeriesVideo } from '@/lib/interfaces/tv_series';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { currentDate } from '@/lib/dayJS';

interface iProps {
  tvSeries: iTvSeries
  tvSeriesVideos: iTvSeriesVideo[]
}

const TvSeriesDetails = ({ tvSeries, tvSeriesVideos }: iProps) => {
  const pathname = usePathname();
  const { openModal, isModalOpened } = useModalContext();
  const { setIsSearchOpen } = useGlobalContext();
  const [externalIDs, setExternalIDs] = useState<{ imdb_id: string }>()
  const mediaType = 'tv_series';
  const isNotReleased = tvSeries.first_air_date && tvSeries.first_air_date > currentDate ? true : false;

  useEffect(() => {
    if (pathname !== '/') setIsSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const fetchExternalIDs = async () => {
      const { data } = await axios.get(`/api/tv_series/external_ids?id=${tvSeries.id}`)
      setExternalIDs(data)
    }
    fetchExternalIDs()
  }, [])

  return (
    <div className={s.tv_series_details}>
      <div className={s.header}>
        <div className={s.info_wrapper}>
          {/* Action buttons */}
          <div className={s.movie_action_buttons_wrapper}>
            <MovieActionButtons tvSeries={tvSeries} mediaType={mediaType} />
          </div>
          {/* Title and genres */}
          <h1 className={s.title}>{tvSeries.name}</h1>
          <div className={s.genres}>
            {tvSeries.genres?.map((genre) => (
              <div className={s.genre} key={genre.id}>
                {genre.name}
              </div>
            ))}
          </div>
          {/* Trailer Modal */}
          {tvSeriesVideos?.length > 0 ? (
            <div className={s.play_trailer}>
              <SecondaryButton label="Play Trailer" icon={<FiPlay />} handleClick={openModal} />
            </div>
          ) : null}
          {isModalOpened ? <TrailerModal movieVideos={tvSeriesVideos} /> : ''}
          {/* External links */}
          <div className={s.external_links}>
            <Link href={`https://www.imdb.com/title/${externalIDs?.imdb_id}`}><Image className={s.icon} src='/imdb.png' alt='image' width={60} height={50} /></Link>
          </div>
          {/* Info */}
          <div className={s.extended_info}>
            {tvSeries.created_by.length && !isNotReleased ? <div><span>Created by:{tvSeries.created_by[0]?.name}</span></div> : null}
            {tvSeries.episode_run_time.length && !isNotReleased ? <div><span>Episode run time:</span> {tvSeries.episode_run_time[0]} min</div> : null}
            {tvSeries.first_air_date ? <div><span>First air date:</span> {tvSeries.first_air_date}</div> : null}
            {tvSeries.last_air_date ? <div><span>Last air date:</span> {tvSeries.last_air_date}</div> : null}
            {tvSeries.number_of_seasons && !isNotReleased ? <div><span>Number of seasons:</span> {tvSeries.number_of_seasons}</div> : null}
            {tvSeries.origin_country?.length ? <div><span>Origin country:</span> {tvSeries.origin_country[0]}</div> : null}
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
    </div>
  );
};

export default TvSeriesDetails;
