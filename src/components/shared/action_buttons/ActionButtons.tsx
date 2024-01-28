'use client';

import { useState, useEffect, use } from 'react';
import axios from 'axios';
import Tooltip from '@/components/shared/tooltip/Tooltip';
import RatingPopup from '@/components/shared/action_buttons/rating_popup/RatingPopup';
import { iMovie } from '@/lib/interfaces/movie';
import { FiHeart, FiStar, FiBookmark } from 'react-icons/fi';
import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toastError, toastSuccess } from '@/lib/toasts';
import { iRating } from '@/lib/interfaces/rating';
import { iFavorite } from '@/lib/interfaces/favorite';
import 'react-toastify/dist/ReactToastify.css';
import s from './action_buttons.module.scss';
import { useGlobalContext } from '@/context/GlobalContext';
import useUserData from '@/hooks/reactQuery/useUserData';
import { useRouter } from 'next/navigation';
import { iTvSeries } from '@/lib/interfaces/tv_series';


interface iProps {
  movie?: iMovie | iFavorite;
  tvSeries?: iTvSeries | iFavorite;
  mediaType: string
}

const ActionButtons = ({ movie, tvSeries, mediaType }: iProps) => {
  const [isRated, setIsRated] = useState<boolean>(false);
  const [rating, setRating] = useState<string | null | undefined>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isRatingOpened, setIsRatingOpened] = useState(false);
  const { currentRatingPopupId, setCurrentRatingPopupId } = useGlobalContext();
  const { status } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  const isAuthenticated = status === 'authenticated';  // passing to tooltip component to show tooltip only if authentificated
  const movieId = (movie?.movieId ?? movie?.id)?.toString();  // movie.id comes from external api , movie.movieId comes from db as favorite movie, if no movie.movieId use movie.id by default
  const tvSeriesId = (tvSeries?.seriesId ?? tvSeries?.id)?.toString();  // tvSeries.id comes from external api , tvSeries.tvSeriesId comes from db as favorite tvSeries, if no tvSeries.tvSeriesId use tvSeries.id by default
  const currentSlideId = movieId ?? tvSeriesId;
  const title = movie?.title ?? tvSeries?.name;
  const posterPath = movie?.poster_path ?? tvSeries?.poster_path;
  const voteAverage = movie?.vote_average ?? tvSeries?.vote_average;

  // fetch user ratings and cache them
  const { data: userRatings } = useUserData('/api/ratings/all_ratings', 'ratings');

  // fetch user favorite movies or cache them
  const { data: userFavoriteMovies } = useUserData('/api/favorites/movies/all_favorites', 'favoriteMovies');
  const { data: userFavoriteTvSeries } = useUserData('/api/favorites/tv_series/all_favorites', 'favoriteTvSeries');

  // Mutation to add or remove a movie or tv series from favorites
  const { mutate: toggleFavorite, isPending } = useMutation({
    mutationFn: async () => {
      if (mediaType === 'movies') {
        const favoriteMovie = userFavoriteMovies?.find((favorite: iFavorite) => favorite.movieId === movieId); // if movie is already in favorites, delete it, else add it to favorites
        if (favoriteMovie) {
          await axios.delete(`/api/favorites/movies/delete_favorite?id=${favoriteMovie.id}`);
        } else {
          await axios.post(`/api/favorites/movies/save_favorite`, { movie_id: movieId, title: title, poster_path: posterPath, vote_average: voteAverage });
        }
      } else {
        const favoriteTvSeries = userFavoriteTvSeries?.find((favorite: iFavorite) => favorite.seriesId === tvSeriesId); // if tv series is already in favorites, delete it, else add it to favorites
        if (favoriteTvSeries) {
          const res = await axios.delete(`/api/favorites/tv_series/delete_favorite?id=${favoriteTvSeries.id}`);
          console.log(res)
        } else {
          await axios.post(`/api/favorites/tv_series/save_favorite`, { tv_series_id: tvSeriesId, title: title, poster_path: posterPath, vote_average: voteAverage });
        }
      }
    }
    ,
    // onMutate: () => {
    //   queryClient.cancelQueries({ queryKey: ['userFavorites'] });
    //   const previousFavorites = queryClient.getQueryData(['userFavorites']);
    //   queryClient.setQueryData(['userFavorites'], (old: any) => [...old, { movieId: movie.movieId}]);
    //   return { previousFavorites };
    // },
    onSuccess: () => {
      if (mediaType === 'movies') queryClient.invalidateQueries({ queryKey: ['favoriteMovies'] });
      else queryClient.invalidateQueries({ queryKey: ['favoriteTvSeries'] });

      if (isFavorite) {
        toastSuccess(`Removed from favorite ${mediaType}`)
        setIsFavorite(false)
      } else {
        toastSuccess(`Added to favorite ${mediaType.split('_').join(' ')}`)
        setIsFavorite(true)
        router.refresh();
      }
    },
    onError: () => {
      setIsFavorite(false);
      toastError('Something went wrong');
    },
  });

  useEffect(() => {
    const favoriteMovie = userFavoriteMovies?.find((favorite: iFavorite) => favorite.movieId === movieId);
    const favoriteTvSeries = userFavoriteTvSeries?.find((favorite: iFavorite) => favorite.seriesId === tvSeriesId);
    setIsFavorite(!!favoriteMovie || !!favoriteTvSeries);

    const rated = userRatings?.find((rating: iRating) => rating.contentId === movieId || rating.contentId === tvSeriesId);
    if (rated) {
      setRating(rated.rating);
      setIsRated(true);
    } else {
      setRating(null);
      setIsRated(false);
    }
  }, [isAuthenticated, userFavoriteMovies, userFavoriteTvSeries, userRatings, isRated]);

  const toggleWatchlist = () => {
    setIsInWatchlist((prevState) => !prevState);
  };

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
      <div className={s.ratings_container}>
        <Tooltip tooltipText="Average score">
          <div className={s.average_rating}>
            <span>{voteAverage?.toFixed(1)}</span>
          </div>
        </Tooltip>
        {isAuthenticated && rating ?
          (<Tooltip tooltipText="Your score">
            <div className={s.user_rating}>
              <span>{rating}</span>
            </div>
          </Tooltip>) : null}
      </div>
      <div className={s.btns_wrapper}>
        <Tooltip tooltipText={isAuthenticated ? "Add or remove rating" : "You must sign-in in to rate movies"}>
          {/* if rating popup is opened and current rating popup id is equal to movie id, show rating popup (global context nescesary)*/}
          {isAuthenticated && isRatingOpened && currentRatingPopupId === currentSlideId ? <RatingPopup handleSetIsRatingOpened={setIsRatingOpened} currentSlideId={currentSlideId} isRated={isRated} setIsRated={setIsRated} /> : null}
          <button className={`${s.btn} ${rating && isRated ? s.fill_icon : ''}`} onClick={() => toggleRatingContainer(currentSlideId)} disabled={!isAuthenticated}>
            <FiStar size={25} />
          </button>
        </Tooltip>
        <Tooltip tooltipText={isAuthenticated ? "Add or remove from favorites" : "You must sign-in in to add to favorites"}>
          {isPending ? <button className={`${s.btn} ${s.fill_icon}`}><FiHeart size={25} /></button> :
            <button className={`${s.btn} ${isFavorite ? s.fill_icon : ''}`} onClick={() => toggleFavorite()} disabled={!isAuthenticated}>
              <FiHeart size={25} />
            </button>}
        </Tooltip>
        <Tooltip tooltipText={isAuthenticated ? "Add or remove from watchlist (in development mode)" : "You must sign-in in to add to watchlist(in development mode)"}>
          <button className={`${s.btn} ${isInWatchlist ? s.fill_icon : ''}`} disabled={!isAuthenticated}>
            <FiBookmark size={25} onClick={toggleWatchlist} />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default ActionButtons;
