'use client';
import s from './search_result_item.module.scss';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { FaFilm } from 'react-icons/fa';
import { IoPerson } from 'react-icons/io5';

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
        <div className={s.item}>
          <div className={s.poster}>
            {result.poster_path ? (
              <Image className={s.image} src={`https://image.tmdb.org/t/p/original/${result.poster_path}`} width={64} height={96} quality={100} alt={result.title} />
            ) : (
              <div className={s.frame}>
                <FaFilm className={s.icon} />
              </div>
            )}
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
      );
    case 'person':
      return (
        <div className={s.item}>
          <div className={s.poster}>
            {result.profile_path ? (
              <Image className={s.image} src={`https://image.tmdb.org/t/p/original/${result.profile_path}`} width={64} height={96} quality={100} alt={result.title} />
            ) : (
              <div className={s.frame}>
                <IoPerson className={s.icon} />
              </div>
            )}
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
      );
    case 'tv':
      return (
        <div className={s.item}>
          <div className={s.poster}>
            {result.poster_path ? (
              <Image className={s.image} src={`https://image.tmdb.org/t/p/original/${result.poster_path}`} width={64} height={96} quality={100} alt={result.name} />
            ) : (
              <div className={s.frame}>
                <FaFilm className={s.icon} />
              </div>
            )}
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
      );
    default:
      return null;
  }
};

export default SearchResultItem;
