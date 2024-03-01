import PopularActorsList from '@/components/pages/actors/PopularActorsList'
import { getPopularActors } from '@/lib/requests/persons'
import SearchBar from '@/components/shared/search_page/SearchBar'

const ActorsPage = async ({ searchParams }: {
    searchParams?: {
        query?: string
        page?: string
    }
}) => {

    const popularActors = await getPopularActors(3)
    const query = searchParams?.query || ''; // Get query from searchParams if it exists or set it to an empty string

    return (
        <div style={{ paddingTop: '7rem' }}>
            <SearchBar placeholder='Search for popular actors...' />
            <PopularActorsList popularActors={popularActors} headerTitle='Popular actors'  query={query}/>
        </div>)
}

export default ActorsPage