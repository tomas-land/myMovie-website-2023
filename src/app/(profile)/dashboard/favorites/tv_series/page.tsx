"use client"
import TvSeriesList from '@/components/shared/media_list/tv_series/TvSeriesList';
import Filter from '@/components/shared/filter/Filter';
import useUserData from '@/hooks/reactQuery/useUserData';
import { use, useState } from 'react';
import { iFavorite } from '@/lib/interfaces/favorite';


const FavoriteTvSeriesPage = () => {
    const [filteredData, setFilteredData] = useState<iFavorite[]>([]);

    //  destructuring filtered data and adding result as array , to force rerender ,because on sort component is not rerendering
    const handleResultChange = (result: iFavorite[]) => setFilteredData([...result]);

    const { data: userFavoriteTvSeries } = useUserData('/api/favorites/tv_series/all_favorites', 'favoriteTvSeries');
    const moviesToDisplay = filteredData.length > 0 ? filteredData : userFavoriteTvSeries;

    return (
        <div>
            <Filter data={userFavoriteTvSeries} handleResultChange={handleResultChange} />
            <TvSeriesList movies={moviesToDisplay} text={`You don't have any favorite tv-series yet`} headerTitle='My favorite tv-series' />
        </div>
    )
}

export default FavoriteTvSeriesPage
