"use client"
import MoviesList from '@/components/pages/profile/favorites/movies_list/MoviesList';
import Filter from '@/components/shared/filter/Filter';
import useUserData from '@/hooks/reactQuery/useUserData';
import { useState } from 'react';
import { iWatchlistItem } from '@/lib/interfaces/watchlist';
import ProfileHeader from '@/components/layouts/profile_header/ProfileHeader';


const WatchlistMoviesPage = () => {
    const [filteredData, setFilteredData] = useState<iWatchlistItem[]>([]);

    //  destructuring filtered data and adding result as array , to force rerender ,because on sort component is not rerendering
    const handleResultChange = (result: iWatchlistItem[]) => setFilteredData([...result]);

    // fetching user watchlist from cache
    const { data: userWatchlist } = useUserData('/api/watchlist/all_watchlist', 'watchlist');

    // filtering out movies from user watchlist
    const filteredOutMovies = userWatchlist?.filter((item: iWatchlistItem) => item.mediaType === 'movies');

    // if filtered data is not empty, display it, else display filtered out movies
    const moviesToDisplay = filteredData.length > 0 ? filteredData : filteredOutMovies;

    return (
        <div>
            <ProfileHeader title={'My movies watchlist'}>
                <Filter data={filteredOutMovies} handleResultChange={handleResultChange} />
            </ProfileHeader>
            <MoviesList moviesToDisplay={moviesToDisplay} />
        </div>
    )
}

export default WatchlistMoviesPage
