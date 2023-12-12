'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { iMovie } from '@/lib/interfaces/movie';
import { FiHeart, FiStar, FiBookmark } from 'react-icons/fi';
import { useSession } from 'next-auth/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import RatingPopup from '@/components/shared/action_buttons/rating_popup/RatingPopup';
import Tooltip from '@/components/shared/tooltip/Tooltip';
import 'react-toastify/dist/ReactToastify.css';
import s from './action_buttons.module.scss';
import { toastError, toastSuccess } from '@/lib/toasts';
import { iRating } from '@/lib/interfaces/rating';
import { iFavorite } from '@/lib/interfaces/favorite';
import { useRouter } from 'next/navigation'


interface iProps {
  movie: iMovie;
}

const ActionButtons = ({ movie }: iProps) => {
  const [isRated, setIsRated] = useState<boolean>(false);
  const [rating, setRating] = useState<string | null | undefined>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isRatingOpened, setIsRatingOpened] = useState(false);
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter()

  const isAuthenticated = status === 'authenticated';  // passing to tooltip component to show tooltip only if authentificated
  const movieId = (movie.movieId ?? movie.id)?.toString();  // movie.id comes from external api , movie.movieId comes from db as favorite movie, if no movie.movieId use movie.id by default

  // fetch user ratings and cache them
  const { data: userRatings } = useQuery({
    queryKey: ['ratings'],
    enabled: !!isAuthenticated,
    queryFn: async () => {
      try {
        const { data } = await axios.get(`/api/ratings/all_ratings`);
        return data.ratings as iRating[];
      } catch (error) {
        console.error('Error fetching user ratings:', error);
      }
    },
  });

  // fetch user favorites and cache them
  const { data: userFavorites } = useQuery({
    queryKey: ['userFavorites'],
    enabled: !!isAuthenticated,
    queryFn: async () => {
      try {
        const { data } = await axios.get(`/api/favorites/all_favorites`);
        return data.favorites as iFavorite[];
      } catch (error) {
        console.error('Error fetching user favorites:', error);
      }
    }
  });

  // Mutation to add or remove a movie from favorites
  const { mutate: toggleFavorite, isPending, submittedAt, variables } = useMutation({
    mutationFn: async () => {
      const favorite = userFavorites?.find((favorite: iFavorite) => favorite.movieId === movieId);
      if (favorite) {
        toastSuccess('Removed from favorites');
        await axios.delete(`/api/favorites/delete_favorite?id=${favorite.id}`);
      } else {
        toastSuccess('Added to favorites');
        await axios.post(`/api/favorites/save_favorite`, { movie_id: movieId, title: movie.title, poster_path: movie.poster_path, vote_average: movie.vote_average });
      }
    },
    // onMutate: () => {
    //   queryClient.cancelQueries({ queryKey: ['userFavorites'] });
    //   const previousFavorites = queryClient.getQueryData(['userFavorites']);
    //   queryClient.setQueryData(['userFavorites'], (old: any) => {
    //     return [...old, { movieId: movieId }];
    //   });
    //   return { previousFavorites };
    // },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userFavorites'] });
      setIsFavorite(true);
    },
    onError: () => {
      setIsFavorite(false);
      toastError('Something went wrong');
    },
  });

  useEffect(() => {
    if (isAuthenticated && userFavorites && userRatings) {
      const favorite = userFavorites.find((favorite: iFavorite) => favorite.movieId === movieId);
      setIsFavorite(!!favorite);

      const rated = userRatings.find((rating: iRating) => rating.contentId === movieId);
      if (rated) {
        setRating(rated.rating);
        setIsRated(true);
      } else {
        setRating(null);
        setIsRated(false);
      }
    }
  }, [isAuthenticated, userFavorites, userRatings, isRated]);

  const toggleWatchlist = () => {
    setIsInWatchlist((prevState) => !prevState);
  };

  const toggleRatingContainer = () => {
    setIsRatingOpened((prevState) => !prevState);
  }

  return (
    <div className={s.action_btns}>
      <div className={s.ratings_container}>
        <Tooltip tooltipText="Average score">
          <div className={s.average_rating}>
            <span>{movie.vote_average?.toFixed(1)}</span>
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
          {isAuthenticated && isRatingOpened ? <RatingPopup handleSetIsRatingOpened={setIsRatingOpened} movieId={movieId} isRated={isRated} setIsRated={setIsRated} /> : null}
          <button className={`${s.btn} ${isRated ? s.fill_icon : ''}`} onClick={toggleRatingContainer} disabled={!isAuthenticated}>
            <FiStar size={25} />
          </button>
        </Tooltip>
        <Tooltip tooltipText={isAuthenticated ? "Add or remove from favorites" : "You must sign-in in to add to favorites"}>
          <button className={`${s.btn} ${isFavorite ? s.fill_icon : ''}`} onClick={() => toggleFavorite()} disabled={!isAuthenticated}>
            <FiHeart size={25} />
          </button>
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
