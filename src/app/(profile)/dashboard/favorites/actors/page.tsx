
import ActorsList from '@/components/shared/actors_list/ActorsList';
import { getFavoriteActors } from '@/lib/requests/user';
export const dynamic = 'force-dynamic'


const FavoriteActorsPage = async () => {
    const favoriteActors = await getFavoriteActors();

    return (
        <div>
            {/* <Filter data={userFavoriteMovies} handleResultChange={handleResultChange} /> */}
            <ActorsList favoriteActors={favoriteActors} text={`You don't have any favorite actors yet`} headerTitle='My favorite actors' />
        </div>
    )
}

export default FavoriteActorsPage
