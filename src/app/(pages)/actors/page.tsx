import ActorsList from '@/components/pages/actors/PopularActorsList'
import { getPopularActors } from '@/lib/requests/persons'

const ActorsPage = async () => {

    const popularActors = await getPopularActors(3) 

    return (
        <div>
            <ActorsList popularActors={popularActors} headerTitle='Popular actors' query='' />
        </div>)
}

export default ActorsPage