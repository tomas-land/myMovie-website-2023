"use client"
import MoviesList from '@/components/pages/profile/favorites/movies_list/MoviesList';
import Filter from '@/components/shared/filter/Filter';
import useUserData from '@/hooks/reactQuery/useUserData';
import { useState } from 'react';
import { iFavorite } from '@/lib/interfaces/favorite';
import ProfileHeader from '@/components/layouts/profile_header/ProfileHeader';


const FavoriteMoviesPage = () => {
    const [filteredData, setFilteredData] = useState<iFavorite[]>([]);

    //  destructuring filtered data and adding result as array , to force rerender ,because on sort component is not rerendering
    const handleResultChange = (result: iFavorite[]) => setFilteredData([...result]);

    // fetching user favorite movies from cache
    const { data: userFavoriteMovies } = useUserData('/api/favorites/movies/all_favorites', 'favoriteMovies');
    const moviesToDisplay = filteredData.length > 0 ? filteredData : userFavoriteMovies;

    return (
        <div>
            <ProfileHeader title={'My favorite movies'}>
                <Filter data={userFavoriteMovies} handleResultChange={handleResultChange} />
            </ProfileHeader>
            <MoviesList moviesToDisplay={moviesToDisplay} />
        </div>
    )
}

export default FavoriteMoviesPage
