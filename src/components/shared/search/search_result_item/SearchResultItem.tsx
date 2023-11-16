'use client';
import s from './search_result_item.module.scss';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { FaFilm } from 'react-icons/fa';
import { IoPerson } from 'react-icons/io5';
import Link from 'next/link';
import ImageFrame from '@/components/shared/image_frame/ImageFrame';

interface iSearchResultItemProps {
  result: {
    id: number;
    media_type: 'movie' | 'person' | 'tv';
    title: string;
    name: string;
    poster_path: string;
    profile_path: string;
    release_date: string;
    known_for: [{ id: number; title: string; release_date: string }];
  };
}

const SearchResultItem = ({ result }: iSearchResultItemProps) => {
  const [actors, setActors] = useState<any[]>([]);
  const [tvSeries, setTvSeries] = useState<any>([]);
  const topactors = actors.slice(0, 3);

  useEffect(() => {
    if (result.media_type === 'movie') {
      const fetchActors = async () => {
        const res = await fetch(`api/movies/actors?id=${result.id}`);
        const actors = await res.json();
        setActors(actors.data.cast);
      };
      fetchActors();
    }
    if (result.media_type === 'tv') {
      const fetchTvSeries = async () => {
        const res = await fetch(`api/series/series_by_id?id=${result.id}`);
        const tv_series = await res.json();
        setTvSeries(tv_series.data);
      };
      fetchTvSeries();
    }
  }, []);


  switch (result.media_type) {
    case 'movie':
      return (
        <Link href={`/movie/${result.id}`} >
          <div className={s.item}>
            <div className={s.poster}>
              <ImageFrame imagePath={result.poster_path} alt={result.title} icon={<FaFilm />} width={100} height={96} />
            </div>
            <div className={s.details}>
              <h2 className={s.title}>
                {result.title} <span>movie</span>
              </h2>
              <p className={s.release_date}>{dayjs(result.release_date).format('YYYY')}</p>
              <div className={s.actors}>
                {topactors.map((actor) => (
                  <p key={actor.id}>
                    {actor.name}
                    <span style={{ color: '#2a7a75' }}> | </span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Link>
      );
    case 'person':
      return (
        <Link href={`/person/${result.id}`} >
          <div className={s.item} >
            <div className={s.poster}>
              <ImageFrame imagePath={result.profile_path} alt={result.title} icon={<IoPerson />} width={100} height={96} />
            </div>
            <div className={s.details}>
              <h2 className={s.title}>
                {result.name} <span>person</span>
              </h2>
              <div className={s.movies}>
                {result.known_for?.map((movie) => (
                  <span key={movie.id}>
                    {movie.title} {movie.release_date ? '(' + dayjs(movie.release_date).format('YYYY') + ')' : null} {movie.title ? <span style={{ color: '#2a7a75' }}> | </span> : null}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Link>
      );
    case 'tv':
      return (
        <Link href={`/series/${result.id}`} >
          <div className={s.item} >
            <div className={s.poster}>
              <ImageFrame imagePath={result.poster_path} alt={result.title} icon={<FaFilm />} width={100} height={96} />
            </div>
            <div className={s.details}>
              <h2 className={s.title}>
                {result.name} <span>series</span>
              </h2>
              <p className={s.release_date}>{tvSeries.number_of_seasons === 1 ? dayjs(tvSeries.first_air_date).format('YYYY') : `${dayjs(tvSeries.first_air_date).format('YYYY')} - ${dayjs(tvSeries.last_air_date).format('YYYY')}`}</p>
              <p className={s.seasons}>
                {tvSeries.number_of_seasons} {tvSeries.number_of_seasons === 1 ? 'season' : 'seasons'}
              </p>
            </div>
          </div>
        </Link>
      );
    default:
      return null;
  }
};

export default SearchResultItem;
