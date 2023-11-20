'use client';

import { useState, useEffect, use } from 'react';
import s from './movie_action_buttons.module.scss';
import { iMovie } from '@/lib/interfaces/movie';
import { FiHeart, FiStar, FiBookmark } from 'react-icons/fi';
import { useSession } from 'next-auth/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';


interface iProps {
  movie: iMovie;
}
interface iFavorite {
  id: string;
  userId: string;
  contentId: string;
  createdAt: Date;
}

const MovieActionButtons = ({ movie }: iProps) => {
  const [isRated, setIsRated] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const movieId = movie.id.toString()
  // fetch user favorites and cache them
  const { data: userFavorites } = useQuery({
    queryKey: ['userFavorites'],
    enabled: !!session,
    queryFn: async () => {
      const { data } = await axios.get(`/api/favorites/all_favorites`);
      return data.favorites as iFavorite[];
    },
  });
  // Mutation to add or remove a movie from favorites
  const { mutate: toggleFavorite } = useMutation({
    mutationFn: async () => {
      const favorite = userFavorites?.find((favorite: iFavorite) => favorite.contentId === movieId);
      if (favorite) {
        await axios.delete(`/api/favorites/delete_favorite?id=${favorite.id}`);
      } else {
        await axios.post(`/api/favorites/save_favorite`, { movie_id: movieId });
      }
    },
    onSuccess: (updatedFavorites) => {
      setIsFavorite(!isFavorite);
      queryClient.invalidateQueries({ queryKey: ['userFavorites'] });
    },
  });

  // Effect to set the initial state of isFavorite based on userFavorites
  useEffect(() => {
    if (userFavorites) {
      const isFavorite = userFavorites.find((favorite: iFavorite) => favorite.contentId === movieId);
      setIsFavorite(!!isFavorite);
    }
  }, [userFavorites, session]);


  const toggleWatchlist = () => {
    setIsInWatchlist((prevState) => !prevState);
  };

  return (
    <div className={s.action_btns}>
      <div className={s.rating}>
        <span>{movie.vote_average?.toFixed(1)}</span>
      </div>
      <button className={`${s.btn} ${isRated ? s.fill_icon : ''}`} >
        <FiStar size={25} />
      </button>
      <button className={`${s.btn} ${isFavorite ? s.fill_icon : ''}`} onClick={() => toggleFavorite()} disabled={!session}>
        <FiHeart size={25} />
      </button>
      <button className={`${s.btn} ${isInWatchlist ? s.fill_icon : ''}`}>
        <FiBookmark size={25} onClick={toggleWatchlist} />
      </button>
    </div>
  );
};

export default MovieActionButtons;
