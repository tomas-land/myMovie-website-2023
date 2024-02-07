import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toastError, toastSuccess } from '@/lib/toasts';
import axios from 'axios';
import { iFavorite } from '@/lib/interfaces/favorite'
import useUserData from './useUserData';

interface iCustomHookProps {
    mediaType: string;
    movieId?: string;
    tvSeriesId?: string;
    title?: string;
    posterPath?: string;
    voteAverage?: number;
    releaseDate?: string;
    isFavorite: boolean;
    setIsFavorite: (isFavorite: boolean) => void;
    currentSlideId?: string;
}

const useToggleFavorite = ({ mediaType, movieId, tvSeriesId, title, posterPath, voteAverage, isFavorite, setIsFavorite, releaseDate, currentSlideId }: iCustomHookProps) => {
    const queryClient = useQueryClient();

    // fetch user favorite movies and cache them
    const { data: userFavoriteMovies } = useUserData('/api/favorites/movies/all_favorites', 'favoriteMovies');
    const { data: userFavoriteTvSeries } = useUserData('/api/favorites/tv_series/all_favorites', 'favoriteTvSeries');

    // Mutation to add or remove a movie or tv series from favorites
    const { mutate: toggleFavorite, isPending: togglingFavoritesIsPending } = useMutation({
        mutationFn: async () => {
            if (mediaType === 'movies') {
                // checking if cached favorite movie id matches current slide id, if yes delete it, else add it to favorites
                const favoriteMovie = userFavoriteMovies?.find((favorite: iFavorite) => favorite.movieId === movieId); // if movie is already in favorites, delete it, else add it to favorites
                if (favoriteMovie) {
                    await axios.delete(`/api/favorites/movies/delete_favorite?id=${favoriteMovie.id}`);
                } else {
                    await axios.post(`/api/favorites/movies/save_favorite`, { movie_id: movieId, title: title, poster_path: posterPath, vote_average: voteAverage, release_date: releaseDate });
                 }
            } else if (mediaType === 'tv_series') {
                const favoriteTvSeries = userFavoriteTvSeries?.find((favorite: iFavorite) => favorite.seriesId === tvSeriesId?.toString()); // if tv series is already in favorites, delete it, else add it to favorites
                if (favoriteTvSeries) {
                    await axios.delete(`/api/favorites/tv_series/delete_favorite?id=${favoriteTvSeries.id}`);
                } else {
                    await axios.post(`/api/favorites/tv_series/save_favorite`, { tv_series_id: tvSeriesId, title: title, poster_path: posterPath, vote_average: voteAverage, release_date: releaseDate });
                }
            }
        },
        onSuccess: () => {
            if (mediaType === 'movies') queryClient.invalidateQueries({ queryKey: ['favoriteMovies'] });
            else queryClient.invalidateQueries({ queryKey: ['favoriteTvSeries'] });

            if (isFavorite) {
                toastSuccess(`Removed from favorite ${mediaType}`)
                setIsFavorite(false)
            } else {
                toastSuccess(`Added to favorite ${mediaType.split('_').join(' ')}`)
                setIsFavorite(true)
            }
        },
        onError: () => {
            setIsFavorite(false);
            toastError('Something went wrong');
        },
    });

    return { toggleFavorite, togglingFavoritesIsPending };
}

export default useToggleFavorite;