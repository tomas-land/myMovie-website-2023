"use client"
import TvSeriesList from '@/components/shared/media_list/tv_series/TvSeriesList';
import Filter from '@/components/shared/filter/Filter';
import useUserData from '@/hooks/reactQuery/useUserData';
import { useState } from 'react';
import { iFavorite } from '@/lib/interfaces/favorite';
import ProfileHeader from '@/components/layouts/profile_header/ProfileHeader';



const FavoriteTvSeriesPage = () => {
    const [filteredData, setFilteredData] = useState<iFavorite[]>([]);

    //  destructuring filtered data and adding result as array , to force rerender ,because on sort component is not rerendering
    const handleResultChange = (result: iFavorite[]) => setFilteredData([...result]);

    const { data: userFavoriteTvSeries } = useUserData('/api/favorites/tv_series/all_favorites', 'favoriteTvSeries');
    const moviesToDisplay = filteredData.length > 0 ? filteredData : userFavoriteTvSeries;

    return (
        <div>
            <ProfileHeader title={'My favorite tv-series'}>
                <Filter data={userFavoriteTvSeries} handleResultChange={handleResultChange} />
            </ProfileHeader>
            <TvSeriesList moviesToDisplay={moviesToDisplay} text={`You don't have any favorite tv-series yet`}/>
        </div>
    )
}

export default FavoriteTvSeriesPage
