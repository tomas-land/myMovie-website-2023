'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { iMovie } from '@/lib/interfaces/movie';
import s from './movie_card.module.scss';
import QuickViewCard from '../quick_view_card/QuickViewCard';
import Link from 'next/link';
import axios from 'axios';
import MovieActionButtons from '@/components/shared/action_buttons/ActionButtons';
import { iTvSeries } from '@/lib/interfaces/tv_series';
import { iFavorite } from '@/lib/interfaces/favorite';

interface iProps {
  movie?: iMovie | iFavorite;
  tvSeries?: iTvSeries | iFavorite;
  isQuickView?: boolean;
  mediaType: string
  cardWidth: string;
}

const MovieCard = ({ movie, tvSeries, isQuickView, mediaType, cardWidth }: iProps) => {
  const [isQuickViewOpened, setIsQuickViewOpened] = useState<boolean>(false);
  const [additionalInfo, setAdditionalInfo] = useState<[{ genres: [{ id: string, name: string }], last_air_date?: string, season_numbers?: number }]>([{ genres: [{ id: '', name: '' }], last_air_date: '', season_numbers: 0 }]);
  const blurredImage: string | undefined = movie?.blurDataURL;
  const movieId = (movie?.movieId ?? movie?.id)?.toString();  // movie.id comes from external api , movie.movieId comes from db as favorite movie, if no movie.movieId use movie.id by default
  const tvSeriesId = (tvSeries?.seriesId ?? tvSeries?.id)?.toString();  // tvSeries.id comes from external api , tvSeries.tvSeriesId comes from db as favorite tvSeries, if no tvSeries.tvSeriesId use tvSeries.id by default
  const title = movie?.title ?? tvSeries?.name ?? tvSeries?.title;  // if no movie title use tv series name(name comes from TMDB api) or title(title comes from db)
  const posterPath = movie?.poster_path ?? tvSeries?.poster_path;
  const releaseDate = movie?.release_date ?? tvSeries?.first_air_date;
  const overview = movie?.overview ?? tvSeries?.overview;

  useEffect(() => {
    if (mediaType === 'movies') {
      const fetchMovieGenres = async () => {
        try {
          const response = await axios.get('/api/movies/movie_by_id', { params: { id: movieId } });
          const movie = response.data;
          setAdditionalInfo([{ genres: movie.genres }]);
        } catch (error) {
          console.error('Error fetching movie genres:', error);
        }
      }
      fetchMovieGenres();
    } else if (mediaType === 'tv_series') {
      const fetchTvSeriesGenresAndSeasons = async () => {
        try {
          const response = await axios.get('/api/tv_series/tv_series_by_id', { params: { id: tvSeriesId } });
          const tvSeries = response.data.data;
          setAdditionalInfo([{ genres: tvSeries.genres, last_air_date: tvSeries.last_air_date, season_numbers: tvSeries.last_episode_to_air.season_number }]);
        } catch (error) {
          console.error('Error fetching tv series genres:', error);
        }
      }
      fetchTvSeriesGenresAndSeasons();
    }
  }, [mediaType]);

  const toggleQuickView = () => {
    setIsQuickViewOpened((prevState) => !prevState);
  };

  return (
    <div className={s.movie_card} >
      <div className={`${s.movie_card_wrapper}`} style={{ width: cardWidth }}>
        <div className={s.poster_wrapper} >
          <Link href={mediaType === 'movies' ? `/movie/${movieId}` : `/tv_series/${tvSeriesId}`}>
            {blurredImage ?
              <Image className={`${s.poster} ${!isQuickView ? s.opacity_set : null}`} src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt={title || 'image'} width={'500'} height={'750'} placeholder='blur' blurDataURL={blurredImage} /> :
              <Image className={`${s.poster} ${!isQuickView ? s.opacity_set : null}`} src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt={title || 'image'} width={'500'} height={'750'} />
            }
          </Link>
          {isQuickView ?
            (<div className={s.btns}>
              <button className={s.btn} onClick={toggleQuickView}>
                {isQuickViewOpened ? 'Close' : 'Quick View'}
              </button>
              <Link href={mediaType === 'movies' ? `/movie/${movieId}` : `/tv_series/${tvSeriesId}`}>
                <button className={s.btn}>Full Review</button>
              </Link>
            </div>) : null}
        </div>
        <div className={s.content}>
          <h3 className={s.title}>{title}</h3>
          <MovieActionButtons movie={movie} tvSeries={tvSeries} mediaType={mediaType} />
        </div>
      </div>
      {isQuickView && isQuickViewOpened ? <QuickViewCard title={title} releaseDate={releaseDate} overview={overview} setIsQuickViewOpened={setIsQuickViewOpened} additionalInfo={additionalInfo} mediaType={mediaType} /> : null}
    </div >
  );
};

export default MovieCard;
