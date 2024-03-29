"use client"
import MoviesList from '@/components/shared/media_list/movies/MoviesList';
import Filter from '@/components/shared/filter/Filter';
import useUserData from '@/hooks/reactQuery/useUserData';
import { useState } from 'react';
import { iFavorite } from '@/lib/interfaces/favorite';


const FavoriteMoviesPage = () => {
    const [filteredData, setFilteredData] = useState<iFavorite[]>([]);

    //  destructuring filtered data and adding result as array , to force rerender ,because on sort component is not rerendering
    const handleResultChange = (result: iFavorite[]) => setFilteredData([...result]);

    // fetching user favorite movies from cache
    const { data: userFavoriteMovies } = useUserData('/api/favorites/movies/all_favorites', 'favoriteMovies');
    const moviesToDisplay = filteredData.length > 0 ? filteredData : userFavoriteMovies;

    return (
        <div>
            <Filter data={userFavoriteMovies} handleResultChange={handleResultChange} />
            <MoviesList movies={moviesToDisplay} text={`You don't have any favorite movie yet`} headerTitle='My favorite movies' />
        </div>
    )
}

export default FavoriteMoviesPage
