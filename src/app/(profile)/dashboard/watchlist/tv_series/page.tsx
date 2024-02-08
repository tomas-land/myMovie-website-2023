"use client"
import TvSeriesList from '@/components/shared/media_list/tv_series/TvSeriesList';
import Filter from '@/components/shared/filter/Filter';
import useUserData from '@/hooks/reactQuery/useUserData';
import { useState } from 'react';
import { iWatchlistItem } from '@/lib/interfaces/watchlist';
import ProfileHeader from '@/components/layouts/profile_header/ProfileHeader';


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
            <ProfileHeader title={'My tv-series watchlist'}>
                <Filter data={filteredOutTvSeries} handleResultChange={handleResultChange} />
            </ProfileHeader>
            <TvSeriesList moviesToDisplay={moviesToDisplay} text={`You don't have any tv-series in the watchlist yet`}/>
        </div>
    )
}

export default WatchlistTvSeriesPage
