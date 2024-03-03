import React from 'react'
import ListOfLists from '@/components/pages/profile/lists/list_of_lists/ListOfLists'
import { getFavoriteActors, getFavoriteMovies, getFavoriteTvSeries, getWatchlist } from '@/lib/requests/user'

const ListsPage = async () => {

    const favoriteMovies = await getFavoriteMovies()
    const favoriteTvSeries = await getFavoriteTvSeries()
    const favoriteActors = await getFavoriteActors()
    const watchlist = await getWatchlist()

    return (
        <div>
            <ListOfLists
                favoriteMovies={favoriteMovies}
                favoriteTvSeries={favoriteTvSeries}
                favoriteActors={favoriteActors}
                watchlist={watchlist}
            />
        </div>
    )
}

export default ListsPage