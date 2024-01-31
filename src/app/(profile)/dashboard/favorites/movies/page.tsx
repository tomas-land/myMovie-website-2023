"use client"
import MoviesList from '@/components/pages/profile/favorites/movies_list/MoviesList';
import Filter from '@/components/shared/filter/Filter';
import useUserData from '@/hooks/reactQuery/useUserData';
import { useState } from 'react';
import { iFavorite } from '@/lib/interfaces/favorite';


const FavoriteMoviesPage = () => {
    const [filteredData, setFilteredData] = useState<iFavorite[]>([]);

    const handleResultChange = (result: iFavorite[]) => {  //  destructuring filtered data and adding result as array , to force rerender ,because on sort component is not rerendering
        setFilteredData([...result]);
    }

    const { data: userFavoriteMovies } = useUserData('/api/favorites/movies/all_favorites', 'favoriteMovies');
    const moviesToDisplay = filteredData.length > 0 ? filteredData : userFavoriteMovies;
console.log(userFavoriteMovies)
    return (
        <div>
            <Filter userFavorites={userFavoriteMovies} onResultChange={handleResultChange} />
            <MoviesList moviesToDisplay={moviesToDisplay} />
        </div>
    )
}

export default FavoriteMoviesPage
