import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toastError, toastSuccess } from '@/lib/toasts';
import axios from 'axios';
import useUserData from './useUserData';
import { iWatchlistItem } from '@/lib/interfaces/watchlist';

interface iCustomHookProps {
    mediaType: string;
    movieId?: string;
    tvSeriesId?: string;
    title?: string;
    releaseDate?: string;
    posterPath?: string;
    voteAverage?: number;
    currentSlideId?: string;
    isInWatchlist: boolean;
    setIsInWatchlist: (isInWatchlist: boolean) => void;
}

const useToggleWatchlist = ({ mediaType, currentSlideId, title, posterPath, voteAverage, releaseDate, isInWatchlist, setIsInWatchlist }: iCustomHookProps) => {
    const queryClient = useQueryClient();

    // fetch user watchlist and cache them
    const { data: userWatchlist } = useUserData('/api/watchlist/all_watchlist', 'watchlist');

    const { mutate: toggleWatchlist, isPending: togglingWatchlistIsPending } = useMutation({
        mutationFn: async () => {
            const watchlistItem = userWatchlist?.find((watchlistItem: iWatchlistItem) => watchlistItem.media_id === currentSlideId); // if movie is already in watchlist, delete it, else add it to watchlist ( if current slide id matches cached watchlist item content id, delete it, else add it to watchlist)
            if (watchlistItem) {
                await axios.delete(`/api/watchlist/delete_from_watchlist?item_id=${watchlistItem.id}`);
            } else {
                await axios.post(`/api/watchlist/save_to_watchlist`, { media_id: currentSlideId, title: title, poster_path: posterPath, vote_average: voteAverage, media_type: mediaType, release_date: releaseDate });
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['watchlist'] });

            if (isInWatchlist) {
                toastSuccess(`Removed from watchlist`)
                setIsInWatchlist(false)
            } else {
                toastSuccess(`Added to watchlist`)
                setIsInWatchlist(true)
            }
        },
        onError: () => {
            setIsInWatchlist(false);
            toastError('Something went wrong');
        },
    });
    return { toggleWatchlist, togglingWatchlistIsPending };

}

export default useToggleWatchlist;