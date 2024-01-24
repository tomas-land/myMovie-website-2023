import s from '@/components/pages/profile/favorites/favorite_movies_page.module.scss'
import MoviesList from '@/components/pages/profile/favorites/movies_list/MoviesList';


const FavoriteMoviesPage = async () => {

    return (
        <div className={s.favorite_movies}>
            <MoviesList  />
            
        </div>
    )
}

export default FavoriteMoviesPage