"use client"
import MoviesList from '@/components/shared/media_list/movies/MoviesList';
import Filter from '@/components/shared/filter/Filter';
import useUserData from '@/hooks/reactQuery/useUserData';
import { useState } from 'react';
import { iMovie } from '@/lib/interfaces/movie';
import { iRatedItem } from '@/lib/interfaces/rated';
import sortMovies from '@/lib/helpers/movies/sortMovies';
import ProfileHeader from '@/components/layouts/profile_header/ProfileHeader';


const RatedMoviesPage = () => {
    const [filteredData, setFilteredData] = useState<iMovie[]>([]);
    const [initialSortOrder, setInitialSortOrder] = useState<string>('desc');

    // fetching user favorite movies from cache
    const { data: userRatedMovies } = useUserData('/api/ratings/all_ratings', 'ratings');
    const filteredOutMovies = userRatedMovies?.filter((item: iRatedItem) => item.mediaType === 'movies');
    const initialData = sortMovies(filteredOutMovies, 'rating', initialSortOrder);

    //  destructuring filtered data and adding result as array , to force rerender ,because on sort component is not rerendering
    const handleResultChange = (result: iMovie[]) => setFilteredData([...result]);
    const moviesToDisplay = filteredData.length > 0 ? filteredData : initialData;

    return (
        <div>
            <ProfileHeader title={'My rated movies'}>
                <Filter data={initialData} handleResultChange={handleResultChange} />
            </ProfileHeader>
            <MoviesList moviesToDisplay={moviesToDisplay} text={`You don't have any rated movies yet`}/>
        </div>
    )
}

export default RatedMoviesPage
