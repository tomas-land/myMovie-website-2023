"use server"

import { iPerson } from "../interfaces/person";
import { saveFavoriteActorPrisma } from "@/lib/prisma/favorite/actor/saveFavoriteActorPrisma"
import { getFavoriteActorsPrisma } from "@/lib/prisma/favorite/actor/getFavoriteActorsPrisma"
import { deleteFavoriteActorPrisma } from "@/lib/prisma/favorite/actor/deleteFavoriteActorPrisma"
import { iFavoriteActor } from "../interfaces/favorite";
import { revalidatePath } from "next/cache";


export async function toggleFavoriteActor(person: iPerson | iFavoriteActor) {
    const personId = person.personId ?? person.id ; // if the person is a favorite actor, use personId, otherwise use id that comes from the TMDB API
    const name = person.name;
    const photo = person.profile_path;
    const popularity = person.popularity || 0;

    // Check if the actor is already in the favorites
    const favoriteActorExist = await getFavoriteActorsPrisma().then((actors) => actors.find((actor) => actor.personId === personId))

    // If the actor is already in the favorites, delete it, otherwise add it
    if (favoriteActorExist) {
        await deleteFavoriteActorPrisma(favoriteActorExist.id)
        revalidatePath('/')
        return { success: true, message: "Actor removed from favorites" }
    } else {
        await saveFavoriteActorPrisma(Number(personId), name, photo, popularity)
        revalidatePath('/dashboard/favorites/actors')
        return { success: true, message: "Actor added to favorites" }
    }
}
