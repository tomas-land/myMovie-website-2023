"use server"

import { iPerson } from "../interfaces/person";
import { saveFavoriteActorPrisma } from "@/lib/prisma/favorite/actor/saveFavoriteActorPrisma"
import { getFavoriteActorsPrisma } from "@/lib/prisma/favorite/actor/getFavoriteActorsPrisma"
import { deleteFavoriteActorPrisma } from "@/lib/prisma/favorite/actor/deleteFavoriteActorPrisma"
import { iFavoriteActor } from "../interfaces/favorite";
import { revalidatePath } from "next/cache";
import { deleteAllFavoriteMoviesPrisma } from "@/lib/prisma/favorite/movie/deleteAllFavoriteMoviesPrisma";
import { deleteAllFavoriteTvSeriesPrisma } from "@/lib/prisma/favorite/tv_series/deleteAllFavoriteTvSeriesPrisma";
import { deleteAllWatchlistItemsPrisma } from "@/lib/prisma/watchlist/deleteAllWatchlistItemsPrisma";
// import { deleteAllRatedMovies } from "@/lib/prisma/rating/deleteAllRatedMovies";
import { deleteAllFavoriteActorsPrisma } from "@/lib/prisma/favorite/actor/deleteAllFavoriteActorsPrisma";



export async function deleteListItems(tableName: string) {
   
    if (tableName === 'Favorite Actors') {
        await deleteAllFavoriteActorsPrisma()
    }
    else if (tableName === 'Favorite Movies') {
        await deleteAllFavoriteMoviesPrisma()
    }
    else if (tableName === 'Favorite Tv-series') {
        await deleteAllFavoriteTvSeriesPrisma()
    }
    else if (tableName === 'Watchlist') {
        await deleteAllWatchlistItemsPrisma()
    }
    
    revalidatePath('/dashboard/lists')

}
