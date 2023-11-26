import React from 'react'
import s from '@/components/pages/profile/favorites/favorite_movies_page.module.scss'
import { getFavoriteMovies } from '@/lib/requests/user'
import { iMovie } from '@/lib/interfaces/movie';
import ContentDisplay from '@/components/shared/content_display/ContentDisplay';
import MovieCard from '@/components/shared/movie_card/MovieCard';


const FavoriteMoviesPage = async () => {

    const favoriteMovies: iMovie[] = await getFavoriteMovies();

    return (
        <div className={s.favorite_movies}>
            <ContentDisplay headerTitle="My favorite movies">
                {favoriteMovies?.length > 0 ?
                    favoriteMovies?.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} isQuickView={false} />
                    )) : <h1>You don&apos;t have any favorite movies yet.</h1>}
            </ContentDisplay>
        </div>
    )
}

export default FavoriteMoviesPage