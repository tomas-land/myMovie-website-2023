"use client"
import TvSeriesList from '@/components/shared/media_list/tv_series/TvSeriesList';
import Filter from '@/components/shared/filter/Filter';
import useUserData from '@/hooks/reactQuery/useUserData';
import { useState } from 'react';
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
            <TvSeriesList movies={moviesToDisplay} text={`You don't have any rated tv-series yet`} headerTitle='My tv-series watchlist' />
        </div>
    )
}

export default WatchlistTvSeriesPage
