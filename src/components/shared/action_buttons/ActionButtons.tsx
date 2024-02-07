'use client';

import { useState, useEffect, use } from 'react';
import Tooltip from '@/components/shared/tooltip/Tooltip';
import RatingPopup from '@/components/shared/action_buttons/rating_popup/RatingPopup';
import { iMovie } from '@/lib/interfaces/movie';
import { FiHeart, FiStar, FiBookmark } from 'react-icons/fi';
import { useSession } from 'next-auth/react';
import { iRating } from '@/lib/interfaces/rating';
import { iFavorite } from '@/lib/interfaces/favorite';
import 'react-toastify/dist/ReactToastify.css';
import s from './action_buttons.module.scss';
import { useGlobalContext } from '@/context/GlobalContext';
import useUserData from '@/hooks/reactQuery/useUserData';
import { iTvSeries } from '@/lib/interfaces/tv_series';
import { currentDate } from '@/lib/dayJS';
import useToggleFavorite from '@/hooks/reactQuery/useToggleFavorite';
import useToggleWatchlist from '@/hooks/reactQuery/useToggleWatchlist';
import { iWatchlistItem } from '@/lib/interfaces/watchlist';

interface iProps {
  movie?: iMovie | iFavorite | iWatchlistItem;
  tvSeries?: iTvSeries | iFavorite;
  mediaType: string;
}

const ActionButtons = ({ movie, tvSeries, mediaType }: iProps) => {
  const [isRated, setIsRated] = useState<boolean>(false);
  const [rating, setRating] = useState<string | null | undefined>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isRatingOpened, setIsRatingOpened] = useState(false);
  const { currentRatingPopupId, setCurrentRatingPopupId } = useGlobalContext();
  const { status } = useSession();


  const isAuthenticated = status === 'authenticated';  // passing to tooltip component to show tooltip only if authentificated
  const movieId = (movie?.media_id ?? movie?.movieId ?? movie?.id)?.toString();  // movie.id comes from external api , movie.movieId comes from db as favorite movie, if no movie.movieId use movie.id by default
  const tvSeriesId = (tvSeries?.media_id ?? tvSeries?.seriesId ?? tvSeries?.id)?.toString();  // tvSeries.id comes from external api , tvSeries.tvSeriesId comes from db as favorite tvSeries, if no tvSeries.tvSeriesId use tvSeries.id by default
  const currentSlideId = movieId ?? tvSeriesId;
  const title = movie?.title ?? tvSeries?.title ?? tvSeries?.name;
  const posterPath = movie?.poster_path ?? tvSeries?.poster_path;
  const voteAverage = movie?.vote_average ?? tvSeries?.vote_average;
  const releaseDate = movie?.release_date ?? tvSeries?.release_date ?? tvSeries?.first_air_date;
  const isNotReleased = (movie?.release_date && movie.release_date > currentDate) || (tvSeries?.first_air_date && tvSeries.first_air_date > currentDate) ? true : false; // if movie or tv series is not released yet, don't show rating

  // fetch user ratings and cache them
  const { data: userRatings } = useUserData('/api/ratings/all_ratings', 'ratings');

  // fetch user favorite movies and cache them
  const { data: userFavoriteMovies } = useUserData('/api/favorites/movies/all_favorites', 'favoriteMovies');
  const { data: userFavoriteTvSeries } = useUserData('/api/favorites/tv_series/all_favorites', 'favoriteTvSeries');

  // fetch user watchlist and cache them
  const { data: userWatchlist } = useUserData('/api/watchlist/all_watchlist', 'watchlist');

  // Custom hook to add or remove a movie or tv series from favorites
  const { toggleFavorite, togglingFavoritesIsPending } = useToggleFavorite({ movieId, tvSeriesId, title, posterPath, voteAverage, mediaType, setIsFavorite, isFavorite, releaseDate });

  // Custom hook to add or remove a movie or tv series from watchlist
  const { toggleWatchlist, togglingWatchlistIsPending } = useToggleWatchlist({ mediaType, currentSlideId, title, posterPath, voteAverage, releaseDate, isInWatchlist, setIsInWatchlist });





  useEffect(() => {
    const favoriteMovie = userFavoriteMovies?.find((favorite: iFavorite) => favorite.movieId === movieId);
    const favoriteTvSeries = userFavoriteTvSeries?.find((favorite: iFavorite) => favorite.seriesId === tvSeriesId);
    const watchlistItem = userWatchlist?.find((watchlistItem: iWatchlistItem) => watchlistItem.media_id === currentSlideId);
    setIsFavorite(!!favoriteMovie || !!favoriteTvSeries); // if movie or tv series is in favorites, set isFavorite to true
    setIsInWatchlist(!!watchlistItem); // if movie or tv series is in watchlist, set isInWatchlist to true

    const rated = userRatings?.find((rating: iRating) => rating.contentId === movieId || rating.contentId === tvSeriesId);
    if (rated) {
      setRating(rated.rating);
      setIsRated(true);
    } else {
      setRating(null);
      setIsRated(false);
    }
  }, [isAuthenticated, userRatings, isRated]);

  const toggleRatingContainer = (id: string | undefined) => {
    if (id === currentRatingPopupId) {  // if clicked on the same movie slide, toggle rating popup
      setIsRatingOpened((prev) => !prev);
    } else {                                  // if clicked on another movie first time, set current rating popup id(currentRatingPopupId) and open rating popup 
      setCurrentRatingPopupId(currentSlideId);
      setIsRatingOpened(true);
    }
  }

  return (
    <div className={s.action_btns}>
      {isNotReleased ? null :  // if movie is not released yet, don't show rating
        <div className={s.ratings_container}>
          <Tooltip tooltipText="Average score">
            <div className={s.average_rating}>
              <span>{voteAverage && voteAverage !== 0 ? voteAverage.toFixed(1) : 0}</span>
            </div>
          </Tooltip>
          {isAuthenticated && rating ?
            (<Tooltip tooltipText="Your score">
              <div className={s.user_rating}>
                <span>{rating}</span>
              </div>
            </Tooltip>) : null}
        </div>}
      <div className={s.btns_wrapper}>
        {isNotReleased ? null : <Tooltip tooltipText={isAuthenticated ? "Add or remove rating" : "You must sign-in in to rate movies"}>
          {/* if rating popup is opened and current rating popup id is equal to movie id, show rating popup (global context nescesary)*/}
          {isAuthenticated && isRatingOpened && currentRatingPopupId === currentSlideId ? <RatingPopup handleSetIsRatingOpened={setIsRatingOpened} currentSlideId={currentSlideId} isRated={isRated} setIsRated={setIsRated} /> : null}
          <button className={`${s.btn} ${rating && isRated ? s.fill_icon : ''}`} onClick={() => toggleRatingContainer(currentSlideId)} disabled={!isAuthenticated}>
            <FiStar size={25} />
          </button>
        </Tooltip>}
        <Tooltip tooltipText={isAuthenticated ? "Add or remove from favorites" : "You must sign-in in to add to favorites"}>
          {togglingFavoritesIsPending ? <button className={`${s.btn} ${s.fill_icon}`}><FiHeart size={25} /></button> :
            <button className={`${s.btn} ${isFavorite ? s.fill_icon : ''}`} onClick={() => toggleFavorite()} disabled={!isAuthenticated}>
              <FiHeart size={25} />
            </button>}
        </Tooltip>
        <Tooltip tooltipText={isAuthenticated ? "Add or remove from watchlist" : "You must sign-in in to add to watchlist"}>
          {togglingWatchlistIsPending ? <button className={`${s.btn} ${s.fill_icon}`}><FiBookmark size={25} /></button> :
            <button className={`${s.btn} ${isInWatchlist ? s.fill_icon : ''}`} onClick={() => toggleWatchlist()} disabled={!isAuthenticated}>
              <FiBookmark size={25} />
            </button>}
        </Tooltip>
      </div>
    </div>
  );
};

export default ActionButtons;
