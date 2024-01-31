"use client"
import TvSeriesList from '@/components/pages/profile/favorites/tv_series_list/TvSeriesList';
import Filter from '@/components/shared/filter/Filter';
import useUserData from '@/hooks/reactQuery/useUserData';
import { useState } from 'react';
import { iFavorite } from '@/lib/interfaces/favorite';


const FavoriteTvSeriesPage = () => {
    const [filteredData, setFilteredData] = useState<iFavorite[]>([]);

    const handleResultChange = (result: iFavorite[]) => {  //  destructuring filtered data and adding result as array , to force rerender ,because on sort component is not rerendering
        setFilteredData([...result]);
    }

    const { data: userFavoriteTvSeries } = useUserData('/api/favorites/tv_series/all_favorites', 'favoriteTvSeries');
    console.log(userFavoriteTvSeries)
    const moviesToDisplay = filteredData.length > 0 ? filteredData : userFavoriteTvSeries;

    return (
        <div>
            <Filter userFavorites={userFavoriteTvSeries} onResultChange={handleResultChange} />
            <TvSeriesList moviesToDisplay={moviesToDisplay} />
        </div>
    )
}

export default FavoriteTvSeriesPage
