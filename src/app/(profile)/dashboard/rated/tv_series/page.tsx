"use client"
import MoviesList from '@/components/pages/profile/favorites/movies_list/MoviesList';
import Filter from '@/components/shared/filter/Filter';
import useUserData from '@/hooks/reactQuery/useUserData';
import { useState } from 'react';
import { iTvSeries } from '@/lib/interfaces/tv_series';
import { iRatedItem } from '@/lib/interfaces/rated';
import sortMovies from '@/lib/helpers/movies/sortMovies';
import ProfileHeader from '@/components/layouts/profile_header/ProfileHeader';

const RatedTvSeriesPage = () => {
    const [filteredData, setFilteredData] = useState<iTvSeries[]>([]);
    const [initialSortOrder, setInitialSortOrder] = useState<string>('asc');

    // fetching user favorite movies from cache
    const { data: userRatedMovies } = useUserData('/api/ratings/all_ratings', 'ratings');
    const filteredOutMovies = userRatedMovies?.filter((item: iRatedItem) => item.mediaType === 'tv_series');
    const initialData = sortMovies(filteredOutMovies, 'rating', initialSortOrder);

    //  destructuring filtered data and adding result as array , to force rerender ,because on sort component is not rerendering
    const handleResultChange = (result: iTvSeries[]) => setFilteredData([...result]);
    const moviesToDisplay = filteredData.length > 0 ? filteredData : initialData;

    return (
        <div>
            <ProfileHeader title={'My rated tv-series'}>
                <Filter data={initialData} handleResultChange={handleResultChange} />
            </ProfileHeader>
            <MoviesList moviesToDisplay={moviesToDisplay} />
        </div>
    )
}

export default RatedTvSeriesPage
