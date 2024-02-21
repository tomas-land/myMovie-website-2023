"use client"
import MoviesList from '@/components/shared/media_list/movies/MoviesList';
import Filter from '@/components/shared/filter/Filter';
import useUserData from '@/hooks/reactQuery/useUserData';
import { useState } from 'react';
import { iTvSeries } from '@/lib/interfaces/tv_series';
import { iRatedItem } from '@/lib/interfaces/rated';
import sortMovies from '@/lib/helpers/movies/sortMovies';

const RatedTvSeriesPage = () => {
    const [filteredData, setFilteredData] = useState<iTvSeries[]>([]);
    const [initialSortOrder, setInitialSortOrder] = useState<string>('desc');

    // fetching user favorite movies from cache
    const { data: userRatedMovies } = useUserData('/api/ratings/all_ratings', 'ratings');
    const filteredOutTvSeries = userRatedMovies?.filter((item: iRatedItem) => item.mediaType === 'tv_series');
    const initialData = sortMovies(filteredOutTvSeries, 'rating', initialSortOrder);

    //  destructuring filtered data and adding result as array , to force rerender ,because on sort component is not rerendering
    const handleResultChange = (result: iTvSeries[]) => setFilteredData([...result]);
    const moviesToDisplay = filteredData.length > 0 ? filteredData : initialData;

    return (
        <div>
            <Filter data={initialData} handleResultChange={handleResultChange} />
            <MoviesList movies={moviesToDisplay} text={`You don't have any rated tv-series yet`} headerTitle='My rated tv-series' />
        </div>
    )
}

export default RatedTvSeriesPage
