"use client"
import TvSeriesList from '@/components/pages/profile/favorites/tv_series_list/TvSeriesList';
import Filter from '@/components/shared/filter/Filter';
import useUserData from '@/hooks/reactQuery/useUserData';
import { useState } from 'react';
import { iFavorite } from '@/lib/interfaces/favorite';
import { iWatchlistItem } from '@/lib/interfaces/watchlist';


const WatchlistTvSeriesPage = () => {
    const [filteredData, setFilteredData] = useState<iWatchlistItem[]>([]);

    //  destructuring filtered data and adding result as array , to force rerender ,because on sort component is not rerendering
    const handleResultChange = (result: iWatchlistItem[]) => setFilteredData([...result]);

    //  fetching user watchlist from cache
    const { data: userWatchlist } = useUserData('/api/watchlist/all_watchlist', 'watchlist');

    const filteredOutTvSeries = userWatchlist?.filter((item: iWatchlistItem) => item.mediaType === 'tv_series');
    const moviesToDisplay = filteredData.length > 0 ? filteredData : filteredOutTvSeries;

    return (
        <div>
            <Filter data={filteredOutTvSeries} handleResultChange={handleResultChange} />
            <TvSeriesList moviesToDisplay={moviesToDisplay} />
        </div>
    )
}

export default WatchlistTvSeriesPage
